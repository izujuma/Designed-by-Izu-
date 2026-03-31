/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
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
  ExternalLink,
  ChevronRight
} from 'lucide-react';

// --- Types ---
interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Lumina Vision",
    category: "Brand Identity",
    image: "https://picsum.photos/seed/lumina/800/600",
    description: "A minimalist brand identity for a next-gen optics company."
  },
  {
    id: 2,
    title: "EcoSphere App",
    category: "UI/UX Design",
    image: "https://picsum.photos/seed/eco/800/600",
    description: "Mobile application focused on sustainable living and carbon tracking."
  },
  {
    id: 3,
    title: "Aether Dashboard",
    category: "Web Application",
    image: "https://picsum.photos/seed/aether/800/600",
    description: "Complex data visualization dashboard for cloud infrastructure."
  },
  {
    id: 4,
    title: "Nova E-commerce",
    category: "E-commerce",
    image: "https://picsum.photos/seed/nova/800/600",
    description: "High-end fashion retail experience with fluid transitions."
  }
];

const SERVICES: Service[] = [
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Visual Design",
    description: "Creating stunning visual languages that resonate with your target audience."
  },
  {
    icon: <Layout className="w-6 h-6" />,
    title: "UI/UX Design",
    description: "Crafting intuitive user interfaces and seamless user experiences."
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: "Web Development",
    description: "Building responsive, high-performance websites using modern technologies."
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "App Design",
    description: "Designing beautiful and functional mobile applications for iOS and Android."
  }
];

const PRICING: PricingPlan[] = [
  {
    name: "Visual Design",
    price: "$800",
    features: ["Brand Identity", "Logo Design", "Color Palette", "Typography", "2 Rounds of Revisions"]
  },
  {
    name: "UI/UX Design",
    price: "$1,500",
    features: ["User Research", "Wireframing", "Interactive Prototypes", "Mobile & Desktop", "Priority Support"],
    recommended: true
  },
  {
    name: "Full Development",
    price: "$3,000",
    features: ["Custom React App", "SEO Optimization", "CMS Integration", "Performance Tuning", "1 Month Support"]
  }
];

// --- Components ---

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('group')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 bg-apple-blue/20 rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block"
      animate={{
        x: mousePos.x - 16,
        y: mousePos.y - 16,
        scale: isHovered ? 2.5 : 1,
        backgroundColor: isHovered ? "rgba(0, 102, 204, 0.4)" : "rgba(0, 102, 204, 0.2)"
      }}
      transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.5 }}
    />
  );
};

const MagneticButton = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.35;
    const y = (clientY - (top + height / 2)) * 0.35;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

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

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About Me', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Service Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`glass rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'shadow-lg' : 'bg-white/40'}`}>
          <a href="#" className="font-display font-bold text-xl tracking-tight">
            designed by <span className="text-apple-blue">izu</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium hover:text-apple-blue transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="bg-apple-dark text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-apple-blue transition-all"
            >
              Order Now
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-6 right-6 mt-4 glass rounded-3xl p-8 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact" 
                className="bg-apple-blue text-white px-6 py-3 rounded-full text-center font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Order Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden perspective-1000">
      {/* Background Elements with slow floating 3D motion */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotateZ: [0, 5, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 -left-20 w-96 h-96 bg-apple-blue/10 rounded-full blur-3xl" 
      />
      <motion.div 
        animate={{ 
          y: [0, 20, 0],
          rotateZ: [0, -5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" 
      />

      <div className="section-padding text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full bg-apple-gray text-apple-blue text-xs font-bold uppercase tracking-widest mb-6"
          >
            Available for new projects
          </motion.span>
          
          <h1 className="heading-xl mb-8 leading-[1.1]">
            <TextReveal text="Hey, I am Designer" className="inline-flex" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-apple-blue to-purple-600">
              Izu
            </span> 
            <TextReveal text="and Welcome to my Site" className="inline-flex" />
          </h1>

          <p className="text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            <TextReveal text="I'm Izu, a multi-disciplinary designer focused on creating clean, functional, and beautiful digital products." className="text-xl" />
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <MagneticButton>
              <a 
                href="#projects" 
                className="w-full sm:w-auto bg-apple-dark text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-xl shadow-apple-dark/20"
              >
                View My Work <ArrowRight className="w-5 h-5" />
              </a>
            </MagneticButton>
            
            <MagneticButton>
              <a 
                href="#contact" 
                className="w-full sm:w-auto glass px-8 py-4 rounded-full font-semibold hover:bg-apple-gray transition-colors shadow-lg"
              >
                Contact Me
              </a>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  const { scrollYProgress } = useScroll();
  const y = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  return (
    <section id="about" className="section-padding bg-apple-gray/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="perspective-1000"
          >
            <div className="relative">
              <motion.div 
                whileHover={{ rotateY: 5, rotateX: -5, scale: 1.02 }}
                transition={{ duration: 0.5 }}
                className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
              >
                <motion.img 
                  style={{ y: useSpring(useScroll().scrollYProgress, { stiffness: 100, damping: 30 }) }}
                  src="https://picsum.photos/seed/izu-designer/800/1000" 
                  alt="Izu" 
                  className="w-full h-[120%] object-cover -mt-[10%]"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl shadow-xl max-w-[200px] z-10"
              >
                <p className="text-sm font-medium italic">"Design is not just what it looks like and feels like. Design is how it works."</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="heading-lg mb-8">About Me</h2>
            <div className="space-y-6 text-lg text-muted leading-relaxed">
              <p>
                Hello! I'm Izu, a digital designer with over 5 years of experience 
                in the industry. I believe that great design is invisible—it should 
                feel natural, intuitive, and effortless.
              </p>
              <p>
                My approach combines strategic thinking with creative execution. 
                I don't just make things look pretty; I solve problems and create 
                value for businesses and their users.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div>
                  <h4 className="text-apple-dark font-bold text-3xl mb-1">50+</h4>
                  <p className="text-sm uppercase tracking-wider font-bold">Projects Done</p>
                </div>
                <div>
                  <h4 className="text-apple-dark font-bold text-3xl mb-1">12+</h4>
                  <p className="text-sm uppercase tracking-wider font-bold">Happy Clients</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4">My Services</h2>
          <p className="text-muted max-w-xl mx-auto">
            I offer a wide range of design services to help your business stand out in the digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              whileHover={{ y: -10, rotateY: 5, scale: 1.05 }}
              className="p-8 rounded-3xl bg-apple-gray hover:bg-white hover:shadow-2xl transition-all duration-500 group perspective-1000"
            >
              <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-apple-blue group-hover:text-white flex items-center justify-center mb-6 transition-colors shadow-sm">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-muted text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="section-padding bg-apple-dark text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="heading-lg mb-4">My Projects</h2>
            <p className="text-white/60 max-w-xl">
              A collection of some of my favorite works that showcase my design philosophy and technical skills.
            </p>
          </div>
          <MagneticButton>
            <a href="#" className="flex items-center gap-2 text-apple-blue font-bold hover:gap-4 transition-all">
              View All Projects <ChevronRight className="w-5 h-5" />
            </a>
          </MagneticButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50, rotateY: index % 2 === 0 ? 10 : -10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer perspective-1000"
            >
              <motion.div 
                whileHover={{ rotateY: index % 2 === 0 ? 5 : -5, rotateX: 2, scale: 1.02 }}
                transition={{ duration: 0.6 }}
                className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 shadow-2xl"
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white text-apple-dark flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500">
                    <ExternalLink className="w-6 h-6" />
                  </div>
                </div>
              </motion.div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-apple-blue text-xs font-bold uppercase tracking-widest mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold mb-2">
                    <TextReveal text={project.title} className="justify-start" />
                  </h3>
                  <p className="text-white/60 text-sm">{project.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4">Service Pricing</h2>
          <p className="text-muted max-w-xl mx-auto">
            Transparent pricing for my specialized design and development services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-10 rounded-[2.5rem] flex flex-col ${plan.recommended ? 'bg-apple-dark text-white shadow-2xl scale-105 z-10' : 'bg-apple-gray'}`}
            >
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-sm opacity-60">/project</span>}
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.recommended ? 'bg-apple-blue text-white' : 'bg-white text-apple-blue'}`}>
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="opacity-80">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-full font-bold transition-all ${plan.recommended ? 'bg-apple-blue hover:bg-blue-600 text-white' : 'bg-apple-dark text-white hover:bg-apple-dark/80'}`}>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-apple-gray/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-lg mb-6">Let's build something <br /><span className="text-apple-blue">amazing</span> together.</h2>
            <p className="text-lg text-muted mb-10">
              Have a project in mind? Or just want to say hi? 
              Feel free to reach out to me anytime.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                  <Mail className="text-apple-blue" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted">Email Me</p>
                  <a href="mailto:Izusafari211@gmail.com" className="text-lg font-bold hover:text-apple-blue transition-colors">Izusafari211@gmail.com</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                  <Phone className="text-apple-blue" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted">Call Me</p>
                  <a href="tel:+211920341412" className="text-lg font-bold hover:text-apple-blue transition-colors">+211 920 341 412</a>
                </div>
              </div>
              
              <div className="pt-8">
                <p className="text-xs font-bold uppercase tracking-widest text-muted mb-4">Follow Me</p>
                <div className="flex gap-4">
                  {[
                    { icon: <Facebook className="w-5 h-5" />, href: "#", name: "Izu Juma" },
                    { icon: <Twitter className="w-5 h-5" />, href: "#" },
                    { icon: <Instagram className="w-5 h-5" />, href: "#" },
                    { icon: <Linkedin className="w-5 h-5" />, href: "#" },
                    { icon: <Github className="w-5 h-5" />, href: "#" },
                  ].map((social, i) => (
                    <a 
                      key={i} 
                      href={social.href} 
                      title={social.name}
                      className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm hover:bg-apple-blue hover:text-white transition-all hover:-translate-y-1"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-10 rounded-[2.5rem] shadow-xl"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted ml-1">Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full bg-white/50 border border-apple-dark/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-apple-blue/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted ml-1">Email</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full bg-white/50 border border-apple-dark/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-apple-blue/20 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted ml-1">Subject</label>
                <select className="w-full bg-white/50 border border-apple-dark/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-apple-blue/20 transition-all appearance-none">
                  <option>New Project</option>
                  <option>Consultation</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted ml-1">Message</label>
                <textarea 
                  rows={4} 
                  placeholder="Tell me about your project..." 
                  className="w-full bg-white/50 border border-apple-dark/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-apple-blue/20 transition-all resize-none"
                ></textarea>
              </div>
              <button className="w-full bg-apple-blue text-white py-5 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-apple-blue/20">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-apple-gray">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} designed by izu. All rights reserved.
        </p>
        <div className="flex gap-8">
          <a href="#" className="text-sm text-muted hover:text-apple-blue">Privacy Policy</a>
          <a href="#" className="text-sm text-muted hover:text-apple-blue">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative selection:bg-apple-blue selection:text-white">
      <CustomCursor />
      
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-apple-blue z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Pricing />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
