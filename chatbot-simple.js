const chatbotData = {
  keywords: {
    greetings: ["hello", "hi", "hey"],
    about: ["about", "who", "tell me"],
    skills: ["skills", "expertise", "technologies"],
    python: ["python", "fastapi", "backend"],
    powerbi: ["power bi", "powerbi", "dashboard"],
    azure: ["azure", "cloud"],
    experience: ["experience", "work", "job"],
    education: ["education", "degree", "mba"],
    certifications: ["certification", "certified"],
    projects: ["project", "portfolio"],
    contact: ["contact", "email", "phone"],
    thanks: ["thank", "thanks"],
    goodbye: ["bye", "goodbye"]
  },
  responses: {
    greetings: "Hello! I'm Shivam Kumar's AI assistant. Ask me about his skills, experience, projects, or contact info!",
    about: "Shivam Kumar is a Data Analyst and Python Developer based in Delhi. He specializes in backend API frameworks, Power BI analytics, and cloud solutions. Currently pursuing Executive MBA from IIT Patna.",
    skills: "Shivam has expertise in:\n• Data Analytics: Power BI, SQL, Splunk\n• Backend: Python, FastAPI\n• Cloud: Azure, Docker\n• AI/ML: LLMs, GitHub Copilot\n\nWhich area interests you?",
    python: "Shivam is highly skilled in Python - FastAPI for backend, Pandas/NumPy for data analysis, and automation. He builds API frameworks and data processing solutions daily.",
    powerbi: "Shivam is a certified Power BI Data Analyst (PL-300). He creates interactive dashboards that transform raw data into insightful visual reports for KPIs and trends.",
    azure: "Shivam has 3 Azure certifications (AZ-900, DP-900, AI-900) and experience migrating applications to cloud-native environments using Docker and Azure services.",
    experience: "Shivam works as Systems Associate since Nov 2022, developing Python backend APIs, creating Power BI dashboards, and deploying Splunk monitoring systems. Recognized with awards for exceptional performance.",
    education: "Shivam holds MCA from Chandigarh University (2024) and BCA from SOA University (2022). Currently pursuing Executive MBA in Data Analytics from IIT Patna (expected 2027).",
    certifications: "Shivam has 5 certifications:\n• PL-300 Power BI Data Analyst\n• DP-900 Azure Data Fundamentals\n• AI-900 Azure AI Fundamentals\n• AZ-900 Azure Fundamentals\n• Google Cloud Digital Leader",
    projects: "Key projects:\n1. Power BI Analytics Dashboard - KPI monitoring\n2. Python API Framework - Cloud-native backend\n3. Splunk Monitoring System - Real-time alerts\n\nWhich interests you?",
    contact: "📧 Email: shivamkumar797977@gmail.com\n📱 Phone: +91 7979779685\n💼 LinkedIn: linkedin.com/in/shivamsavarn\n📍 Location: Delhi, India",
    thanks: "You're welcome! Feel free to reach out to Shivam directly at shivamkumar797977@gmail.com",
    goodbye: "Thanks for visiting! Connect with Shivam on LinkedIn or via email. Have a great day!",
    default: "I can help with questions about Shivam's skills, experience, projects, education, certifications, or contact info. What would you like to know?"
  }
};

let isOpen = false;
const messages = [];

function matchKeyword(input) {
  const text = input.toLowerCase();
  for (const [category, keywords] of Object.entries(chatbotData.keywords)) {
    if (keywords.some(kw => text.includes(kw))) return category;
  }
  return 'default';
}

function addMessage(text, sender) {
  messages.push({ text, sender });
  const messagesDiv = document.getElementById('chatbot-messages');
  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-message ${sender}`;
  msgDiv.textContent = text;
  messagesDiv.appendChild(msgDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById('chatbot-input');
  const text = input.value.trim();
  if (!text) return;
  
  addMessage(text, 'user');
  input.value = '';
  
  setTimeout(() => {
    const category = matchKeyword(text);
    addMessage(chatbotData.responses[category], 'bot');
  }, 500);
}

function toggleChatbot() {
  isOpen = !isOpen;
  const container = document.getElementById('chatbot-container');
  container.style.display = isOpen ? 'flex' : 'none';
  
  if (isOpen && messages.length === 0) {
    addMessage(chatbotData.responses.greetings, 'bot');
  }
}

function quickQuestion(q) {
  document.getElementById('chatbot-input').value = q;
  sendMessage();
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('chatbot-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
});
