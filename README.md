# Memento 🧠

> **Intelligent Task Management Through AI-Powered Email & Messaging Integration**

Memento is a full-stack application that intelligently integrates with Gmail, WhatsApp, Outlook, Slack, Zoom, and Notion to automatically extract, categorize, and remind you about important tasks and meetings. Using advanced AI and Retrieval-Augmented Generation (RAG), Memento analyzes your communications to surface critical action items without manual effort.

---

## 🎯 What is Memento?

Memento helps professionals stay on top of their commitments by:

- **Unified Inbox**: Connect multiple communication platforms (Gmail, WhatsApp, Outlook, Slack, Zoom) in one place
- **AI-Powered Task Extraction**: Automatically identifies meetings, deadlines, and action items from your emails and messages
- **Smart Reminders**: Intelligently surfaces important tasks and scheduled meetings before they happen
- **Knowledge Graph**: Builds a semantic understanding of your projects, clients, and team dynamics
- **Real-time Sync**: Continuously monitors integrated services for new important information
- **Conversational AI**: Chat interface to ask questions about your tasks, meetings, and extracted information

---

## ✨ Key Features

### 🔌 Multi-Platform Integration
- **Gmail**: Sync emails, extract action items, identify scheduled meetings
- **WhatsApp Business**: Capture important business conversations and deadlines
- **Microsoft Outlook**: Email and calendar integration
- **Zoom**: Meeting summaries and action items
- **Slack**: Team communications and task tracking
- **Notion**: Document and knowledge base sync

### 🤖 AI-Powered Intelligence
- **Email Processing**: Automatically analyzes incoming emails to extract tasks, deadlines, and important information
- **Meeting Detection**: Identifies scheduled meetings from calendar and email content
- **Knowledge Graphs**: Build relationships between projects, people, and tasks
- **RAG (Retrieval-Augmented Generation)**: Combines vector embeddings with LLMs for accurate context retrieval
- **OpenAI-Powered**:
  - `gpt-4o-mini` (default) for chat, RAG answers, smart replies, and summaries
  - `text-embedding-3-small` for document embeddings
  - Model names are configurable via environment variables

### 💬 Conversational Interface
- Chat with an AI assistant about your tasks and meetings
- Ask questions like "What meetings do I have this week?" or "What tasks did the client request?"
- Context-aware responses using RAG

### 🎨 User Experience
- Clean, intuitive dashboard
- Real-time notifications via Socket.io
- Protected routes and JWT-based authentication
- Responsive design with Tailwind CSS

---

## 🛠 Tech Stack

### Frontend
- **React 18.3** - UI framework
- **TypeScript 5.5** - Type-safe development
- **Vite 5.4** - Build tool
- **Tailwind CSS 3.4** - Styling
- **React Router 6.22** - Navigation
- **Socket.io Client** - Real-time communication
- **Lucide React** - Icon library
- **Axios** - HTTP client

### Backend
- **Node.js + Express** - Server framework
- **TypeScript/JavaScript** - Runtime
- **MongoDB + Mongoose** - Database
- **Socket.io** - WebSocket communication
- **LangChain 0.3** - LLM orchestration
- **ChromaDB 2.1** - Vector database for RAG
- **Google APIs** - Gmail, Calendar integration
- **Axios** - HTTP requests
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **Chrono-node** - Date/time parsing

### AI & ML
- **LangChain**: Complete LLM framework for chains, memory, and RAG
- **ChromaDB**: Vector storage for embeddings and semantic search
- **OpenAI Chat**: `gpt-4o-mini` (default) for chat, RAG answers, and summaries
- **OpenAI Embeddings**: `text-embedding-3-small` (1536-dim) for semantic search

---

## 📋 Project Structure

```
Memento/
├── frontend/                    # React + Vite frontend
│   ├── src/
│   │   ├── pages/              # Main pages (Dashboard, Gmail, Integrations, etc.)
│   │   ├── components/         # Reusable UI components
│   │   ├── context/            # React context (Auth, Socket)
│   │   ├── config.ts           # API and integration config
│   │   └── App.tsx             # Main app component
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                     # Express backend
│   ├── routes/                 # API routes (gmail, auth, etc.)
│   ├── models/                 # MongoDB schemas
│   ├── services/               # Business logic (gmailService, etc.)
│   ├── utils/                  # Helpers (emailProcessor, llm, etc.)
│   ├── middleware/             # Auth middleware
│   ├── server.js               # Express server entry
│   └── package.json
│
└── package.json                # Root dependencies
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ (LTS recommended)
- npm or yarn
- MongoDB (local or Atlas connection)
- ChromaDB running (for vector storage)
- OpenAI API key (for chat, RAG, and embeddings)
- Environment variables configured

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rahulsharma-fullstack/Memento.git
   cd Memento
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

4. **Install backend dependencies**
   ```bash
   cd ../backend
   npm install
   ```

### Environment Setup

Create `.env` files in both `backend/` and `frontend/` directories:

#### Backend (.env)
```env
# Server
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/memento

# JWT
JWT_SECRET=your_jwt_secret_key_here

# Gmail Integration
GMAIL_CLIENT_ID=your_gmail_client_id
GMAIL_CLIENT_SECRET=your_gmail_client_secret
GMAIL_REDIRECT_URI=http://localhost:5173/gmail/callback

# LLM & AI (OpenAI)
OPENAI_API_KEY=your_openai_key
OPENAI_CHAT_MODEL=gpt-4o-mini
OPENAI_EMBEDDING_MODEL=text-embedding-3-small

# Vector Database
CHROMA_URL=http://localhost:8000
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

### Running the Application

**Option 1: Run backend and frontend separately**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

**Option 2: Run both concurrently** (from frontend directory)
```bash
cd frontend
npm run dev:full
```

The app will be available at `http://localhost:5173`

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Gmail Integration
- `GET /api/gmail/auth-url` - Get Gmail OAuth URL
- `GET /api/gmail/callback` - Handle OAuth callback
- `GET /api/gmail/emails` - Fetch user emails
- `POST /api/gmail/sync` - Manually trigger email sync

### Chat & AI
- `POST /api/chat/message` - Send chat message
- `GET /api/chat/history` - Get chat history
- `POST /api/ai/analyze` - Analyze content with AI

### Integrations
- `GET /api/integrations` - List all integrations
- `POST /api/integrations/:provider/connect` - Connect integration
- `POST /api/integrations/:provider/disconnect` - Disconnect integration

---

## 🧠 How It Works

### Email Processing Pipeline

1. **User Integration**: User authorizes Memento to access Gmail/Outlook
2. **Email Fetching**: Memento retrieves emails using OAuth tokens
3. **Document Processing**: 
   - Emails are converted to documents
   - Metadata extracted (sender, date, subject, body)
4. **Embeddings**: Documents are embedded using OpenAI (`text-embedding-3-small`) via LangChain
5. **Vector Storage**: Embeddings stored in ChromaDB for semantic search
6. **Task Extraction**: AI analyzes emails to extract:
   - Meetings and deadlines
   - Action items and tasks
   - Client requirements
   - Important deadlines
7. **Smart Reminders**: System alerts user about upcoming important items
8. **RAG Retrieval**: When users ask questions, relevant documents are retrieved and context-aware answers generated

### Real-Time Updates

- Socket.io connections keep dashboard in sync
- New emails trigger background jobs
- Task updates reflected instantly across clients

---


## 🔐 Authentication & Security

- JWT-based authentication with token refresh
- Password hashing with bcryptjs
- Protected API routes with middleware
- OAuth 2.0 for third-party integrations
- Secure token storage in database

---

## 🚧 Development

### Adding a New Integration

1. Create service file: `backend/services/[provider]Service.js`
2. Create route file: `backend/routes/[provider].js`
3. Create model if needed: `backend/models/[Provider]Integration.js`
4. Add frontend page: `frontend/src/pages/[Provider].tsx`
5. Update `Integrations.tsx` with new integration info

### Extending AI Capabilities

1. Edit `backend/server.js` to add new LLM chains
2. Update prompt templates in `ChatPromptTemplate`
3. Add new analysis utilities in `backend/utils/`
4. Update frontend `AIChat.tsx` component for new features

---

## 📊 Current Implementation Status

- ✅ Gmail integration with OAuth
- ✅ Email fetching and analysis
- ✅ Vector embeddings with ChromaDB
- ✅ RAG-based chat interface
- ✅ User authentication & JWT
- ✅ Real-time socket communication
- ✅ Dashboard with activity overview
- 🚧 WhatsApp Business integration
- 🚧 Outlook integration
- 🚧 Zoom meeting summaries
- 🚧 Advanced task scheduling

---

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`

**ChromaDB Connection Error**
- Ensure ChromaDB is running: `chroma run --path ./data`
- Verify `CHROMA_URL` in environment variables

**Gmail OAuth Issues**
- Verify Client ID and Secret in Google Cloud Console
- Ensure redirect URI matches exactly: `http://localhost:5173/gmail/callback`

**Socket.io Connection Issues**
- Check CORS configuration in `backend/server.js`
- Ensure Socket URL matches frontend config

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Guidelines
- Use TypeScript for type safety
- Follow existing code style
- Add tests for new features
- Update README for significant changes

---

## 📝 License

ISC - See LICENSE file for details

---

## 👤 Author

**Rahul Sharma** - Full Stack Developer
- GitHub: [@rahulsharma-fullstack](https://github.com/rahulsharma-fullstack)
- Repository: [Memento](https://github.com/rahulsharma-fullstack/Memento)

---

## 🙏 Acknowledgments

- LangChain team for the powerful LLM framework
- ChromaDB for efficient vector storage
- Google APIs for seamless Gmail integration
- The open-source community for amazing tools

---

## 📞 Support & Feedback

Have questions or suggestions? Feel free to:
- Open an [issue](https://github.com/rahulsharma-fullstack/Memento/issues)
- Start a [discussion](https://github.com/rahulsharma-fullstack/Memento/discussions)
- Contact via GitHub

---

## 🗓️ Roadmap

- [ ] WhatsApp Business integration with AI analysis
- [ ] Outlook calendar and email sync
- [ ] Zoom meeting transcription and summarization
- [ ] Slack channel monitoring and insights
- [ ] Notion database integration
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Team collaboration features
- [ ] Custom AI model fine-tuning
- [ ] Enterprise deployment options

---

**Made with ❤️ by Rahul Sharma**
