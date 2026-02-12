// Hugging Face Chatbot
const HF_API_KEY = ''; // API calls will use fallback responses

const portfolioContext = `You are Shivam Kumar's AI assistant. Answer questions about him professionally and comprehensively.

PROFESSIONAL SUMMARY:
AI Developer with 3+ years of experience in Python, data engineering, and analytics, currently building Generative AI solutions using LLM frameworks and evaluation tools. Developed RAG-based chatbot systems and implemented LLM evaluation pipelines using DeepEval for response quality benchmarking. Strong foundation in traditional machine learning (classification, regression, clustering) and data modeling using SQL. Experienced in deploying scalable backend services on Azure Cloud.

CONTACT:
Name: Shivam Kumar
Location: Delhi, India
Phone: +91 7979779685
Email: shivamkumar797977@gmail.com
LinkedIn: https://www.linkedin.com/in/shivamsavarn/
Portfolio: https://shivamsavarn.netlify.app

EXPERIENCE:
Senior System Associate – Infosys Ltd. (Oct 2022 – Present)
- Engineered and enhanced scalable Python-based backend APIs supporting data-driven and AI integrated workflows
- Migrated legacy systems to Azure cloud-native architecture, deploying containerized services via Azure Container Apps
- Designed and optimized SQL data pipelines to transform large-scale datasets (1M+ rows) into AI-ready structured formats
- Built automated data preprocessing and feature engineering pipelines using Python (Pandas, NumPy)
- Developed modular RESTful APIs enabling system integration and scalable service orchestration
- Implemented structured monitoring and logging solutions, improving system reliability and performance

EDUCATION:
- Executive MBA (Data Science) – IIT Patna (Expected Dec 2026)
- Master of Computer Applications – Chandigarh University, Mohali (July 2024)
- Bachelor of Computer Applications – SOA University, Odisha (June 2022)

TECHNICAL EXPERTISE:

Python:
- Built backend REST APIs and modular services
- Developed automation scripts for data preprocessing and ETL
- Implemented LLM evaluation workflows using DeepEval

Generative AI & LLMs:
- Developed AI chatbot using Retrieval-Augmented Generation (RAG)
- Designed prompt engineering strategies for contextual accuracy
- Evaluated LLM outputs using DeepEval (faithfulness, relevancy, hallucination checks)
- Worked with vector embeddings and semantic search

Machine Learning & Predictive Modeling:
- Implemented classification and regression models using Scikit-learn
- Applied clustering (K-Means) for data segmentation
- Performed feature engineering and model evaluation

SQL & Data Modeling:
- Processed and transformed 1M+ row datasets using complex joins & aggregations
- Designed optimized queries for analytical and AI-ready datasets
- Built structured data transformation pipelines

Cloud & Deployment:
- Deployed Python backend APIs to Azure Container Apps
- Familiar with Azure fundamentals, cloud-native migration, and scalable services

APIs & DevOps:
- Developed RESTful APIs for AI and backend services
- Used Git for version control and collaborative development
- Familiar with CI/CD workflows

PROJECTS:

1. AI Portfolio Chatbot (RAG-Based System)
- Built an AI chatbot integrated into personal portfolio website to answer questions about experience, skills, and projects
- Implemented Retrieval-Augmented Generation (RAG) using embeddings and vector search
- Designed prompt templates to reduce hallucination and improve contextual responses
- Integrated REST APIs for dynamic query handling
- Deployed solution using cloud-ready architecture
Tech: Python, LLM APIs, RAG, Vector Embeddings, Prompt Engineering, REST APIs

2. LLM Evaluation Framework using DeepEval
- Designed automated LLM evaluation pipelines using DeepEval to measure faithfulness, relevancy, and hallucination metrics
- Created structured benchmarking test cases to compare multiple model outputs
- Improved prompt reliability using systematic evaluation feedback loops
Tech: Python, DeepEval, LLM Testing, AI Evaluation

3. Multi-Agent Workflow Prototype (LangGraph)
- Prototyped multi-step LLM workflow using LangGraph to orchestrate task-specific agents for query understanding and response generation
- Designed agent-based logic for structured reasoning and response refinement
- Explored agent orchestration concepts aligned with multi-agent AI architectures
Tech: Python, LangGraph, LLM APIs

ACHIEVEMENTS:
- Infosys Rise Insta Award: Recognized for delivering accurate, actionable insights through SQL/Python analysis and Power BI reporting

CERTIFICATIONS:
- Google Data Analytics Professional Certificate - Google
- DP-900: Azure Data Fundamentals - Microsoft
- AI-900: Azure AI Fundamentals - Microsoft
- Google Cloud Certified Cloud Digital Leader - Google
- Infosys Certified Generative AI Professional - Infosys

LANGUAGES:
- English (Fluent)
- Hindi (Native)

Answer any questions about Shivam's background, skills, experience, projects, education, certifications, or achievements in detail.`;

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
    return "Hello! 👋 I'm Shivam's AI assistant. I can answer detailed questions about his AI/GenAI expertise, work experience at Infosys, projects (RAG chatbot, LLM evaluation, multi-agent systems), education from IIT Patna, certifications, or how to reach him. What would you like to know?";
  }
  if (lower.includes('how are you') || lower.includes('how r u')) {
    return "I'm doing great, thanks for asking! I'm here to help you learn about Shivam Kumar - an AI Developer with 3+ years of experience specializing in Generative AI, LLMs, RAG systems, and Python development. Ask me anything!";
  }
  
  // Detailed Skills
  if (lower.includes('skill')) {
    return "Shivam's comprehensive skill set:\n\n🤖 AI & GenAI:\n• LLMs, RAG Systems, Prompt Engineering\n• Vector Embeddings, Semantic Search\n• DeepEval (LLM evaluation)\n• LangGraph (Multi-agent orchestration)\n\n💻 Python Development:\n• Backend REST APIs, FastAPI\n• Pandas, NumPy for data processing\n• Scikit-learn for ML models\n• Automation & ETL pipelines\n\n🧠 Machine Learning:\n• Classification & Regression models\n• Clustering (K-Means)\n• Feature Engineering\n• Model Evaluation\n\n🗄️ Data Engineering:\n• SQL (1M+ row datasets)\n• Complex joins & aggregations\n• Data transformation pipelines\n• AI-ready data modeling\n\n☁️ Cloud & DevOps:\n• Azure Container Apps\n• Docker containerization\n• Git version control\n• CI/CD workflows";
  }
  
  // Detailed Experience
  if (lower.includes('experience') || lower.includes('work') || lower.includes('job') || lower.includes('infosys')) {
    return "Shivam's Professional Experience:\n\n📍 Senior System Associate at Infosys Ltd.\n📅 Oct 2022 - Present (3+ years)\n\nKey Responsibilities:\n• Engineers scalable Python backend APIs for AI-integrated workflows\n• Migrates legacy systems to Azure cloud-native architecture\n• Deploys containerized services via Azure Container Apps\n• Designs SQL pipelines transforming 1M+ row datasets into AI-ready formats\n• Builds automated data preprocessing & feature engineering pipelines\n• Develops modular RESTful APIs for system integration\n• Implements monitoring & logging solutions for system reliability\n\n🏆 Achievement: Received Infosys Rise Insta Award for delivering accurate insights through SQL/Python analysis and Power BI reporting";
  }
  
  // Detailed Education
  if (lower.includes('education') || lower.includes('degree') || lower.includes('study') || lower.includes('iit') || lower.includes('mba')) {
    return "Shivam's Educational Background:\n\n🎓 Executive MBA (Data Science)\nIIT Patna | Expected Dec 2026\nFocus: Advanced AI, Data Science, Business Analytics\n\n🎓 Master of Computer Applications (MCA)\nChandigarh University, Mohali | July 2024\nFocus: Software Development, Algorithms, Database Systems\n\n🎓 Bachelor of Computer Applications (BCA)\nSOA University, Odisha | June 2022\nFocus: Programming, Web Development, Computer Fundamentals\n\nContinuously upgrading skills with cutting-edge AI and Data Science education!";
  }
  
  // Detailed Projects
  if (lower.includes('project') || lower.includes('rag') || lower.includes('chatbot') || lower.includes('deepeval') || lower.includes('langgraph')) {
    return "Shivam's AI Projects Portfolio:\n\n1️⃣ AI Portfolio Chatbot (RAG-Based System)\n• Built AI chatbot for portfolio website using Retrieval-Augmented Generation\n• Implemented vector embeddings & semantic search\n• Designed prompt templates to reduce hallucination\n• Integrated REST APIs for dynamic queries\n• Cloud-ready deployment architecture\nTech: Python, LLM APIs, RAG, Vector Embeddings, Prompt Engineering\n\n2️⃣ LLM Evaluation Framework (DeepEval)\n• Automated LLM evaluation pipelines\n• Measures faithfulness, relevancy, hallucination metrics\n• Structured benchmarking test cases\n• Systematic evaluation feedback loops\nTech: Python, DeepEval, LLM Testing, AI Evaluation\n\n3️⃣ Multi-Agent Workflow (LangGraph)\n• Multi-step LLM workflow orchestration\n• Task-specific agents for query understanding\n• Agent-based logic for structured reasoning\n• Response refinement & generation\nTech: Python, LangGraph, LLM APIs, Agent Orchestration";
  }
  
  // Contact
  if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('reach') || lower.includes('hire') || lower.includes('linkedin')) {
    return "📞 Contact Shivam Kumar:\n\n📧 Email: shivamkumar797977@gmail.com\n📱 Phone: +91 7979779685\n📍 Location: Delhi, India\n💼 LinkedIn: linkedin.com/in/shivamsavarn\n🌐 Portfolio: shivamsavarn.netlify.app\n\nShivam is open to new opportunities in AI/ML, Python Development, and Data Engineering roles. Feel free to reach out!";
  }
  
  // Certifications
  if (lower.includes('certification') || lower.includes('certified') || lower.includes('certificate')) {
    return "Shivam's Professional Certifications:\n\n🏆 Google Data Analytics Professional Certificate\n   Issued by: Google\n   Focus: Data analysis, visualization, SQL\n\n🏆 DP-900: Azure Data Fundamentals\n   Issued by: Microsoft\n   Focus: Core data concepts, Azure data services\n\n🏆 AI-900: Azure AI Fundamentals\n   Issued by: Microsoft\n   Focus: AI workloads, ML principles\n\n🏆 Google Cloud Certified Cloud Digital Leader\n   Issued by: Google\n   Focus: Cloud concepts, Google Cloud services\n\n🏆 Infosys Certified Generative AI Professional\n   Issued by: Infosys\n   Focus: GenAI, LLMs, prompt engineering\n\nThese certifications validate expertise in AI, data, and cloud technologies!";
  }
  
  // Achievements
  if (lower.includes('achievement') || lower.includes('award') || lower.includes('recognition')) {
    return "Shivam's Achievements & Recognition:\n\n🏆 Infosys Rise Insta Award\nRecognized for delivering accurate, actionable insights through SQL/Python analysis and Power BI reporting. This award acknowledges exceptional performance in data-driven decision making and technical excellence.";
  }
  
  // Languages
  if (lower.includes('language') || lower.includes('speak')) {
    return "Languages Shivam speaks:\n\n🗣️ English - Fluent (Professional working proficiency)\n🗣️ Hindi - Native (Mother tongue)\n\nComfortable communicating in both languages for professional and personal interactions.";
  }
  
  // Machine Learning specific
  if (lower.includes('machine learning') || lower.includes('ml ') || lower.includes('model')) {
    return "Shivam's Machine Learning Expertise:\n\n📊 Classification Models:\n• Implemented using Scikit-learn\n• Binary and multi-class classification\n\n📈 Regression Models:\n• Linear and non-linear regression\n• Predictive modeling\n\n🎯 Clustering:\n• K-Means clustering for data segmentation\n• Unsupervised learning techniques\n\n🔧 Feature Engineering:\n• Data preprocessing and transformation\n• Feature selection and extraction\n\n✅ Model Evaluation:\n• Performance metrics and validation\n• Cross-validation techniques";
  }
  
  // SQL/Data specific
  if (lower.includes('sql') || lower.includes('data') || lower.includes('database')) {
    return "Shivam's SQL & Data Engineering Skills:\n\n💾 Large-Scale Data Processing:\n• Processed 1M+ row datasets\n• Complex joins & aggregations\n• Query optimization\n\n🔄 Data Transformation:\n• ETL pipeline development\n• Data cleaning and preprocessing\n• AI-ready data structuring\n\n📐 Data Modeling:\n• Designed optimized queries\n• Analytical data architectures\n• Structured data pipelines\n\n🛠️ Tools & Technologies:\n• SQL for data manipulation\n• Python (Pandas, NumPy) for processing\n• Automated data workflows";
  }
  
  // Azure/Cloud specific
  if (lower.includes('azure') || lower.includes('cloud')) {
    return "Shivam's Cloud & Azure Expertise:\n\n☁️ Azure Services:\n• Azure Container Apps for deployment\n• Cloud-native architecture migration\n• Containerized service deployment\n\n🐳 Docker & Containerization:\n• Container orchestration\n• Microservices architecture\n\n🚀 Deployment & DevOps:\n• CI/CD workflows\n• Git version control\n• Scalable service deployment\n\n📦 Migration Experience:\n• Legacy system to cloud migration\n• Windows to cloud-native environments\n• Azure fundamentals certified";
  }
  
  // Default
  return "I'm Shivam's comprehensive AI assistant! I can provide detailed information about:\n\n• 🤖 AI & GenAI Skills (LLMs, RAG, DeepEval, LangGraph)\n• 💼 Work Experience at Infosys (3+ years)\n• 🚀 AI Projects (Chatbot, LLM Evaluation, Multi-Agent)\n• 🎓 Education (IIT Patna MBA, MCA, BCA)\n• 🏆 Certifications (Google, Microsoft, Infosys)\n• 🧠 Machine Learning & Data Engineering\n• ☁️ Cloud & Azure Expertise\n• 📞 Contact Information\n\nAsk me anything specific!";
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
