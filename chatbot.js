// Hugging Face Chatbot
const HF_API_KEY = ''; // API calls will use fallback responses

const portfolioContext = `You are Shivam Kumar's AI assistant. Answer questions about him professionally.

ABOUT: Shivam Kumar - AI Developer | Python Developer from Delhi, India
Email: shivamkumar797977@gmail.com | Phone: +91 7979779685

EXPERIENCE: Senior System Associate at Infosys Ltd. (Oct 2022-Present) - Building Generative AI solutions, RAG-based chatbots, LLM evaluation pipelines, Python backend APIs, Azure cloud deployment

EDUCATION: Executive MBA Data Science (IIT Patna Dec 2026), MCA (Chandigarh 2024), BCA (SOA 2022)

SKILLS: Python, LLMs, RAG, Prompt Engineering, Vector Embeddings, DeepEval, LangGraph, Machine Learning, SQL, FastAPI, Azure, Docker

CERTIFICATIONS: Google Data Analytics Professional, DP-900, AI-900, Google Cloud Digital Leader, Infosys Certified Generative AI Professional

PROJECTS: AI Portfolio Chatbot (RAG-based), LLM Evaluation Framework (DeepEval), Multi-Agent Workflow (LangGraph)

Keep responses short and professional.`;

let conversationHistory = [];
let isTyping = false;

async function sendToHuggingFace(userMessage) {
  conversationHistory.push({ role: 'user', content: userMessage });
  
  try {
    const response = await fetch('/.netlify/functions/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    const botResponse = data.response;

    if (botResponse && botResponse.length > 20) {
      conversationHistory.push({ role: 'assistant', content: botResponse });
      return botResponse;
    }

    return generateSmartResponse(userMessage);
  } catch (error) {
    console.error('Chat Error:', error);
    return generateSmartResponse(userMessage);
  }
}

function generateSmartResponse(msg) {
  const lower = msg.toLowerCase();
  
  // Greetings
  if (lower.match(/^(hi|hello|hey|greetings)/)) {
    return "Hello! 👋 I'm Shivam's AI assistant. I can tell you about his AI/GenAI skills, experience building RAG systems, projects, education, or how to reach him. What would you like to know?";
  }
  if (lower.includes('how are you') || lower.includes('how r u')) {
    return "I'm doing great, thanks for asking! I'm here to help you learn about Shivam Kumar. He's an AI Developer specializing in Generative AI, LLMs, and Python development. What would you like to know about him?";
  }
  
  // Skills
  if (lower.includes('skill')) {
    return "Shivam's expertise spans multiple areas:\n\n🤖 AI & GenAI: LLMs, RAG Systems, Prompt Engineering, Vector Embeddings, DeepEval, LangGraph\n💻 Python: FastAPI, REST APIs, Pandas, NumPy, Scikit-learn\n🧠 Machine Learning: Classification, Regression, Clustering, Feature Engineering\n🗄️ Data Engineering: SQL, ETL Pipelines, Data Modeling\n☁️ Cloud: Azure Container Apps, Docker, CI/CD\n\nHe specializes in building production-ready AI solutions!";
  }
  
  // Experience
  if (lower.includes('experience') || lower.includes('work') || lower.includes('job')) {
    return "Shivam is a Senior System Associate at Infosys Ltd. since Oct 2022, where he:\n\n• Builds Generative AI solutions using LLM frameworks\n• Develops RAG-based chatbot systems\n• Implements LLM evaluation pipelines with DeepEval\n• Engineers scalable Python backend APIs\n• Deploys services to Azure Container Apps\n• Designs SQL data pipelines for AI-ready datasets\n\nHe brings 3+ years of AI and Python development experience!";
  }
  
  // Education
  if (lower.includes('education') || lower.includes('degree') || lower.includes('study')) {
    return "Shivam's educational journey:\n\n🎓 Executive MBA (Data Science) - IIT Patna (Dec 2026)\n🎓 MCA - Chandigarh University (2024)\n🎓 BCA - SOA University (2022)\n\nHe's continuously upgrading his skills with advanced education in AI and Data Science!";
  }
  
  // Projects
  if (lower.includes('project')) {
    return "Shivam has delivered impressive AI projects:\n\n1️⃣ AI Portfolio Chatbot - RAG-based system with vector embeddings and prompt engineering\n2️⃣ LLM Evaluation Framework - Automated testing using DeepEval for quality benchmarking\n3️⃣ Multi-Agent Workflow - LangGraph-based orchestration for complex AI tasks\n\nEach project showcases his expertise in Generative AI and LLM development!";
  }
  
  // Contact
  if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('reach') || lower.includes('hire')) {
    return "📧 Email: shivamkumar797977@gmail.com\n📱 Phone: +91 7979779685\n📍 Location: Delhi, India\n💼 LinkedIn: linkedin.com/in/shivamsavarn\n\nFeel free to reach out - Shivam is open to new opportunities!";
  }
  
  // Certifications
  if (lower.includes('certification') || lower.includes('certified')) {
    return "Shivam holds impressive certifications:\n\n🏆 Google Data Analytics Professional Certificate\n🏆 Microsoft: DP-900, AI-900\n🏆 Google Cloud Digital Leader\n🏆 Infosys Certified Generative AI Professional\n\nThese validate his expertise in AI, data, and cloud technologies!";
  }
  
  // Default
  return "I'm Shivam's AI assistant! I can share information about:\n\n• 🤖 AI & GenAI Skills\n• 🚀 Work Experience\n• 🎓 Education\n• 📁 AI Projects\n• 🏆 Certifications\n• 📞 Contact Info\n\nWhat interests you?";
}

function addMessage(text, sender) {
  const messagesDiv = document.getElementById('chatbot-messages');
  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-message ${sender}`;
  msgDiv.textContent = text;
  messagesDiv.appendChild(msgDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function sendMessage() {
  const input = document.getElementById('chatbot-input');
  const text = input.value.trim();
  if (!text || isTyping) return;
  
  isTyping = true;
  addMessage(text, 'user');
  input.value = '';
  
  const typingDiv = document.createElement('div');
  typingDiv.className = 'chat-message bot';
  typingDiv.innerHTML = '<span class="typing-dots"><span>.</span><span>.</span><span>.</span></span>';
  typingDiv.id = 'typing-indicator';
  document.getElementById('chatbot-messages').appendChild(typingDiv);
  
  const response = await sendToHuggingFace(text);
  
  document.getElementById('typing-indicator')?.remove();
  addMessage(response, 'bot');
  isTyping = false;
}

function toggleChatbot() {
  const container = document.getElementById('chatbot-container');
  const isOpen = container.style.display === 'flex';
  container.style.display = isOpen ? 'none' : 'flex';
  
  if (!isOpen && document.getElementById('chatbot-messages').children.length === 0) {
    addMessage("Hi! I'm Shivam's AI assistant. Ask me anything about his AI/GenAI skills, experience, or projects!", 'bot');
  }
}

function quickQuestion(q) {
  document.getElementById('chatbot-input').value = q;
  sendMessage();
}

document.addEventListener('DOMContentLoaded', () => {
  const chatInput = document.getElementById('chatbot-input');
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }
});
