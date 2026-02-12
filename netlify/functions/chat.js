exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { message } = JSON.parse(event.body);
  const HF_API_KEY = process.env.HF_API_KEY || '';

  const portfolioContext = `You are Shivam Kumar's AI assistant. Answer questions about him professionally.

ABOUT: Shivam Kumar - AI Developer | Python Developer from Delhi, India
Email: shivamkumar797977@gmail.com | Phone: +91 7979779685

EXPERIENCE: Senior System Associate at Infosys Ltd. (Oct 2022-Present) - Building Generative AI solutions, RAG-based chatbots, LLM evaluation pipelines, Python backend APIs, Azure cloud deployment

EDUCATION: Executive MBA Data Science (IIT Patna Dec 2026), MCA (Chandigarh 2024), BCA (SOA 2022)

SKILLS: Python, LLMs, RAG, Prompt Engineering, Vector Embeddings, DeepEval, LangGraph, Machine Learning, SQL, FastAPI, Azure, Docker

CERTIFICATIONS: Google Data Analytics Professional, DP-900, AI-900, Google Cloud Digital Leader, Infosys Certified Generative AI Professional

PROJECTS: AI Portfolio Chatbot (RAG-based), LLM Evaluation Framework (DeepEval), Multi-Agent Workflow (LangGraph)

Keep responses short and professional.`;

  const prompt = `<s>[INST] ${portfolioContext}

User Question: ${message}

Provide a helpful, conversational response about Shivam. Keep it natural and friendly. [/INST]`;

  try {
    const response = await fetch('https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 150,
          temperature: 0.7,
          top_p: 0.95,
          do_sample: true
        },
        options: {
          wait_for_model: true,
          use_cache: false
        }
      })
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    let botResponse = '';
    if (Array.isArray(data) && data[0]?.generated_text) {
      botResponse = data[0].generated_text.split('[/INST]').pop().trim();
    } else if (data.generated_text) {
      botResponse = data.generated_text.split('[/INST]').pop().trim();
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ response: botResponse || 'I can help with questions about Shivam!' })
    };
  } catch (error) {
    return {
      statusCode: 200,
      body: JSON.stringify({ response: generateFallback(message) })
    };
  }
};

function generateFallback(msg) {
  const lower = msg.toLowerCase();
  if (lower.match(/^(hi|hello|hey)/)) return "Hello! 👋 I'm Shivam's AI assistant. What would you like to know about his AI/GenAI expertise?";
  if (lower.includes('skill')) return "Shivam's expertise: Python, LLMs, RAG Systems, Prompt Engineering, Vector Embeddings, DeepEval, LangGraph, Machine Learning, SQL, FastAPI, Azure!";
  if (lower.includes('experience')) return "Senior System Associate at Infosys since Oct 2022 - Building GenAI solutions, RAG chatbots, LLM evaluation pipelines, Python APIs, Azure deployment.";
  if (lower.includes('project')) return "AI Projects: RAG-based Portfolio Chatbot, LLM Evaluation Framework (DeepEval), Multi-Agent Workflow (LangGraph).";
  if (lower.includes('contact')) return "📧 shivamkumar797977@gmail.com | 📱 +91 7979779685";
  return "I can tell you about Shivam's AI/GenAI skills, experience, projects, or contact info!";
}
