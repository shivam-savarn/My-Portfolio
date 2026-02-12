exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { message } = JSON.parse(event.body);
  const HF_API_KEY = process.env.HF_API_KEY || '';

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
