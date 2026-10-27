// Project data repository for Sreenivasulu N - AI & ML Engineer
// Users can easily add or update projects here.

const portfolioProjects = [
  {
    id: "database-chat-mcp",
    title: "Database Chat | MCP-Based AI Database Assistant",
    category: "agentic",
    categoryLabel: "Agentic AI & MCP",
    badge: "Featured Project",
    tagline: "Natural Language to SQL Assistant with Model Context Protocol (MCP) and LangGraph.",
    description: "An enterprise AI assistant that enables natural language conversational querying over PostgreSQL databases. Implements Anthropic's Model Context Protocol (MCP) to provide safe, isolated database schema exploration, dialect-specific query generation, self-correcting query execution, and conversational insights synthesis.",
    highlights: [
      "Integrated Model Context Protocol (MCP) server for secure database introspection and schema isolation.",
      "Utilized LangGraph state machines for multi-turn validation, syntax self-correction, and guardrails against harmful mutations.",
      "Engineered automated schema indexing and embedding retrieval for massive multi-table enterprise databases.",
      "Built low-latency FastAPI streaming backend with human-in-the-loop confirmation for write-sensitive operations."
    ],
    technologies: ["Model Context Protocol (MCP)", "LangGraph", "LangChain", "Python", "FastAPI", "PostgreSQL", "SQL", "LLMs"],
    metrics: "Sub-second schema lookup & 96% first-attempt SQL accuracy",
    githubUrl: "https://github.com/SreenivasTech-AI",
    demoUrl: "#contact",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    architecture: `[User Query] ──> [FastAPI Backend] ──> [LangGraph Agent]
       │
       ▼
 [MCP Database Protocol] ──> [Schema Catalog & Embeddings]
       │
       ▼
 [Safe SQL Generator] ──> [Validation Guardrails] ──> [PostgreSQL DB]
       │
       ▼
 [Insight Synthesis & Table Markdown Streaming]`
  },
  {
    id: "medical-doc-intelligence",
    title: "MedDoc AI: Medical Document Intelligence & Clinical Parser",
    category: "genai",
    categoryLabel: "Generative AI & VLMs",
    badge: "Production System",
    tagline: "End-to-end multimodal pipeline for processing clinical reports and imaging documents.",
    description: "Production-grade AI pipeline designed for healthcare and clinical environments. Processes unstructured PDFs, clinical scans, and laboratory reports using OCR, Vision Language Models (VLMs), and LLMs to extract patient demographics, clinical diagnoses, and structured FHIR summaries.",
    highlights: [
      "Engineered high-accuracy document layout analysis and segmentation pipeline for multi-exam clinical reports.",
      "Employed Vision-Language Models (VLMs) and LLMs for contextual medical entity extraction and summarization.",
      "Developed semantic search and fuzzy term matching against standard medical ontologies (ICD-10, SNOMED).",
      "Deployed resilient, asynchronous FastAPI endpoints handling high document throughput with robust error recovery."
    ],
    technologies: ["Python", "FastAPI", "PyTorch", "VLMs", "LLMs", "Transformers", "OCR", "Semantic Search", "PostgreSQL"],
    metrics: "98.4% clinical entity extraction accuracy across diverse document layouts",
    githubUrl: "https://github.com/SreenivasTech-AI",
    demoUrl: "#contact",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    architecture: `[Clinical PDF / Scans] ──> [OCR & Layout Detection]
       │
       ▼
 [Vision-Language Model (VLM)] ──> [Document Segmentation]
       │
       ▼
 [Prompted LLM Extraction] ──> [Ontology Semantic Search (Embeddings)]
       │
       ▼
 [FastAPI REST Microservice] ──> [FHIR / Structured JSON Output]`
  },
  {
    id: "agentic-rag-engine",
    title: "Multi-Agent Knowledge RAG & Semantic Retrieval Engine",
    category: "agentic",
    categoryLabel: "Agentic AI & RAG",
    badge: "Open Source",
    tagline: "Autonomous multi-agent research and retrieval system with hybrid vector search.",
    description: "Advanced Retrieval-Augmented Generation (RAG) system utilizing LangGraph to coordinate specialized sub-agents: Query Decomposition Agent, Dense/Sparse Hybrid Retrieval Agent, Hallucination Grader, and Citation-Backed Synthesis Agent.",
    highlights: [
      "Built hybrid retrieval combining dense vector embeddings with BM25 lexical search and reciprocal rank fusion.",
      "Implemented self-reflective RAG with automated document relevance scoring and hallucination detection.",
      "Integrated persistent state management and streaming responses via modern asynchronous Python.",
      "Added support for domain-specific abbreviation expansion and context-aware reranking."
    ],
    technologies: ["LangGraph", "LangChain", "RAG", "Python", "Vector DB", "Embeddings", "Hugging Face", "FastAPI"],
    metrics: "Reduced hallucinations by 74% compared to baseline naive RAG",
    githubUrl: "https://github.com/SreenivasTech-AI",
    demoUrl: "#contact",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    architecture: `[Complex Query] ──> [Query Decomposer] ──> [Hybrid Search (Dense + BM25)]
       │
       ▼
 [Reranker & Relevance Filter] ──> [Hallucination Grader]
       │
       ▼
 [LangGraph Synthesis Agent] ──> [Streaming Response + Verifiable Citations]`
  },
  {
    id: "vision-chest-xray-classifier",
    title: "Clinical Vision Transformer & Anomaly Localization",
    category: "vision",
    categoryLabel: "Computer Vision & Deep Learning",
    badge: "Deep Learning",
    tagline: "Vision Transformer pipeline for pathological anomaly detection in medical imaging.",
    description: "Deep learning system utilizing PyTorch and Vision Transformers (ViT) fine-tuned on clinical imaging datasets. Provides automated pathology classification, Grad-CAM attention heatmaps for explainability, and report snippet generation.",
    highlights: [
      "Fine-tuned vision backbone using PyTorch and Hugging Face Transformers for multi-label classification.",
      "Generated Grad-CAM attention maps to provide radiologists with transparent spatial attribution of model predictions.",
      "Integrated data augmentation, class imbalance handling, and comprehensive exploratory data analysis (EDA).",
      "Containerized model inference into a lightweight FastAPI service with ONNX runtime acceleration."
    ],
    technologies: ["PyTorch", "Computer Vision", "Transformers", "Deep Learning", "NumPy", "EDA", "FastAPI"],
    metrics: "0.93 AUC-ROC with real-time explainability overlays",
    githubUrl: "https://github.com/SreenivasTech-AI",
    demoUrl: "#contact",
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80",
    architecture: `[DICOM / Medical Image] ──> [Pre-processing & Normalization]
       │
       ▼
 [Vision Transformer Backbone] ──> [Multi-Label Pathology Head]
       │
       ▼
 [Grad-CAM Visualizer] ──> [Explainable Diagnostic Heatmap & Confidence Score]`
  }
];
