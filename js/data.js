/**
 * PORTFOLIO DATA CONFIGURATION
 * Sreenivasulu N — AI & ML Engineer
 * Autonomous Agentic Systems | Model Context Protocol (MCP) | Generative AI
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Sreenivasulu N",
    role: "AI & ML Engineer",
    tagline: "Bridging foundational machine learning with cutting-edge Agentic AI, Model Context Protocol (MCP), and production multimodal pipelines.",
    shortSentence: "Designing resilient autonomous agents, MCP database protocols, and production-grade clinical document intelligence systems.",
    about: "I am an AI & ML Engineer with hands-on production experience architecting autonomous agentic workflows, Model Context Protocol (MCP) ecosystems, and multimodal document intelligence pipelines. Currently at B2B Software Technologies Ltd, I specialize in combining Large Language Models (LLMs), Vision-Language Models (VLMs), and LangGraph to transform unstructured clinical documents and enterprise databases into high-accuracy structured insights. My engineering approach prioritizes determinism, strict guardrails, and latency optimization—delivering measurable enterprise value through scalable, deployable AI architectures.",
    status: "Available for AI & ML Opportunities",
    location: "Hyderabad, India",
    phone: "+91 8555879693",
    email: "sreenivasulun2429@gmail.com",
    linkedin: "https://www.linkedin.com/in/sreenivasulu2429",
    github: "https://github.com/SreenivasTech-AI",
    resumeUrl: "#contact",
    stats: [
      { label: "Industry Experience", value: "1.5+", prefix: "", suffix: " Yrs" },
      { label: "B.Tech CSE Score", value: "80.27", prefix: "", suffix: "%" },
      { label: "Intermediate Score", value: "88.25", prefix: "", suffix: "%" },
      { label: "Production AI Accuracy", value: "98.4", prefix: "", suffix: "%" }
    ]
  },

  themes: [
    {
      id: "cyber-cyan",
      name: "Cyber Neon",
      primary: "#00f0ff",
      accent: "#8a2be2",
      bg: "#08090d",
      cardBg: "rgba(18, 22, 33, 0.75)"
    },
    {
      id: "matrix-emerald",
      name: "Matrix Emerald",
      primary: "#00ff88",
      accent: "#00e5ff",
      bg: "#040d08",
      cardBg: "rgba(10, 26, 18, 0.75)"
    },
    {
      id: "ultra-violet",
      name: "Electric Violet",
      primary: "#c084fc",
      accent: "#f43f5e",
      bg: "#0a0614",
      cardBg: "rgba(23, 14, 38, 0.75)"
    },
    {
      id: "solar-amber",
      name: "Solar Flare",
      primary: "#ffb703",
      accent: "#fb8500",
      bg: "#0d0a06",
      cardBg: "rgba(28, 20, 12, 0.75)"
    }
  ],

  experience: [
    {
      company: "B2B Software Technologies Ltd",
      employmentType: "Full-time",
      duration: "1 yr 6 mos total",
      location: "Hyderabad, Telangana, India · On-site",
      roles: [
        {
          title: "AI/ML Engineer",
          period: "Dec 2025 — Present · 11 mos",
          isCurrent: true,
          description: "Spearheading the design and production deployment of AI-powered document intelligence and clinical parser solutions.",
          bullets: [
            "Developed AI-powered medical document intelligence solutions for processing and understanding clinical and imaging reports.",
            "Built end-to-end document processing pipelines for PDF extraction, OCR, document classification, information extraction, and structured summarization.",
            "Implemented AI workflows to extract patient demographics, clinical information, report findings, and relevant medical entities from unstructured documents.",
            "Worked with Large Language Models (LLMs) and Vision Language Models (VLMs) for document understanding, structured information extraction, and medical report summarization.",
            "Designed domain-specific prompting and extraction workflows to improve the quality and consistency of AI-generated outputs.",
            "Built semantic search capabilities for medical terminology, abbreviations, and domain-specific information using embeddings, vector search, fuzzy matching, and medical vocabularies.",
            "Developed Python-based backend services and REST APIs using FastAPI for integrating AI pipelines with application interfaces.",
            "Worked on production improvements involving document segmentation, multi-exam handling, extraction reliability, summarization quality, and AI pipeline performance.",
            "Integrated OCR, PDF processing, NLP, LLM/VLM inference, retrieval, and structured output generation into practical AI workflows."
          ],
          technologies: ["Python", "FastAPI", "SQL", "PostgreSQL", "PyTorch", "Transformers", "Hugging Face", "LLMs", "VLMs", "RAG", "NLP", "Computer Vision", "OCR", "Semantic Search"]
        },
        {
          title: "Trainee",
          period: "May 2025 — Dec 2025 · 8 mos",
          isCurrent: false,
          description: "Built foundational machine learning and data engineering capabilities across exploratory data analysis (EDA), NumPy, Pandas, and model evaluations.",
          bullets: [
            "Executed deep exploratory data analysis (EDA), data cleaning, and statistical validation on complex multi-format datasets.",
            "Implemented NumPy and Pandas data processing pipelines optimizing vector operations and memory efficiency.",
            "Evaluated classification and regression models, conducting hyperparameter tuning and validation benchmarks."
          ],
          technologies: ["Python", "NumPy", "Pandas", "EDA", "Machine Learning", "Data Cleaning"]
        }
      ]
    }
  ],

  education: [
    {
      degree: "Bachelor of Technology in Computer Science and Engineering",
      institution: "G. Pullaiah College of Engineering and Technology",
      location: "Kurnool, Andhra Pradesh",
      period: "May 2020 — April 2024",
      grade: "Percentage: 80.27%",
      highlights: ["Data Structures & Algorithms", "Database Management Systems", "Artificial Intelligence & ML", "Operating Systems & Networking"]
    },
    {
      degree: "Board of Intermediate Education (MPC)",
      institution: "Sri Narayana Junior College",
      location: "Kurnool, Andhra Pradesh",
      period: "March 2018 — May 2020",
      grade: "Percentage: 88.25%",
      highlights: ["Mathematics", "Physics", "Chemistry", "Analytical & Problem Solving Focus"]
    }
  ],

  skills: {
    "Agentic AI & Core LLMs": [
      { name: "Model Context Protocol (MCP)", level: 96, category: "agentic" },
      { name: "LangGraph (Multi-Agent Swarms)", level: 95, category: "agentic" },
      { name: "LangChain & Tool Use", level: 94, category: "agentic" },
      { name: "Retrieval-Augmented Generation (RAG)", level: 95, category: "agentic" },
      { name: "Large Language Models (LLMs & VLMs)", level: 92, category: "agentic" }
    ],
    "Machine Learning & Deep Learning": [
      { name: "Deep Learning & Neural Networks", level: 92, category: "ml" },
      { name: "Machine Learning (Supervised & Unsupervised)", level: 94, category: "ml" },
      { name: "PyTorch & Hugging Face Transformers", level: 90, category: "ml" },
      { name: "Computer Vision & OCR Pipelines", level: 88, category: "ml" },
      { name: "Exploratory Data Analysis (EDA)", level: 95, category: "ml" }
    ],
    "Engineering & Backend Infrastructure": [
      { name: "Python (Programming Language)", level: 96, category: "backend" },
      { name: "FastAPI & Asynchronous REST APIs", level: 92, category: "backend" },
      { name: "PostgreSQL & SQL Database Management", level: 90, category: "backend" },
      { name: "NumPy & Pandas (Data Processing)", level: 95, category: "backend" },
      { name: "Semantic Search, Vector DBs & Embeddings", level: 92, category: "backend" }
    ]
  },

  projects: [
    {
      id: "database-chat-mcp",
      title: "Database Chat | MCP-Based AI Database Assistant",
      category: "agentic",
      categoryLabel: "Agentic AI & MCP",
      tagline: "Natural Language to SQL Assistant with Model Context Protocol (MCP) and LangGraph.",
      description: "An enterprise AI assistant enabling conversational natural language querying over relational databases. Implements Model Context Protocol (MCP) for isolated schema inspection, dynamic query validation, syntax self-correction, and insight generation.",
      metrics: "Sub-second schema lookup · 96% first-attempt SQL accuracy",
      tags: ["Model Context Protocol (MCP)", "LangGraph", "LangChain", "Python", "FastAPI", "PostgreSQL", "SQL"],
      liveUrl: "https://github.com/SreenivasTech-AI",
      githubUrl: "https://github.com/SreenivasTech-AI",
      architecture: {
        summary: "Enterprise database assistant isolating schema metadata through MCP server protocols and LangGraph cyclical validation nodes.",
        frontend: "Modern chat client with streaming markdown table responses, query explanation cards, and write-operation approval modals.",
        backend: "FastAPI asynchronous service executing LangGraph multi-turn reflection graphs, safe query sanitization, and read-only connection pooling.",
        innovations: "Architected isolated MCP schema introspection to prevent table hallucination and guarantee zero SQL-injection vulnerability."
      }
    },
    {
      id: "medical-doc-intelligence",
      title: "MedDoc AI: Medical Document Intelligence & Clinical Parser",
      category: "genai",
      categoryLabel: "Clinical AI & VLMs",
      tagline: "End-to-end multimodal pipeline for processing clinical reports and imaging documents.",
      description: "Production-grade medical intelligence pipeline built to extract structured patient demographics, clinical diagnoses, and report summaries from unstructured PDFs, lab results, and diagnostic scans.",
      metrics: "98.4% clinical entity extraction accuracy · FHIR interoperable",
      tags: ["Python", "FastAPI", "PyTorch", "VLMs", "Transformers", "OCR", "Semantic Search", "PostgreSQL"],
      liveUrl: "https://github.com/SreenivasTech-AI",
      githubUrl: "https://github.com/SreenivasTech-AI",
      architecture: {
        summary: "Multimodal clinical document processing pipeline integrating OCR, vision models, and domain-specific ontology mapping.",
        frontend: "Review interface displaying bounding box attribution, confidence intervals, and one-click FHIR JSON downloads.",
        backend: "High-throughput asynchronous Python worker pool handling document segmentation, multi-exam chunking, and ICD-10 semantic retrieval.",
        innovations: "Engineered hybrid vector search + fuzzy matching over SNOMED and ICD-10 vocabularies to reliably parse non-standard physician abbreviations."
      }
    },
    {
      id: "agentic-rag-engine",
      title: "Multi-Agent Knowledge RAG & Semantic Retrieval Engine",
      category: "agentic",
      categoryLabel: "Agentic AI & RAG",
      tagline: "Autonomous multi-agent research and retrieval system with hybrid vector search.",
      description: "Advanced Retrieval-Augmented Generation (RAG) system utilizing LangGraph to coordinate specialized sub-agents: Query Decomposition, Dense/Sparse Hybrid Retrieval, Hallucination Graders, and Citation Synthesis.",
      metrics: "Reduced hallucinations by 74% compared to baseline naive RAG",
      tags: ["LangGraph", "LangChain", "RAG", "Python", "Vector DB", "Embeddings", "Hugging Face", "FastAPI"],
      liveUrl: "https://github.com/SreenivasTech-AI",
      githubUrl: "https://github.com/SreenivasTech-AI",
      architecture: {
        summary: "Self-correcting multi-agent knowledge retrieval system with automated document relevance validation.",
        frontend: "Research workstation showing provenance graph, cross-encoder scores, and verifiable citation footnotes.",
        backend: "Cyclic LangGraph state machine utilizing Reciprocal Rank Fusion (dense vector embeddings + BM25) and cross-encoder rerankers.",
        innovations: "Built an automated Hallucination Grader node that loops back to retrieve targeted missing context before synthesizing the final output."
      }
    },
    {
      id: "vision-chest-xray-classifier",
      title: "Clinical Vision Transformer & Anomaly Localization",
      category: "vision",
      categoryLabel: "Deep Learning & Vision",
      tagline: "Vision Transformer pipeline for pathological anomaly detection in medical imaging.",
      description: "Deep learning vision system utilizing Vision Transformers (ViT) fine-tuned for automated anomaly classification with real-time Grad-CAM attention heatmaps for physician explainability.",
      metrics: "0.93 AUC-ROC with real-time explainability overlays",
      tags: ["PyTorch", "Computer Vision", "Transformers", "Deep Learning", "NumPy", "EDA", "FastAPI"],
      liveUrl: "https://github.com/SreenivasTech-AI",
      githubUrl: "https://github.com/SreenivasTech-AI",
      architecture: {
        summary: "Explainable deep learning diagnostics pipeline generating real-time spatial attribution heatmaps for medical professionals.",
        frontend: "High-precision image canvas displaying multi-label predictions with togglable Grad-CAM thermal overlays.",
        backend: "PyTorch Vision Transformer backbone exported to ONNX Runtime for sub-50ms inference on CPU/GPU clusters.",
        innovations: "Implemented multi-label focal loss to counteract extreme class imbalance, improving rare pathology detection recall by 28%."
      }
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PORTFOLIO_DATA;
}
