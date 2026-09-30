import resumeEn from "@/assets/resume-en.pdf.asset.json";
import resumePt from "@/assets/resume-pt.pdf.asset.json";

export const RESUME_EN_URL = resumeEn.url;
export const RESUME_PT_URL = resumePt.url;

export const LINKS = {
  github: "https://github.com/italolemosdefreitas",
  linkedin: "https://www.linkedin.com/in/italo-lemos-de-freitas/",
  whatsapp: "https://wa.me/5519983671358",
  email: "mailto:italo.lemosdf@hotmail.com",
  reservas: "https://reservasanhanguera.lovable.app/",
};

export type Lang = "pt" | "en";

export const content = {
  pt: {
    nav: {
      about: "Sobre",
      experience: "Experiência",
      projects: "Projetos",
      skills: "Competências",
      contact: "Contato",
    },
    hero: {
      badge: "Disponível para oportunidades",
      greeting: "Olá, eu sou",
      name: "Ítalo Lemos de Freitas",
      role: "Profissional de TI · Suporte N1/N3 · Automação & Dados",
      summary:
        "Profissional de TI com experiência em suporte técnico (N1/N3), infraestrutura de redes e desenvolvimento de automações. Graduando em Ciência da Computação, com destaque para um chatbot corporativo que processa 140–180 solicitações por mês.",
      ctaPrimary: "Solicitar orçamento",
      ctaSecondary: "Ver projetos",
      downloadPt: "Currículo (PT)",
      downloadEn: "Resume (EN)",
      location: "Piracicaba, SP — Brasil",
    },
    stats: [
      { value: "140–180", label: "solicitações/mês automatizadas" },
      { value: "5+", label: "anos de experiência em TI" },
      { value: "N1–N3", label: "níveis de suporte atendidos" },
      { value: "C2", label: "inglês (EF SET 72/100)" },
    ],
    about: {
      title: "Sobre mim",
      text: [
        "Atuo com suporte técnico, infraestrutura de redes e desenvolvimento de automações, unindo o lado operacional de TI com programação para resolver problemas reais.",
        "Na Cogna Educação/Anhanguera, desenvolvi e mantenho um chatbot corporativo (JavaScript/Node.js) integrado a Discord, WhatsApp e NocoDB que substituiu um processo manual de chamados — centralizando triagem de urgência e agendamentos.",
        "Também tenho experiência com análise de dados (Power BI, DAX, Excel avançado, VBA) e desenvolvimento front-end freelance com foco em UI/UX.",
      ],
    },
    experience: {
      title: "Experiência profissional",
      items: [
        {
          role: "Estagiário de TI",
          company: "Câmara Municipal de Piracicaba",
          period: "Dez 2025 — Presente",
          points: [
            "Média de 10 chamados técnicos por semana via GLPI/SAT, com foco em redes, hardware e impressoras.",
            "Manutenção, montagem e formatação de computadores; suporte preventivo e corretivo.",
          ],
        },
        {
          role: "Assistente de TI",
          company: "Cogna Educação / Anhanguera",
          period: "Set 2025 — Presente",
          points: [
            "Suporte técnico N1 e gerenciamento de chamados via ServiceNow para toda a unidade.",
            "Administração de rede e infraestrutura; cabeamento estruturado e suporte ao CPD.",
            "Desenvolvimento e manutenção de chatbot corporativo (Node.js) integrado a Discord, WhatsApp e NocoDB — 140–180 chamados/mês.",
          ],
        },
        {
          role: "Estagiário de TI",
          company: "Quark Medical",
          period: "Fev 2024 — Jan 2025",
          points: [
            "Manutenção independente de aplicativo Android em Java, com atualizações de compatibilidade e correção de bugs.",
            "Suporte técnico N1 e manutenção de infraestrutura.",
          ],
        },
        {
          role: "Desenvolvedor Front-end",
          company: "Freelancer",
          period: "Jan 2023 — Mar 2024",
          points: [
            "Interfaces responsivas (HTML, CSS, JavaScript) e sites WordPress com foco em UI/UX.",
            "Integração com banco de dados usando PHP e MySQL.",
          ],
        },
        {
          role: "Gestão em Análise de Dados",
          company: "F G de Freitas Consultoria Ltda",
          period: "Abr 2020 — Nov 2022",
          points: [
            "Análise de bancos de dados e indicadores estratégicos; dashboards em Power BI.",
            "Estruturação de planilhas financeiras avançadas em Excel.",
          ],
        },
      ],
    },
    projects: {
      title: "Projetos em destaque",
      items: [
        {
          title: "Chatbot Corporativo de Chamados",
          description:
            "Automação de chamados e agendamentos com JavaScript, Node.js, NocoDB, Discord e WhatsApp. Substituiu um fluxo manual (planilhas + WhatsApp), processando 140–180 solicitações por mês com triagem de urgência centralizada.",
          tags: ["Node.js", "JavaScript", "NocoDB", "WhatsApp API", "Discord"],
          link: null as string | null,
          linkLabel: null as string | null,
        },
        {
          title: "Sistema de Reservas — Anhanguera",
          description:
            "Site de reservas acadêmicas desenvolvido para a unidade, facilitando o agendamento de espaços e recursos pelos usuários.",
          tags: ["React", "TypeScript", "Lovable Cloud"],
          link: LINKS.reservas,
          linkLabel: "Visitar site",
        },
      ],
    },
    skills: {
      title: "Competências",
      groups: [
        {
          name: "Infraestrutura & Suporte",
          items: ["ServiceNow", "GLPI/SAT", "Windows Server", "TCP/IP", "DNS", "Cabeamento estruturado", "Hardware", "Suporte N1/N3"],
        },
        {
          name: "Desenvolvimento & Automação",
          items: ["JavaScript", "Node.js", "Java", "Python", "PHP", "HTML/CSS", "WordPress", "APIs REST", "Webhooks", "Docker"],
        },
        {
          name: "Dados & Bancos de Dados",
          items: ["SQL Server", "MySQL", "NoSQL", "NocoDB", "Power BI (DAX)", "Excel Avançado", "VBA", "Power Query", "SAP B1"],
        },
      ],
    },
    education: {
      title: "Formação & Certificações",
      degree: "Bacharelado em Ciência da Computação",
      school: "UNINTER — Centro Universitário Internacional",
      period: "Jan 2024 — Dez 2027",
      inProgress: "Em andamento",
      inProgressItems: ["ITIL 4 Foundation (previsão: Out/2026)", "CompTIA Network+ (previsão: Out/2026)"],
      certs: "Certificações",
      certItems: ["Power BI — Construindo Cálculos com DAX", "Estatística com Python", "Lógica de Programação com JavaScript"],
      langs: "Idiomas",
      langItems: ["Português (Nativo)", "Inglês C2 (EF SET 72/100)", "Espanhol (Básico)"],
    },
    contact: {
      title: "Vamos conversar?",
      text: "Interessado em um projeto, automação ou oportunidade de trabalho? Fale comigo pelo WhatsApp ou escaneie o QR code.",
      whatsappCta: "Chamar no WhatsApp",
      qrLabel: "Escaneie para abrir o WhatsApp",
      email: "italo.lemosdf@hotmail.com",
    },
    footer: "© 2026 Ítalo Lemos de Freitas — Piracicaba, SP",
  },
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
    },
    hero: {
      badge: "Open to opportunities",
      greeting: "Hi, I'm",
      name: "Ítalo Lemos de Freitas",
      role: "IT Professional · Tier 1/3 Support · Automation & Data",
      summary:
        "IT professional experienced in technical support (Tier 1/3), network infrastructure, and automation development. Computer Science undergraduate, highlighted by a corporate chatbot now handling 140–180 requests per month.",
      ctaPrimary: "Request a quote",
      ctaSecondary: "View projects",
      downloadPt: "Currículo (PT)",
      downloadEn: "Resume (EN)",
      location: "Piracicaba, SP — Brazil",
    },
    stats: [
      { value: "140–180", label: "automated requests/month" },
      { value: "5+", label: "years of IT experience" },
      { value: "T1–T3", label: "support tiers covered" },
      { value: "C2", label: "English (EF SET 72/100)" },
    ],
    about: {
      title: "About me",
      text: [
        "I work across technical support, network infrastructure, and automation development — combining hands-on IT operations with programming to solve real problems.",
        "At Cogna Educação/Anhanguera, I built and maintain a corporate chatbot (JavaScript/Node.js) integrated with Discord, WhatsApp, and NocoDB that replaced a manual ticketing process — centralizing urgency triage and scheduling.",
        "I also have experience in data analysis (Power BI, DAX, advanced Excel, VBA) and freelance front-end development focused on UI/UX.",
      ],
    },
    experience: {
      title: "Professional experience",
      items: [
        {
          role: "IT Intern",
          company: "Câmara Municipal de Piracicaba",
          period: "Dec 2025 — Present",
          points: [
            "Average of 10 technical tickets per week via GLPI/SAT, focused on networking, hardware, and printers.",
            "Computer maintenance, assembly, and formatting; preventive and corrective support.",
          ],
        },
        {
          role: "IT Assistant",
          company: "Cogna Educação / Anhanguera",
          period: "Sep 2025 — Present",
          points: [
            "Tier 1 technical support and ticket management via ServiceNow for the entire campus.",
            "Network and infrastructure administration; structured cabling and data center support.",
            "Development and maintenance of a corporate chatbot (Node.js) integrated with Discord, WhatsApp, and NocoDB — 140–180 tickets/month.",
          ],
        },
        {
          role: "IT Intern",
          company: "Quark Medical",
          period: "Feb 2024 — Jan 2025",
          points: [
            "Independent maintenance of an Android application in Java, including OS compatibility updates and bug fixes.",
            "Tier 1 technical support and infrastructure maintenance.",
          ],
        },
        {
          role: "Front-End Developer",
          company: "Freelancer",
          period: "Jan 2023 — Mar 2024",
          points: [
            "Responsive interfaces (HTML, CSS, JavaScript) and WordPress sites focused on UI/UX.",
            "Database integration using PHP and MySQL.",
          ],
        },
        {
          role: "Data Analysis Management",
          company: "F G de Freitas Consultoria Ltda",
          period: "Apr 2020 — Nov 2022",
          points: [
            "Database and strategic indicator analysis; Power BI dashboards.",
            "Advanced financial spreadsheets in Excel.",
          ],
        },
      ],
    },
    projects: {
      title: "Featured projects",
      items: [
        {
          title: "Corporate Ticketing Chatbot",
          description:
            "Ticket and scheduling automation built with JavaScript, Node.js, NocoDB, Discord, and WhatsApp. Replaced a manual workflow (spreadsheets + WhatsApp), now processing 140–180 requests per month with centralized urgency triage.",
          tags: ["Node.js", "JavaScript", "NocoDB", "WhatsApp API", "Discord"],
          link: null as string | null,
          linkLabel: null as string | null,
        },
        {
          title: "Academic Reservation System — Anhanguera",
          description:
            "Academic reservation website built for the campus, making it easy for users to book spaces and resources.",
          tags: ["React", "TypeScript", "Lovable Cloud"],
          link: LINKS.reservas,
          linkLabel: "Visit site",
        },
      ],
    },
    skills: {
      title: "Skills",
      groups: [
        {
          name: "Infrastructure & Support",
          items: ["ServiceNow", "GLPI/SAT", "Windows Server", "TCP/IP", "DNS", "Structured cabling", "Hardware", "Tier 1/3 support"],
        },
        {
          name: "Development & Automation",
          items: ["JavaScript", "Node.js", "Java", "Python", "PHP", "HTML/CSS", "WordPress", "REST APIs", "Webhooks", "Docker"],
        },
        {
          name: "Data & Databases",
          items: ["SQL Server", "MySQL", "NoSQL", "NocoDB", "Power BI (DAX)", "Advanced Excel", "VBA", "Power Query", "SAP B1"],
        },
      ],
    },
    education: {
      title: "Education & Certifications",
      degree: "Bachelor's Degree in Computer Science",
      school: "UNINTER — International University Center",
      period: "Jan 2024 — Dec 2027",
      inProgress: "In progress",
      inProgressItems: ["ITIL 4 Foundation (expected: Oct/2026)", "CompTIA Network+ (expected: Oct/2026)"],
      certs: "Certifications",
      certItems: ["Power BI — Building Calculations with DAX", "Statistics with Python", "Programming Logic with JavaScript"],
      langs: "Languages",
      langItems: ["Portuguese (Native)", "English C2 (EF SET 72/100)", "Spanish (Basic)"],
    },
    contact: {
      title: "Let's talk",
      text: "Interested in a project, automation, or job opportunity? Reach me on WhatsApp or scan the QR code.",
      whatsappCta: "Message on WhatsApp",
      qrLabel: "Scan to open WhatsApp",
      email: "italo.lemosdf@hotmail.com",
    },
    footer: "© 2026 Ítalo Lemos de Freitas — Piracicaba, SP",
  },
};
