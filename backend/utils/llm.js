const { ChatOpenAI } = require('@langchain/openai');
const { OpenAIEmbeddings } = require('@langchain/openai');

// Centralized OpenAI configuration. All AI features (email RAG, chat assistant,
// smart-reply, suggestions, summaries) flow through here so the project depends
// on a single provider and a single API key.

function getEmbeddings() {
  return new OpenAIEmbeddings({
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_EMBEDDING_MODEL || 'text-embedding-3-small',
  });
}

function getChatModel() {
  return new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini',
    temperature: 0.7,
  });
}

// Convenience helper that takes a prompt string and returns the model's reply
// as a plain string. ChatOpenAI.invoke() returns an AIMessage object, so we
// unwrap `.content` to keep call sites simple.
async function generateText(prompt) {
  const res = await getChatModel().invoke(prompt);
  return typeof res.content === 'string' ? res.content : String(res.content);
}

module.exports = { getEmbeddings, getChatModel, generateText };
