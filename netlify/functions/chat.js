exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { message } = JSON.parse(event.body);
  const HF_API_KEY = process.env.HF_API_KEY || '';

  const portfolioContext = `You are Shivam Kumar's AI assistant. Answer questions about him professionally.

ABOUT: Shivam Kumar - Data Analyst | Python Developer from Delhi, India
Email: shivamkumar797977@gmail.com | Phone: +91 7979779685

EXPERIENCE: Systems Associate (Nov 2022-Present) - Python backend APIs, Power BI dashboards, Splunk monitoring

EDUCATION: Executive MBA (IIT Patna 2027), MCA (Chandigarh 2024), BCA (SOA 2022)

SKILLS: Power BI, SQL, Python, FastAPI, Azure, Docker, React, LLMs

CERTIFICATIONS: PL-300, DP-900, AI-900, AZ-900, Google Cloud Digital Leader

PROJECTS: Power BI Dashboard, Python API Framework, Splunk Monitoring System

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
  if (lower.match(/^(hi|hello|hey)/)) return "Hello! 👋 I'm Shivam's AI assistant. What would you like to know?";
  if (lower.includes('skill')) return "Shivam's expertise: Power BI, SQL, Python, FastAPI, Azure, Docker, React, and LLMs!";
  if (lower.includes('experience')) return "Systems Associate since Nov 2022 - Python APIs, Power BI dashboards, Splunk monitoring.";
  if (lower.includes('contact')) return "📧 shivamkumar797977@gmail.com | 📱 +91 7979779685";
  return "I can tell you about Shivam's skills, experience, projects, or contact info!";
}
