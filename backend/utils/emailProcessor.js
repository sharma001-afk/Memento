const { ChromaClient } = require('chromadb');
const { Chroma } = require('@langchain/community/vectorstores/chroma');
const { Document } = require('langchain/document');
const GmailIntegration = require('../models/GmailIntegration');
const gmailService = require('../services/gmailService');
const { getEmbeddings } = require('./llm');
const axios = require('axios');

// Initialize ChromaDB client with retry mechanism
const initChroma = async (retries = 3) => {
  const client = new ChromaClient({
    path: 'http://localhost:8000',
    fetchOptions: {
      timeout: 60000
    }
  });

  for (let i = 0; i < retries; i++) {
    try {
      await client.heartbeat();
      return client;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};

const batchDocuments = (documents, batchSize = 10) => {
  const batches = [];
  for (let i = 0; i < documents.length; i += batchSize) {
    batches.push(documents.slice(i, i + batchSize));
  }
  return batches;
};

async function checkChromaHealth() {
  const client = new ChromaClient({
    path: 'http://localhost:8000',
    fetchOptions: {
      timeout: 60000
    }
  });
  
  try {
    await client.heartbeat();
    return true;
  } catch (error) {
    console.error('ChromaDB health check failed:', error);
    return false;
  }
}

async function processUserEmails(userId, vectorStores) {
  if (vectorStores.has(userId)) {
    return;
  }

  const integration = await GmailIntegration.findOne({ userId });
  if (!integration || !integration.accessToken) {
    console.log(`No valid Gmail integration found for user ${userId}`);
    return;
  }

  // Validate token before proceeding
  try {
    const response = await axios.get('https://www.googleapis.com/oauth2/v1/tokeninfo', {
      params: { access_token: integration.accessToken }
    });
    
    if (response.data.expires_in < 300) { // Less than 5 minutes remaining
      throw new Error('Token near expiration');
    }
  } catch (error) {
    console.log('Token validation failed, skipping email processing');
    // Don't throw error, just skip processing
    return;
  }

  let client;
  try {
    client = await initChroma();
  } catch (error) {
    throw new Error('ChromaDB service is not available: ' + error.message);
  }

  try {
    const emails = await gmailService.getEmails(integration.accessToken, 50);
    const documents = emails.map(email => {
      const content = `From: ${email.from}\nSubject: ${email.subject}\nDate: ${email.date}\nBody: ${email.body}`;
      return new Document({
        pageContent: content,
        metadata: {
          source: 'gmail',
          date: email.date,
          subject: email.subject,
          from: email.from,
          userId: userId
        }
      });
    });

    const embeddings = getEmbeddings();
    const collectionName = `emails_${userId}`.replace(/[^a-zA-Z0-9_]/g, '_');

    // Clean up existing collection
    try {
      const collections = await client.listCollections();
      if (collections.some(c => c.name === collectionName)) {
        await client.deleteCollection({ name: collectionName });
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for deletion
      }
    } catch (error) {
      console.error('Collection cleanup error:', error);
    }

    // Create vector store with proper configuration
    const vectorStore = await Chroma.fromDocuments([], embeddings, {
      collectionName,
      url: 'http://localhost:8000',
      collectionMetadata: {
        'userId': userId,
        'hnsw:space': 'cosine',
        'hnsw:construction_ef': 100,
        'hnsw:search_ef': 100,
        'dimension': 1536 // text-embedding-3-small dimension
      }
    });

    // Process documents in batches
    const batches = batchDocuments(documents);
    for (const batch of batches) {
      try {
        await vectorStore.addDocuments(batch);
        await new Promise(resolve => setTimeout(resolve, 100)); // Rate limiting
      } catch (error) {
        console.error('Batch processing error:', error);
        continue; // Continue with next batch even if current fails
      }
    }

    vectorStores.set(userId, vectorStore);
    console.log(`Successfully processed ${emails.length} emails for user ${userId}`);
    
  } catch (error) {
    console.error('Email processing error:', error);
    if (error.response?.status === 401) {
      // Clear invalid integration
      await GmailIntegration.findOneAndUpdate(
        { userId },
        { $unset: { accessToken: 1 } }
      );
    }
    // Don't throw error, just log it
    return;
  }
}

module.exports = {
  processUserEmails,
  checkChromaHealth,
  initChroma
};