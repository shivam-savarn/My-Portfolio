// Hugging Face Chatbot
const HF_API_KEY = ''; // API calls will use fallback responses

const portfolioContext = `You are Shivam Kumar's AI assistant. Answer questions about him professionally.

ABOUT: Shivam Kumar - Data Analyst | Python Developer from Delhi, India
Email: shivamkumar797977@gmail.com | Phone: +91 7979779685

EXPERIENCE: Systems Associate (Nov 2022-Present) - Python backend APIs, Power BI dashboards, Splunk monitoring

EDUCATION: Executive MBA (IIT Patna 2027), MCA (Chandigarh 2024), BCA (SOA 2022)

SKILLS: Power BI, SQL, Python, FastAPI, Azure, Docker, React, LLMs

CERTIFICATIONS: PL-300, DP-900, AI-900, AZ-900, Google Cloud Digital Leader

PROJECTS: Power BI Dashboard, Python API Framework, Splunk Monitoring System

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
    return "Hello! 👋 I'm Shivam's AI assistant. I can tell you about his skills, experience, projects, education, or how to reach him. What would you like to know?";
  }
  if (lower.includes('how are you') || lower.includes('how r u')) {
    return "I'm doing great, thanks for asking! I'm here to help you learn about Shivam Kumar. He's a talented Data Analyst and Python Developer. What would you like to know about him?";
  }
  
  // Skills
  if (lower.includes('skill')) {
    return "Shivam's expertise spans multiple areas:\n\n📊 Data Analytics: Power BI, SQL\n💻 Development: Python, FastAPI, React\n☁️ Cloud & DevOps: Azure, Docker\n🤖 AI/ML: Working with LLMs\n\nHe combines technical skills with business intelligence to deliver impactful solutions!";
  }
  
  // Experience
  if (lower.includes('experience') || lower.includes('work') || lower.includes('job')) {
    return "Shivam has been a Systems Associate since November 2022, where he:\n\n• Develops Python backend APIs\n• Creates Power BI dashboards for data insights\n• Manages Splunk monitoring systems\n• Works on enterprise cloud solutions\n\nHe brings hands-on experience in both development and analytics!";
  }
  
  // Education
  if (lower.includes('education') || lower.includes('degree') || lower.includes('study')) {
    return "Shivam's educational journey:\n\n🎓 Executive MBA - IIT Patna (2027)\n🎓 MCA - Chandigarh University (2024)\n🎓 BCA - SOA University (2022)\n\nHe's continuously upgrading his skills with advanced education!";
  }
  
  // Projects
  if (lower.includes('project')) {
    return "Shivam has delivered impressive projects:\n\n1️⃣ Power BI Analytics Dashboard - Business intelligence with interactive visualizations\n2️⃣ Python API Framework - Cloud-native backend with FastAPI\n3️⃣ Splunk Monitoring System - Real-time log analysis and alerting\n\nEach project showcases his full-stack capabilities!";
  }
  
  // Contact
  if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('reach') || lower.includes('hire')) {
    return "📧 Email: shivamkumar797977@gmail.com\n📱 Phone: +91 7979779685\n📍 Location: Delhi, India\n💼 LinkedIn: linkedin.com/in/shivamsavarn\n\nFeel free to reach out - Shivam is open to new opportunities!";
  }
  
  // Certifications
  if (lower.includes('certification') || lower.includes('certified')) {
    return "Shivam holds impressive certifications:\n\n🏆 Microsoft: PL-300, DP-900, AI-900, AZ-900\n🏆 Google Cloud Digital Leader\n\nThese validate his expertise in data, AI, and cloud technologies!";
  }
  
  // Default
  return "I'm Shivam's AI assistant! I can share information about:\n\n• 💼 Skills & Expertise\n• 🚀 Work Experience\n• 🎓 Education\n• 📁 Projects\n• 🏆 Certifications\n• 📞 Contact Info\n\nWhat interests you?";
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
    addMessage("Hi! I'm Shivam's AI assistant. Ask me anything about his skills, experience, or projects!", 'bot');
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
