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
let recognition = null;
let synthesis = window.speechSynthesis;
let isListening = false;
let isSpeaking = false;
let lastInputWasVoice = false; // Track if last input was voice

// Initialize Speech Recognition
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';
  
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById('chatbot-input').value = transcript;
    lastInputWasVoice = true; // Mark that voice was used
    sendMessage();
  };
  
  recognition.onend = () => {
    isListening = false;
    updateVoiceButton();
  };
  
  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    isListening = false;
    updateVoiceButton();
  };
}

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
    return "Hello! I'm Shivam Kumar, an AI Developer. I can tell you about my AI/GenAI expertise, work experience at Infosys, projects like RAG chatbot and LLM evaluation, my education from IIT Patna, certifications, or how to reach me. What would you like to know?";
  }
  if (lower.includes('how are you') || lower.includes('how r u')) {
    return "I'm doing great, thanks for asking! I'm Shivam Kumar, an AI Developer with 3+ years of experience specializing in Generative AI, LLMs, RAG systems, and Python development. Ask me anything about my work!";
  }
  
  // Detailed Skills
  if (lower.includes('skill')) {
    return "My comprehensive skill set includes:\n\nAI & GenAI: I work with LLMs, RAG Systems, Prompt Engineering, Vector Embeddings, Semantic Search, DeepEval for LLM evaluation, and LangGraph for multi-agent orchestration.\n\nPython Development: I build backend REST APIs with FastAPI, process data using Pandas and NumPy, create ML models with Scikit-learn, and develop automation and ETL pipelines.\n\nMachine Learning: I implement Classification and Regression models, use K-Means Clustering, perform Feature Engineering, and conduct Model Evaluation.\n\nData Engineering: I process datasets with over 1 million rows using SQL, handle complex joins and aggregations, build data transformation pipelines, and create AI-ready data models.\n\nCloud & DevOps: I deploy applications on Azure Container Apps, use Docker for containerization, manage code with Git, and implement CI/CD workflows.";
  }
  
  // Detailed Experience
  if (lower.includes('experience') || lower.includes('work') || lower.includes('job') || lower.includes('infosys')) {
    return "I'm currently working as a Senior System Associate at Infosys Limited since October 2022. That's over 3 years now.\n\nIn my role, I engineer scalable Python backend APIs for AI-integrated workflows, migrate legacy systems to Azure cloud-native architecture, and deploy containerized services via Azure Container Apps.\n\nI also design SQL pipelines that transform datasets with over 1 million rows into AI-ready formats, build automated data preprocessing and feature engineering pipelines, develop modular RESTful APIs for system integration, and implement monitoring and logging solutions for system reliability.\n\nI'm proud to have received the Infosys Rise Insta Award for delivering accurate insights through SQL and Python analysis and Power BI reporting.";
  }
  
  // Detailed Education
  if (lower.includes('education') || lower.includes('degree') || lower.includes('study') || lower.includes('iit') || lower.includes('mba')) {
    return "I'm currently pursuing an Executive MBA in Data Science from IIT Patna, expected to complete in December 2026. The program focuses on Advanced AI, Data Science, and Business Analytics.\n\nI completed my Master of Computer Applications from Chandigarh University in Mohali in July 2024, where I focused on Software Development, Algorithms, and Database Systems.\n\nI also hold a Bachelor of Computer Applications from SOA University in Odisha, which I completed in June 2022. That program covered Programming, Web Development, and Computer Fundamentals.\n\nI'm continuously upgrading my skills with cutting-edge AI and Data Science education.";
  }
  
  // Detailed Projects
  if (lower.includes('project') || lower.includes('rag') || lower.includes('chatbot') || lower.includes('deepeval') || lower.includes('langgraph')) {
    return "I've worked on several exciting AI projects.\n\nFirst, I built an AI Portfolio Chatbot using RAG, which is a Retrieval-Augmented Generation based system. I integrated it into my portfolio website to answer questions about my experience, skills, and projects. I implemented vector embeddings and semantic search, designed prompt templates to reduce hallucination, integrated REST APIs for dynamic queries, and deployed it using cloud-ready architecture. I used Python, LLM APIs, RAG, Vector Embeddings, and Prompt Engineering.\n\nSecond, I created an LLM Evaluation Framework using DeepEval. I designed automated pipelines to measure faithfulness, relevancy, and hallucination metrics. I created structured benchmarking test cases to compare multiple model outputs and improved prompt reliability using systematic evaluation feedback loops.\n\nThird, I prototyped a Multi-Agent Workflow using LangGraph. I orchestrated multi-step LLM workflows with task-specific agents for query understanding, designed agent-based logic for structured reasoning, and explored response refinement and generation. I used Python, LangGraph, and LLM APIs for agent orchestration.";
  }
  
  // Contact
  if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('reach') || lower.includes('hire') || lower.includes('linkedin')) {
    return "You can reach me at shivamkumar797977@gmail.com or call me at +91 7979779685. I'm based in Delhi, India. You can also connect with me on LinkedIn at linkedin.com/in/shivamsavarn or visit my portfolio at shivamsavarn.netlify.app. I'm open to new opportunities in AI, Machine Learning, Python Development, and Data Engineering roles. Feel free to reach out!";
  }
  
  // Certifications
  if (lower.includes('certification') || lower.includes('certified') || lower.includes('certificate')) {
    return "I hold several professional certifications.\n\nI have the Google Data Analytics Professional Certificate from Google, which focuses on data analysis, visualization, and SQL.\n\nI'm certified in DP-900 Azure Data Fundamentals from Microsoft, covering core data concepts and Azure data services.\n\nI also have AI-900 Azure AI Fundamentals from Microsoft, which covers AI workloads and machine learning principles.\n\nI'm a Google Cloud Certified Cloud Digital Leader, which validates my knowledge of cloud concepts and Google Cloud services.\n\nAnd I'm an Infosys Certified Generative AI Professional, which focuses on GenAI, LLMs, and prompt engineering.\n\nThese certifications validate my expertise in AI, data, and cloud technologies.";
  }
  
  // Achievements
  if (lower.includes('achievement') || lower.includes('award') || lower.includes('recognition')) {
    return "I received the Infosys Rise Insta Award, which recognized me for delivering accurate, actionable insights through SQL and Python analysis and Power BI reporting. This award acknowledges exceptional performance in data-driven decision making and technical excellence.";
  }
  
  // Languages
  if (lower.includes('language') || lower.includes('speak')) {
    return "I speak English fluently with professional working proficiency, and Hindi is my native language. I'm comfortable communicating in both languages for professional and personal interactions.";
  }
  
  // Machine Learning specific
  if (lower.includes('machine learning') || lower.includes('ml ') || lower.includes('model')) {
    return "My Machine Learning expertise includes several areas.\n\nFor Classification, I've implemented models using Scikit-learn for both binary and multi-class classification problems.\n\nFor Regression, I work with linear and non-linear regression for predictive modeling.\n\nI use K-Means clustering for data segmentation and other unsupervised learning techniques.\n\nI'm experienced in Feature Engineering, including data preprocessing, transformation, feature selection, and extraction.\n\nAnd for Model Evaluation, I use various performance metrics, validation techniques, and cross-validation.";
  }
  
  // SQL/Data specific
  if (lower.includes('sql') || lower.includes('data') || lower.includes('database')) {
    return "My SQL and Data Engineering skills are quite comprehensive.\n\nI've processed datasets with over 1 million rows, handling complex joins, aggregations, and query optimization.\n\nI develop ETL pipelines, perform data cleaning and preprocessing, and structure data to be AI-ready.\n\nI design optimized queries, create analytical data architectures, and build structured data pipelines.\n\nI use SQL for data manipulation, Python with Pandas and NumPy for processing, and create automated data workflows.";
  }
  
  // Azure/Cloud specific
  if (lower.includes('azure') || lower.includes('cloud')) {
    return "I have extensive experience with Cloud and Azure technologies.\n\nI work with Azure Container Apps for deployment, handle cloud-native architecture migration, and deploy containerized services.\n\nI use Docker for container orchestration and microservices architecture.\n\nI implement CI/CD workflows, use Git for version control, and handle scalable service deployment.\n\nI've migrated legacy systems to the cloud, moved applications from Windows to cloud-native environments, and I'm Azure fundamentals certified.";
  }
  
  // Who are you
  if (lower.includes('who are you') || lower.includes('introduce yourself')) {
    return "I'm Shivam Kumar, an AI Developer with over 3 years of experience in Python, data engineering, and analytics. I specialize in building Generative AI solutions using LLM frameworks. I've developed RAG-based chatbot systems and implemented LLM evaluation pipelines using DeepEval. I have a strong foundation in traditional machine learning and data modeling using SQL. Currently, I'm working as a Senior System Associate at Infosys and pursuing my Executive MBA in Data Science from IIT Patna.";
  }
  
  // Default
  return "I'm Shivam Kumar, an AI Developer! I can tell you about my AI and GenAI skills including LLMs, RAG, DeepEval, and LangGraph. I can share details about my work experience at Infosys over the past 3 years, my AI projects like the RAG-based chatbot and LLM evaluation framework, my education including my MBA from IIT Patna, my certifications from Google, Microsoft, and Infosys, my machine learning and data engineering expertise, my cloud and Azure experience, or how to contact me. What would you like to know?";
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
  
  // Add voice indicator for voice messages
  if (sender === 'user' && lastInputWasVoice) {
    msgDiv.innerHTML = `<span style="font-size:12px;opacity:0.7">🎤 </span>${text}`;
  } else {
    msgDiv.textContent = text;
  }
  
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
  
  // Auto-speak ONLY if voice input was used OR auto-speak is checked
  if (lastInputWasVoice || document.getElementById('auto-speak')?.checked) {
    speakText(response);
  }
  
  // Reset voice flag after response
  lastInputWasVoice = false;
  isTyping = false;
}

function startVoiceInput() {
  if (!recognition) {
    alert('Voice input is not supported in your browser. Please use Chrome or Edge.');
    return;
  }
  
  if (isListening) {
    recognition.stop();
    isListening = false;
  } else {
    recognition.start();
    isListening = true;
  }
  updateVoiceButton();
}

function speakText(text) {
  if (!synthesis) return;
  
  // Stop any ongoing speech
  synthesis.cancel();
  
  // Remove emojis and special characters for better speech
  const cleanText = text.replace(/[🤖💻🧠🗄️☁️📍📅🏆🎓📧📱📍💼🌐🏆🗣️📊📈🎯🔧✅💾🔄📐🛠️🐳🚀📦]/g, '')
                       .replace(/•/g, '')
                       .replace(/\n+/g, '. ');
  
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.volume = 1;
  
  utterance.onstart = () => {
    isSpeaking = true;
    updateSpeakerButton();
  };
  
  utterance.onend = () => {
    isSpeaking = false;
    updateSpeakerButton();
  };
  
  synthesis.speak(utterance);
}

function toggleSpeech() {
  if (isSpeaking) {
    synthesis.cancel();
    isSpeaking = false;
    updateSpeakerButton();
  } else {
    const messages = document.querySelectorAll('.chat-message.bot');
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1].textContent;
      speakText(lastMessage);
    }
  }
}

function updateVoiceButton() {
  const btn = document.getElementById('voice-btn');
  if (btn) {
    btn.innerHTML = isListening ? '🔴' : '🎤';
    btn.title = isListening ? 'Stop listening' : 'Start voice input';
  }
}

function updateSpeakerButton() {
  const btn = document.getElementById('speaker-btn');
  if (btn) {
    btn.innerHTML = isSpeaking ? '🔇' : '🔊';
    btn.title = isSpeaking ? 'Stop speaking' : 'Speak last message';
  }
}

function toggleChatbot() {
  const container = document.getElementById('chatbot-container');
  const isOpen = container.style.display === 'flex';
  container.style.display = isOpen ? 'none' : 'flex';
  
  if (!isOpen && document.getElementById('chatbot-messages').children.length === 0) {
    const welcomeMsg = "Hi! I'm Shivam Kumar, an AI Developer. Ask me anything about my AI/GenAI skills, experience, or projects!";
    addMessage(welcomeMsg, 'bot');
    if (document.getElementById('auto-speak')?.checked) {
      speakText(welcomeMsg);
    }
  }
  
  // Stop any ongoing speech when closing
  if (isOpen && synthesis) {
    synthesis.cancel();
    isSpeaking = false;
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
