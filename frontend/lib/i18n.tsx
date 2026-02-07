"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Language = "en" | "ru" | "kk";

type Translations = {
  [key: string]: {
    en: string;
    ru: string;
    kk: string;
  };
};

export const translations: Translations = {
  // Header
  "nav.projects": {
    en: "Projects",
    ru: "Проекты",
    kk: "Жобалар",
  },
  "nav.howItWorks": {
    en: "How It Works",
    ru: "Как это работает",
    kk: "Қалай жұмыс істейді",
  },
  "nav.features": {
    en: "Features",
    ru: "Возможности",
    kk: "Мүмкіндіктер",
  },
  "nav.about": {
    en: "About",
    ru: "О нас",
    kk: "Біз туралы",
  },
  "nav.login": {
    en: "Log in",
    ru: "Войти",
    kk: "Кіру",
  },
  "nav.startProject": {
    en: "Start a Project",
    ru: "Создать проект",
    kk: "Жоба бастау",
  },

  // Hero
  "hero.badge": {
    en: "Powered by Smart Contracts",
    ru: "На основе смарт-контрактов",
    kk: "Смарт-келісімшарттар негізінде",
  },
  "hero.title": {
    en: "Fund the Future with",
    ru: "Финансируй будущее с",
    kk: "Болашақты қаржыландыр",
  },
  "hero.blockchain": {
    en: "Blockchain",
    ru: "Блокчейн",
    kk: "Блокчейн",
  },
  "hero.description": {
    en: "The decentralized crowdfunding platform where transparency meets innovation. Back projects you believe in with complete trust and security.",
    ru: "Децентрализованная краудфандинговая платформа, где прозрачность встречается с инновациями. Поддерживайте проекты, в которые вы верите, с полным доверием и безопасностью.",
    kk: "Ашықтық пен инновация біріккен орталықсыздандырылған краудфандинг платформасы. Сенімділік пен қауіпсіздікпен сенетін жобаларды қолдаңыз.",
  },
  "hero.exploreProjects": {
    en: "Explore Projects",
    ru: "Смотреть проекты",
    kk: "Жобаларды қарау",
  },
  "hero.launchCampaign": {
    en: "Launch Campaign",
    ru: "Запустить кампанию",
    kk: "Науқан бастау",
  },
  "hero.transparent": {
    en: "Transparent",
    ru: "Прозрачность",
    kk: "Ашықтық",
  },
  "hero.totalFunded": {
    en: "Total Funded",
    ru: "Собрано средств",
    kk: "Жиналған қаражат",
  },
  "hero.backers": {
    en: "Backers",
    ru: "Спонсоров",
    kk: "Демеушілер",
  },

  // Stats
  "stats.totalFunded": {
    en: "Total Funded",
    ru: "Всего собрано",
    kk: "Барлығы жиналды",
  },
  "stats.projectsLaunched": {
    en: "Projects Launched",
    ru: "Запущено проектов",
    kk: "Іске қосылған жобалар",
  },
  "stats.activeBackers": {
    en: "Active Backers",
    ru: "Активных спонсоров",
    kk: "Белсенді демеушілер",
  },
  "stats.successRate": {
    en: "Success Rate",
    ru: "Успешность",
    kk: "Сәттілік деңгейі",
  },

  // Featured Projects
  "projects.title": {
    en: "Featured Projects",
    ru: "Избранные проекты",
    kk: "Таңдаулы жобалар",
  },
  "projects.description": {
    en: "Discover innovative projects building the decentralized future",
    ru: "Откройте для себя инновационные проекты, создающие децентрализованное будущее",
    kk: "Орталықсыздандырылған болашақты құратын инновациялық жобаларды табыңыз",
  },
  "projects.raised": {
    en: "Raised",
    ru: "Собрано",
    kk: "Жиналды",
  },
  "projects.backers": {
    en: "backers",
    ru: "спонсоров",
    kk: "демеуші",
  },
  "projects.daysLeft": {
    en: "days left",
    ru: "дней осталось",
    kk: "күн қалды",
  },
  "projects.viewAll": {
    en: "View All Projects",
    ru: "Все проекты",
    kk: "Барлық жобалар",
  },
  "projects.environment": {
    en: "Environment",
    ru: "Экология",
    kk: "Экология",
  },
  "projects.healthcare": {
    en: "Healthcare",
    ru: "Здравоохранение",
    kk: "Денсаулық сақтау",
  },
  "projects.artCulture": {
    en: "Art & Culture",
    ru: "Искусство и культура",
    kk: "Өнер және мәдениет",
  },
  "projects.supplyChain": {
    en: "Supply Chain",
    ru: "Логистика",
    kk: "Жеткізу тізбегі",
  },
  "projects.eco.title": {
    en: "EcoChain: Carbon Credit Marketplace",
    ru: "EcoChain: Маркетплейс углеродных кредитов",
    kk: "EcoChain: Көміртек кредиттері нарығы",
  },
  "projects.eco.description": {
    en: "A decentralized platform for trading verified carbon credits using blockchain technology.",
    ru: "Децентрализованная платформа для торговли верифицированными углеродными кредитами с использованием технологии блокчейн.",
    kk: "Блокчейн технологиясын қолдана отырып, тексерілген көміртек кредиттерімен сауда жасауға арналған орталықсыздандырылған платформа.",
  },
  "projects.med.title": {
    en: "MedVault: Healthcare Data Security",
    ru: "MedVault: Безопасность медицинских данных",
    kk: "MedVault: Медициналық деректер қауіпсіздігі",
  },
  "projects.med.description": {
    en: "Secure, patient-controlled medical records stored on the blockchain.",
    ru: "Безопасные медицинские записи, контролируемые пациентами, хранящиеся в блокчейне.",
    kk: "Блокчейнде сақталатын пациенттер бақылайтын қауіпсіз медициналық жазбалар.",
  },
  "projects.art.title": {
    en: "ArtBlock: NFT Gallery Platform",
    ru: "ArtBlock: NFT-галерея",
    kk: "ArtBlock: NFT галерея платформасы",
  },
  "projects.art.description": {
    en: "Democratizing art ownership through fractional NFT investments.",
    ru: "Демократизация владения искусством через дробные NFT-инвестиции.",
    kk: "Бөлшектік NFT инвестициялары арқылы өнер иелігін демократияландыру.",
  },
  "projects.supply.title": {
    en: "SupplyTrace: Ethical Sourcing",
    ru: "SupplyTrace: Этичные поставки",
    kk: "SupplyTrace: Этикалық жеткізу",
  },
  "projects.supply.description": {
    en: "Track product origins from farm to table with immutable blockchain records.",
    ru: "Отслеживайте происхождение продуктов от фермы до стола с неизменяемыми записями блокчейна.",
    kk: "Өзгертілмейтін блокчейн жазбалары арқылы өнімнің шығу тегін фермадан дастарханға дейін қадағалаңыз.",
  },

  // How It Works
  "howItWorks.title": {
    en: "How It Works",
    ru: "Как это работает",
    kk: "Қалай жұмыс істейді",
  },
  "howItWorks.description": {
    en: "Four simple steps to fund or launch your blockchain project",
    ru: "Четыре простых шага для финансирования или запуска вашего блокчейн-проекта",
    kk: "Блокчейн жобаңызды қаржыландыру немесе іске қосу үшін төрт қарапайым қадам",
  },
  "howItWorks.step1.title": {
    en: "Connect Wallet",
    ru: "Подключите кошелек",
    kk: "Әмиянды қосыңыз",
  },
  "howItWorks.step1.description": {
    en: "Link your crypto wallet to access the decentralized platform securely.",
    ru: "Подключите свой криптокошелек для безопасного доступа к децентрализованной платформе.",
    kk: "Орталықсыздандырылған платформаға қауіпсіз қол жеткізу үшін крипто әмияныңызды байланыстырыңыз.",
  },
  "howItWorks.step2.title": {
    en: "Create or Back",
    ru: "Создайте или поддержите",
    kk: "Жасаңыз немесе қолдаңыз",
  },
  "howItWorks.step2.description": {
    en: "Launch your own campaign or browse and support existing projects.",
    ru: "Запустите собственную кампанию или просматривайте и поддерживайте существующие проекты.",
    kk: "Өз науқаныңызды бастаңыз немесе бар жобаларды шолып, қолдаңыз.",
  },
  "howItWorks.step3.title": {
    en: "Smart Contract",
    ru: "Смарт-контракт",
    kk: "Смарт-келісімшарт",
  },
  "howItWorks.step3.description": {
    en: "Funds are held in secure smart contracts until milestones are met.",
    ru: "Средства хранятся в защищенных смарт-контрактах до достижения контрольных точек.",
    kk: "Қаражат белгіленген межелерге жеткенше қауіпсіз смарт-келісімшарттарда сақталады.",
  },
  "howItWorks.step4.title": {
    en: "Track Progress",
    ru: "Отслеживайте прогресс",
    kk: "Прогресті қадағалаңыз",
  },
  "howItWorks.step4.description": {
    en: "Monitor project development with full transparency on the blockchain.",
    ru: "Следите за развитием проекта с полной прозрачностью в блокчейне.",
    kk: "Блокчейндегі толық ашықтықпен жобаның дамуын бақылаңыз.",
  },

  // Features
  "features.title": {
    en: "Built for Trust,",
    ru: "Создано для доверия,",
    kk: "Сенім үшін жасалған,",
  },
  "features.titleAccent": {
    en: "Designed for Growth",
    ru: "Спроектировано для роста",
    kk: "Өсу үшін жобаланған",
  },
  "features.description": {
    en: "Our platform leverages blockchain technology to eliminate intermediaries, reduce fees, and ensure every contribution reaches its intended purpose.",
    ru: "Наша платформа использует технологию блокчейн для устранения посредников, снижения комиссий и обеспечения того, чтобы каждый вклад достиг своей цели.",
    kk: "Біздің платформа делдалдарды жою, комиссияларды азайту және әрбір үлестің мақсатына жетуін қамтамасыз ету үшін блокчейн технологиясын пайдаланады.",
  },
  "features.platformFee": {
    en: "Platform Fee",
    ru: "Комиссия платформы",
    kk: "Платформа комиссиясы",
  },
  "features.transactionTime": {
    en: "Transaction Time",
    ru: "Время транзакции",
    kk: "Транзакция уақыты",
  },
  "features.smartContractSecurity": {
    en: "Smart Contract Security",
    ru: "Безопасность смарт-контрактов",
    kk: "Смарт-келісімшарт қауіпсіздігі",
  },
  "features.smartContractSecurityDesc": {
    en: "All funds are protected by audited smart contracts with multi-sig approval.",
    ru: "Все средства защищены проверенными смарт-контрактами с мультиподписью.",
    kk: "Барлық қаражат көп қолтаңбалы мақұлдауы бар тексерілген смарт-келісімшарттармен қорғалған.",
  },
  "features.fullTransparency": {
    en: "Full Transparency",
    ru: "Полная прозрачность",
    kk: "Толық ашықтық",
  },
  "features.fullTransparencyDesc": {
    en: "Every transaction is recorded on the blockchain for complete visibility.",
    ru: "Каждая транзакция записывается в блокчейн для полной видимости.",
    kk: "Толық көріну үшін әрбір транзакция блокчейнге жазылады.",
  },
  "features.milestoneRelease": {
    en: "Milestone-Based Release",
    ru: "Поэтапное финансирование",
    kk: "Межеге негізделген шығару",
  },
  "features.milestoneReleaseDesc": {
    en: "Funds are released only when project milestones are verified and approved.",
    ru: "Средства выделяются только при верификации и одобрении этапов проекта.",
    kk: "Қаражат жоба межелері тексерілгеннен және мақұлданғаннан кейін ғана шығарылады.",
  },
  "features.instantTransactions": {
    en: "Instant Transactions",
    ru: "Мгновенные транзакции",
    kk: "Лезде транзакциялар",
  },
  "features.instantTransactionsDesc": {
    en: "Fast and efficient blockchain transactions with minimal fees.",
    ru: "Быстрые и эффективные блокчейн-транзакции с минимальными комиссиями.",
    kk: "Минималды комиссиямен жылдам және тиімді блокчейн транзакциялары.",
  },
  "features.globalAccess": {
    en: "Global Access",
    ru: "Глобальный доступ",
    kk: "Ғаламдық қол жеткізу",
  },
  "features.globalAccessDesc": {
    en: "Fund or create projects from anywhere in the world without restrictions.",
    ru: "Финансируйте или создавайте проекты из любой точки мира без ограничений.",
    kk: "Әлемнің кез келген жерінен шектеусіз жобаларды қаржыландырыңыз немесе жасаңыз.",
  },
  "features.realTimeAnalytics": {
    en: "Real-Time Analytics",
    ru: "Аналитика в реальном времени",
    kk: "Нақты уақыттағы аналитика",
  },
  "features.realTimeAnalyticsDesc": {
    en: "Track your investments and project performance with live data.",
    ru: "Отслеживайте свои инвестиции и показатели проекта с актуальными данными.",
    kk: "Тікелей деректермен инвестицияларыңызды және жоба өнімділігін бақылаңыз.",
  },

  // CTA
  "cta.title": {
    en: "Ready to Build the Future?",
    ru: "Готовы строить будущее?",
    kk: "Болашақты құруға дайынсыз ба?",
  },
  "cta.description": {
    en: "Join thousands of creators and backers on the most transparent crowdfunding platform powered by blockchain technology.",
    ru: "Присоединяйтесь к тысячам создателей и спонсоров на самой прозрачной краудфандинговой платформе на основе блокчейн-технологий.",
    kk: "Блокчейн технологиясымен жұмыс істейтін ең ашық краудфандинг платформасында мыңдаған жасаушылар мен демеушілерге қосылыңыз.",
  },
  "cta.startCampaign": {
    en: "Start Your Campaign",
    ru: "Начните кампанию",
    kk: "Науқаныңызды бастаңыз",
  },
  "cta.browseProjects": {
    en: "Browse Projects",
    ru: "Смотреть проекты",
    kk: "Жобаларды қарау",
  },

  // Footer
  "footer.tagline": {
    en: "Decentralized crowdfunding for the future of innovation.",
    ru: "Децентрализованный краудфандинг для будущего инноваций.",
    kk: "Инновация болашағы үшін орталықсыздандырылған краудфандинг.",
  },
  "footer.platform": {
    en: "Platform",
    ru: "Платформа",
    kk: "Платформа",
  },
  "footer.resources": {
    en: "Resources",
    ru: "Ресурсы",
    kk: "Ресурстар",
  },
  "footer.company": {
    en: "Company",
    ru: "Компания",
    kk: "Компания",
  },
  "footer.legal": {
    en: "Legal",
    ru: "Правовая информация",
    kk: "Құқықтық ақпарат",
  },
  "footer.documentation": {
    en: "Documentation",
    ru: "Документация",
    kk: "Құжаттама",
  },
  "footer.apiReference": {
    en: "API Reference",
    ru: "Справочник API",
    kk: "API анықтамасы",
  },
  "footer.smartContracts": {
    en: "Smart Contracts",
    ru: "Смарт-контракты",
    kk: "Смарт-келісімшарттар",
  },
  "footer.blog": {
    en: "Blog",
    ru: "Блог",
    kk: "Блог",
  },
  "footer.careers": {
    en: "Careers",
    ru: "Карьера",
    kk: "Мансап",
  },
  "footer.contact": {
    en: "Contact",
    ru: "Контакты",
    kk: "Байланыс",
  },
  "footer.pressKit": {
    en: "Press Kit",
    ru: "Пресс-кит",
    kk: "Баспасөз жинағы",
  },
  "footer.privacyPolicy": {
    en: "Privacy Policy",
    ru: "Политика конфиденциальности",
    kk: "Құпиялылық саясаты",
  },
  "footer.termsOfService": {
    en: "Terms of Service",
    ru: "Условия использования",
    kk: "Қызмет көрсету шарттары",
  },
  "footer.cookiePolicy": {
    en: "Cookie Policy",
    ru: "Политика Cookie",
    kk: "Cookie саясаты",
  },
  "footer.pricing": {
    en: "Pricing",
    ru: "Цены",
    kk: "Бағалар",
  },
  "footer.allRightsReserved": {
    en: "All rights reserved.",
    ru: "Все права защищены.",
    kk: "Барлық құқықтар қорғалған.",
  },
};

type I18nContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = useCallback(
    (key: string): string => {
      const translation = translations[key];
      if (!translation) {
        console.warn(`Missing translation for key: ${key}`);
        return key;
      }
      return translation[language];
    },
    [language]
  );

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

export const languageNames: Record<Language, string> = {
  en: "English",
  ru: "Русский",
  kk: "Қазақша",
};

// Auth translations
export const authTranslations: Translations = {
  // Login
  "login.title": {
    en: "Welcome Back",
    ru: "Добро пожаловать",
    kk: "Қош келдіңіз",
  },
  "login.subtitle": {
    en: "Sign in to your account to continue",
    ru: "Войдите в свой аккаунт, чтобы продолжить",
    kk: "Жалғастыру үшін аккаунтыңызға кіріңіз",
  },
  "login.email": {
    en: "Email",
    ru: "Электронная почта",
    kk: "Электрондық пошта",
  },
  "login.password": {
    en: "Password",
    ru: "Пароль",
    kk: "Құпия сөз",
  },
  "login.forgotPassword": {
    en: "Forgot password?",
    ru: "Забыли пароль?",
    kk: "Құпия сөзді ұмыттыңыз ба?",
  },
  "login.rememberMe": {
    en: "Remember me",
    ru: "Запомнить меня",
    kk: "Мені есте сақта",
  },
  "login.signIn": {
    en: "Sign In",
    ru: "Войти",
    kk: "Кіру",
  },
  "login.noAccount": {
    en: "Don't have an account?",
    ru: "Нет аккаунта?",
    kk: "Аккаунтыңыз жоқ па?",
  },
  "login.createAccount": {
    en: "Create one",
    ru: "Создать",
    kk: "Жасау",
  },
  "login.orContinueWith": {
    en: "Or continue with",
    ru: "Или продолжить с",
    kk: "Немесе жалғастыру",
  },
  "login.connectWallet": {
    en: "Connect Wallet",
    ru: "Подключить кошелек",
    kk: "Әмиянды қосу",
  },

  // Register
  "register.title": {
    en: "Create Your Project",
    ru: "Создайте свой проект",
    kk: "Жобаңызды жасаңыз",
  },
  "register.subtitle": {
    en: "Start your blockchain crowdfunding journey",
    ru: "Начните свой путь в блокчейн-краудфандинге",
    kk: "Блокчейн краудфандинг саяхатыңызды бастаңыз",
  },
  "register.accountInfo": {
    en: "Account Information",
    ru: "Информация об аккаунте",
    kk: "Аккаунт ақпараты",
  },
  "register.fullName": {
    en: "Full Name",
    ru: "Полное имя",
    kk: "Толық аты-жөні",
  },
  "register.email": {
    en: "Email Address",
    ru: "Адрес электронной почты",
    kk: "Электрондық пошта мекенжайы",
  },
  "register.password": {
    en: "Password",
    ru: "Пароль",
    kk: "Құпия сөз",
  },
  "register.confirmPassword": {
    en: "Confirm Password",
    ru: "Подтвердите пароль",
    kk: "Құпия сөзді растаңыз",
  },
  "register.projectInfo": {
    en: "Project Information",
    ru: "Информация о проекте",
    kk: "Жоба ақпараты",
  },
  "register.projectName": {
    en: "Project Name",
    ru: "Название проекта",
    kk: "Жоба атауы",
  },
  "register.projectCategory": {
    en: "Category",
    ru: "Категория",
    kk: "Санат",
  },
  "register.projectDescription": {
    en: "Short Description",
    ru: "Краткое описание",
    kk: "Қысқаша сипаттама",
  },
  "register.fundingGoal": {
    en: "Funding Goal (ETH)",
    ru: "Цель сбора (ETH)",
    kk: "Қаржыландыру мақсаты (ETH)",
  },
  "register.duration": {
    en: "Campaign Duration",
    ru: "Длительность кампании",
    kk: "Науқан ұзақтығы",
  },
  "register.days30": {
    en: "30 Days",
    ru: "30 дней",
    kk: "30 күн",
  },
  "register.days60": {
    en: "60 Days",
    ru: "60 дней",
    kk: "60 күн",
  },
  "register.days90": {
    en: "90 Days",
    ru: "90 дней",
    kk: "90 күн",
  },
  "register.agreeTerms": {
    en: "I agree to the Terms of Service and Privacy Policy",
    ru: "Я согласен с Условиями использования и Политикой конфиденциальности",
    kk: "Қызмет көрсету шарттары мен Құпиялылық саясатымен келісемін",
  },
  "register.createProject": {
    en: "Create Project",
    ru: "Создать проект",
    kk: "Жоба жасау",
  },
  "register.haveAccount": {
    en: "Already have an account?",
    ru: "Уже есть аккаунт?",
    kk: "Аккаунтыңыз бар ма?",
  },
  "register.signIn": {
    en: "Sign in",
    ru: "Войти",
    kk: "Кіру",
  },
  "register.selectCategory": {
    en: "Select category",
    ru: "Выберите категорию",
    kk: "Санатты таңдаңыз",
  },
  "register.categoryTech": {
    en: "Technology",
    ru: "Технологии",
    kk: "Технология",
  },
  "register.categoryEnvironment": {
    en: "Environment",
    ru: "Экология",
    kk: "Экология",
  },
  "register.categoryHealthcare": {
    en: "Healthcare",
    ru: "Здравоохранение",
    kk: "Денсаулық сақтау",
  },
  "register.categoryArt": {
    en: "Art & Culture",
    ru: "Искусство и культура",
    kk: "Өнер және мәдениет",
  },
  "register.categoryEducation": {
    en: "Education",
    ru: "Образование",
    kk: "Білім",
  },
  "register.categoryFinance": {
    en: "Finance",
    ru: "Финансы",
    kk: "Қаржы",
  },
  "register.walletAddress": {
    en: "Wallet Address (Optional)",
    ru: "Адрес кошелька (необязательно)",
    kk: "Әмиян мекенжайы (міндетті емес)",
  },
  "register.step": {
    en: "Step",
    ru: "Шаг",
    kk: "Қадам",
  },
  "register.of": {
    en: "of",
    ru: "из",
    kk: "ішінен",
  },
  "register.next": {
    en: "Next",
    ru: "Далее",
    kk: "Келесі",
  },
  "register.back": {
    en: "Back",
    ru: "Назад",
    kk: "Артқа",
  },
};

// Merge auth translations with main translations
Object.assign(translations, authTranslations);

// Projects page translations
export const projectsPageTranslations: Translations = {
  "projectsPage.title": {
    en: "Explore Projects",
    ru: "Исследуйте проекты",
    kk: "Жобаларды зерттеңіз",
  },
  "projectsPage.subtitle": {
    en: "Discover and invest in innovative blockchain projects",
    ru: "Откройте и инвестируйте в инновационные блокчейн-проекты",
    kk: "Инновациялық блокчейн жобаларын табыңыз және инвестиция салыңыз",
  },
  "projectsPage.search": {
    en: "Search projects...",
    ru: "Поиск проектов...",
    kk: "Жобаларды іздеу...",
  },
  "projectsPage.allCategories": {
    en: "All Categories",
    ru: "Все категории",
    kk: "Барлық санаттар",
  },
  "projectsPage.sortBy": {
    en: "Sort by",
    ru: "Сортировать",
    kk: "Сұрыптау",
  },
  "projectsPage.mostFunded": {
    en: "Most Funded",
    ru: "Больше всего собрано",
    kk: "Ең көп қаржыландырылған",
  },
  "projectsPage.newest": {
    en: "Newest",
    ru: "Новые",
    kk: "Жаңа",
  },
  "projectsPage.endingSoon": {
    en: "Ending Soon",
    ru: "Скоро завершатся",
    kk: "Жақында аяқталады",
  },
  "projectsPage.mostBackers": {
    en: "Most Backers",
    ru: "Больше всего спонсоров",
    kk: "Ең көп демеушілер",
  },
  "projectsPage.fundProject": {
    en: "Fund This Project",
    ru: "Инвестировать",
    kk: "Инвестициялау",
  },
  "projectsPage.viewDetails": {
    en: "View Details",
    ru: "Подробнее",
    kk: "Толығырақ",
  },
  "projectsPage.funded": {
    en: "funded",
    ru: "собрано",
    kk: "жиналды",
  },
  "projectsPage.goal": {
    en: "Goal",
    ru: "Цель",
    kk: "Мақсат",
  },
  "projectsPage.minInvestment": {
    en: "Min. Investment",
    ru: "Мин. инвестиция",
    kk: "Мин. инвестиция",
  },
  "projectsPage.filter": {
    en: "Filter",
    ru: "Фильтр",
    kk: "Сүзгі",
  },
  "projectsPage.clearFilters": {
    en: "Clear Filters",
    ru: "Сбросить фильтры",
    kk: "Сүзгілерді тазалау",
  },
  "projectsPage.noProjects": {
    en: "No projects found",
    ru: "Проекты не найдены",
    kk: "Жобалар табылмады",
  },
  "projectsPage.tryAdjusting": {
    en: "Try adjusting your filters or search query",
    ru: "Попробуйте изменить фильтры или поисковый запрос",
    kk: "Сүзгілерді немесе іздеу сұрауын өзгертіп көріңіз",
  },
  "projectsPage.verified": {
    en: "Verified",
    ru: "Проверено",
    kk: "Тексерілген",
  },
  "projectsPage.trending": {
    en: "Trending",
    ru: "В тренде",
    kk: "Трендте",
  },
  "projectsPage.new": {
    en: "New",
    ru: "Новый",
    kk: "Жаңа",
  },
  "projectsPage.creator": {
    en: "Creator",
    ru: "Создатель",
    kk: "Жасаушы",
  },
  "projectsPage.blockchain": {
    en: "Blockchain",
    ru: "Блокчейн",
    kk: "Блокчейн",
  },
  "projectsPage.technology": {
    en: "Technology",
    ru: "Технологии",
    kk: "Технология",
  },
  "projectsPage.defi": {
    en: "DeFi",
    ru: "DeFi",
    kk: "DeFi",
  },
  "projectsPage.nft": {
    en: "NFT",
    ru: "NFT",
    kk: "NFT",
  },
  "projectsPage.gaming": {
    en: "Gaming",
    ru: "Игры",
    kk: "Ойындар",
  },
  "projectsPage.social": {
    en: "Social",
    ru: "Социальные",
    kk: "Әлеуметтік",
  },
  "projectsPage.infrastructure": {
    en: "Infrastructure",
    ru: "Инфраструктура",
    kk: "Инфрақұрылым",
  },
};

Object.assign(translations, projectsPageTranslations);

// Creator Dashboard translations
export const creatorDashboardTranslations: Translations = {
  "creator.dashboard": {
    en: "Creator Dashboard",
    ru: "Панель создателя",
    kk: "Жасаушы панелі",
  },
  "creator.myProjects": {
    en: "My Projects",
    ru: "Мои проекты",
    kk: "Менің жобаларым",
  },
  "creator.overview": {
    en: "Overview",
    ru: "Обзор",
    kk: "Шолу",
  },
  "creator.analytics": {
    en: "Analytics",
    ru: "Аналитика",
    kk: "Аналитика",
  },
  "creator.backers": {
    en: "Backers",
    ru: "Спонсоры",
    kk: "Демеушілер",
  },
  "creator.milestones": {
    en: "Milestones",
    ru: "Этапы",
    kk: "Межелер",
  },
  "creator.updates": {
    en: "Updates",
    ru: "Обновления",
    kk: "Жаңартулар",
  },
  "creator.settings": {
    en: "Settings",
    ru: "Настройки",
    kk: "Баптаулар",
  },
  "creator.totalRaised": {
    en: "Total Raised",
    ru: "Всего собрано",
    kk: "Барлығы жиналды",
  },
  "creator.totalBackers": {
    en: "Total Backers",
    ru: "Всего спонсоров",
    kk: "Барлық демеушілер",
  },
  "creator.daysRemaining": {
    en: "Days Remaining",
    ru: "Осталось дней",
    kk: "Қалған күндер",
  },
  "creator.fundingProgress": {
    en: "Funding Progress",
    ru: "Прогресс сбора",
    kk: "Қаржыландыру барысы",
  },
  "creator.recentBackers": {
    en: "Recent Backers",
    ru: "Недавние спонсоры",
    kk: "Соңғы демеушілер",
  },
  "creator.viewAll": {
    en: "View All",
    ru: "Смотреть все",
    kk: "Барлығын көру",
  },
  "creator.milestoneProgress": {
    en: "Milestone Progress",
    ru: "Прогресс этапов",
    kk: "Межелер барысы",
  },
  "creator.completed": {
    en: "Completed",
    ru: "Завершено",
    kk: "Аяқталды",
  },
  "creator.inProgress": {
    en: "In Progress",
    ru: "В процессе",
    kk: "Орындалуда",
  },
  "creator.pending": {
    en: "Pending",
    ru: "Ожидает",
    kk: "Күтуде",
  },
  "creator.addMilestone": {
    en: "Add Milestone",
    ru: "Добавить этап",
    kk: "Меже қосу",
  },
  "creator.postUpdate": {
    en: "Post Update",
    ru: "Опубликовать обновление",
    kk: "Жаңартуды жариялау",
  },
  "creator.withdrawFunds": {
    en: "Withdraw Funds",
    ru: "Вывести средства",
    kk: "Қаражатты шығару",
  },
  "creator.editProject": {
    en: "Edit Project",
    ru: "Редактировать проект",
    kk: "Жобаны өңдеу",
  },
  "creator.projectStatus": {
    en: "Project Status",
    ru: "Статус проекта",
    kk: "Жоба күйі",
  },
  "creator.active": {
    en: "Active",
    ru: "Активный",
    kk: "Белсенді",
  },
  "creator.funded": {
    en: "Funded",
    ru: "Профинансирован",
    kk: "Қаржыландырылған",
  },
  "creator.ended": {
    en: "Ended",
    ru: "Завершен",
    kk: "Аяқталған",
  },
  "creator.draft": {
    en: "Draft",
    ru: "Черновик",
    kk: "Жоба",
  },
  "creator.fundingGoal": {
    en: "Funding Goal",
    ru: "Цель сбора",
    kk: "Қаржыландыру мақсаты",
  },
  "creator.raised": {
    en: "Raised",
    ru: "Собрано",
    kk: "Жиналды",
  },
  "creator.transactions": {
    en: "Transactions",
    ru: "Транзакции",
    kk: "Транзакциялар",
  },
  "creator.recentTransactions": {
    en: "Recent Transactions",
    ru: "Недавние транзакции",
    kk: "Соңғы транзакциялар",
  },
  "creator.contribution": {
    en: "Contribution",
    ru: "Вклад",
    kk: "Үлес",
  },
  "creator.withdrawal": {
    en: "Withdrawal",
    ru: "Вывод",
    kk: "Шығару",
  },
  "creator.smartContractAddress": {
    en: "Smart Contract Address",
    ru: "Адрес смарт-контракта",
    kk: "Смарт-келісімшарт мекенжайы",
  },
  "creator.walletBalance": {
    en: "Wallet Balance",
    ru: "Баланс кошелька",
    kk: "Әмиян балансы",
  },
  "creator.availableToWithdraw": {
    en: "Available to Withdraw",
    ru: "Доступно для вывода",
    kk: "Шығаруға қолжетімді",
  },
  "creator.lockedInMilestones": {
    en: "Locked in Milestones",
    ru: "Заблокировано в этапах",
    kk: "Межелерде құлыпталған",
  },
  "creator.createNewProject": {
    en: "Create New Project",
    ru: "Создать новый проект",
    kk: "Жаңа жоба жасау",
  },
  "creator.noProjects": {
    en: "No projects yet",
    ru: "Пока нет проектов",
    kk: "Әзірге жоба жоқ",
  },
  "creator.startFirstProject": {
    en: "Start your first crowdfunding campaign",
    ru: "Начните свою первую краудфандинговую кампанию",
    kk: "Алғашқы краудфандинг науқаныңызды бастаңыз",
  },
  "creator.quickActions": {
    en: "Quick Actions",
    ru: "Быстрые действия",
    kk: "Жылдам әрекеттер",
  },
  "creator.fundingChart": {
    en: "Funding Over Time",
    ru: "Сбор средств по времени",
    kk: "Уақыт бойынша қаржыландыру",
  },
  "creator.backersChart": {
    en: "Backers Over Time",
    ru: "Спонсоры по времени",
    kk: "Уақыт бойынша демеушілер",
  },
  "creator.averageContribution": {
    en: "Average Contribution",
    ru: "Средний вклад",
    kk: "Орташа үлес",
  },
  "creator.conversionRate": {
    en: "Conversion Rate",
    ru: "Конверсия",
    kk: "Конверсия",
  },
  "creator.pageViews": {
    en: "Page Views",
    ru: "Просмотры страницы",
    kk: "Бет қаралымдары",
  },
  "creator.shareRate": {
    en: "Share Rate",
    ru: "Доля распространения",
    kk: "Бөлісу деңгейі",
  },
};

Object.assign(translations, creatorDashboardTranslations);



// Role selection and wallet translations
export const roleTranslations: Translations = {
  "wallet.connect": {
    en: "Connect Wallet",
    ru: "Подключить кошелек",
    kk: "Әмиянды қосу",
  },
  "wallet.connecting": {
    en: "Connecting...",
    ru: "Подключение...",
    kk: "Қосылуда...",
  },
  "wallet.connected": {
    en: "Connected",
    ru: "Подключено",
    kk: "Қосылды",
  },
  "wallet.disconnect": {
    en: "Disconnect",
    ru: "Отключить",
    kk: "Ажырату",
  },
  "wallet.title": {
    en: "Connect Your",
    ru: "Подключите",
    kk: "Қосыңыз",
  },
  "wallet.titleHighlight": {
    en: "Wallet",
    ru: "кошелек",
    kk: "әмиянды",
  },
  "wallet.subtitle": {
    en: "Connect your crypto wallet to access the",
    ru: "Подключите свой криптокошелек для доступа к",
    kk: "Крипто әмиянды қосыңыз, қол жеткізу үшін",
  },
  "wallet.subtitleHighlight": {
    en: "decentralized crowdfunding platform",
    ru: "децентрализованной краудфандинговой платформе",
    kk: "орталықсыздандырылған краудфандинг платформасына",
  },
  "wallet.metamask": {
    en: "MetaMask",
    ru: "MetaMask",
    kk: "MetaMask",
  },
  "wallet.walletconnect": {
    en: "WalletConnect",
    ru: "WalletConnect",
    kk: "WalletConnect",
  },
  "wallet.coinbase": {
    en: "Coinbase Wallet",
    ru: "Coinbase Wallet",
    kk: "Coinbase Wallet",
  },
  "wallet.popular": {
    en: "Popular",
    ru: "Популярный",
    kk: "Танымал",
  },
  "wallet.secure": {
    en: "Your connection is secure and encrypted",
    ru: "Ваше соединение защищено и зашифровано",
    kk: "Сіздің байланысыңыз қауіпсіз және шифрланған",
  },
  "role.selectTitle": {
    en: "How would you like to use ChainFund?",
    ru: "Как вы хотите использовать ChainFund?",
    kk: "ChainFund-ты қалай пайдаланғыңыз келеді?",
  },
  "role.selectSubtitle": {
    en: "Choose your role to get started",
    ru: "Выберите свою роль для начала",
    kk: "Бастау үшін рөліңізді таңдаңыз",
  },
  "role.investor": {
    en: "Investor",
    ru: "Инвестор",
    kk: "Инвестор",
  },
  "role.investorDesc": {
    en: "Browse and fund innovative blockchain projects",
    ru: "Просматривайте и финансируйте инновационные блокчейн-проекты",
    kk: "Инновациялық блокчейн жобаларын қарап, қаржыландырыңыз",
  },
  "role.investorFeature1": {
    en: "Discover verified projects",
    ru: "Находите проверенные проекты",
    kk: "Тексерілген жобаларды табыңыз",
  },
  "role.investorFeature2": {
    en: "Track your investments",
    ru: "Отслеживайте свои инвестиции",
    kk: "Инвестицияларыңызды бақылаңыз",
  },
  "role.investorFeature3": {
    en: "Support innovative ideas",
    ru: "Поддерживайте инновационные идеи",
    kk: "Инновациялық идеяларды қолдаңыз",
  },
  "role.creator": {
    en: "Project Creator",
    ru: "Создатель проекта",
    kk: "Жоба жасаушы",
  },
  "role.creatorDesc": {
    en: "Launch your crowdfunding campaign and raise funds",
    ru: "Запустите свою краудфандинговую кампанию и соберите средства",
    kk: "Краудфандинг науқаныңызды бастап, қаражат жинаңыз",
  },
  "role.creatorFeature1": {
    en: "Create fundraising campaigns",
    ru: "Создавайте сборы средств",
    kk: "Қаражат жинау науқандарын жасаңыз",
  },
  "role.creatorFeature2": {
    en: "Manage milestones",
    ru: "Управляйте этапами",
    kk: "Межелерді басқарыңыз",
  },
  "role.creatorFeature3": {
    en: "Track funding progress",
    ru: "Следите за прогрессом сбора",
    kk: "Қаржыландыру барысын бақылаңыз",
  },
  "role.continue": {
    en: "Continue",
    ru: "Продолжить",
    kk: "Жалғастыру",
  },
  "role.connectedAs": {
    en: "Connected as",
    ru: "Подключено как",
    kk: "Қосылған",
  },
  "investor.activeCampaigns": {
    en: "Active Campaigns",
    ru: "Активные сборы",
    kk: "Белсенді жинақтар",
  },
  "investor.myInvestments": {
    en: "My Investments",
    ru: "Мои инвестиции",
    kk: "Менің инвестицияларым",
  },
  "investor.donate": {
    en: "Donate",
    ru: "Пожертвовать",
    kk: "Қайырымдылық жасау",
  },
  "investor.donateAmount": {
    en: "Enter donation amount",
    ru: "Введите сумму пожертвования",
    kk: "Қайырымдылық сомасын енгізіңіз",
  },
  "investor.confirmDonation": {
    en: "Confirm Donation",
    ru: "Подтвердить пожертвование",
    kk: "Қайырымдылықты растау",
  },
  "investor.totalInvested": {
    en: "Total Invested",
    ru: "Всего инвестировано",
    kk: "Барлығы инвестицияланған",
  },
  "investor.projectsBacked": {
    en: "Projects Backed",
    ru: "Поддержанные проекты",
    kk: "Қолдау көрсетілген жобалар",
  },
};

Object.assign(translations, roleTranslations);

// Withdraw & My Projects translations
export const withdrawTranslations: Translations = {
  "creator.withdrawn": {
    en: "Withdrawn",
    ru: "Выведено",
    kk: "Шығарылды",
  },
  "creator.fundsWithdrawn": {
    en: "Funds have been withdrawn",
    ru: "Средства были выведены",
    kk: "Қаражат шығарылды",
  },
  "creator.withdrawSuccess": {
    en: "Withdrawal successful!",
    ru: "Вывод средств успешен!",
    kk: "Шығару сәтті болды!",
  },
  "creator.withdrawing": {
    en: "Withdrawing...",
    ru: "Выведение...",
    kk: "Шығарылуда...",
  },
  "myProjects.title": {
    en: "My Projects",
    ru: "Мои проекты",
    kk: "Менің жобаларым",
  },
  "myProjects.subtitle": {
    en: "Campaigns created by your wallet",
    ru: "Кампании, созданные вашим кошельком",
    kk: "Әмияныңыз жасаған науқандар",
  },
  "myProjects.noProjects": {
    en: "You haven't created any projects yet",
    ru: "Вы еще не создали ни одного проекта",
    kk: "Сіз әлі жоба жасаған жоқсыз",
  },
  "myProjects.createFirst": {
    en: "Go to the Creator Dashboard to start your first campaign",
    ru: "Перейдите в панель создателя, чтобы начать первую кампанию",
    kk: "Алғашқы науқаныңызды бастау үшін жасаушы панеліне өтіңіз",
  },
};

Object.assign(translations, withdrawTranslations);
