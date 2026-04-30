import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Menu, X, ChevronRight, ChevronLeft, MapPin, Phone, Mail, FileText, Download, Globe, ShieldCheck, Award, Users, ChevronDown, Play, ArrowUpRight } from 'lucide-react';

// --- GLOBAL STYLES & KEYFRAMES ---
const injectStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Montserrat:wght@300;400;500;600;700;800&display=swap');

    :root {
      --brand: #E60000;
      --bg: #FFFFFF;
      --text: #1A1A1A;
      --text-light: #666666;
      --radius-max: 12px;
    }

    * { box-sizing: border-box; }

    body, html {
      background-color: var(--bg);
      color: var(--text);
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
      width: 100%;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
      scroll-behavior: smooth;
    }

    .radius-max { border-radius: var(--radius-max); }
    
    /* Hide scrollbar */
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

    h1, h2, h3, h4, h5, .font-heading { font-family: 'Montserrat', sans-serif; }

    /* TRAILING CUSTOM CURSOR */
    .cursor-dot {
      position: fixed;
      top: 0; left: 0;
      width: 12px; height: 12px;
      background-color: var(--brand);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      opacity: 0; 
      transform: translate(-50%, -50%);
      transition: width 0.3s cubic-bezier(0.25, 1, 0.5, 1), height 0.3s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.3s, opacity 0.3s;
      mix-blend-mode: difference;
      display: flex;
      align-items: center;
      justify-content: center;
      color: transparent;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 1px;
    }
    .cursor-hover .cursor-dot {
      width: 60px; height: 60px;
      background-color: white;
      mix-blend-mode: difference;
    }
    .cursor-drag .cursor-dot {
      width: 80px; height: 80px;
      background-color: var(--brand);
      mix-blend-mode: normal;
      color: white;
    }

    /* SMOOTH ANIMATIONS */
    .hover-image-scale img { transition: transform 1.5s cubic-bezier(0.25, 1, 0.5, 1); }
    .hover-image-scale:hover img { transform: scale(1.05); }
    
    .portfolio-card { transition: opacity 0.4s ease, transform 0.4s ease; }
    .portfolio-container:hover .portfolio-card:not(:hover) { opacity: 0.4; transform: scale(0.98); }

    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes slowZoom {
      0% { transform: scale(1); }
      100% { transform: scale(1.15); }
    }
  `}</style>
);

// --- SEO & GEO MANAGER COMPONENT ---
// Injects dynamic Meta Tags and JSON-LD Structured Data for AI & Search Engines
const SEOManager = ({ title, description, schema }) => {
  useEffect(() => {
    document.title = `${title} | ABK Imports - India's Premier Pet Care Distributor`;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = `${title} | ABK Imports`;

  }, [title, description]);

  return schema ? (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  ) : null;
};

// --- UTILITY COMPONENTS ---

const Magnetic = ({ children, strength = 0.4, className = "" }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (window.innerWidth < 768) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <div ref={ref} onMouseMove={handleMouse} onMouseLeave={reset} className={`inline-block ${className}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)`, transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)' }}>
      {children}
    </div>
  );
};

const FadeUpReveal = ({ children, delayOffset = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`transition-all duration-[1s] ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'} ${className}`} style={{ transitionDelay: `${delayOffset}ms` }}>
      {children}
    </div>
  );
};

const PageHeader = ({ title, subtitle, bgImage }) => (
  <header className="relative w-full h-[50vh] md:h-[60vh] flex items-end pb-16 px-[3vw] bg-[#050505] overflow-hidden">
    {bgImage && (
      <div className="absolute inset-0 z-0">
        <img src={bgImage} alt={`${title} background showcasing ABK Imports quality`} className="w-full h-full object-cover opacity-40 animate-[slowZoom_20s_linear_infinite_alternate]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>
    )}
    <div className="relative z-10 w-full max-w-7xl text-left">
      <FadeUpReveal>
        <div className="flex items-center justify-start gap-3 mb-4">
           <div className="w-10 h-[2px] bg-[#E60000]" />
           <span className="text-white font-medium tracking-widest uppercase text-xs md:text-sm">{subtitle}</span>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-[7vw] font-heading font-extrabold text-white leading-[0.95] tracking-tighter uppercase text-left">
          {title}
        </h1>
      </FadeUpReveal>
    </div>
  </header>
);

// --- NAVIGATION COMPONENTS ---

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    let val = 0;
    const interval = setInterval(() => {
      val += Math.floor(Math.random() * 12) + 4;
      if (val >= 100) {
        val = 100;
        clearInterval(interval);
        setTimeout(() => setIsFading(true), 600);
        setTimeout(() => { document.body.style.overflow = ''; onComplete(); }, 1400);
      }
      setProgress(val);
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100000] bg-white flex flex-col items-start justify-center px-[5vw] transition-transform duration-[1.2s] ease-[cubic-bezier(0.77,0,0.175,1)] ${isFading ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="w-full max-w-lg flex flex-col items-start">
        <h2 className="text-4xl md:text-6xl font-heading font-extrabold text-[#111] mb-8 tracking-tighter leading-none flex items-end">
          ABK<span className="text-[#E60000] text-5xl md:text-7xl leading-[0.7]">.</span>
        </h2>
        <div className="w-full h-[2px] bg-gray-200 relative overflow-hidden radius-max mb-4">
          <div className="absolute top-0 left-0 h-full bg-[#E60000] transition-all duration-200 ease-out" style={{ width: `${progress}%` }} />
        </div>
        <div className="w-full flex justify-between font-mono text-[10px] text-gray-400 uppercase tracking-widest">
          <span>Loading Interface</span><span>{progress}%</span>
        </div>
      </div>
    </div>
  );
};

const FullScreenMenu = ({ isOpen, onClose, currentView }) => {
  const links = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'brands', label: 'Global Brands' },
    { id: 'research', label: 'Research' },
    { id: 'blogs', label: 'Blogs & Insights' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav aria-label="Main Navigation" className={`fixed inset-0 z-[90000] bg-[#111] text-white flex flex-col transition-transform duration-[0.8s] ease-[cubic-bezier(0.77,0,0.175,1)] ${isOpen ? 'translate-y-0 pointer-events-auto' : '-translate-y-full pointer-events-none'}`}>
      <div className="px-[3vw] py-6 flex justify-between items-center border-b border-white/10 shrink-0">
        <a href="#/home" onClick={onClose} className="text-2xl font-heading font-extrabold tracking-tighter leading-none flex items-end text-left" aria-label="ABK Imports Home">
          ABK<span className="text-[#E60000] text-3xl leading-[0.7]">.</span>
        </a>
        <Magnetic>
          <button onClick={onClose} aria-label="Close Menu" className="p-2 hover:text-[#E60000] transition-colors" data-cursor="hover">
            <X size={32} strokeWidth={1} />
          </button>
        </Magnetic>
      </div>

      <div className="flex-1 flex flex-col md:flex-row px-[3vw] pt-12 pb-24 overflow-y-auto overflow-x-hidden no-scrollbar">
        <div className="w-full md:w-2/3 flex flex-col items-start gap-4 md:gap-8">
          {links.map((link, i) => (
            <div key={link.id} className="overflow-hidden py-4 -my-4 w-full text-left">
              <a 
                href={`#/${link.id}`}
                onClick={(e) => { onClose(); window.scrollTo(0,0); }}
                className={`block text-left text-[8.5vw] sm:text-6xl md:text-7xl font-heading font-bold whitespace-nowrap tracking-tighter transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} ${currentView === link.id ? 'text-[#E60000]' : 'hover:text-white/70'}`}
                style={{ transitionDelay: `${isOpen ? 200 + (i * 100) : 0}ms` }}
                data-cursor="hover"
              >
                {link.label}
              </a>
            </div>
          ))}
        </div>
        
        <div className={`mt-16 md:mt-0 w-full md:w-1/3 flex flex-col justify-end items-start transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: isOpen ? '600ms' : '0ms' }}>
          <div className="text-left flex flex-col items-start w-full">
            <h4 className="font-heading font-bold text-[#E60000] mb-4 uppercase tracking-widest text-xs">Partner Portal</h4>
            <a href="#/contact" onClick={onClose} className="inline-block bg-white text-black px-8 py-4 radius-max font-semibold text-sm hover:bg-[#E60000] hover:text-white transition-colors duration-300 mb-10" data-cursor="hover">
              B2B Login
            </a>
            <h4 className="font-heading font-bold text-[#E60000] mb-4 uppercase tracking-widest text-xs">Direct Line</h4>
            <a href="mailto:partners@abkimports.com" className="text-white/70 text-lg hover:text-white transition-colors cursor-pointer text-left block" data-cursor="hover">partners@abkimports.com</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Header = ({ onOpenMenu, currentView }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDarkPage = currentView !== 'home' && window.scrollY < window.innerHeight * 0.5;

  return (
    <header className={`fixed top-0 w-full z-50 px-[3vw] py-6 flex justify-between items-center transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 py-4' : 'bg-transparent text-white'}`}>
      <Magnetic strength={0.2}>
        <a href="#/home" onClick={() => window.scrollTo(0,0)} className={`text-2xl md:text-3xl font-heading font-extrabold tracking-tighter leading-none flex items-end cursor-pointer ${scrolled ? 'text-black' : (isDarkPage ? 'text-white' : 'text-white')} text-left`} aria-label="ABK Imports Home" data-cursor="hover">
          ABK<span className="text-[#E60000] text-3xl md:text-4xl leading-[0.7]">.</span>
        </a>
      </Magnetic>
      
      <div className={`flex items-center gap-5 md:gap-8 ${scrolled ? 'text-black' : 'text-white'}`}>
        <Magnetic>
          <button onClick={onOpenMenu} aria-label="Open Navigation Menu" aria-expanded="false" data-cursor="hover" className="flex items-center gap-2 hover:text-[#E60000] transition-colors ml-2 md:ml-6 text-left">
            <span className="hidden md:block text-sm font-medium uppercase tracking-widest mt-1">Menu</span>
            <Menu size={28} strokeWidth={1.5} />
          </button>
        </Magnetic>
      </div>
    </header>
  );
};

// --- PAGES ---

// 1. HOME PAGE
const HomePage = ({ isReady }) => {
  const col1Ref = useRef(null);
  const col2Ref = useRef(null);
  const col3Ref = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let rafId;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (col1Ref.current) col1Ref.current.style.transform = `translateY(${y * 0.15}px)`;
        if (col2Ref.current) col2Ref.current.style.transform = `translateY(${y * 0.3}px)`;
        if (col3Ref.current) col3Ref.current.style.transform = `translateY(${y * 0.1}px)`;
        if (textRef.current) textRef.current.style.transform = `translateY(${-y * 0.15}px)`;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => { window.removeEventListener('scroll', handleScroll); cancelAnimationFrame(rafId); };
  }, []);

  const brands = [
    { name: "Andis", category: "Grooming Tools", img: "https://images.unsplash.com/photo-1585559606675-01e141a02fb4?auto=format&fit=crop&w=800&q=80" },
    { name: "TropiClean", category: "Wellness & Hygiene", img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80" },
    { name: "Orijen", category: "Clinical Nutrition", img: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80" },
    { name: "Kong", category: "Behavioral Enrichment", img: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=800&q=80" },
  ];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ABK Imports",
    "url": "https://www.abkimports.com",
    "logo": "https://www.abkimports.com/logo.png",
    "description": "India's premier import and distribution partner for global pet care brands.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Office No. 402, Verdant 84, North Main Road, Koregaon Park East",
      "addressLocality": "Pune",
      "postalCode": "411036",
      "addressCountry": "IN"
    }
  };

  return (
    <article>
      <SEOManager title="Home" description="ABK Imports is India’s trusted B2B partner for exclusive pet products. Elevating the pet industry one paw at a time." schema={organizationSchema} />
      
      {/* SECTION 1: Hero Video Split */}
      <section aria-label="Hero Section" className="relative w-full h-screen flex items-end pb-24 md:pb-32 px-[3vw] overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 z-0 grid grid-cols-3 gap-1 md:gap-[2px] bg-black h-[120%] -top-[10%]">
          <div className={`relative w-full h-full overflow-hidden bg-[#111] transition-transform duration-[1.5s] ease-[cubic-bezier(0.77,0,0.175,1)] ${isReady ? 'translate-y-0' : '-translate-y-full'}`} style={{ transitionDelay: '100ms' }}>
             <div ref={col1Ref} className="absolute inset-0 w-full h-full will-change-transform scale-[1.15]">
               <video autoPlay loop muted playsInline aria-hidden="true" className="absolute inset-0 w-full h-full object-cover animate-[slowZoom_25s_linear_infinite_alternate] opacity-70 md:opacity-80"><source src="https://video.wixstatic.com/video/548938_9ce4b3046ac6488e9e5c9435da62afb8/1080p/mp4/file.mp4" type="video/mp4" /></video>
             </div>
          </div>
          <div className={`relative w-full h-full overflow-hidden bg-[#111] transition-transform duration-[1.5s] ease-[cubic-bezier(0.77,0,0.175,1)] ${isReady ? 'translate-y-0' : 'translate-y-full'}`} style={{ transitionDelay: '300ms' }}>
             <div ref={col2Ref} className="absolute inset-0 w-full h-full will-change-transform scale-[1.15]">
               <video autoPlay loop muted playsInline aria-hidden="true" className="absolute inset-0 w-full h-full object-cover animate-[slowZoom_20s_linear_infinite_alternate-reverse] opacity-70 md:opacity-80"><source src="https://video.wixstatic.com/video/548938_eb51c35dc901482884a1bba59e95f225/1080p/mp4/file.mp4" type="video/mp4" /></video>
             </div>
          </div>
          <div className={`relative w-full h-full overflow-hidden bg-[#111] transition-transform duration-[1.5s] ease-[cubic-bezier(0.77,0,0.175,1)] ${isReady ? 'translate-y-0' : '-translate-y-full'}`} style={{ transitionDelay: '500ms' }}>
             <div ref={col3Ref} className="absolute inset-0 w-full h-full will-change-transform scale-[1.15]">
               <video autoPlay loop muted playsInline aria-hidden="true" className="absolute inset-0 w-full h-full object-cover animate-[slowZoom_22s_linear_infinite_alternate] opacity-70 md:opacity-80"><source src="https://video.wixstatic.com/video/548938_096226587ef947238fc2d59bd40e0eb4/1080p/mp4/file.mp4" type="video/mp4" /></video>
             </div>
          </div>
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#000000] via-black/50 to-transparent pointer-events-none" />
        <div ref={textRef} className="relative z-20 w-full max-w-7xl text-left">
          <FadeUpReveal>
            <div className="flex items-center justify-start gap-3 mb-6">
               <div className="w-10 h-[2px] bg-[#E60000]" />
               <span className="text-white font-medium tracking-widest uppercase text-xs md:text-sm shadow-sm">India’s trusted partner for exclusive pet products</span>
            </div>
          </FadeUpReveal>
          <FadeUpReveal delayOffset={100}>
            <h1 className="text-5xl md:text-7xl lg:text-[8vw] font-heading font-extrabold text-white leading-[0.95] tracking-tighter mb-8 drop-shadow-lg text-left">
              CHANGING THE <br className="hidden md:block" /> PET INDUSTRY.
            </h1>
            <p className="text-xl md:text-3xl text-white/90 font-light tracking-wide mb-10 text-left">One Paw at a Time</p>
          </FadeUpReveal>
          <FadeUpReveal delayOffset={200}>
            <Magnetic>
              <a href="#/brands" onClick={() => window.scrollTo(0,0)} data-cursor="hover" className="inline-flex bg-[#E60000] text-white px-8 py-4 md:px-10 md:py-5 radius-max font-semibold text-sm hover:bg-white hover:text-[#E60000] transition-colors duration-300 items-center gap-3">
                Explore our Product Range <ArrowRight size={18} />
              </a>
            </Magnetic>
          </FadeUpReveal>
        </div>
      </section>

      {/* SECTION 2: Who Are We */}
      <section aria-labelledby="who-are-we" className="py-32 bg-white">
        <div className="px-[3vw] max-w-[1800px] flex flex-col lg:flex-row gap-16 lg:gap-24 items-start md:items-center">
          <div className="w-full lg:w-1/2 text-left">
            <FadeUpReveal>
              <div className="flex items-center gap-3 mb-4 justify-start"><div className="w-10 h-[2px] bg-[#E60000]" /><span className="text-gray-500 font-medium tracking-widest uppercase text-sm">Who are we?</span></div>
              <h2 id="who-are-we" className="text-4xl md:text-5xl font-heading font-extrabold tracking-tighter text-[#111] mb-8 leading-tight">
                Powering India’s Pet Industry with Global Expertise
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-10">
                From sourcing premium products worldwide to building trusted in-house brands, ABK Imports brings quality, innovation, and reliability to every pet household.
              </p>
              <Magnetic>
                <a href="#/about" onClick={() => window.scrollTo(0,0)} className="inline-flex text-black font-bold uppercase tracking-widest text-sm hover:text-[#E60000] transition-colors items-center gap-2" data-cursor="hover">
                  More about ABK <ArrowRight size={16} />
                </a>
              </Magnetic>
            </FadeUpReveal>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col items-start">
             <FadeUpReveal>
                <p className="text-[#E60000] font-heading font-extrabold text-6xl md:text-8xl mb-4 tracking-tighter">SINCE 2011</p>
             </FadeUpReveal>
             <div className="w-full h-[400px] radius-max overflow-hidden relative">
               <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80" alt="ABK Imports leadership and team meeting" className="w-full h-full object-cover" />
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Category Hubs */}
      <section aria-labelledby="category-hubs" className="py-32 bg-[#F9F9F9]">
        <div className="px-[3vw] max-w-[1800px] text-left">
          <FadeUpReveal>
             <div className="flex items-center justify-start gap-3 mb-4"><div className="w-10 h-[2px] bg-[#E60000]" /><span className="text-gray-500 font-medium tracking-widest uppercase text-sm">Our Collection</span></div>
             <h2 id="category-hubs" className="text-4xl md:text-6xl font-heading font-extrabold tracking-tighter text-[#111] mb-16">CATEGORY HUBS.</h2>
          </FadeUpReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { title: 'Dog Salon', img: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80' },
               { title: 'Daily Essentials', img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80' },
               { title: 'Vet Tech', img: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80' }
             ].map((cat, i) => (
                <FadeUpReveal key={i} delayOffset={i * 100}>
                  <a href="#/brands" className="group relative w-full h-[400px] radius-max overflow-hidden cursor-pointer block text-left" data-cursor="hover" aria-label={`Explore ${cat.title} Category`}>
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500 z-10" />
                    <img src={cat.img} alt={`ABK Imports ${cat.title} Pet Care Category`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 p-8 flex items-end justify-start z-20">
                       <h3 className="text-3xl font-heading font-bold text-white text-left">{cat.title}</h3>
                    </div>
                  </a>
                </FadeUpReveal>
             ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Brands Slider */}
      <section aria-labelledby="curated-brands" className="py-32 bg-white overflow-hidden border-t border-gray-100">
        <div className="px-[3vw] max-w-[1800px] flex justify-between items-end mb-16 text-left">
          <FadeUpReveal>
            <div className="flex items-center justify-start gap-3 mb-4"><div className="w-10 h-[2px] bg-[#E60000]" /><span className="text-gray-500 font-medium tracking-widest uppercase text-sm">The Portfolio</span></div>
            <h2 id="curated-brands" className="text-4xl md:text-6xl font-heading font-extrabold tracking-tighter text-[#111]">CURATED BRANDS.</h2>
          </FadeUpReveal>
        </div>
        <div className="portfolio-container flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-10" style={{ paddingLeft: '3vw', paddingRight: '3vw' }} data-cursor="drag">
          {brands.map((brand, idx) => (
            <a key={idx} href="#/brands" onClick={() => window.scrollTo(0,0)} className="portfolio-card snap-start shrink-0 w-[85vw] md:w-[400px] h-[500px] relative radius-max overflow-hidden group cursor-pointer text-left block" aria-label={`View ${brand.name} Brand Details`}>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />
              <img src={brand.img} alt={`Premium Pet Brand: ${brand.name}`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 p-8 flex flex-col justify-between items-start z-20">
                <div className="flex w-full justify-end">
                  <div className="w-10 h-10 radius-max bg-white/90 text-black flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"><ArrowRight size={20} className="-rotate-45" /></div>
                </div>
                <div className="text-left w-full">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#E60000] mb-2 bg-white/90 backdrop-blur-sm px-3 py-1 inline-block radius-max">{brand.category}</p>
                  <h3 className="text-3xl font-heading font-bold text-white tracking-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{brand.name}</h3>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* SECTION 5: Operational Superiority */}
      <section aria-labelledby="operational-superiority" className="py-32 md:py-48 bg-[#111] text-white">
        <div className="px-[3vw] max-w-[1800px] text-left">
           <FadeUpReveal>
             <h2 id="operational-superiority" className="text-4xl md:text-7xl font-heading font-extrabold tracking-tighter mb-24 text-left uppercase">
                OPERATIONAL<br/><span className="text-[#E60000]">SUPERIORITY.</span>
             </h2>
           </FadeUpReveal>
           <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-start md:items-center py-16 border-b border-white/10">
              <div className="w-full md:w-1/2 h-[50vh] radius-max overflow-hidden hover-image-scale relative">
                 <img src="https://images.unsplash.com/photo-1586528116311-ad8ed7c80a30?auto=format&fit=crop&w=1200&q=80" alt="ABK Imports Climate Controlled Intelligent Logistics Warehouse" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="w-full md:w-1/2 text-left">
                 <FadeUpReveal>
                    <h3 className="text-4xl md:text-5xl font-heading font-bold mb-6 tracking-tight">Intelligent Logistics</h3>
                    <p className="text-gray-400 text-lg leading-relaxed mb-10">
                       A completely climate-controlled, state-of-the-art warehousing network ensuring the integrity of delicate clinical nutrition and pharmacological products from arrival to dispatch.
                    </p>
                    <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-8 text-left">
                       <div><p className="text-[#E60000] font-heading font-bold text-3xl mb-1">24/7</p><p className="text-xs uppercase tracking-widest text-gray-500 font-bold">Climate Monitoring</p></div>
                       <div><p className="text-[#E60000] font-heading font-bold text-3xl mb-1">100%</p><p className="text-xs uppercase tracking-widest text-gray-500 font-bold">Automated Routing</p></div>
                    </div>
                 </FadeUpReveal>
              </div>
           </div>
           <div className="flex flex-col md:flex-row-reverse gap-12 lg:gap-24 items-start md:items-center py-16">
              <div className="w-full md:w-1/2 h-[50vh] radius-max overflow-hidden hover-image-scale relative">
                 <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80" alt="ABK Imports Strategic B2B Partnerships Handshake" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="w-full md:w-1/2 text-left">
                 <FadeUpReveal>
                    <h3 className="text-4xl md:text-5xl font-heading font-bold mb-6 tracking-tight">Strategic Partnerships</h3>
                    <p className="text-gray-400 text-lg leading-relaxed mb-10">
                       We don't just supply; we empower. Our B2B portal provides retail partners and clinics with dedicated account management, priority inventory allocation, and marketing support.
                    </p>
                    <Magnetic>
                      <a href="#/contact" onClick={() => window.scrollTo(0,0)} className="inline-flex bg-white text-black px-10 py-5 radius-max font-bold text-sm hover:bg-[#E60000] hover:text-white transition-colors duration-300 items-center gap-3" data-cursor="hover">
                        Join the Network <ArrowRight size={18} />
                      </a>
                    </Magnetic>
                 </FadeUpReveal>
              </div>
           </div>
        </div>
      </section>

      {/* SECTION 6: Why Choose ABK */}
      <section aria-label="Why Choose ABK" className="py-32 bg-white">
        <div className="px-[3vw] max-w-[1800px] flex flex-col lg:flex-row gap-24 items-start text-left">
          <div className="w-full lg:w-1/3 text-left">
             <FadeUpReveal>
               <h2 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tighter uppercase sticky top-32 text-[#111]">
                 WHY CHOOSE <span className="text-[#E60000]">ABK?</span>
               </h2>
             </FadeUpReveal>
          </div>
          <div className="w-full lg:w-2/3 flex flex-col gap-12 border-t border-gray-200 pt-12 items-start text-left">
             {[
               { num: "01", text: "Wide range of exclusive pet products" },
               { num: "02", text: "Trusted by groomers, retailers, & professionals alike" },
               { num: "03", text: "Sourced from leading global brands" },
               { num: "04", text: "Consistent quality & reliability" },
               { num: "05", text: "Dedicated support for business partners" }
             ].map((item, idx) => (
                <FadeUpReveal key={idx} delayOffset={idx * 100}>
                   <div className="flex items-start justify-start gap-8 group text-left">
                      <span className="text-3xl md:text-4xl font-heading font-bold text-gray-300 group-hover:text-[#E60000] transition-colors">{item.num}</span>
                      <h3 className="text-3xl md:text-5xl font-heading font-bold tracking-tight text-gray-800 group-hover:text-black transition-colors leading-tight">{item.text}</h3>
                   </div>
                </FadeUpReveal>
             ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Testimonials */}
      <section aria-label="Customer Testimonials" className="py-32 bg-[#F9F9F9]">
        <div className="px-[3vw] max-w-[1800px] flex flex-col items-start text-left">
           <FadeUpReveal>
              <div className="w-20 h-20 bg-[#E60000] text-white radius-max flex items-center justify-center mb-10">
                 <span className="text-4xl font-heading leading-none pt-4">"</span>
              </div>
              <blockquote className="text-2xl md:text-4xl font-heading font-medium text-[#111] max-w-4xl leading-relaxed mb-12 text-left">
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
              </blockquote>
              <cite className="text-[#E60000] font-bold tracking-widest uppercase text-sm mb-2 block not-italic">~ Name of the Person</cite>
              <p className="text-gray-500 font-medium">Lorem Ipsum is simply dummy text</p>
           </FadeUpReveal>
        </div>
      </section>

      {/* SECTION 8: Guiding Better Pet Care */}
      <section aria-labelledby="pet-care-insights" className="py-32 bg-white">
        <div className="px-[3vw] max-w-[1800px] text-left">
          <FadeUpReveal>
            <div className="flex items-center gap-3 mb-4 justify-start"><div className="w-10 h-[2px] bg-[#E60000]" /><span className="text-gray-500 font-medium tracking-widest uppercase text-sm">Trusted Across the Pet Industry</span></div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 text-left">
              <div className="max-w-2xl text-left">
                 <h2 id="pet-care-insights" className="text-4xl md:text-6xl font-heading font-extrabold tracking-tighter text-[#111] mb-6 uppercase">GUIDING BETTER PET CARE.</h2>
                 <p className="text-gray-600 text-lg leading-relaxed">Access practical insights, product guides, and expert knowledge to make informed choices for pets and businesses alike.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                 <a href="#/blogs" onClick={() => window.scrollTo(0,0)} className="inline-block bg-black text-white px-8 py-4 radius-max font-semibold text-sm hover:bg-[#E60000] transition-colors text-left" data-cursor="hover">Read our Blogs</a>
                 <a href="#/research" onClick={() => window.scrollTo(0,0)} className="inline-block border border-gray-300 text-black px-8 py-4 radius-max font-semibold text-sm hover:bg-black hover:text-white transition-colors text-left" data-cursor="hover">Explore Product Guides</a>
              </div>
            </div>
          </FadeUpReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12 text-left">
            {[
              { title: "The Rise of Holistic Nutrition in Pet Care", date: "Oct 12, 2026", img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80" },
              { title: "Optimizing Clinic Inventory for Q4", date: "Sep 28, 2026", img: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80" }
            ].map((blog, idx) => (
              <FadeUpReveal key={idx} delayOffset={idx * 100}>
                <a href="#/blogs" onClick={() => window.scrollTo(0,0)} className="group cursor-pointer block text-left" data-cursor="hover">
                  <div className="w-full h-[300px] md:h-[400px] radius-max overflow-hidden mb-6 relative">
                    <img src={blog.img} alt={`Blog post: ${blog.title}`} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  </div>
                  <p className="text-sm font-bold uppercase tracking-widest text-[#E60000] mb-3">{blog.date}</p>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-[#111] group-hover:text-[#E60000] transition-colors">{blog.title}</h3>
                </a>
              </FadeUpReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: Final CTA */}
      <section aria-label="Call to Action" className="py-32 bg-[#E60000] text-white text-left">
         <div className="max-w-[1200px] px-[3vw] text-left">
            <FadeUpReveal>
               <h2 className="text-5xl md:text-7xl font-heading font-extrabold mb-8 uppercase tracking-tight text-left">Ready to elevate your business?</h2>
               <p className="text-xl md:text-2xl mb-12 max-w-3xl opacity-90 leading-relaxed text-left">Join thousands of leading clinics and retail stores relying on ABK Imports for premium pet care distribution.</p>
               <Magnetic>
                 <a href="#/contact" onClick={() => window.scrollTo(0,0)} className="inline-flex bg-black text-white px-10 py-5 radius-max font-bold text-sm hover:bg-white hover:text-black transition-colors shadow-2xl items-center gap-2" data-cursor="hover">
                    Become a Partner <ArrowRight size={18}/>
                 </a>
               </Magnetic>
            </FadeUpReveal>
         </div>
      </section>
    </article>
  );
};

// 2. ABOUT PAGE (7 Sections)
const AboutPage = () => {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About ABK Imports",
    "description": "Learn about ABK Imports' history, core values, and executive leadership in the Indian pet care market."
  };

  return (
    <article>
      <SEOManager title="About Us" description="Discover the ethos, core values, and history of ABK Imports. Powering India's pet industry with global expertise." schema={aboutSchema} />
      {/* S1: Header */}
      <PageHeader title="Our Ethos." subtitle="About ABK Imports" bgImage="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1600&q=80" />
      
      {/* S2: Intro */}
      <section aria-labelledby="ethos-intro" className="max-w-[1200px] px-[3vw] pt-24 pb-16 border-b border-gray-100 text-left">
        <FadeUpReveal>
          <h2 id="ethos-intro" className="text-3xl md:text-5xl font-heading font-extrabold text-[#111] mb-12 leading-tight">
            WE BRIDGE THE GAP BETWEEN <span className="text-[#E60000]">GLOBAL INNOVATION</span> AND LOCAL WELL-BEING.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg text-gray-600 leading-relaxed">
            <p>Founded on the belief that pets deserve the absolute best the world has to offer, ABK Imports has grown into a formidable nationwide distribution network. We meticulously vet, import, and deliver the highest tier of clinical nutrition, grooming technology, and care products to the Indian market.</p>
            <p>Our infrastructure is built for scale without sacrificing precision. From our climate-controlled warehouses to our dedicated B2B account managers, every facet of our operation is designed to empower clinics, retailers, and grooming salons to offer unparalleled care.</p>
          </div>
        </FadeUpReveal>
      </section>

      {/* S3: Stats */}
      <section aria-label="Company Statistics" className="bg-[#F9F9F9] py-16">
        <div className="max-w-[1500px] px-[3vw] text-left">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { stat: "15+", label: "Years Experience" },
              { stat: "10,000+", label: "Monthly B2B Orders" },
              { stat: "100%", label: "Pan-India Reach" },
              { stat: "50+", label: "Global Partners" }
            ].map((item, idx) => (
              <FadeUpReveal key={idx} delayOffset={idx * 100}>
                <div className="text-left border-l-2 border-[#E60000] pl-6">
                  <p className="text-4xl md:text-5xl font-heading font-bold text-[#111] mb-2">{item.stat}</p>
                  <p className="text-xs md:text-sm uppercase tracking-widest text-gray-500 font-bold">{item.label}</p>
                </div>
              </FadeUpReveal>
            ))}
          </div>
        </div>
      </section>

      {/* S4: Core Values */}
      <section aria-labelledby="core-values" className="max-w-[1500px] px-[3vw] py-24 text-left">
        <FadeUpReveal>
          <div className="flex items-center gap-3 mb-10 justify-start"><div className="w-10 h-[2px] bg-[#E60000]" /><span className="text-gray-500 font-medium tracking-widest uppercase text-sm">Pillars of Operation</span></div>
          <h2 id="core-values" className="text-4xl md:text-5xl font-heading font-extrabold text-[#111] mb-16">CORE VALUES.</h2>
        </FadeUpReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          {[
            { icon: <ShieldCheck size={32} aria-hidden="true"/>, title: "Uncompromising Quality", desc: "Every product imported undergoes rigorous vetting to ensure it meets our clinical and ethical standards before reaching your shelves." },
            { icon: <Globe size={32} aria-hidden="true"/>, title: "Global to Local", desc: "We navigate complex international logistics to bring world-class pet care innovations directly to the Indian market seamlessly." },
            { icon: <Award size={32} aria-hidden="true"/>, title: "Partner Empowerment", desc: "We view our B2B clients as partners. Your growth is our growth, supported by our robust educational and marketing resources." }
          ].map((val, i) => (
            <FadeUpReveal key={i} delayOffset={i * 100}>
               <div className="p-8 bg-white radius-max border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300">
                 <div className="w-16 h-16 bg-red-50 text-[#E60000] rounded-full flex items-center justify-center mb-6">{val.icon}</div>
                 <h3 className="text-2xl font-heading font-bold mb-4">{val.title}</h3>
                 <p className="text-gray-600 leading-relaxed">{val.desc}</p>
               </div>
            </FadeUpReveal>
          ))}
        </div>
      </section>

      {/* S5: The Timeline */}
      <section aria-labelledby="timeline" className="bg-[#111] text-white py-24">
         <div className="max-w-[1200px] px-[3vw] text-left">
            <FadeUpReveal>
              <h2 id="timeline" className="text-4xl md:text-5xl font-heading font-extrabold mb-16 text-left">OUR JOURNEY.</h2>
            </FadeUpReveal>
            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
              {[
                { year: "2011", title: "Inception", desc: "ABK Imports is founded with a vision to revolutionize the Indian pet care market by introducing premium grooming tools." },
                { year: "2015", title: "National Expansion", desc: "Established a robust pan-India distribution network, securing exclusive rights for top global nutrition brands." },
                { year: "2020", title: "Logistics Upgrade", desc: "Launched our state-of-the-art, climate-controlled warehousing facilities to handle sensitive clinical diets." },
                { year: "2026", title: "Digital First", desc: "Introduced advanced B2B portals and AI-driven stocking intelligence for our partners." }
              ].map((milestone, idx) => (
                 <FadeUpReveal key={idx} delayOffset={idx*100}>
                   <div className="relative flex items-start gap-8 group is-active text-left">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#111] bg-[#E60000] shrink-0 shadow mt-1" />
                      <div className="flex-1 p-6 radius-max bg-[#1A1A1A] border border-white/5 hover:border-[#E60000] transition-colors text-left">
                        <div className="flex items-start md:items-center justify-between flex-col md:flex-row mb-2 gap-2 text-left w-full">
                          <h3 className="font-heading font-bold text-xl">{milestone.title}</h3>
                          <span className="text-[#E60000] font-bold">{milestone.year}</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-2xl text-left">{milestone.desc}</p>
                      </div>
                   </div>
                 </FadeUpReveal>
              ))}
            </div>
         </div>
      </section>

      {/* S6: Meet The Leadership */}
      <section aria-labelledby="leadership" className="bg-[#F9F9F9] py-24 text-left">
         <div className="max-w-[1500px] px-[3vw] text-left">
            <FadeUpReveal>
               <h2 id="leadership" className="text-4xl font-heading font-extrabold mb-12 text-left text-[#111]">EXECUTIVE LEADERSHIP.</h2>
            </FadeUpReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
               {[
                 { name: "Aarav Sharma", role: "Chief Executive Officer", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80" },
                 { name: "Priya Patel", role: "Head of Global Logistics", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" },
                 { name: "Vikram Singh", role: "VP of Retail Partnerships", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80" }
               ].map((leader, idx) => (
                  <FadeUpReveal key={idx} delayOffset={idx * 100}>
                     <div className="bg-white p-8 radius-max border border-gray-100 text-left hover:border-black transition-colors" data-cursor="hover">
                        <div className="w-32 h-32 rounded-full overflow-hidden mb-6">
                           <img src={leader.img} alt={`Portrait of ${leader.name}, ${leader.role} at ABK Imports`} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="font-heading font-bold text-2xl text-[#111] mb-1">{leader.name}</h3>
                        <p className="text-[#E60000] font-bold text-xs uppercase tracking-widest">{leader.role}</p>
                     </div>
                  </FadeUpReveal>
               ))}
            </div>
         </div>
      </section>

      {/* S7: Infrastructure Highlight */}
      <section aria-labelledby="infrastructure" className="max-w-[1500px] px-[3vw] py-24 flex flex-col md:flex-row gap-16 items-start md:items-center text-left">
         <div className="w-full md:w-1/2 h-[500px] radius-max overflow-hidden relative group">
            <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80" alt="ABK Imports Operations Headquarters and Warehouse Facility" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
         </div>
         <div className="w-full md:w-1/2 text-left">
           <FadeUpReveal>
              <div className="flex items-center gap-3 mb-4 justify-start"><div className="w-10 h-[2px] bg-[#E60000]" /><span className="text-gray-500 font-medium tracking-widest uppercase text-sm">Headquarters</span></div>
              <h2 id="infrastructure" className="text-4xl md:text-5xl font-heading font-extrabold text-[#111] mb-6">THE RESQ HQ.</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">Our central operations hub is the nerve center of our nationwide distribution. It houses our corporate strategy teams, quality control divisions, and primary warehousing.</p>
              <a href="#/contact" onClick={() => window.scrollTo(0,0)} className="inline-flex bg-black text-white px-8 py-4 radius-max font-semibold text-sm hover:bg-[#E60000] transition-colors items-center gap-2">Contact Us <ArrowRight size={16}/></a>
           </FadeUpReveal>
         </div>
      </section>
    </article>
  );
};

// 3. BRANDS PAGE (6 Sections)
const BrandsPage = () => {
  const brandsFull = [
    { name: "Andis", category: "Grooming Tools", desc: "Professional clippers trusted by top groomers worldwide.", img: "https://images.unsplash.com/photo-1585559606675-01e141a02fb4?auto=format&fit=crop&w=800&q=80" },
    { name: "TropiClean", category: "Wellness", desc: "Natural grooming products focusing on dental health.", img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80" },
    { name: "Orijen", category: "Nutrition", desc: "Biologically appropriate diets from fresh ingredients.", img: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80" },
    { name: "Kong", category: "Enrichment", desc: "Durable, interactive toys to stimulate natural instincts.", img: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=800&q=80" },
    { name: "Wahl", category: "Grooming Tools", desc: "Heavy-duty clipping solutions for veterinary clinics.", img: "https://images.unsplash.com/photo-1537151608804-ea6f11cc3622?auto=format&fit=crop&w=800&q=80" },
    { name: "Acana", category: "Nutrition", desc: "High-protein, grain-free diets mirroring evolutionary diets.", img: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80" },
  ];

  const brandSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "ABK Imports Brand Portfolio",
    "description": "Explore premium global pet care brands imported and distributed by ABK Imports."
  };

  return (
    <article className="bg-[#F9F9F9] pb-32">
      <SEOManager title="Global Brands Portfolio" description="Explore our curated portfolio of global pet care brands including Orijen, Kong, Andis, and TropiClean, exclusively imported by ABK." schema={brandSchema} />
      {/* S1: Header */}
      <PageHeader title="Global Brands." subtitle="Curated Portfolio" bgImage="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1600&q=80" />
      
      {/* S2: Brand Vetting Process */}
      <section aria-labelledby="vetting-process" className="bg-white py-24">
        <div className="max-w-[1500px] px-[3vw] text-left">
          <FadeUpReveal>
             <h2 id="vetting-process" className="text-3xl md:text-4xl font-heading font-extrabold text-left mb-16">OUR VETTING PROCESS.</h2>
          </FadeUpReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { step: "01", title: "Clinical Verification", desc: "We analyze ingredient integrity and clinical trial data for nutritional products." },
              { step: "02", title: "Supply Chain Audit", desc: "Ensuring brand manufacturing can meet the scale of the Indian market." },
              { step: "03", title: "Market Fit Testing", desc: "Pilot programs with top regional clinics before nationwide rollout." }
            ].map((p, i) => (
              <FadeUpReveal key={i} delayOffset={i*100}>
                <div className="p-8 border border-gray-100 radius-max bg-gray-50 text-left">
                  <h4 className="text-6xl font-heading font-extrabold text-gray-200 mb-4">{p.step}</h4>
                  <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                  <p className="text-gray-500 text-sm">{p.desc}</p>
                </div>
              </FadeUpReveal>
            ))}
          </div>
        </div>
      </section>

      {/* S3: Featured Brand Spotlight */}
      <section aria-labelledby="spotlight-partner" className="max-w-[1500px] px-[3vw] py-24 text-left">
         <FadeUpReveal>
           <div className="bg-[#111] text-white radius-max overflow-hidden flex flex-col md:flex-row items-stretch">
              <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center items-start text-left">
                 <p className="text-[#E60000] font-bold tracking-widest text-xs uppercase mb-4">Spotlight Partner</p>
                 <h2 id="spotlight-partner" className="text-5xl font-heading font-extrabold mb-6">ORIJEN.</h2>
                 <p className="text-gray-400 leading-relaxed mb-8">Representing the pinnacle of biologically appropriate nutrition, Orijen has revolutionized high-protein diets. ABK is the premier distributor ensuring cold-chain integrity across India.</p>
                 <button className="border border-white px-6 py-3 hover:bg-white hover:text-black transition-colors radius-max text-sm font-bold text-left">View Orijen Catalog</button>
              </div>
              <div className="w-full md:w-1/2 h-[400px] md:h-auto">
                 <img src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80" alt="Orijen Pet Nutrition Product Showcase" className="w-full h-full object-cover" />
              </div>
           </div>
         </FadeUpReveal>
      </section>

      {/* S4: Category Filters */}
      <nav aria-label="Brand Category Filters" className="max-w-[1800px] px-[3vw] pb-12 flex gap-4 overflow-x-auto no-scrollbar justify-start">
         {['All Brands', 'Nutrition', 'Grooming Tools', 'Wellness', 'Enrichment'].map((cat, i) => (
           <button key={i} className={`shrink-0 px-6 py-2 radius-max text-sm font-bold border transition-colors text-left ${i === 0 ? 'bg-black text-white border-black' : 'bg-transparent text-gray-600 border-gray-300 hover:border-black'}`} data-cursor="hover">
              {cat}
           </button>
         ))}
      </nav>

      {/* S5: The Brand Grid */}
      <section aria-label="Brand Grid" className="max-w-[1800px] px-[3vw] text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {brandsFull.map((brand, idx) => (
            <FadeUpReveal key={idx} delayOffset={idx * 100}>
              <div className="bg-white radius-max overflow-hidden shadow-sm border border-gray-100 group text-left">
                <div className="h-[300px] overflow-hidden relative">
                  <img src={brand.img} alt={`${brand.name} ${brand.category} Products`} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                </div>
                <div className="p-8 text-left flex flex-col items-start">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#E60000] mb-2">{brand.category}</p>
                  <h3 className="text-3xl font-heading font-bold text-[#111] mb-4">{brand.name}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{brand.desc}</p>
                  <a href="#/contact" onClick={() => window.scrollTo(0,0)} className="inline-flex text-black font-bold uppercase tracking-widest text-xs hover:text-[#E60000] transition-colors items-center gap-2 mt-auto" data-cursor="hover">
                    Inquire Wholesale <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </FadeUpReveal>
          ))}
        </div>
      </section>

      {/* S6: CTA Banner */}
      <section aria-label="Partner Call to Action" className="max-w-[1500px] px-[3vw] pt-24 text-left">
         <FadeUpReveal>
            <div className="bg-[#E60000] text-white p-12 md:p-20 radius-max flex flex-col items-start text-left">
               <h2 className="text-3xl md:text-5xl font-heading font-extrabold mb-6 text-left">BECOME A RETAIL PARTNER</h2>
               <p className="text-white/90 max-w-2xl mb-10 text-lg text-left">Gain exclusive access to our B2B pricing, dedicated account management, and priority inventory allocation.</p>
               <a href="#/contact" onClick={() => window.scrollTo(0,0)} className="inline-block bg-white text-black px-10 py-4 radius-max font-bold hover:bg-black hover:text-white transition-colors text-left" data-cursor="hover">Apply for Account</a>
            </div>
         </FadeUpReveal>
      </section>
    </article>
  );
};

// 4. RESEARCH PAGE (6 Sections)
const ResearchPage = () => {
  const researchSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Pet Industry Research & Data",
    "description": "Evidence-based sourcing, clinical trial data, and Indian pet market analysis provided by ABK Imports."
  };

  return (
    <article className="bg-white pb-32">
      <SEOManager title="Research & Market Data" description="Access exclusive clinical trials, pet nutrition whitepapers, and the latest Indian pet market data." schema={researchSchema} />
      {/* S1: Header */}
      <PageHeader title="Research." subtitle="Clinical & Market Data" bgImage="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1600&q=80" />
      
      {/* S2: Mission */}
      <section aria-labelledby="research-mission" className="bg-[#F9F9F9] py-24 border-b border-gray-100 text-left">
        <div className="max-w-[1200px] px-[3vw] text-left">
          <FadeUpReveal>
            <h2 id="research-mission" className="text-3xl md:text-4xl font-heading font-bold mb-6 text-[#111]">EVIDENCE-BASED SOURCING</h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl text-left">Access our comprehensive library of clinical trials, nutritional whitepapers, and Indian pet market analysis. Exclusive resources curated for our B2B partners to drive intelligent retail decisions.</p>
          </FadeUpReveal>
        </div>
      </section>

      {/* S3: Featured Case Study */}
      <section aria-labelledby="case-study" className="max-w-[1500px] px-[3vw] py-24 text-left">
         <FadeUpReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start md:items-center text-left">
               <div className="h-[400px] md:h-[500px] radius-max overflow-hidden relative text-left">
                  <img src="https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=1200&q=80" alt="Clinical trial research dog testing behavioral enrichment toys" className="w-full h-full object-cover" />
                  <div className="absolute top-6 left-6 bg-white text-black px-4 py-2 radius-max text-xs font-bold uppercase flex items-center justify-start gap-2"><Play size={14}/> Video Summary</div>
               </div>
               <div className="text-left flex flex-col items-start">
                  <p className="text-[#E60000] font-bold tracking-widest text-xs uppercase mb-4 text-left">Featured Case Study</p>
                  <h2 id="case-study" className="text-4xl md:text-5xl font-heading font-extrabold text-[#111] mb-6 text-left">Behavioral Impact of Enrichment Tools in Urban Dogs.</h2>
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-2xl text-left">A 6-month study across 50 tier-1 city clinics showing a 40% reduction in anxiety-related clinic visits when Kong products were prescribed alongside standard treatments.</p>
                  <div className="flex gap-4 justify-start">
                     <button className="bg-black text-white px-6 py-3 radius-max text-sm font-bold hover:bg-[#E60000] transition-colors flex items-center justify-start gap-2 text-left" aria-label="Download Full Report PDF">Download Full Report <Download size={16}/></button>
                  </div>
               </div>
            </div>
         </FadeUpReveal>
      </section>

      {/* S4: Market Data Snapshot */}
      <section aria-labelledby="market-snapshot" className="bg-[#111] text-white py-24 text-left">
        <div className="max-w-[1500px] px-[3vw] text-left">
           <FadeUpReveal>
              <h2 id="market-snapshot" className="text-3xl font-heading font-bold mb-12 text-left">2026 INDIA MARKET SNAPSHOT</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                 <div className="border-t border-white/20 pt-6 text-left">
                   <p className="text-5xl font-heading font-bold text-[#E60000] mb-2">+34%</p>
                   <p className="font-bold text-lg mb-2">Premium Nutrition Growth</p>
                   <p className="text-gray-400 text-sm">YoY increase in demand for grain-free, biologically appropriate diets in metropolises.</p>
                 </div>
                 <div className="border-t border-white/20 pt-6 text-left">
                   <p className="text-5xl font-heading font-bold text-[#E60000] mb-2">₹12B</p>
                   <p className="font-bold text-lg mb-2">Grooming Tech Sector</p>
                   <p className="text-gray-400 text-sm">Projected valuation of professional clinic and salon equipment by end of fiscal year.</p>
                 </div>
                 <div className="border-t border-white/20 pt-6 text-left">
                   <p className="text-5xl font-heading font-bold text-[#E60000] mb-2">82%</p>
                   <p className="font-bold text-lg mb-2">Brand Loyalty Shift</p>
                   <p className="text-gray-400 text-sm">Consumers prioritizing transparent sourcing over pure cost, driving B2B premiumization.</p>
                 </div>
              </div>
           </FadeUpReveal>
        </div>
      </section>

      {/* S5: Document Library */}
      <section aria-labelledby="document-library" className="max-w-[1200px] px-[3vw] py-24 text-left">
        <FadeUpReveal>
          <h2 id="document-library" className="text-3xl font-heading font-bold text-[#111] mb-10 text-left">THE ARCHIVES.</h2>
        </FadeUpReveal>
        <div className="space-y-4 text-left">
          {[
            { title: "Efficacy of High-Protein Diets in Urban Canines", category: "Clinical Nutrition", year: "2026" },
            { title: "Q3 Pet Market Demographic Shifts in Tier 1 Cities", category: "Market Analysis", year: "2025" },
            { title: "Advancements in Ergonomic Grooming Technology", category: "Equipment Study", year: "2026" },
            { title: "Post-Pandemic Pet Adoption Retention Rates", category: "Demographics", year: "2024" },
          ].map((doc, idx) => (
            <FadeUpReveal key={idx} delayOffset={idx * 50}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-[#F9F9F9] radius-max border border-gray-100 hover:border-black transition-colors group cursor-pointer gap-4 text-left" data-cursor="hover">
                <div className="text-left">
                  <div className="flex items-center justify-start gap-3 mb-2">
                    <FileText size={16} className="text-[#E60000]" aria-hidden="true" />
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{doc.category} • {doc.year}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-heading font-bold text-[#111] text-left">{doc.title}</h3>
                </div>
                <button aria-label={`Download ${doc.title}`} className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 group-hover:bg-black group-hover:text-white group-hover:border-black transition-all shrink-0">
                  <Download size={18} aria-hidden="true" />
                </button>
              </div>
            </FadeUpReveal>
          ))}
        </div>
      </section>

      {/* S6: Custom Request CTA */}
      <section aria-label="Custom Report Request" className="bg-[#F9F9F9] border-t border-gray-200 py-16 text-left">
         <div className="max-w-[1200px] px-[3vw] text-left flex flex-col items-start">
            <h3 className="text-2xl font-bold mb-4 text-left">Need specific market data?</h3>
            <p className="text-gray-600 mb-8 max-w-xl text-left">Our research division can compile custom demographic or product category reports for high-volume enterprise partners.</p>
            <a href="#/contact" onClick={() => window.scrollTo(0,0)} className="inline-block text-[#E60000] font-bold uppercase tracking-widest border-b border-[#E60000] pb-1 hover:text-black hover:border-black transition-colors text-left">Request Custom Report</a>
         </div>
      </section>
    </article>
  );
};

// 5. BLOGS PAGE (6 Sections)
const BlogsPage = () => {
  const allBlogs = [
    { title: "Optimizing Clinic Inventory for Q4", date: "Sep 28, 2026", category: "B2B Strategy", img: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80" },
    { title: "Understanding the New Import Regulations", date: "Aug 15, 2026", category: "Logistics", img: "https://images.unsplash.com/photo-1586528116311-ad8ed7c80a30?auto=format&fit=crop&w=800&q=80" },
    { title: "Grooming Tech: What Top Salons Are Using", date: "Jul 02, 2026", category: "Equipment", img: "https://images.unsplash.com/photo-1585559606675-01e141a02fb4?auto=format&fit=crop&w=800&q=80" },
    { title: "The Anatomy of a Premium Diet", date: "Jun 10, 2026", category: "Nutrition", img: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80" },
  ];

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "ABK Imports Pet Industry Insights",
    "description": "Expert insights, logistics updates, and B2B strategy for the Indian pet care market."
  };

  return (
    <article className="bg-white pb-32 text-left">
      <SEOManager title="Blogs & Insights" description="Read our latest industry blogs, B2B strategies, and updates on global pet care innovations." schema={blogSchema} />
      {/* S1: Header */}
      <PageHeader title="Insights." subtitle="Industry Blogs" />
      
      {/* S2: Featured Hero Article */}
      <section aria-label="Featured Article" className="max-w-[1800px] px-[3vw] pt-24 pb-16 border-b border-gray-100 text-left">
         <FadeUpReveal>
            <a href="#/blogs" onClick={(e) => e.preventDefault()} className="group cursor-pointer block relative h-[50vh] md:h-[70vh] radius-max overflow-hidden text-left" data-cursor="hover">
               <img src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1600&q=80" alt="Dog looking curiously representing holistic pet care trends" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
               <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-4xl text-left flex flex-col items-start">
                  <div className="flex gap-4 items-center justify-start mb-4">
                     <span className="bg-[#E60000] text-white px-3 py-1 radius-max text-xs font-bold uppercase">Trends</span>
                     <time dateTime="2026-10-12" className="text-white/80 text-sm font-bold">Oct 12, 2026</time>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-6 leading-tight text-left">The Rise of Holistic Nutrition in Pet Care.</h2>
                  <p className="text-white/80 text-lg hidden md:block max-w-2xl text-left">Why Indian pet parents are shifting towards biologically appropriate diets and how retailers can capitalize on this massive Q4 trend.</p>
               </div>
            </a>
         </FadeUpReveal>
      </section>

      {/* S3: Topics Filter */}
      <nav aria-label="Blog Topics Filter" className="max-w-[1800px] px-[3vw] py-12 flex justify-between items-center flex-wrap gap-6 text-left">
         <h3 className="font-bold text-xl">Browse by Topic</h3>
         <div className="flex justify-start gap-3 overflow-x-auto no-scrollbar">
            {['All', 'Logistics', 'B2B Strategy', 'Nutrition', 'Equipment'].map((tag, i) => (
               <button key={i} className={`shrink-0 px-5 py-2 radius-max text-sm font-bold border transition-colors text-left ${i === 0 ? 'bg-black text-white border-black' : 'bg-[#F9F9F9] text-gray-600 border-gray-200 hover:border-black'}`} data-cursor="hover">{tag}</button>
            ))}
         </div>
      </nav>

      {/* S4: Standard Blog Grid */}
      <section aria-label="Latest Articles" className="bg-[#F9F9F9] py-24 text-left">
        <div className="max-w-[1800px] px-[3vw] text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            {allBlogs.map((blog, idx) => (
              <FadeUpReveal key={idx} delayOffset={idx * 100}>
                <a href="#/blogs" onClick={(e) => e.preventDefault()} className="group cursor-pointer block bg-white radius-max p-4 border border-gray-100 shadow-sm hover:shadow-lg transition-all text-left" data-cursor="hover">
                  <div className="w-full h-[250px] md:h-[350px] radius-max overflow-hidden mb-6 relative">
                    <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-3 py-1 radius-max text-[10px] font-bold uppercase tracking-widest text-[#111] text-left">{blog.category}</div>
                    <img src={blog.img} alt={`Thumbnail for ${blog.title}`} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  </div>
                  <div className="px-2 text-left flex flex-col items-start">
                    <time className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{blog.date}</time>
                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-[#111] group-hover:text-[#E60000] transition-colors line-clamp-2 text-left">{blog.title}</h3>
                  </div>
                </a>
              </FadeUpReveal>
            ))}
          </div>
          <div className="mt-16 text-left flex justify-start">
            <button className="border border-black px-8 py-3 radius-max font-bold hover:bg-black hover:text-white transition-colors text-left">Load More Articles</button>
          </div>
        </div>
      </section>

      {/* S5: Upcoming Events / Webinars */}
      <section aria-labelledby="webinars" className="max-w-[1500px] px-[3vw] py-24 text-left">
         <FadeUpReveal>
            <h2 id="webinars" className="text-3xl font-heading font-extrabold mb-10 text-left">PARTNER WEBINARS.</h2>
            <div className="bg-[#111] text-white radius-max p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-l-4 border-[#E60000] text-left">
               <div className="text-left flex flex-col items-start">
                  <span className="text-[#E60000] font-bold text-xs uppercase tracking-widest block mb-2 text-left">Live Session • Nov 15, 2026</span>
                  <h3 className="text-2xl font-bold mb-2 text-left">Mastering High-Ticket Clinic Sales</h3>
                  <p className="text-gray-400 max-w-xl text-left">Join ABK's Head of Sales for an exclusive breakdown of pitching premium grooming equipment to elite veterinary networks.</p>
               </div>
               <a href="#/contact" onClick={() => window.scrollTo(0,0)} className="inline-block shrink-0 bg-[#E60000] hover:bg-white hover:text-black px-8 py-4 radius-max font-bold transition-colors mt-4 md:mt-0 text-left">Register Free</a>
            </div>
         </FadeUpReveal>
      </section>

      {/* S6: Newsletter Banner */}
      <section aria-label="Newsletter Subscription" className="bg-[#E60000] py-24 text-left text-white">
         <div className="max-w-[1000px] px-[3vw] text-left flex flex-col items-start">
            <FadeUpReveal>
               <Mail size={48} aria-hidden="true" className="mb-6 opacity-80" />
               <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-4 text-left">NEVER MISS AN UPDATE.</h2>
               <p className="text-white/90 text-lg mb-10 max-w-2xl text-left">Get the latest B2B pet industry insights, restock alerts, and brand launches delivered straight to your inbox.</p>
               <form aria-label="Subscribe Form" className="flex flex-col sm:flex-row gap-4 justify-start max-w-md w-full">
                  <label htmlFor="email-sub" className="sr-only">Email Address</label>
                  <input id="email-sub" type="email" placeholder="Business Email Address" className="w-full px-6 py-4 radius-max text-black outline-none text-left" required />
                  <button type="submit" className="bg-black text-white px-8 py-4 radius-max font-bold whitespace-nowrap hover:bg-gray-900 text-left">Subscribe</button>
               </form>
            </FadeUpReveal>
         </div>
      </section>
    </article>
  );
};

// 6. CONTACT PAGE (6 Sections)
const ContactPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    { q: "How do I become an authorized retail partner?", a: "Simply fill out the contact form below with your business details, and a dedicated territory manager will reach out within 24 hours to begin the onboarding process." },
    { q: "Do you offer drop-shipping for e-commerce?", a: "We primarily support traditional B2B wholesale distribution to stockists and clinics. Drop-shipping inquiries are evaluated on a strict case-by-case basis." },
    { q: "What are the minimum order quantities (MOQ)?", a: "MOQs vary strictly by brand and product category. For example, clinical nutrition pallets have different requirements than professional grooming tools. Your account manager will provide the exact matrix." },
    { q: "How do I access the B2B portal?", a: "Once your retailer account is verified and approved, you will receive an automated email with secure login credentials to access live inventory and wholesale pricing." }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <article className="bg-white pb-32 text-left">
      <SEOManager title="Contact Us & B2B Partner Portal" description="Contact ABK Imports for retail partnerships, logistics support, and press inquiries. Headquarters located in Pune, India." schema={faqSchema} />
      {/* S1: Header */}
      <PageHeader title="Direct Line." subtitle="Contact ABK" />
      
      {/* S2: Quick Contacts Cards */}
      <section aria-label="Contact Departments" className="bg-[#F9F9F9] py-16 border-b border-gray-100 -mt-8 relative z-20 text-left">
         <div className="max-w-[1500px] px-[3vw] text-left">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
               <FadeUpReveal delayOffset={0}>
                  <div className="bg-white p-8 radius-max shadow-sm border border-gray-100 text-left flex flex-col items-start">
                     <Users size={32} aria-hidden="true" className="text-[#E60000] mb-4"/>
                     <h3 className="font-bold text-lg mb-2 text-left">Partner Sales</h3>
                     <p className="text-gray-500 text-sm mb-4 text-left">For new business inquiries.</p>
                     <a href="mailto:partners@abkimports.com" className="font-bold text-left hover:text-[#E60000]">partners@abkimports.com</a>
                  </div>
               </FadeUpReveal>
               <FadeUpReveal delayOffset={100}>
                  <div className="bg-white p-8 radius-max shadow-sm border-2 border-black text-left flex flex-col items-start">
                     <Phone size={32} aria-hidden="true" className="text-black mb-4"/>
                     <h3 className="font-bold text-lg mb-2 text-left">B2B Support Line</h3>
                     <p className="text-gray-500 text-sm mb-4 text-left">Urgent logistics support.</p>
                     <a href="tel:+9118001234567" className="font-bold text-xl text-left hover:text-[#E60000]">+91 1800 123 4567</a>
                  </div>
               </FadeUpReveal>
               <FadeUpReveal delayOffset={200}>
                  <div className="bg-white p-8 radius-max shadow-sm border border-gray-100 text-left flex flex-col items-start">
                     <FileText size={32} aria-hidden="true" className="text-[#E60000] mb-4"/>
                     <h3 className="font-bold text-lg mb-2 text-left">Press & Media</h3>
                     <p className="text-gray-500 text-sm mb-4 text-left">For PR and marketing.</p>
                     <a href="mailto:media@abkimports.com" className="font-bold text-left hover:text-[#E60000]">media@abkimports.com</a>
                  </div>
               </FadeUpReveal>
            </div>
         </div>
      </section>

      {/* S3: Main Contact Form */}
      <section aria-labelledby="inquiry-form" className="max-w-[1500px] px-[3vw] py-24 flex flex-col lg:flex-row gap-16 lg:gap-24 text-left">
        <div className="w-full lg:w-1/3 text-left">
          <FadeUpReveal>
            <h2 id="inquiry-form" className="text-4xl md:text-5xl font-heading font-extrabold text-[#111] mb-6 text-left">SUBMIT AN INQUIRY.</h2>
            <p className="text-gray-600 leading-relaxed mb-8 max-w-sm text-left">Whether you're looking to stock our brands, need technical support for grooming equipment, or have a press inquiry, our team is ready to assist.</p>
            <div className="p-6 bg-[#111] text-white radius-max inline-block text-left">
               <p className="text-[#E60000] font-bold text-xs uppercase mb-2 text-left">Average Response Time</p>
               <p className="font-heading font-bold text-2xl text-left">Under 4 Hours.</p>
            </div>
          </FadeUpReveal>
        </div>

        <div className="w-full lg:w-2/3 text-left">
          <FadeUpReveal delayOffset={200}>
            <form className="bg-white p-8 md:p-12 radius-max border border-gray-200 shadow-xl text-left" aria-label="B2B Contact Form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-left">
                <div className="text-left flex flex-col items-start w-full">
                  <label htmlFor="f-name" className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 text-left w-full">Full Name *</label>
                  <input id="f-name" type="text" className="w-full bg-[#F9F9F9] border border-transparent radius-max p-4 outline-none focus:border-black focus:bg-white transition-colors text-left" required />
                </div>
                <div className="text-left flex flex-col items-start w-full">
                  <label htmlFor="c-name" className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 text-left w-full">Company / Clinic Name *</label>
                  <input id="c-name" type="text" className="w-full bg-[#F9F9F9] border border-transparent radius-max p-4 outline-none focus:border-black focus:bg-white transition-colors text-left" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-left">
                <div className="text-left flex flex-col items-start w-full">
                  <label htmlFor="e-mail" className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 text-left w-full">Email Address *</label>
                  <input id="e-mail" type="email" className="w-full bg-[#F9F9F9] border border-transparent radius-max p-4 outline-none focus:border-black focus:bg-white transition-colors text-left" required />
                </div>
                <div className="text-left flex flex-col items-start w-full">
                  <label htmlFor="i-type" className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 text-left w-full">Inquiry Type</label>
                  <select id="i-type" className="w-full bg-[#F9F9F9] border border-transparent radius-max p-4 outline-none focus:border-black focus:bg-white transition-colors cursor-pointer text-left">
                    <option>New Retail Partnership</option>
                    <option>Existing Order / Logistics</option>
                    <option>Product Information</option>
                    <option>Press / Media</option>
                  </select>
                </div>
              </div>
              <div className="mb-8 text-left flex flex-col items-start w-full">
                <label htmlFor="msg" className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 text-left w-full">Message</label>
                <textarea id="msg" rows="4" className="w-full bg-[#F9F9F9] border border-transparent radius-max p-4 outline-none focus:border-black focus:bg-white transition-colors resize-none text-left"></textarea>
              </div>
              <Magnetic>
                <button type="submit" className="bg-[#E60000] text-white px-10 py-5 radius-max font-bold text-sm hover:bg-black transition-colors flex items-center justify-start gap-3 w-full md:w-auto text-left" data-cursor="hover">
                  Submit Request <ArrowRight size={18} aria-hidden="true" />
                </button>
              </Magnetic>
            </form>
          </FadeUpReveal>
        </div>
      </section>

      {/* S4: Global Offices / HQ */}
      <address aria-label="Office Locations" className="bg-[#111] text-white py-24 text-left not-italic block">
         <div className="max-w-[1500px] px-[3vw] text-left">
            <FadeUpReveal>
               <h2 className="text-3xl font-heading font-extrabold mb-12 text-left">OUR LOCATIONS.</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                  <div className="bg-[#1A1A1A] p-8 radius-max border border-white/10 flex flex-col sm:flex-row gap-6 items-start hover:border-[#E60000] transition-colors text-left">
                     <MapPin size={32} aria-hidden="true" className="text-[#E60000] shrink-0" />
                     <div className="text-left flex flex-col items-start">
                        <h3 className="font-bold text-xl mb-2 text-left">Pune Headquarters (RESQ)</h3>
                        <p className="text-gray-400 mb-4 leading-relaxed text-left">Office No. 402, Verdant 84, 4th Floor, North Main Road, Koregaon Park East, Mundhwa, Pune - 411036</p>
                        <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-[#E60000] text-sm font-bold uppercase tracking-widest hover:text-white flex items-center justify-start gap-1 w-max text-left">Get Directions <ArrowUpRight size={14}/></a>
                     </div>
                  </div>
                  <div className="bg-[#1A1A1A] p-8 radius-max border border-white/10 flex flex-col sm:flex-row gap-6 items-start hover:border-[#E60000] transition-colors text-left">
                     <MapPin size={32} aria-hidden="true" className="text-[#E60000] shrink-0" />
                     <div className="text-left flex flex-col items-start">
                        <h3 className="font-bold text-xl mb-2 text-left">Delhi Logistics Hub</h3>
                        <p className="text-gray-400 mb-4 leading-relaxed text-left">Block A, Phase 4 Industrial Estate, New Delhi NCR, 110020 (B2B Dispatches Only)</p>
                        <span className="text-gray-500 text-sm font-bold uppercase tracking-widest text-left">Not open to public</span>
                     </div>
                  </div>
               </div>
            </FadeUpReveal>
         </div>
      </address>

      {/* S5: FAQs */}
      <section aria-labelledby="faq-heading" className="max-w-[1000px] px-[3vw] py-24 text-left">
         <FadeUpReveal>
            <h2 id="faq-heading" className="text-3xl font-heading font-extrabold mb-12 text-left">FREQUENTLY ASKED.</h2>
            <div className="space-y-4 text-left flex flex-col items-start w-full">
               {faqs.map((faq, idx) => (
                  <div key={idx} className="border border-gray-200 radius-max overflow-hidden bg-[#F9F9F9] w-full text-left">
                     <button 
                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                        aria-expanded={activeFaq === idx}
                        className="w-full text-left p-6 font-bold flex justify-between items-center hover:text-[#E60000] transition-colors"
                     >
                        <span className="text-left">{faq.q}</span>
                        <ChevronDown size={20} aria-hidden="true" className={`transform transition-transform shrink-0 ${activeFaq === idx ? 'rotate-180 text-[#E60000]' : ''}`} />
                     </button>
                     <div aria-hidden={activeFaq !== idx} className={`px-6 overflow-hidden transition-all duration-300 ease-in-out text-left ${activeFaq === idx ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <p className="text-gray-600 text-left">{faq.a}</p>
                     </div>
                  </div>
               ))}
            </div>
         </FadeUpReveal>
      </section>

      {/* S6: Portal Link Block */}
      <section aria-label="B2B Portal Access" className="border-t border-gray-200 pt-16 pb-8 text-left">
         <div className="max-w-[1500px] px-[3vw] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-left">
            <h3 className="text-xl font-bold text-gray-500 text-left">Already an authorized partner?</h3>
            <a href="#/login" className="inline-flex bg-black text-white px-8 py-4 radius-max font-bold hover:bg-[#E60000] transition-colors items-center justify-start gap-2 text-left">
               Access B2B Portal <ArrowRight size={16} aria-hidden="true" />
            </a>
         </div>
      </section>
    </article>
  );
};


// --- FOOTER ---

const Footer = () => {
  return (
    <footer className="bg-[#050505] text-white pt-24 pb-8 overflow-hidden text-left">
      <div className="px-[3vw] flex flex-col lg:flex-row justify-between gap-20 mb-24 max-w-[1800px] text-left">
        <div className="max-w-md text-left flex flex-col items-start">
          <h3 className="text-4xl font-heading font-extrabold mb-6 tracking-tight flex items-end text-left">
            ABK<span className="text-[#E60000] text-5xl leading-none">.</span>
          </h3>
          <p className="text-gray-400 font-light leading-relaxed mb-8 text-[13px] max-w-sm text-left">
            From sourcing premium products worldwide to building trusted in-house brands, ABK Imports brings quality, innovation, and reliability to every pet household.
          </p>
          <div className="space-y-4 mb-8 text-left w-full flex flex-col items-start">
             <div className="text-left w-full">
                <p className="text-[#E60000] font-bold text-[10px] tracking-widest uppercase mb-1 text-left">Corporate Address</p>
                <p className="text-gray-400 text-xs text-left">Office No. 402, Verdant 84, 4th Floor, North Main Road,<br/>Koregaon Park East, Mundhwa, Pune - 411036</p>
             </div>
             <div className="text-left w-full">
                <p className="text-[#E60000] font-bold text-[10px] tracking-widest uppercase mb-1 text-left">Get In Touch</p>
                <p className="text-gray-400 text-xs text-left">+91 95119 60778 | +91 98230 70856<br/>Monday to Saturday | 9 am - 6 pm</p>
             </div>
             <div className="text-left w-full">
                <p className="text-[#E60000] font-bold text-[10px] tracking-widest uppercase mb-1 text-left">Mail Us</p>
                <p className="text-gray-400 text-xs text-left">info@abkimports.com | online@abkimports.com</p>
             </div>
          </div>
          <div className="flex gap-4 justify-start">
            {['LINKEDIN', 'FACEBOOK', 'INSTAGRAM'].map((social) => (
              <Magnetic key={social} strength={0.2}>
                <a href={`https://${social.toLowerCase()}.com`} target="_blank" rel="noopener noreferrer" aria-label={`Follow ABK Imports on ${social}`} className="inline-block text-[10px] font-light hover:text-white transition-colors border border-white/20 px-4 py-2 radius-max uppercase tracking-widest text-gray-400 hover:border-white text-left" data-cursor="hover">
                  {social}
                </a>
              </Magnetic>
            ))}
          </div>
        </div>

        <nav aria-label="Footer Navigation" className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-20 flex-1 lg:ml-20 mt-4 md:mt-0 text-left">
          <div className="text-left flex flex-col items-start w-full">
            <h4 className="font-heading font-semibold mb-6 uppercase tracking-widest text-[10px] text-gray-500 text-left">NAVIGATION</h4>
            <ul className="space-y-3 text-gray-400 font-light text-[13px] text-left w-full">
              <li className="text-left"><a href="#/about" onClick={() => window.scrollTo(0,0)} className="block hover:text-white transition-colors text-left" data-cursor="hover">About Us</a></li>
              <li className="text-left"><a href="#/brands" onClick={() => window.scrollTo(0,0)} className="block hover:text-white transition-colors text-left" data-cursor="hover">Portfolio</a></li>
              <li className="text-left"><a href="#/research" onClick={() => window.scrollTo(0,0)} className="block hover:text-white transition-colors text-left" data-cursor="hover">Research</a></li>
              <li className="text-left"><a href="#/blogs" onClick={() => window.scrollTo(0,0)} className="block hover:text-white transition-colors text-left" data-cursor="hover">Insights</a></li>
            </ul>
          </div>
          <div className="text-left flex flex-col items-start w-full">
            <h4 className="font-heading font-semibold mb-6 uppercase tracking-widest text-[10px] text-gray-500 text-left">SUPPORT</h4>
            <ul className="space-y-3 text-gray-400 font-light text-[13px] text-left w-full">
              <li className="text-left"><a href="#/contact" onClick={() => window.scrollTo(0,0)} className="block hover:text-white transition-colors text-left" data-cursor="hover">Contact Us</a></li>
              <li className="text-left"><a href="#/login" className="block hover:text-white transition-colors text-left" data-cursor="hover">B2B Portal Login</a></li>
              <li className="text-left"><a href="#/logistics" className="block hover:text-white transition-colors text-left" data-cursor="hover">Logistics Tracking</a></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1 text-left flex flex-col items-start w-full">
              <h4 className="font-heading font-semibold mb-6 uppercase tracking-widest text-[10px] text-gray-500 text-left">NEWSLETTER</h4>
              <p className="text-gray-400 font-light text-[13px] mb-4 text-left">Subscribe for B2B industry insights.</p>
              <form aria-label="Footer Newsletter Form" className="flex bg-[#111] rounded-xl border border-white/10 p-1 focus-within:border-white/30 transition-colors w-full">
                <label htmlFor="footer-email" className="sr-only">Email Address</label>
                <input id="footer-email" type="email" placeholder="Email Address" className="bg-transparent font-light outline-none w-full text-white text-[13px] px-3 placeholder:text-gray-600 text-left" required />
                <button type="submit" className="bg-[#E60000] text-white px-5 py-2 rounded-lg font-medium text-[13px] hover:bg-white hover:text-black transition-colors text-left" data-cursor="hover">Join</button>
              </form>
          </div>
        </nav>
      </div>

      <div className="w-full border-t border-white/5 pt-16 pb-8 overflow-hidden relative text-left">
        <div className="flex w-max animate-[scroll_30s_linear_infinite]" aria-hidden="true">
           {[...Array(4)].map((_, i) => (
              <h1 key={i} className="text-[14vw] font-heading font-extrabold leading-none tracking-tighter text-[#141414] whitespace-nowrap pr-8 select-none text-left">
                ABK IMPORTS
              </h1>
           ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-[10px] font-medium tracking-widest text-gray-600 uppercase gap-6 mt-8 px-[3vw] max-w-[1800px] text-left">
        <p className="text-left">© 2026 by ABK Imports. Powered and made with love by InCode.</p>
        <div className="flex gap-8 justify-start">
            <a href="#/privacy" className="hover:text-gray-300 transition-colors text-left" data-cursor="hover">PRIVACY POLICY</a>
            <a href="#/terms" className="hover:text-gray-300 transition-colors text-left" data-cursor="hover">TERMS OF SERVICE</a>
        </div>
      </div>
    </footer>
  );
};


// --- MAIN APP ENTRY ---

export default function App() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [cursorText, setCursorText] = useState("");
  
  const cursorDotRef = useRef(null);
  const containerRef = useRef(null);

  // Hash Router implementation for true SEO indexability
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '') || 'home';
      setCurrentView(hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Execute on initial load
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Smooth Custom Cursor (Trailing effect, native pointer preserved)
  useEffect(() => {
    if (window.innerWidth < 768) return;

    let dotPos = { x: 0, y: 0 };
    let mousePos = { x: 0, y: 0 };
    let isVisible = false;

    const updateMouse = (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;

      if (!isVisible && cursorDotRef.current) {
        cursorDotRef.current.style.opacity = '1';
        dotPos.x = e.clientX; 
        dotPos.y = e.clientY;
        isVisible = true;
      }
    };

    const handleMouseLeave = () => {
      if (cursorDotRef.current) {
        cursorDotRef.current.style.opacity = '0';
        isVisible = false;
      }
    };

    const animate = () => {
      dotPos.x += (mousePos.x - dotPos.x) * 0.2;
      dotPos.y += (mousePos.y - dotPos.y) * 0.2;

      if (cursorDotRef.current && isVisible) {
        cursorDotRef.current.style.transform = `translate(${dotPos.x}px, ${dotPos.y}px) translate(-50%, -50%)`;
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', updateMouse);
    document.addEventListener('mouseleave', handleMouseLeave);
    const raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', updateMouse);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Complex Cursor Hover States
  useEffect(() => {
    if (window.innerWidth < 768) return;

    const handleMouseOver = (e) => {
      if (containerRef.current) {
        containerRef.current.classList.remove('cursor-hover', 'cursor-drag');
        setCursorText("");

        const target = e.target.closest('[data-cursor]');
        if (target) {
          const cursorType = target.getAttribute('data-cursor');
          if (cursorType === 'hover') {
            containerRef.current.classList.add('cursor-hover');
          } else if (cursorType === 'drag') {
            containerRef.current.classList.add('cursor-drag');
            setCursorText("DRAG");
          }
        }
      }
    };
    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, [currentView]); // Re-bind when view changes

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else if (!loading) document.body.style.overflow = '';
  }, [menuOpen, loading]);

  // Page Router Renderer
  const renderView = () => {
    switch(currentView) {
      case 'home': return <HomePage isReady={!loading} />;
      case 'about': return <AboutPage />;
      case 'brands': return <BrandsPage />;
      case 'research': return <ResearchPage />;
      case 'blogs': return <BlogsPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage isReady={!loading} />;
    }
  };

  return (
    <div ref={containerRef} className="relative bg-white selection:bg-[#E60000] selection:text-white min-h-screen flex flex-col text-left">
      {injectStyles()}
      
      <div className="hidden md:block">
        <div ref={cursorDotRef} className="cursor-dot" aria-hidden="true">{cursorText}</div>
      </div>

      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      <FullScreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} currentView={currentView} />

      <div className={`flex-1 flex flex-col transition-opacity duration-1000 ease-in-out ${loading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        <Header onOpenMenu={() => setMenuOpen(true)} currentView={currentView} />
        
        <main className="flex-1 w-full text-left" id="main-content">
          {renderView()}
        </main>

        <Footer />
      </div>
    </div>
  );
}
