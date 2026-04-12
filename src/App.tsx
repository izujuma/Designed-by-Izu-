/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from 'motion/react';
import { 
  Video,
  TrendingUp,
  Server,
  Music,
  ArrowRight, 
  Code, 
  Palette, 
  Layout, 
  Smartphone, 
  Mail, 
  Phone,
  Facebook,
  Github, 
  Twitter, 
  Instagram, 
  Linkedin,
  Check,
  Menu,
  X,
  Sun,
  Moon,
  ExternalLink,
  ChevronRight,
  Search,
  MapPin,
  Users,
  DollarSign,
  ChevronDown,
  Globe,
  Wrench,
  Settings
} from 'lucide-react';

// --- Types ---
interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
}

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Lumina Vision",
    category: "Brand Identity",
    description: "A minimalist brand identity for a next-gen optics company."
  },
  {
    id: 2,
    title: "EcoSphere App",
    category: "UI/UX Design",
    description: "Mobile application focused on sustainable living and carbon tracking."
  },
  {
    id: 3,
    title: "Aether Dashboard",
    category: "Web Application",
    description: "Complex data visualization dashboard for cloud infrastructure."
  },
  {
    id: 4,
    title: "Nova E-commerce",
    category: "E-commerce",
    description: "High-end fashion retail experience with fluid transitions."
  }
];

const SERVICES: Service[] = [
  {
    icon: <Users />,
    title: "Live Streaming Assistant",
    description: "Providing professional support for high-quality live broadcasts and stream management."
  },
  {
    icon: <Palette />,
    title: "Ui & Ux designing",
    description: "Crafting intuitive user interfaces and seamless user experiences for digital products."
  },
  {
    icon: <DollarSign />,
    title: "Meta Boostings",
    description: "Optimizing social media presence and ad performance through strategic Meta platform management."
  },
  {
    icon: <Settings />,
    title: "iT Consultancy",
    description: "Expert advice and solutions for your information technology infrastructure and strategy."
  },
  {
    icon: <Wrench />,
    title: "Audio and Video Remastering",
    description: "Enhancing and restoring audio and video quality to professional standards."
  }
];

// --- Translations ---
const TRANSLATIONS = {
  en: {
    nav: {
      home: "Home",
      about: "About Me",
      services: "My Services",
      listProperties: "Recent Work",
      contact: "Contact me",
      logo: "Designed by Izu"
    },
    hero: {
      categories: ["Services", "Design", "Contact"],
      title: "Hey, I am Izu and welcome to my portfolio website",
      description: "Explore my work, services, and creative journey in digital design and technology.",
      searchTitle: "Find The Best Place",
      fields: {
        lookingFor: "Looking For",
        lookingForPlaceholder: "Enter Type",
        price: "Price",
        pricePlaceholder: "Price",
        locations: "Locations",
        locationsPlaceholder: "Tour Name",
        rooms: "Number Of Rooms",
        roomsPlaceholder: "2 Bed Rooms"
      },
      searchBtn: "Search"
    },
    about: {
      title: "About Me.",
      p1: "I'm Izu, a digital designer with over 5 years of experience in the industry. I believe that great design is invisible—it should feel natural, intuitive, and effortless.",
      p2: "My approach combines strategic thinking with creative execution. I don't just make things look pretty; I solve problems and create value for businesses and their users.",
      projectsDone: "Projects Done",
      happyClients: "Happy Clients"
    },
    services: {
      title: "My Services.",
      subtitle: "Tailored solutions for your unique brand needs.",
      learnMore: "Learn more",
      items: [
        {
          title: "Live Streaming Assistant",
          description: "Providing professional support for high-quality live broadcasts and stream management."
        },
        {
          title: "Ui & Ux designing",
          description: "Crafting intuitive user interfaces and seamless user experiences for digital products."
        },
        {
          title: "Meta Boostings",
          description: "Optimizing social media presence and ad performance through strategic Meta platform management."
        },
        {
          title: "iT Consultancy",
          description: "Expert advice and solutions for your information technology infrastructure and strategy."
        },
        {
          title: "Audio and Video Remastering",
          description: "Enhancing and restoring audio and video quality to professional standards."
        }
      ]
    },
    projects: {
      title: "Recent Work.",
      subtitle: "A selection of favorite projects that showcase my design philosophy."
    },
    contact: {
      title: "Let's build something amazing together.",
      subtitle: "Have a project in mind? Or just want to say hi? Feel free to reach out anytime.",
      email: "Email",
      call: "Call",
      facebook: "Facebook",
      follow: "Follow",
      nameLabel: "Name",
      emailLabel: "Email",
      messageLabel: "Message",
      placeholderName: "Your Name",
      placeholderEmail: "Your Email",
      placeholderMessage: "Tell me about your project...",
      send: "Send Message",
      phone: "+211 920 341 412"
    },
    footer: {
      copyright: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      legal: "Legal"
    }
  },
  ar: {
    nav: {
      home: "الرئيسية",
      about: "عني",
      services: "خدماتي",
      listProperties: "أعمالي الأخيرة",
      contact: "اتصل بي",
      logo: "تصميم إيزو"
    },
    hero: {
      categories: ["خدمات", "تصميم", "اتصال"],
      title: "مرحباً، أنا إيزو وأهلاً بكم في موقع أعمالي",
      description: "استكشف أعمالي وخدماتي ورحلتي الإبداعية في التصميم الرقمي والتكنولوجيا.",
      searchTitle: "ابحث عن أفضل مكان",
      fields: {
        lookingFor: "ابحث عن",
        lookingForPlaceholder: "أدخل النوع",
        price: "السعر",
        pricePlaceholder: "السعر",
        locations: "المواقع",
        locationsPlaceholder: "اسم الجولة",
        rooms: "عدد الغرف",
        roomsPlaceholder: "غرفتين نوم"
      },
      searchBtn: "بحث"
    },
    about: {
      title: "عني.",
      p1: "أنا إيزو، مصمم رقمي بخبرة تزيد عن 5 سنوات في هذا المجال. أعتقد أن التصميم الرائع غير مرئي - يجب أن يبدو طبيعيًا وبديهيًا وسهلاً.",
      p2: "يجمع نهجي بين التفكير الاستراتيجي والتنفيذ الإبداعي. أنا لا أجعل الأشياء تبدو جميلة فحسب؛ بل أحل المشكلات وأخلق قيمة للشركات ومستخدميها.",
      projectsDone: "مشاريع منجزة",
      happyClients: "عملاء سعداء"
    },
    services: {
      title: "خدماتي.",
      subtitle: "حلول مخصصة لاحتياجات علامتك التجارية الفريدة.",
      learnMore: "تعرف على المزيد",
      items: [
        {
          title: "مساعد البث المباشر",
          description: "تقديم دعم احترافي لعمليات البث المباشر عالية الجودة وإدارة البث."
        },
        {
          title: "تصميم واجهة وتجربة المستخدم",
          description: "صياغة واجهات مستخدم بديهية وتجارب مستخدم سلسة للمنتجات الرقمية."
        },
        {
          title: "تعزيز منصات ميتا",
          description: "تحسين التواجد على وسائل التواصل الاجتماعي وأداء الإعلانات من خلال إدارة استراتيجية لمنصة ميتا."
        },
        {
          title: "استشارات تكنولوجيا المعلومات",
          description: "نصائح وحلول خبيرة للبنية التحتية لتكنولوجيا المعلومات واستراتيجيتك."
        },
        {
          title: "إعادة إنتاج الصوت والفيديو",
          description: "تحسين واستعادة جودة الصوت والفيديو وفقًا للمعايير المهنية."
        }
      ]
    },
    projects: {
      title: "أعمالي الأخيرة.",
      subtitle: "مجموعة من المشاريع المفضلة التي تعرض فلسفتي في التصميم."
    },
    contact: {
      title: "لنقم ببناء شيء مذهل معًا.",
      subtitle: "هل لديك مشروع في بالك؟ أو تريد فقط إلقاء التحية؟ لا تتردد في التواصل في أي وقت.",
      email: "البريد الإلكتروني",
      call: "اتصال",
      facebook: "فيسبوك",
      follow: "تابعنا",
      nameLabel: "الاسم",
      emailLabel: "البريد الإلكتروني",
      messageLabel: "الرسالة",
      placeholderName: "اسمك",
      placeholderEmail: "بريدك الإلكتروني",
      placeholderMessage: "أخبرني عن مشروعك...",
      send: "إرسال الرسالة",
      phone: "+٢١١ ٩٢٠ ٣٤١ ٤١٢"
    },
    footer: {
      copyright: "جميع الحقوق محفوظة.",
      privacy: "سياسة الخصوصية",
      terms: "شروط الاستخدام",
      legal: "قانوني"
    }
  }
};

// --- Components ---

const TextReveal = ({ text, className = "" }: { text: string, className?: string }) => {
  const words = text.split(" ");
  
  return (
    <div className={`flex flex-wrap justify-center gap-x-[0.3em] ${className}`}>
      {words.map((word, i) => (
        <div key={i} className="overflow-hidden">
          <motion.span
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8, 
              delay: i * 0.05, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </div>
      ))}
    </div>
  );
};

const ThemeToggleSwitch = ({ theme, toggleTheme }: { theme: string, toggleTheme: () => void }) => {
  const isLight = theme === 'light';

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-16 h-8 rounded-full overflow-hidden transition-all duration-500 shadow-inner group border-2 ${
        isLight ? 'bg-sky-400 border-sky-300' : 'bg-slate-900 border-slate-800'
      }`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence mode="wait">
          {isLight ? (
            <motion.div
              key="day"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute inset-0"
            >
              {/* Clouds */}
              <div className="absolute right-2 bottom-0 flex items-end gap-0.5 opacity-80">
                <div className="w-4 h-4 bg-white rounded-full mb-[-4px]" />
                <div className="w-6 h-6 bg-white rounded-full mb-[-6px]" />
                <div className="w-5 h-5 bg-white rounded-full mb-[-4px]" />
              </div>
              <div className="absolute left-4 top-1 w-2 h-2 bg-white/40 rounded-full" />
            </motion.div>
          ) : (
            <motion.div
              key="night"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute inset-0"
            >
              {/* Stars */}
              <div className="absolute left-3 top-2 w-0.5 h-0.5 bg-white rounded-full animate-pulse" />
              <div className="absolute left-6 top-5 w-1 h-1 bg-white rounded-full animate-pulse delay-75" />
              <div className="absolute left-10 top-2 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-150" />
              <div className="absolute left-4 top-5 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-300" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Knob */}
      <motion.div
        animate={{ 
          x: isLight ? 4 : 32,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={`relative z-10 w-6 h-6 rounded-full shadow-lg flex items-center justify-center overflow-hidden transition-colors duration-500 ${
          isLight ? 'bg-yellow-400' : 'bg-slate-300'
        }`}
      >
        {!isLight && (
          <div className="relative w-full h-full">
            <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-slate-400 rounded-full opacity-60" />
            <div className="absolute bottom-1 right-1.5 w-2 h-2 bg-slate-400 rounded-full opacity-60" />
            <div className="absolute top-2 right-1 w-1 h-1 bg-slate-400 rounded-full opacity-60" />
          </div>
        )}
      </motion.div>
    </button>
  );
};

const Navbar = ({ theme, toggleTheme, lang, setLang }: { theme: string, toggleTheme: () => void, lang: 'en' | 'ar', setLang: (l: 'en' | 'ar') => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[lang].nav;

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.home, href: '#', active: true },
    { name: t.about, href: '#about' },
    { name: t.services, href: '#services' },
    { name: t.listProperties, href: '#projects' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`pointer-events-auto relative flex items-center justify-between gap-8 px-8 py-3 rounded-full transition-all duration-500 border border-glass-border shadow-2xl ${
          isScrolled 
            ? 'bg-bg-primary/80 backdrop-blur-xl w-full max-w-5xl' 
            : 'bg-white/10 backdrop-blur-md w-full max-w-6xl'
        }`}
      >
        {/* 3D Reflection Effect */}
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <motion.div 
            style={{
              x: useTransform(mouseXSpring, [-0.5, 0.5], ["-50%", "50%"]),
              y: useTransform(mouseYSpring, [-0.5, 0.5], ["-50%", "50%"]),
            }}
            className="absolute inset-[-100%] bg-gradient-to-br from-white/20 to-transparent opacity-30 blur-2xl"
          />
        </div>

        {/* Logo */}
        <motion.a 
          href="#" 
          whileHover={{ scale: 1.05, rotateZ: -2 }}
          className="flex items-center gap-2 shrink-0 relative z-10"
        >
          <span className="text-xl font-black tracking-tighter text-text-primary relative z-10 bg-gradient-to-r from-text-primary to-text-primary/60 bg-clip-text text-transparent">
            {t.logo}
          </span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8 relative z-10">
          <div className="flex items-center gap-6">
            {navLinks.map((link, i) => (
              <motion.a 
                key={link.name} 
                href={link.href} 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className={`text-xs font-bold transition-all hover:text-astra-cyan ${
                  link.active 
                    ? 'text-astra-cyan' 
                    : 'text-text-primary/80'
                }`}
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          <div className="h-4 w-[1px] bg-text-primary/10" />

          {/* Socials & Toggles */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <motion.a 
                whileHover={{ scale: 1.2, rotate: 10 }}
                href="https://www.facebook.com/designer.izu.4/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-text-primary/60 hover:text-astra-cyan transition-colors"
              >
                <Facebook size={18} />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.2, rotate: -10 }}
                href="#" 
                className="text-text-primary/60 hover:text-astra-cyan transition-colors"
              >
                <Github size={18} />
              </motion.a>
            </div>
            
            <div className="flex items-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                className="flex items-center gap-2 text-xs font-bold text-text-primary hover:text-astra-cyan transition-colors"
              >
                <Globe size={16} />
                <span className="uppercase">{lang === 'en' ? 'Ara' : 'Eng'}</span>
              </motion.button>
              <ThemeToggleSwitch theme={theme} toggleTheme={toggleTheme} />
            </div>
          </div>

          {/* Contact Button */}
          <motion.a 
            href="#contact" 
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 rounded-full bg-text-primary text-bg-primary font-bold text-xs shadow-lg transition-all"
          >
            {t.contact}
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-4 relative z-10">
          <ThemeToggleSwitch theme={theme} toggleTheme={toggleTheme} />
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="p-2 text-text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute top-full mt-4 left-4 right-4 lg:hidden bg-bg-primary/95 backdrop-blur-2xl rounded-[2rem] border border-glass-border shadow-2xl overflow-hidden pointer-events-auto"
          >
            <div className="px-8 py-10 flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a 
                  key={link.name} 
                  href={link.href} 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-2xl font-bold text-text-primary hover:text-astra-cyan transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a 
                href="#contact" 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-bold text-astra-cyan"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.contact}
              </motion.a>
              
              <div className="pt-6 border-t border-text-primary/10 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <a href="https://www.facebook.com/designer.izu.4/" target="_blank" rel="noopener noreferrer" className="text-text-primary">
                    <Facebook size={24} />
                  </a>
                  <a href="#" className="text-text-primary">
                    <Github size={24} />
                  </a>
                </div>
                <button 
                  onClick={() => {
                    setLang(lang === 'en' ? 'ar' : 'en');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-text-primary font-bold"
                >
                  <Globe size={20} />
                  <span className="uppercase">{lang === 'en' ? 'Ara' : 'Eng'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const Hero = ({ lang }: { lang: 'en' | 'ar' }) => {
  const t = TRANSLATIONS[lang].hero;
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Video with Parallax */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute inset-0 z-0"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-110"
        >
          <source src="/input_file_0.mp4" type="video/mp4" />
          <source src="https://assets.mixkit.co/videos/preview/mixkit-basketball-hoop-at-sunset-4813-large.mp4" type="video/mp4" />
          {/* Fallback image if video fails to load */}
          <img 
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-text-primary/10 via-text-primary/5 to-bg-primary" />
      </motion.div>

      <div className="section-padding relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start text-left pt-32 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-3xl"
        >
          {/* Categories */}
          <div className="flex gap-3 mb-8">
            {t.categories.map((cat, i) => (
              <span 
                key={i} 
                className="px-6 py-2 rounded-lg bg-white/20 backdrop-blur-md text-white text-sm font-medium border border-white/10"
              >
                {cat}
              </span>
            ))}
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white leading-[1.1]">
            {t.title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-xl mb-12 leading-relaxed">
            {t.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const About = ({ lang }: { lang: 'en' | 'ar' }) => {
  const t = TRANSLATIONS[lang].about;
  return (
    <section id="about" className="section-padding bg-bg-primary overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: lang === 'en' ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-astra-gray dark:bg-zinc-900 border border-glass-border shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" 
                alt="Izu" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-text-primary/20 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: lang === 'en' ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-8 text-text-primary">{t.title}</h2>
            <div className="space-y-6 text-lg text-text-muted leading-relaxed">
              <p>{t.p1}</p>
              <p>{t.p2}</p>
              <div className="grid grid-cols-2 gap-10 pt-8">
                <div>
                  <h4 className="text-text-primary font-bold text-5xl mb-2">50+</h4>
                  <p className="text-sm font-bold text-text-primary uppercase tracking-widest">{t.projectsDone}</p>
                </div>
                <div>
                  <h4 className="text-text-primary font-bold text-5xl mb-2">12+</h4>
                  <p className="text-sm font-bold text-text-primary uppercase tracking-widest">{t.happyClients}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = ({ lang }: { lang: 'en' | 'ar' }) => {
  const t = TRANSLATIONS[lang].services;
  return (
    <section id="services" className="relative section-padding overflow-hidden">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80" 
          alt="Office Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-bg-primary/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-text-primary/10 via-text-primary/5 to-text-primary/10" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-left mb-20 max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white"
          >
            {t.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/80 leading-relaxed"
          >
            {t.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {t.items.map((service, index) => {
            const isEven = index % 2 === 0;
            const iconColor = isEven ? 'bg-astra-cyan' : 'bg-astra-navy';
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative group h-full"
              >
                <div className="liquid-glass rounded-t-[4rem] rounded-b-2xl p-8 pt-12 h-full flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 border-white/10">
                  {/* Circular Icon */}
                  <div className={`w-24 h-24 rounded-full ${iconColor} flex items-center justify-center mb-10 shadow-xl border-4 border-white/20 text-white shrink-0`}>
                    {React.cloneElement(SERVICES[index].icon as React.ReactElement, { size: 32, strokeWidth: 2.5 })}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-white uppercase tracking-wider">{service.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Projects = ({ lang }: { lang: 'en' | 'ar' }) => {
  const t = TRANSLATIONS[lang].projects;
  return (
    <section id="projects" className="section-padding bg-bg-primary overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-text-primary">{t.title}</h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group cursor-pointer p-10 rounded-[3rem] bg-white dark:bg-zinc-900 shadow-xl border border-glass-border hover:border-astra-cyan transition-all"
            >
              <div>
                <span className="text-astra-cyan text-xs font-bold uppercase tracking-widest mb-3 block">
                  {project.category}
                </span>
                <h3 className="text-3xl font-bold text-text-primary mb-3">{project.title}</h3>
                <p className="text-text-muted text-base leading-relaxed">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = ({ lang }: { lang: 'en' | 'ar' }) => {
  const t = TRANSLATIONS[lang].contact;
  return (
    <section id="contact" className="section-padding bg-astra-gray/50 dark:bg-astra-navy/50">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: lang === 'en' ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-8 text-text-primary">
              {t.title.split('amazing')[0]} <span className="text-text-primary underline decoration-text-primary/30 underline-offset-8">amazing</span> {t.title.split('amazing')[1]}
            </h2>
            <p className="text-xl text-text-muted mb-12 leading-relaxed">
              {t.subtitle}
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-900 flex items-center justify-center shadow-lg text-astra-cyan">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-1">{t.email}</p>
                  <a href="mailto:Izusafari211@gmail.com" className="text-xl font-bold text-text-primary hover:text-astra-cyan transition-colors">Izusafari211@gmail.com</a>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-900 flex items-center justify-center shadow-lg text-astra-cyan">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-1">{t.call}</p>
                  <a href="tel:+211920341412" className="text-xl font-bold text-text-primary hover:text-astra-cyan transition-colors">{t.phone}</a>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-900 flex items-center justify-center shadow-lg text-astra-cyan">
                  <Facebook size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-1">{t.facebook}</p>
                  <a href="https://www.facebook.com/designer.izu.4/" target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-text-primary hover:text-astra-cyan transition-colors">designer.izu.4</a>
                </div>
              </div>
              
              <div className="pt-8">
                <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-6">{t.follow}</p>
                <div className="flex gap-4">
                  {[
                    { icon: <Facebook size={22} />, href: "https://www.facebook.com/designer.izu.4/", name: "Facebook" },
                    { icon: <Github size={22} />, href: "#", name: "Github" },
                  ].map((social, i) => (
                    <a 
                      key={i} 
                      href={social.href} 
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.name}
                      className="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-900 flex items-center justify-center shadow-lg hover:bg-astra-cyan hover:text-astra-navy transition-all"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: lang === 'en' ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="liquid-glass p-12 rounded-[3rem] shadow-2xl"
          >
            <form 
              action="https://formspree.io/f/xjgjbybq"
              method="POST"
              className="space-y-8"
            >
              <input type="hidden" name="_subject" value="New Portfolio Contact Message" />
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">{t.nameLabel}</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  placeholder={t.placeholderName} 
                  className="w-full bg-white/50 dark:bg-zinc-800/50 border border-glass-border rounded-2xl px-8 py-5 focus:ring-2 focus:ring-astra-cyan/30 transition-all text-text-primary outline-none"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">{t.emailLabel}</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder={t.placeholderEmail} 
                  className="w-full bg-white/50 dark:bg-zinc-800/50 border border-glass-border rounded-2xl px-8 py-5 focus:ring-2 focus:ring-astra-cyan/30 transition-all text-text-primary outline-none"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">{t.messageLabel}</label>
                <textarea 
                  name="message"
                  rows={4} 
                  required
                  placeholder={t.placeholderMessage} 
                  className="w-full bg-white/50 dark:bg-zinc-800/50 border border-glass-border rounded-2xl px-8 py-5 focus:ring-2 focus:ring-astra-cyan/30 transition-all resize-none text-text-primary outline-none"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-text-primary text-bg-primary py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-all shadow-xl shadow-text-primary/10"
              >
                {t.send}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ lang }: { lang: 'en' | 'ar' }) => {
  const t = TRANSLATIONS[lang].footer;
  return (
    <footer className="py-16 px-6 bg-bg-primary border-t border-text-primary/10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        <p className="text-sm font-medium text-text-muted">
          © {new Date().getFullYear()} {t.copyright}
        </p>
        <div className="flex gap-10">
          <a href="#" className="text-sm font-bold text-text-muted hover:text-astra-cyan transition-colors">{t.privacy}</a>
          <a href="#" className="text-sm font-bold text-text-muted hover:text-astra-cyan transition-colors">{t.terms}</a>
          <a href="#" className="text-sm font-bold text-text-muted hover:text-astra-cyan transition-colors">{t.legal}</a>
        </div>
      </div>
    </footer>
  );
};

const Loader = () => {
  const [phase, setPhase] = useState(0);
  const name = "Designedby Izu";
  const letters = name.split("");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),   // Split to 4 dots
      setTimeout(() => setPhase(2), 1600),  // Move to row
      setTimeout(() => setPhase(3), 2400),  // Reveal text
      setTimeout(() => setPhase(4), 3200),  // Blueprint effect
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[200] bg-bg-primary flex items-center justify-center overflow-hidden"
    >
      <div className="relative flex items-center justify-center">
        {/* Phase 0-2: The Dots */}
        {phase < 3 && (
          <div className="relative flex items-center justify-center w-20 h-20">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  x: phase === 0 ? 0 : phase === 1 ? (i % 2 === 0 ? -15 : 15) : (i - 1.5) * 30,
                  y: phase === 0 ? 0 : phase === 1 ? (i < 2 ? -15 : 15) : 0,
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20,
                  delay: phase === 0 ? i * 0.1 : 0 
                }}
                className="absolute w-4 h-4 bg-text-primary rounded-full shadow-[0_0_15px_rgba(0,0,0,0.2)]"
              />
            ))}
          </div>
        )}

        {/* Phase 3-4: The Text */}
        <AnimatePresence>
          {phase >= 3 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative flex items-center justify-center"
            >
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-text-primary flex">
                {letters.map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    className="relative inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                    
                    {/* Phase 4: Blueprint Dots */}
                    {phase >= 4 && char !== " " && (
                      <>
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -left-1 w-2 h-2 bg-text-primary rounded-full border border-bg-primary z-10"
                        />
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1 }}
                          className="absolute -bottom-1 -right-1 w-2 h-2 bg-text-primary rounded-full border border-bg-primary z-10"
                        />
                        {i % 3 === 0 && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-text-primary rounded-full border border-bg-primary z-10"
                          />
                        )}
                      </>
                    )}
                  </motion.span>
                ))}
              </h1>

              {/* Phase 4: Blueprint Lines */}
              {phase >= 4 && (
                <div className="absolute inset-0 -m-10 pointer-events-none">
                  <motion.div 
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 0.2 }}
                    className="absolute top-1/4 left-0 right-0 h-[1px] bg-text-primary origin-left"
                  />
                  <motion.div 
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 0.2 }}
                    transition={{ delay: 0.1 }}
                    className="absolute top-1/2 left-0 right-0 h-[1px] bg-text-primary origin-left"
                  />
                  <motion.div 
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 0.2 }}
                    transition={{ delay: 0.2 }}
                    className="absolute top-3/4 left-0 right-0 h-[1px] bg-text-primary origin-left"
                  />
                  <motion.div 
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 0.2 }}
                    className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-text-primary origin-top"
                  />
                  <motion.div 
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 0.2 }}
                    transition={{ delay: 0.1 }}
                    className="absolute top-0 bottom-0 left-3/4 w-[1px] bg-text-primary origin-top"
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--color-astra-cyan) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
    </motion.div>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('light');
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    
    const savedLang = localStorage.getItem('lang') as 'en' | 'ar' || 'en';
    setLang(savedLang);
  }, []);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('lang', lang);
  }, [lang]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div className={`relative selection:bg-astra-cyan/30 ${lang === 'ar' ? 'font-sans' : 'font-sans'}`}>
      <AnimatePresence mode="wait">
        {isLoading && <Loader />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Navbar theme={theme} toggleTheme={toggleTheme} lang={lang} setLang={setLang} />
        
        <main>
          <Hero lang={lang} />
          <About lang={lang} />
          <Services lang={lang} />
          <Projects lang={lang} />
          <Contact lang={lang} />
        </main>

        <Footer lang={lang} />
      </motion.div>
    </div>
  );
}
