import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Search, Menu, ShoppingBag, X, ChevronRight, ChevronLeft, ArrowUpRight, Star, Plus, Minus, Box, Truck, BarChart3, ShieldCheck, Zap, Users, GraduationCap, Megaphone, CheckCircle2, MapPin, Target, Briefcase, HeartHandshake, Coffee, Globe, FileText, CheckCircle, Award, Heart, BookOpen, Newspaper } from 'lucide-react';

const injectStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Montserrat:wght@300;400;500;700;800;900&display=swap');

    :root {
      --brand: #E60000;
      --bg: #FAFAFA;
      --text: #1A1A1A;
      --text-light: #666666;
      --radius-max: 12px;
    }

    * { box-sizing: border-box; scroll-behavior: smooth; }

    body, html {
      background-color: var(--bg);
      color: var(--text);
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
      width: 100%;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }

    .radius-max { border-radius: var(--radius-max); }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

    h1, h2, h3, h4, h5, .font-heading { font-family: 'Montserrat', sans-serif; }

    /* ELEGANT CUSTOM CURSOR (Hidden on smaller screens via JS logic) */
    .cursor-dot {
      position: fixed;
      top: 0; left: 0;
      width: 12px; height: 12px;
      background-color: var(--brand);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
      transition: width 0.3s cubic-bezier(0.25, 1, 0.5, 1), height 0.3s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.3s;
      mix-blend-mode: difference;
      display: flex;
      align-items: center;
      justify-content: center;
      color: transparent;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 1px;
      opacity: 0; 
    }
    .cursor-dot.visible { opacity: 1; }
    
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

    /* SMOOTH ANIMATIONS & BLENDS */
    .hover-image-scale img { transition: transform 1.5s cubic-bezier(0.25, 1, 0.5, 1); }
    .hover-image-scale:hover img { transform: scale(1.05); }
    
    .blended-bg { background: linear-gradient(135deg, #FFF 0%, #FFF5F5 50%, #FDFDFD 100%); }

    @keyframes slowZoom { 0% { transform: scale(1); } 100% { transform: scale(1.15); } }
    
    /* MARQUEE ANIMATIONS */
    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    @keyframes marquee-reverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
    .animate-marquee { animation: marquee 80s linear infinite; }
    .animate-marquee-reverse { animation: marquee-reverse 80s linear infinite; }
    
    @keyframes footer-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    .animate-footer-marquee { animation: footer-marquee 20s linear infinite; }

    @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .animate-spin-slow { animation: spin-slow 25s linear infinite; }
    
    /* INTERNAL PAGE SLIDE ANIMATION */
    @keyframes slideReveal { 
      0% { opacity: 0; transform: translateX(-5vw); } 
      100% { opacity: 1; transform: translateX(0); } 
    }
    .animate-slide-reveal { animation: slideReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

    /* DOT PATTERN BACKGROUND */
    .bg-dots {
      background-image: radial-gradient(rgba(230, 0, 0, 0.08) 2px, transparent 2px);
      background-size: 32px 32px;
    }

    /* SPIRIT ACCORDION */
    .spirit-card {
      flex: 1;
      transition: flex 0.6s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease;
      cursor: pointer;
    }
    .spirit-card.active, .spirit-card:hover { flex: 5; background-color: var(--brand); color: white; }
    .spirit-card.active .spirit-title, .spirit-card:hover .spirit-title { opacity: 1; transform: translateX(0); }
    .spirit-title { opacity: 0; transform: translateX(-20px); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); transition-delay: 0.1s; }

    /* CATEGORY EXPLORER ACCORDION */
    .category-card {
      flex: 1;
      transition: flex 0.7s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease;
      cursor: pointer;
    }
    .category-card.active, .category-card:hover { flex: 4; }
    .category-card.active .cat-content, .category-card:hover .cat-content { opacity: 1; transform: translateY(0); transition-delay: 0.2s; }
    .cat-content { opacity: 0; transform: translateY(20px); transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); }

    /* CUSTOM RANGE SLIDER */
    input[type=range] { -webkit-appearance: none; width: 100%; background: transparent; }
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 24px; width: 24px;
      border-radius: 50%; background: var(--brand); cursor: pointer;
      margin-top: -10px; box-shadow: 0 0 15px rgba(230, 0, 0, 0.5); transition: transform 0.2s;
    }
    input[type=range]::-webkit-slider-thumb:hover { transform: scale(1.2); }
    input[type=range]::-webkit-slider-runnable-track { width: 100%; height: 4px; cursor: pointer; background: #333; border-radius: 2px; }

    /* LEAFLET CUSTOM TOOLTIP */
    .leaflet-tooltip.custom-leaflet-tooltip { background: transparent; border: none; box-shadow: none; padding: 0; }
    .leaflet-container { background-color: #050505 !important; font-family: 'Inter', sans-serif; z-index: 10; }
  `}</style>
);

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

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    let val = 0;
    const interval = setInterval(() => {
      val += Math.floor(Math.random() * 15) + 5;
      if (val >= 100) {
        val = 100;
        clearInterval(interval);
        setTimeout(() => setIsFading(true), 600);
        setTimeout(() => { document.body.style.overflow = ''; onComplete(); }, 1400);
      }
      setProgress(val);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`fixed inset-0 z-[100000] bg-[#111] flex flex-col items-center justify-center transition-transform duration-[1.2s] ease-[cubic-bezier(0.77,0,0.175,1)] ${isFading ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="w-[80vw] md:w-[400px] flex flex-col items-center">
        <img src="https://abkimports.com/wp-content/uploads/2023/04/ABK-Logo_150pix-x-150pix-01.png" alt="ABK Imports Logo" className="h-[60px] sm:h-[73px] md:h-[94px] mb-8 object-contain brightness-0 invert" />
        <div className="w-full h-[2px] bg-gray-800 relative overflow-hidden radius-max mb-4">
          <div className="absolute top-0 left-0 h-full bg-[#E60000] transition-all duration-200 ease-out" style={{ width: `${progress}%` }} />
        </div>
        <div className="w-full flex justify-between font-mono text-[10px] text-gray-500 uppercase tracking-widest">
          <span>Loading Interface</span><span>{progress}%</span>
        </div>
      </div>
    </div>
  );
};

const Header = ({ onOpenMenu, setCurrentPage, currentPage }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] py-4 sm:py-6 flex justify-between items-center transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 py-3 sm:py-4 shadow-sm' : 'bg-transparent'
      }`}
    >
      <div
        onClick={() => { window.scrollTo(0, 0); setCurrentPage('Home'); }}
        className="cursor-pointer transition-transform hover:scale-105 duration-300"
      >
        <img
          src="https://abkimports.com/wp-content/uploads/2023/04/ABK-Logo_150pix-x-150pix-01.png"
          alt="ABK Imports Logo"
          className={`h-8 sm:h-10 md:h-12 object-contain transition-all duration-500 ${
            !scrolled && currentPage === 'Home' ? 'brightness-0 invert' : ''
          }`}
        />
      </div>

      <div className={`flex items-center gap-4 sm:gap-6 md:gap-8 ${!scrolled && currentPage === 'Home' ? 'text-white' : 'text-black'}`}>
        <button onClick={onOpenMenu} className="flex items-center gap-2 hover:text-[#E60000] transition-colors group">
          <span className="hidden md:block text-xs sm:text-sm font-semibold uppercase tracking-widest mt-1 group-hover:text-[#E60000] transition-colors">
            Menu
          </span>
          <Menu size={28} className="sm:w-8 sm:h-8" strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
};

const FullScreenMenu = ({ isOpen, onClose, setCurrentPage }) => {
  const links = [
    { name: 'Home', id: 'Home' },
    { name: 'About Us', id: 'About Us' },
    { name: 'Brand Portfolio', id: 'Brand Portfolio' },
    { name: 'Our Offerings', id: 'Why Choose ABK' },
    { name: 'Careers', id: 'Work With Us' },
    { name: 'Contact', id: 'Contact' },
  ];

  const handleNav = (id) => {
    setCurrentPage(id);
    window.scrollTo(0, 0);
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-[90000] bg-[#111] text-white flex flex-col transition-transform duration-[0.8s] ease-[cubic-bezier(0.77,0,0.175,1)] ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] py-4 sm:py-6 flex justify-between items-center border-b border-white/10">
        <img src="https://abkimports.com/wp-content/uploads/2023/04/ABK-Logo_150pix-x-150pix-01.png" alt="ABK Imports Logo" className="h-8 sm:h-10 md:h-12 object-contain brightness-0 invert" />
        <button onClick={onClose} className="p-2 hover:text-[#E60000] transition-colors hover:rotate-90 duration-300">
          <X size={32} className="sm:w-9 sm:h-9" strokeWidth={1} />
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] py-10 md:py-20 h-full overflow-y-auto">
        <div className="flex-[1.35] flex flex-col justify-center gap-1 md:gap-2">
          {links.map((link, i) => (
            <div key={link.id} className="overflow-hidden py-2 px-1 -mx-1 pb-4">
              <button
                onClick={() => handleNav(link.id)}
                className={`block text-left whitespace-normal sm:whitespace-nowrap pb-1 pt-1 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-snug font-heading font-black hover:text-[#E60000] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'
                }`}
                style={{ transitionDelay: `${isOpen ? 200 + i * 100 : 0}ms` }}
              >
                {link.name}
              </button>
            </div>
          ))}
        </div>

        <div className={`mt-10 md:mt-0 flex-1 flex flex-col justify-end md:items-end transition-opacity duration-1000 delay-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          <div className="md:text-right">
            <h4 className="font-heading font-bold text-[#E60000] mb-3 md:mb-4 uppercase tracking-widest text-[10px] md:text-xs">Partner Portal</h4>
            <button className="bg-white text-black px-6 sm:px-8 py-3 radius-max font-bold text-[10px] md:text-xs lg:text-sm hover:bg-[#E60000] hover:text-white transition-colors duration-300 mb-8 md:mb-12">B2B Login</button>

            <h4 className="font-heading font-bold text-[#E60000] mb-3 md:mb-4 uppercase tracking-widest text-[10px] md:text-xs">Product Catalogue</h4>
            <button className="bg-transparent border border-white text-white px-6 sm:px-8 py-3 radius-max font-bold text-[10px] md:text-xs lg:text-sm hover:bg-white hover:text-black transition-colors duration-300 mb-8 md:mb-12">Download 2026-27 PDF</button>

            <h4 className="font-heading font-bold text-[#E60000] mb-3 md:mb-4 uppercase tracking-widest text-[10px] md:text-xs">Direct Line</h4>
            <p className="text-white/70 text-base sm:text-lg md:text-xl font-medium hover:text-white transition-colors cursor-pointer">partners@abkimports.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const InternalPageHero = ({ title, subtitle, bgImage, bgVideo }) => (
  <div className="relative w-full h-[60vh] md:h-[75vh] flex items-end pb-16 md:pb-24 pt-32 px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] bg-[#050505] overflow-hidden">
    <div className="absolute inset-0 z-0">
      {bgVideo ? (
         <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-50 grayscale-[30%]">
           <source src={bgVideo} type="video/mp4" />
         </video>
      ) : (
         bgImage && <img src={bgImage} alt="Hero Background" className="w-full h-full object-cover opacity-40 grayscale-[50%]" />
      )}
    </div>
    <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />
    <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
    
    <div className="relative z-20 max-w-[1800px] mx-auto w-full text-left">
      <FadeUpReveal>
        <div className="w-10 md:w-12 h-[3px] bg-[#E60000] mb-4 md:mb-6 shadow-[0_0_15px_#E60000]" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter mb-4 text-white leading-[1] max-w-5xl drop-shadow-2xl">
          {title}
        </h1>
        <p className="text-base sm:text-lg md:text-2xl text-gray-300 font-light max-w-3xl leading-relaxed drop-shadow-md">
          {subtitle}
        </p>
      </FadeUpReveal>
    </div>
  </div>
);

// ==========================================
// BRAND DATABASE
// ==========================================

const brandDatabase = {
  "Andis": {
    title: "ANDIS PRO.",
    subtitle: "World-class clipping and trimming technology built for precision.",
    bgImage: "https://images.unsplash.com/photo-1585559606675-01e141a02fb4?auto=format&fit=crop&w=1920&q=80",
    description: "As the exclusive national distributor for Andis, we empower Indian grooming professionals with world-class clipping and trimming technology built for precision. Since 1922, Andis has been at the center of styling, ensuring high-quality, durable performance for veterinarians and salon experts.",
    products: [
      { name: "Pulse ZR II", category: "Cordless Clipper", img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=600&q=80", desc: "Heavy-duty, detachable blade clipper with a removable battery for uninterrupted professional use." },
      { name: "Excel 5-Speed", category: "Wired Clipper", img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80", desc: "Powerful, rotary motor clipper for complete animal grooming with 5 variable speed options." },
      { name: "UltraEdge Blades", category: "Accessories", img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80", desc: "Carbon-infused steel blades for a harder cutting surface, ensuring longer edge retention." }
    ]
  },
  "TropiClean": {
    title: "TROPICLEAN.",
    subtitle: "Natural pet care, grooming, and dental health solutions.",
    bgImage: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1920&q=80",
    description: "TropiClean Pet Products are made with naturally derived ingredients. We believe in providing innovative, safe, and highly effective pet care solutions to ensure pets and their parents live healthy, happy lives together.",
    products: [
      { name: "Fresh Breath Water Additive", category: "Dental Care", img: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=600&q=80", desc: "Provides dogs with daily plaque and tartar defense simply by drinking from their water bowl." },
      { name: "Papaya & Coconut Shampoo", category: "Grooming", img: "https://images.unsplash.com/photo-1537151608804-ea6f11cc3622?auto=format&fit=crop&w=600&q=80", desc: "Luxury 2-in-1 shampoo and conditioner for a rich lather that deeply cleanses and detangles." },
      { name: "Spa Lavish Pet", category: "Premium Care", img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=600&q=80", desc: "A luxurious line of pet spa products for the ultimate pampering and skin nourishment." }
    ]
  },
  "Orijen": {
    title: "ORIJEN.",
    subtitle: "Biologically appropriate pet food from fresh regional ingredients.",
    bgImage: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1920&q=80",
    description: "ORIJEN represents a new class of food, designed to nourish dogs and cats according to their evolutionary adaptation to a diet rich and diverse in fresh meat and protein.",
    products: [
      { name: "Orijen Original", category: "Dog Food", img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80", desc: "Biologically appropriate diet with 85% quality animal ingredients including free-run chicken and turkey." },
      { name: "Six Fish Dry Cat Food", category: "Cat Food", img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80", desc: "Packed with whole, wild-caught sustainable fish, providing a nutrient-dense diet for felines." },
      { name: "Freeze-Dried Treats", category: "Treats", img: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=600&q=80", desc: "100% raw animal ingredients, gently freeze-dried to lock in flavor and natural nutrients." }
    ]
  },
  "Kong": {
    title: "KONG.",
    subtitle: "Dogs need to play. Innovative, durable pet toys.",
    bgImage: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=1920&q=80",
    description: "KONG has been the gold standard for dog toys since 1976. All natural red rubber toys are proudly made in the USA and provide mental and physical stimulation, satisfying a dog's instinctual needs.",
    products: [
      { name: "Classic KONG", category: "Chew Toy", img: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=600&q=80", desc: "The gold standard of dog toys, offering enrichment and satisfying natural instincts. Great for stuffing." },
      { name: "KONG Extreme", category: "Chew Toy", img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=600&q=80", desc: "Designed for the toughest of chewers, made from our ultra-durable black rubber formula." },
      { name: "Wubba", category: "Interactive Toy", img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80", desc: "Fun, interactive toss and tug toy covered in durable nylon with flapping tails." }
    ]
  },
  "Petkin": { title: "PETKIN.", subtitle: "Easy pet hygiene.", bgImage: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=1920&q=80", description: "Petkin provides simple, innovative solutions for everyday pet care. Known for their veterinary-approved wipes.", products: [{ name: "Pet Wipes", category: "Hygiene", img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80", desc: "Enriched with aloe vera and vitamin E." }] },
  "Wahl": { title: "WAHL.", subtitle: "The global standard in clipping.", bgImage: "https://images.unsplash.com/photo-1585559606675-01e141a02fb4?auto=format&fit=crop&w=1920&q=80", description: "Engineering top-tier grooming tools for over a century for the rigorous demands of professional groomers.", products: [{ name: "KM10 Brushless", category: "Clippers", img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=600&q=80", desc: "Maximum power with brushless technology." }] },
  "Royal Canin": { title: "ROYAL CANIN.", subtitle: "Tailored health nutrition.", bgImage: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1920&q=80", description: "Precisely tailored nutritional solutions formulated by veterinarians and nutritionists.", products: [{ name: "Gastrointestinal Diet", category: "Clinical", img: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=600&q=80", desc: "Supports digestive health." }] },
  "Farmina": { title: "FARMINA.", subtitle: "Nature and science.", bgImage: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1920&q=80", description: "An Italian brand combining nature's finest ingredients with rigorous scientific research.", products: [{ name: "N&D Prime", category: "Nutrition", img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80", desc: "Grain-free kibble formulated with 98% animal protein." }] },
  "Beaphar": { title: "BEAPHAR.", subtitle: "High-quality healthcare.", bgImage: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=1920&q=80", description: "A pioneering force in pet healthcare since 1942, offering premium pharmaceuticals.", products: [{ name: "Macadamia Shampoo", category: "Grooming", img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=600&q=80", desc: "Mild shampoo enriched with macadamia oil." }] },
  "Flexi": { title: "FLEXI.", subtitle: "Retractable dog leashes.", bgImage: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=1920&q=80", description: "The gold standard in retractable walking accessories, hand-assembled in Germany.", products: [{ name: "New Classic Tape", category: "Leash", img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80", desc: "The perfect classic 5m tape leash." }] },
  "Acana": { title: "ACANA.", subtitle: "Fresh regional sourcing.", bgImage: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1920&q=80", description: "Crafted by Champion Petfoods, loaded with fresh, regional meats.", products: [{ name: "Pacifica Dog", category: "Nutrition", img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80", desc: "Loaded with fresh wild-caught herring." }] },
  "Earthbath": { title: "EARTHBATH.", subtitle: "Totally natural grooming.", bgImage: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1920&q=80", description: "Blending natural, non-toxic ingredients for the health of your pet and environment.", products: [{ name: "Oatmeal & Aloe Shampoo", category: "Grooming", img: "https://images.unsplash.com/photo-1537151608804-ea6f11cc3622?auto=format&fit=crop&w=600&q=80", desc: "Relieves itching and promotes healing." }] },
  "Furminator": { title: "FURMINATOR.", subtitle: "The ultimate deshedding solution.", bgImage: "https://images.unsplash.com/photo-1585559606675-01e141a02fb4?auto=format&fit=crop&w=1920&q=80", description: "Created by a professional groomer to reduce loose hair from shedding up to 90%.", products: [{ name: "deShedding Tool", category: "Grooming", img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=600&q=80", desc: "Reaches deep beneath the topcoat." }] },
  "Savic": { title: "SAVIC.", subtitle: "Innovative plastic pet accessories.", bgImage: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=1920&q=80", description: "A premium manufacturer of high-quality plastic accessories and housing from Belgium.", products: [{ name: "Nestor Litter Box", category: "Housing", img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80", desc: "Enclosed cat toilet with easy cleaning." }] },
  "Trixie": { title: "TRIXIE.", subtitle: "Europe's leading pet lifestyle brand.", bgImage: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=1920&q=80", description: "European lifestyle excellence focusing on enrichment, play, and comfort.", products: [{ name: "Activity Strategy Game", category: "Toys", img: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=600&q=80", desc: "Interactive puzzle board." }] },
  "Ruffwear": { title: "RUFFWEAR.", subtitle: "Performance dog gear.", bgImage: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1920&q=80", description: "Enhancing and inspiring exploration for outdoor adventurers and their companions.", products: [{ name: "Front Range Harness", category: "Gear", img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80", desc: "An everyday comfortable harness." }] }
};

// ==========================================
// CATEGORY DATABASE
// ==========================================

const categoryDatabase = {
  "Daily Essentials": {
    title: "DAILY ESSENTIALS.", subtitle: "Core nutritional staples and everyday care.", bgImage: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1920&q=80",
    description: "Explore our comprehensive range of daily nutritional staples, including biologically appropriate kibble, freeze-dried treats, and everyday hygiene solutions designed to keep your pets operating at their peak.",
    brands: ["Orijen", "Acana", "Farmina", "Royal Canin", "TropiClean", "Petkin"]
  },
  "Vet Tech": {
    title: "VET TECH.", subtitle: "Clinically proven supplements.", bgImage: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1920&q=80",
    description: "Advanced veterinary-approved diets, behavioral aids, and clinical supplements formulated to address specific health requirements, life stages, and breed profiles.",
    brands: ["TropiClean", "Petkin", "Beaphar"]
  },
  "Salon Pro": {
    title: "SALON PRO.", subtitle: "Professional-grade grooming equipment.", bgImage: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1920&q=80",
    description: "Equipping industry professionals with the world's most reliable and precise grooming tech, from carbon-infused shears to heavy-duty brushless clippers.",
    brands: ["Andis", "Wahl", "Furminator", "Earthbath"]
  }
};

// ==========================================
// ALL INDIVIDUAL SECTIONS
// ==========================================

const Hero = ({ isReady }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [textVisible, setTextVisible] = useState(false);
  const textRef = useRef(null);

  const slides = [
    {
      col1: "https://video.wixstatic.com/video/548938_9ce4b3046ac6488e9e5c9435da62afb8/1080p/mp4/file.mp4",
      col2: "https://video.wixstatic.com/video/548938_eb51c35dc901482884a1bba59e95f225/1080p/mp4/file.mp4",
      col3: "https://video.wixstatic.com/video/548938_096226587ef947238fc2d59bd40e0eb4/1080p/mp4/file.mp4",
      pill: "Bringing the World’s Finest Pet Care Brands to India",
      heading: "ELEVATING THE STANDARD.",
      paragraph: "India's premier import and distribution network. Bringing the world's most trusted clinical nutrition, professional grooming tools, and pet lifestyle accessories to your storefront."
    },
    {
      col1: "https://video.wixstatic.com/video/11062b_a405fb7004454b6bb08801d00cf04cb5/1080p/mp4/file.mp4",
      col2: "https://video.wixstatic.com/video/548938_9ce4b3046ac6488e9e5c9435da62afb8/1080p/mp4/file.mp4",
      col3: "https://video.wixstatic.com/video/548938_eb51c35dc901482884a1bba59e95f225/1080p/mp4/file.mp4",
      pill: "India’s Trusted Partner for Exclusive Pet Products",
      heading: "UNMATCHED DISTRIBUTION.",
      paragraph: "We bridge the gap between global manufacturers and Indian retailers, ensuring a seamless, climate-controlled supply chain and uncompromising product integrity."
    },
    {
      col1: "https://video.wixstatic.com/video/548938_096226587ef947238fc2d59bd40e0eb4/1080p/mp4/file.mp4",
      col2: "https://video.wixstatic.com/video/11062b_a405fb7004454b6bb08801d00cf04cb5/1080p/mp4/file.mp4",
      col3: "https://video.wixstatic.com/video/548938_9ce4b3046ac6488e9e5c9435da62afb8/1080p/mp4/file.mp4",
      pill: "Discover the Latest Global Launches",
      heading: "INNOVATION DELIVERED.",
      paragraph: "Stay ahead of the curve. Explore our newly arrived lines of advanced grooming technology, specialized clinical diets, and innovative wellness solutions."
    }
  ];

  useEffect(() => {
    if (!isReady) return;
    
    let floatInTimeout;
    let floatOutTimeout;

    const runSequence = () => {
      floatInTimeout = setTimeout(() => {
        setTextVisible(true);
      }, 600); 

      floatOutTimeout = setTimeout(() => {
        setTextVisible(false);
      }, 5500); 
    };

    runSequence();

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
      runSequence();
    }, 7000); 

    return () => { 
      clearInterval(interval); 
      clearTimeout(floatInTimeout);
      clearTimeout(floatOutTimeout);
    };
  }, [isReady, slides.length]);

  return (
    <section id="home" className="relative w-full h-screen flex items-end pb-12 sm:pb-16 md:pb-20 px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] overflow-hidden bg-[#050505]">
      {/* Background Video Slider Columns */}
      <div className="absolute inset-0 z-0 flex w-full h-full">
        {/* Column 1 (Slides Up) */}
        <div className="relative flex-1 h-full overflow-hidden bg-[#111]">
          {slides.map((slide, idx) => (
             <video 
               key={`c1-${idx}`} 
               autoPlay loop muted playsInline
               className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.77,0,0.175,1)] opacity-40 md:opacity-50 ${activeSlide === idx ? 'translate-y-0 scale-[1.05]' : 'translate-y-full scale-100'}`}
             >
                <source src={slide.col1} type="video/mp4" />
             </video>
          ))}
        </div>
        
        {/* Column 2 (Slides Down) */}
        <div className="relative flex-1 h-full overflow-hidden bg-[#111] border-l border-r border-white/5">
           {slides.map((slide, idx) => (
             <video 
               key={`c2-${idx}`} 
               autoPlay loop muted playsInline
               className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.77,0,0.175,1)] delay-100 opacity-40 md:opacity-50 ${activeSlide === idx ? 'translate-y-0 scale-[1.05]' : '-translate-y-full scale-100'}`}
             >
                <source src={slide.col2} type="video/mp4" />
             </video>
          ))}
        </div>
        
        {/* Column 3 (Slides Up) */}
        <div className="relative flex-1 h-full overflow-hidden bg-[#111]">
           {slides.map((slide, idx) => (
             <video 
               key={`c3-${idx}`} 
               autoPlay loop muted playsInline
               className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.77,0,0.175,1)] delay-200 opacity-40 md:opacity-50 ${activeSlide === idx ? 'translate-y-0 scale-[1.05]' : 'translate-y-full scale-100'}`}
             >
                <source src={slide.col3} type="video/mp4" />
             </video>
          ))}
        </div>
      </div>
      
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#000000] via-black/40 to-transparent pointer-events-none" />

      {/* Foreground Content - Orchestrated float in/out */}
      <div ref={textRef} className="relative z-20 w-full max-w-7xl will-change-transform">
        
        {/* Pill */}
        <div className={`transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${textVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: textVisible ? '0ms' : '0ms' }}>
          <div className="flex items-center gap-3 mb-4">
             <div className="w-8 sm:w-10 h-[2px] bg-[#E60000]" />
             <span className="text-white font-medium tracking-widest uppercase text-[10px] md:text-xs shadow-sm">
               {slides[activeSlide].pill}
             </span>
          </div>
        </div>
        
        {/* Title */}
        <div className={`transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${textVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: textVisible ? '100ms' : '50ms' }}>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[6vw] font-heading font-extrabold text-white leading-[1.05] md:leading-[0.95] tracking-tighter mb-4 drop-shadow-lg">
            {slides[activeSlide].heading}
          </h1>
        </div>

        {/* Paragraph */}
        <div className={`transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${textVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: textVisible ? '200ms' : '100ms' }}>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 font-light max-w-2xl leading-relaxed mb-6 drop-shadow-md">
            {slides[activeSlide].paragraph}
          </p>
        </div>

        {/* Button */}
        <div className={`transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${textVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: textVisible ? '300ms' : '150ms' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <button className="bg-[#E60000] text-white px-6 py-3 sm:px-8 sm:py-4 radius-max font-semibold text-sm hover:bg-white hover:text-[#E60000] transition-colors duration-300 flex items-center gap-3">
              Discover Our Network <ArrowRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

const Statistics = () => (
  <section className="py-16 md:py-24 bg-white border-b border-gray-100 z-20 relative">
    <div className="px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] max-w-[1800px] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 divide-y sm:divide-y-0 sm:gap-y-12 lg:divide-x divide-gray-200">
        <FadeUpReveal delayOffset={0} className="flex flex-col pt-6 sm:pt-0 lg:pl-8 first:pl-0">
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-[#111] mb-2 tracking-tighter flex items-start">#1<span className="text-[#E60000] text-2xl md:text-3xl">.</span></h3>
          <p className="text-[#E60000] text-xs font-bold uppercase tracking-wider mb-2">In India</p>
          <p className="text-gray-500 text-sm font-medium leading-relaxed">The premier pet products distribution network nationwide.</p>
        </FadeUpReveal>
        <FadeUpReveal delayOffset={100} className="flex flex-col pt-6 sm:pt-0 lg:pl-8">
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-[#111] mb-2 tracking-tighter flex items-start">37<span className="text-[#E60000] text-2xl md:text-3xl">+</span></h3>
          <p className="text-[#E60000] text-xs font-bold uppercase tracking-wider mb-2">Premium Brands</p>
          <p className="text-gray-500 text-sm font-medium leading-relaxed">Exclusive international partnerships bringing global quality home.</p>
        </FadeUpReveal>
        <FadeUpReveal delayOffset={200} className="flex flex-col pt-6 sm:pt-0 lg:pl-8">
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-[#111] mb-2 tracking-tighter flex items-start">2500<span className="text-[#E60000] text-2xl md:text-3xl">+</span></h3>
          <p className="text-[#E60000] text-xs font-bold uppercase tracking-wider mb-2">Unique Products</p>
          <p className="text-gray-500 text-sm font-medium leading-relaxed">A comprehensive catalog covering clinical nutrition to grooming.</p>
        </FadeUpReveal>
        <FadeUpReveal delayOffset={300} className="flex flex-col pt-6 sm:pt-0 lg:pl-8">
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-[#111] mb-2 tracking-tighter flex items-start">1000<span className="text-[#E60000] text-2xl md:text-3xl">+</span></h3>
          <p className="text-[#E60000] text-xs font-bold uppercase tracking-wider mb-2">Retail Partners</p>
          <p className="text-gray-500 text-sm font-medium leading-relaxed">Trusted by clinics, salons, and pet boutiques across the country.</p>
        </FadeUpReveal>
      </div>
    </div>
  </section>
);

const WhoAreWe = ({ navigateTo }) => (
  <section className="py-16 md:py-24 bg-[#FAFAFA] px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] text-left border-b border-gray-100">
    <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row gap-10 sm:gap-16 items-start">
      <div className="w-full lg:w-1/2">
        <FadeUpReveal>
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="w-10 h-[2px] bg-[#E60000]" />
            <span className="text-gray-500 font-medium tracking-widest uppercase text-xs">Who Are We</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-[#111] mb-6 leading-tight tracking-tighter">
            GLOBAL BRANDS.<br/>
            <span className="text-[#E60000]">INDIAN UNDERSTANDING.</span><br/>
            COMPLETE PET CARE.
          </h2>
        </FadeUpReveal>
      </div>
      <div className="w-full lg:w-1/2">
        <FadeUpReveal delayOffset={100}>
          <p className="text-gray-800 text-base sm:text-lg md:text-xl leading-relaxed mb-6 font-medium">
            ABK Imports is a trusted name in India’s pet care industry, bringing premium global brands and practical in-house solutions to pet parents, retailers, groomers, veterinarians, and pet care professionals since 2010.
          </p>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8 md:mb-10">
            From nutrition and treats to grooming, hygiene, accessories, veterinary products, and professional equipment, we deliver complete pet care solutions built for the Indian market.
          </p>
          <button onClick={() => navigateTo && navigateTo('Brand Portfolio')} className="bg-[#111] text-white px-6 py-3 sm:px-8 sm:py-4 radius-max font-bold text-xs sm:text-sm uppercase tracking-widest hover:bg-[#E60000] transition-colors flex items-center gap-3 w-max shadow-xl">
            Explore Our Brands <ArrowRight size={18} />
          </button>
        </FadeUpReveal>
      </div>
    </div>
  </section>
);

const TailoredSolutions = ({ navigateTo }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const categories = [
    { title: "Daily Essentials", desc: "Core nutritional staples and everyday care products ensuring your pets have optimal energy and vitality.", img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=80", link: "Category: Daily Essentials" },
    { title: "Vet Tech", desc: "Clinically proven supplements, specialized veterinary solutions, and diagnostic-assist tools.", img: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=80", link: "Category: Vet Tech" },
    { title: "Salon Pro", desc: "Professional-grade grooming clippers, shears, and salon formulations built for experts.", img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1200&q=80", link: "Category: Salon Pro" }
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-[#FAFAFA] relative px-5 sm:px-8 md:px-[4vw] lg:px-[3vw]">
      <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row gap-10 sm:gap-16 lg:gap-24 items-center">
         <div className="w-full lg:w-1/2 order-2 lg:order-1 flex flex-col justify-center text-left">
            <FadeUpReveal>
               <h2 className="text-4xl md:text-5xl font-heading font-black text-[#111] tracking-tighter leading-tight mb-8 md:mb-12 uppercase">
                 TAILORED <span className="text-[#E60000]">PET CARE</span><br/>SOLUTIONS
               </h2>
            </FadeUpReveal>
            <div className="flex flex-col gap-6">
               {categories.map((cat, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => navigateTo && navigateTo(cat.link)}
                    className={`cursor-pointer transition-all duration-500 border-l-[4px] pl-5 sm:pl-6 py-2 group ${activeIdx === idx ? 'border-[#E60000]' : 'border-gray-200 opacity-40 hover:opacity-70'}`}
                  >
                     <h3 className={`text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-heading font-black transition-colors duration-300 ${activeIdx === idx ? 'text-[#E60000]' : 'text-[#111]'}`}>{cat.title}</h3>
                     <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeIdx === idx ? 'max-h-[200px] mt-3 sm:mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                       <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-3 sm:mb-4 leading-relaxed max-w-lg">{cat.desc}</p>
                       <button className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#111] group-hover:text-[#E60000] transition-colors">Explore Category <ArrowRight size={16} /></button>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className="w-full lg:w-1/2 order-1 lg:order-2 h-[300px] sm:h-[400px] lg:h-[600px] relative radius-max overflow-hidden shadow-2xl">
            {categories.map((cat, idx) => (
               <img
                 key={idx}
                 src={cat.img}
                 className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${activeIdx === idx ? 'opacity-100 scale-100 grayscale-0' : 'opacity-0 scale-110 grayscale-[50%]'}`}
                 alt={cat.title}
               />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
         </div>
      </div>
    </section>
  );
};

const DoubleBrandMarquee = ({ navigateTo }) => {
  const row1 = [
    { label: "ANDIS", id: "Andis" },
    { label: "TROPICLEAN", id: "TropiClean" },
    { label: "ORIJEN", id: "Orijen" },
    { label: "KONG", id: "Kong" },
    { label: "PETKIN", id: "Petkin" },
    { label: "WAHL", id: "Wahl" },
    { label: "ROYAL CANIN", id: "RoyalCanin" },
    { label: "FARMINA", id: "Farmina" }
  ];
  const row2 = [
    { label: "BEAPHAR", id: "Beaphar" },
    { label: "FLEXI", id: "Flexi" },
    { label: "ACANA", id: "Acana" },
    { label: "EARTHBATH", id: "Earthbath" },
    { label: "FURMINATOR", id: "Furminator" },
    { label: "SAVIC", id: "Savic" },
    { label: "TRIXIE", id: "Trixie" },
    { label: "RUFFWEAR", id: "Ruffwear" }
  ];
  
  const scroll1 = [...row1, ...row1, ...row1, ...row1];
  const scroll2 = [...row2, ...row2, ...row2, ...row2];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white overflow-hidden relative border-b border-gray-100 flex flex-col gap-2">
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      
      <div className="flex animate-marquee-reverse whitespace-nowrap items-center w-max">
        {scroll1.map((brand, i) => (
          <div key={`row1-${i}`} onClick={() => navigateTo && navigateTo(`Brand: ${brand.id}`)} className="mx-4 sm:mx-6 text-3xl sm:text-5xl md:text-7xl lg:text-[7vw] leading-none font-heading font-black text-[#F2F2F2] hover:text-[#E60000] transition-colors duration-300 cursor-pointer select-none">
            {brand.label}
          </div>
        ))}
      </div>

      <div className="flex animate-marquee whitespace-nowrap items-center w-max">
        {scroll2.map((brand, i) => (
          <div key={`row2-${i}`} onClick={() => navigateTo && navigateTo(`Brand: ${brand.id}`)} className="mx-4 sm:mx-6 text-3xl sm:text-5xl md:text-7xl lg:text-[7vw] leading-none font-heading font-black text-[#F2F2F2] hover:text-[#E60000] transition-colors duration-300 cursor-pointer select-none">
            {brand.label}
          </div>
        ))}
      </div>
    </section>
  );
};

const AboutUs = () => {
  const [activeTimeline, setActiveTimeline] = useState(0);
  const timelineData = [
    { year: "2010", text: "ABK Imports founded with a vision to revolutionize Indian pet care.", img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80" },
    { year: "2015", text: "Secured exclusive rights to top-tier global grooming brands.", img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80" },
    { year: "2020", text: "Expanded logistics to 100% Pan-India fulfillment capabilities.", img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80" },
    { year: "2026", text: "Leading the market with 37+ brands and a dedicated B2B network.", img: "https://images.unsplash.com/photo-1537151608804-ea6f11cc3622?auto=format&fit=crop&w=800&q=80" }
  ];

  const spirit = [
    { l: 'S', title: 'Synergy', desc: 'Working together to elevate the pet care industry.' },
    { l: 'P', title: 'Passion', desc: 'A deep-rooted love for pets drives everything we do.' },
    { l: 'I', title: 'Integrity', desc: 'Uncompromising transparency in all our partnerships.' },
    { l: 'R', title: 'Reliability', desc: 'Consistent supply chain excellence you can count on.' },
    { l: 'I', title: 'Innovation', desc: 'Constantly seeking the latest global advancements.' },
    { l: 'T', title: 'Trust', desc: 'Building lifelong relationships with our retail network.' }
  ];

  return (
    <section className="py-20 md:py-32 blended-bg overflow-hidden relative text-left">
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#E60000]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[30vw] h-[30vw] bg-[#E60000]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] max-w-[1800px] mx-auto relative z-10">
        <FadeUpReveal>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-[2px] bg-[#E60000]" />
            <span className="text-gray-500 font-medium tracking-widest uppercase text-xs md:text-sm">Timeline</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter leading-tight text-[#111] mb-12 md:mb-20 max-w-3xl relative">
            A LEGACY BUILT ON THE <span className="text-[#E60000]">SPIRIT</span> OF CARE.
            <Star className="absolute -top-12 -left-12 text-[#E60000]/10 animate-spin-slow w-24 h-24 md:w-32 md:h-32 hidden md:block" />
          </h2>
        </FadeUpReveal>

        <div className="mb-20 md:mb-32 flex flex-col lg:flex-row gap-12 sm:gap-16 lg:gap-24 items-center">
          <div className="w-full lg:w-1/2">
            <FadeUpReveal delayOffset={100}>
              <div className="relative border-l-[2px] border-[#E8ECEF] py-4 md:py-6 space-y-10 md:space-y-16">
                {timelineData.map((item, idx) => (
                  <div key={idx} className="relative group cursor-pointer pl-8 md:pl-16" onMouseEnter={() => setActiveTimeline(idx)}>
                    <div className={`absolute top-2 left-[-13px] w-[24px] h-[24px] bg-[#FAFAFA] border-[4px] rounded-full transition-all duration-300 z-10 ${activeTimeline === idx ? 'border-[#E60000] scale-125' : 'border-[#CBD5E1] group-hover:border-[#E60000] group-hover:scale-110'}`} />
                    <h4 className={`text-3xl md:text-5xl font-heading font-black transition-colors duration-300 mb-2 md:mb-3 ${activeTimeline === idx ? 'text-[#E60000]' : 'text-[#CBD5E1] group-hover:text-[#E60000]'}`}>{item.year}</h4>
                    <p className={`text-sm sm:text-base md:text-lg transition-colors duration-300 max-w-md font-medium ${activeTimeline === idx ? 'text-gray-900' : 'text-gray-500'}`}>{item.text}</p>
                  </div>
                ))}
              </div>
            </FadeUpReveal>
          </div>
          <div className="w-full lg:w-1/2 h-[300px] sm:h-[400px] md:h-[550px] relative radius-max overflow-hidden shadow-2xl mt-8 lg:mt-0">
             {timelineData.map((item, idx) => (
               <img key={idx} src={item.img} alt={`Roadmap ${item.year}`} className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${activeTimeline === idx ? 'opacity-100 scale-100 filter-none' : 'opacity-0 scale-110 blur-sm'}`} />
             ))}
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10" />
             <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 right-6 md:right-8 z-20 flex items-end justify-between">
                <div>
                  <p className="text-[#E60000] text-[10px] font-bold tracking-widest uppercase mb-1 md:mb-2">Company Milestone</p>
                  <p className="text-white font-heading font-bold text-xl sm:text-2xl md:text-4xl tracking-wide leading-none">Roadmap<br/>{timelineData[activeTimeline].year}</p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shrink-0"><ArrowUpRight size={20} className="md:w-6 md:h-6" /></div>
             </div>
          </div>
        </div>

        <FadeUpReveal delayOffset={200}>
          <h3 className="text-xl md:text-2xl font-heading font-bold mb-6 md:mb-8 uppercase tracking-widest">Our Core Values</h3>
          <div className="flex flex-col md:flex-row w-full h-auto min-h-[400px] md:h-[400px] gap-2 md:gap-4">
            {spirit.map((item, idx) => (
              <div key={idx} className="spirit-card bg-white border border-gray-100 radius-max p-5 md:p-6 flex md:flex-col justify-between items-center md:items-start overflow-hidden shadow-sm relative group">
                <div className="text-3xl sm:text-4xl md:text-7xl font-heading font-black text-gray-200 group-hover:text-white/20 transition-colors shrink-0">{item.l}</div>
                <div className="spirit-title w-full md:w-[250px] ml-4 md:ml-0">
                   <h4 className="text-lg md:text-2xl font-heading font-bold md:mb-2 whitespace-nowrap">{item.title}</h4>
                   <p className="text-xs sm:text-sm opacity-90 leading-relaxed hidden md:block">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeUpReveal>
      </div>
    </section>
  );
};

const InteractiveCategoryExplorer = () => {
  const categories = [
    { title: "Clinical Nutrition", count: "12 Brands", img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80", desc: "Veterinarian-approved diets and specialized supplements." },
    { title: "Pro Grooming", count: "8 Brands", img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80", desc: "Industry-leading clippers, shears, and salon formulations." },
    { title: "Pet Lifestyle", count: "17 Brands", img: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=800&q=80", desc: "Durable toys, ergonomic bedding, and smart accessories." }
  ];

  return (
    <section className="py-16 md:py-24 bg-white px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] text-left">
      <div className="max-w-[1800px] mx-auto">
        <FadeUpReveal>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-[2px] bg-[#E60000]" />
            <span className="text-gray-500 font-medium tracking-widest uppercase text-xs md:text-sm">Product Verticals</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter leading-tight text-[#111] mb-12">EXPLORE CATEGORIES.</h2>
        </FadeUpReveal>

        <div className="flex flex-col md:flex-row h-[70vh] min-h-[400px] md:h-[500px] gap-4 w-full">
          {categories.map((cat, idx) => (
            <div key={idx} className="category-card relative radius-max overflow-hidden group h-full">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
              <img src={cat.img} alt={cat.title} className="absolute inset-0 w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s]" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20 text-white w-full">
                <p className="text-[#E60000] text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full inline-block">{cat.count}</p>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-2 whitespace-nowrap">{cat.title}</h3>
                <div className="cat-content h-0 overflow-hidden group-hover:h-auto">
                  <p className="text-xs sm:text-sm text-gray-200 mt-2 max-w-xs leading-relaxed">{cat.desc}</p>
                  <button className="mt-4 flex items-center gap-2 text-xs sm:text-sm font-semibold hover:text-[#E60000] transition-colors">
                    View Catalog <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductCatalogue = () => {
  return (
    <section className="bg-[#E64C3C] relative overflow-hidden text-left">
       <div className="max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] py-16 md:py-32 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2 relative z-10 text-white text-center md:text-left flex flex-col items-center md:items-start">
             <img src="https://abkimports.com/wp-content/uploads/2023/04/ABK-Logo_150pix-x-150pix-01.png" alt="ABK Imports" className="h-[60px] md:h-[80px] mb-8 brightness-0 invert object-contain" />
             <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black tracking-tighter leading-tight mb-4 uppercase">
                PRODUCT <br className="hidden md:block"/> CATALOGUE
             </h2>
             <p className="text-xl md:text-3xl font-heading font-bold tracking-widest mb-8 md:mb-12">2026-27</p>
             <button className="bg-white text-[#E64C3C] px-8 py-3 sm:px-10 sm:py-5 radius-max font-bold text-xs sm:text-sm hover:bg-black hover:text-white transition-colors duration-300 shadow-2xl flex items-center gap-3 w-max">
                Download Master PDF <ArrowRight size={20} className="w-4 h-4 sm:w-5 sm:h-5"/>
             </button>
          </div>
          <div className="w-full md:w-1/2 relative flex justify-center">
             <div className="w-[80%] max-w-[350px] md:max-w-[450px] aspect-[3/4] bg-white rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] rotate-2 hover:rotate-0 transition-transform duration-700 flex flex-col items-center justify-center p-6 md:p-8 border-4 md:border-8 border-gray-100">
                <img src="https://abkimports.com/wp-content/uploads/2023/04/ABK-Logo_150pix-x-150pix-01.png" alt="Logo" className="w-20 md:w-32 mb-8 opacity-20" />
                <h3 className="text-2xl md:text-4xl font-heading font-black text-center text-gray-800">MASTER CATALOGUE</h3>
                <div className="w-12 md:w-16 h-2 bg-[#E64C3C] mt-4 md:mt-6"></div>
             </div>
          </div>
       </div>
    </section>
  );
};

const WhyChooseABK = () => {
  const points = [
    { title: "Intelligent Logistics", desc: "Climate-controlled warehousing and automated routing ensuring product integrity." },
    { title: "B2B Partner Portal", desc: "Seamless ordering, real-time inventory tracking, and dedicated account management." },
    { title: "Regulatory Compliance", desc: "In-house legal teams ensuring all global products meet domestic certifications." }
  ];

  return (
    <section id="why-choose-abk" className="py-20 md:py-32 bg-[#F9F9F9] relative overflow-hidden bg-dots text-left">
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-white rounded-full blur-[100px] pointer-events-none" />
      
      <div className="px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] max-w-[1800px] mx-auto mb-12 md:mb-20 relative z-10">
         <FadeUpReveal>
            <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-[2px] bg-[#E60000]" />
               <span className="text-gray-500 font-medium tracking-widest uppercase text-xs md:text-sm">Capabilities</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter leading-tight text-[#111] mb-6">WHY CHOOSE <span className="text-[#E60000]">ABK IMPORTS.</span></h2>
            <p className="text-gray-600 text-base md:text-xl leading-relaxed max-w-3xl">We provide more than just products. We provide a robust, tech-enabled infrastructure designed to scale your retail or clinical operations.</p>
         </FadeUpReveal>
      </div>

      <div className="px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] max-w-[1800px] mx-auto relative">
        <div className="hidden md:block absolute top-[60px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E60000]/20 to-transparent" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-10">
           {points.map((pt, idx) => (
             <FadeUpReveal key={idx} delayOffset={idx * 150}>
               <div className="bg-white border border-gray-100 radius-max p-8 md:p-14 hover:shadow-xl transition-all duration-500 group h-full hover:-translate-y-2 text-left">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-[#FFF5F5] rounded-full flex items-center justify-center text-[#E60000] font-heading font-black text-2xl md:text-3xl mb-6 md:mb-8 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(230,0,0,0.1)]">0{idx + 1}</div>
                  <h3 className="text-xl md:text-2xl font-heading font-bold mb-3 md:mb-4 text-[#111]">{pt.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">{pt.desc}</p>
               </div>
             </FadeUpReveal>
           ))}
        </div>
      </div>
    </section>
  );
};

const ABKTechAdvantage = () => (
  <section className="py-20 md:py-32 bg-white px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] text-left border-y border-gray-100">
    <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row gap-12 sm:gap-16 items-center">
       <div className="lg:w-1/2">
         <FadeUpReveal>
            <div className="flex items-center gap-3 mb-4 md:mb-6">
               <div className="w-10 h-[2px] bg-[#E60000]" />
               <span className="text-gray-500 font-medium tracking-widest uppercase text-xs md:text-sm">Tech Infrastructure</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter leading-tight text-[#111] mb-6 md:mb-8">DATA-DRIVEN <br className="hidden sm:block"/><span className="text-[#E60000]">DISTRIBUTION.</span></h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6 md:mb-8">Our proprietary B2B portal goes beyond ordering. We provide our partners with actionable retail analytics, API-driven inventory syncing, and automated restocking triggers.</p>
            <ul className="flex flex-col gap-3 md:gap-4">
              {['Real-time inventory mapping via custom dashboard', 'Automated purchase order generation', 'Predictive demand analytics tailored to your region'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[#111] font-bold text-xs sm:text-sm md:text-base">
                   <CheckCircle2 size={20} className="text-[#E60000] shrink-0" /> <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
         </FadeUpReveal>
       </div>
       <div className="lg:w-1/2 w-full h-[300px] sm:h-[400px] md:h-[500px] radius-max overflow-hidden relative shadow-2xl group">
         <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" alt="Dashboard" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
       </div>
    </div>
  </section>
);

const AccountManagement = () => (
  <section className="py-20 md:py-32 bg-[#FAFAFA] px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] text-left">
    <div className="max-w-[1800px] mx-auto">
      <FadeUpReveal>
        <div className="flex items-center gap-3 mb-6">
           <div className="w-10 h-[2px] bg-[#E60000]" />
           <span className="text-gray-500 font-medium tracking-widest uppercase text-xs md:text-sm">Partner Success</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter leading-tight text-[#111] mb-12 md:mb-16">DEDICATED <span className="text-[#E60000]">SUPPORT.</span></h2>
      </FadeUpReveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {[
          { icon: <Users size={28} className="md:w-8 md:h-8" />, title: "Regional Managers", desc: "A dedicated point of contact assigned to your specific geographical zone for rapid response and localized strategy." },
          { icon: <Target size={28} className="md:w-8 md:h-8" />, title: "Quarterly Business Reviews", desc: "Strategic meetings to analyze your sell-through data, refine your inventory, and optimize your brand portfolio." },
          { icon: <HeartHandshake size={28} className="md:w-8 md:h-8" />, title: "Priority Resolution", desc: "A streamlined B2B ticketing system ensuring any operational hurdles are resolved seamlessly within 24 hours." }
        ].map((item, i) => (
          <FadeUpReveal key={i} delayOffset={i * 100}>
            <div className="bg-white p-8 md:p-10 radius-max border border-gray-100 hover:shadow-xl transition-all duration-300 h-full group">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-[#FFF5F5] text-[#E60000] rounded-full flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="text-xl md:text-2xl font-heading font-bold text-[#111] mb-3 md:mb-4">{item.title}</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">{item.desc}</p>
            </div>
          </FadeUpReveal>
        ))}
      </div>
    </div>
  </section>
);

const QualityAssurance = () => (
  <section className="py-20 md:py-32 bg-[#E60000] text-white px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] text-left">
    <div className="max-w-[1800px] mx-auto text-center flex flex-col items-center">
      <FadeUpReveal>
         <ShieldCheck size={48} className="md:w-16 md:h-16 mb-6 md:mb-8 mx-auto text-white/90" />
         <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter leading-tight mb-6 md:mb-8">100% UNCOMPROMISED<br/>QUALITY CONTROL.</h2>
         <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 md:mb-12">From the manufacturer's facility to your storefront, we maintain an unbroken chain of custody. Every batch is tracked, every import is legally certified, and cold-chain integrity is strictly enforced.</p>
         <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <span className="bg-white text-[#E60000] px-4 py-2 sm:px-6 sm:py-2.5 radius-max font-bold text-[10px] sm:text-xs lg:text-sm uppercase tracking-widest hover:scale-105 transition-transform cursor-default">FSSAI Certified</span>
            <span className="bg-white text-[#E60000] px-4 py-2 sm:px-6 sm:py-2.5 radius-max font-bold text-[10px] sm:text-xs lg:text-sm uppercase tracking-widest hover:scale-105 transition-transform cursor-default">AQCS Cleared</span>
            <span className="bg-white text-[#E60000] px-4 py-2 sm:px-6 sm:py-2.5 radius-max font-bold text-[10px] sm:text-xs lg:text-sm uppercase tracking-widest hover:scale-105 transition-transform cursor-default">Legal Metrology Compliant</span>
         </div>
      </FadeUpReveal>
    </div>
  </section>
);

const OnboardingSteps = () => {
  const steps = [
    { num: "01", title: "Submit Application", desc: "Complete our B2B portal registration with your trade licenses." },
    { num: "02", title: "Account Verification", desc: "Our compliance team validates your business within 24 hours." },
    { num: "03", title: "Strategic Allocation", desc: "Your regional manager assigns pricing tiers and credit lines." },
    { num: "04", title: "First Dispatch", desc: "Place your order via the portal with immediate warehouse dispatch." }
  ];
  return (
    <section className="py-20 md:py-32 bg-white px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] text-left">
      <div className="max-w-[1800px] mx-auto">
         <FadeUpReveal>
            <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-[2px] bg-[#E60000]" />
               <span className="text-gray-500 font-medium tracking-widest uppercase text-xs md:text-sm">Getting Started</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter leading-tight text-[#111] mb-12 md:mb-16">SEAMLESS <span className="text-[#E60000]">ONBOARDING.</span></h2>
         </FadeUpReveal>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {steps.map((step, i) => (
             <FadeUpReveal key={i} delayOffset={i * 150}>
                <div className="relative border-t-2 border-gray-100 pt-8 mt-8 sm:mt-12 group hover:border-[#E60000] transition-colors">
                  <div className="absolute -top-[20px] left-0 bg-white pr-4">
                    <span className="text-3xl sm:text-4xl font-heading font-black text-gray-200 group-hover:text-[#E60000] transition-colors">{step.num}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-heading font-bold text-[#111] mb-2 md:mb-3 mt-2 md:mt-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{step.desc}</p>
                </div>
             </FadeUpReveal>
           ))}
         </div>
      </div>
    </section>
  );
};

const MarketingSupport = () => (
  <section className="py-20 md:py-32 bg-[#111] text-white px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] text-left">
    <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
       <div className="lg:w-1/2 order-2 lg:order-1 h-[300px] sm:h-[400px] md:h-[600px] w-full relative radius-max overflow-hidden">
         <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80" alt="Marketing" className="w-full h-full object-cover grayscale-[30%] hover:scale-105 transition-transform duration-1000" />
       </div>
       <div className="lg:w-1/2 order-1 lg:order-2">
         <FadeUpReveal>
            <div className="flex items-center gap-3 mb-4 md:mb-6">
               <div className="w-10 h-[2px] bg-[#E60000]" />
               <span className="text-gray-400 font-medium tracking-widest uppercase text-xs md:text-sm">Growth Engine</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter leading-tight mb-6 md:mb-8">DRIVING <span className="text-[#E60000]">SELL-THROUGH.</span></h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 md:mb-10">We don't just put products on your shelves; we help you move them. Our retail partners gain exclusive access to a massive repository of marketing collateral and strategic support.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
               {[
                 { title: "Point of Sale", desc: "Premium physical displays and brand shelving." },
                 { title: "Digital Assets", desc: "High-res images and social media toolkits." },
                 { title: "Co-op Campaigns", desc: "Joint localized advertising initiatives." },
                 { title: "Sampling", desc: "Strategic trial programs for new product launches." }
               ].map((item, i) => (
                 <div key={i} className="border-l-2 border-white/20 pl-4 hover:border-[#E60000] transition-colors cursor-default">
                    <h4 className="text-base md:text-lg font-bold mb-1 md:mb-2 text-[#E60000]">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                 </div>
               ))}
            </div>
         </FadeUpReveal>
       </div>
    </div>
  </section>
);

const RetailerResources = () => (
  <section className="py-20 md:py-32 bg-[#FAFAFA] px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] text-left">
    <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
       <div className="lg:w-1/2">
         <FadeUpReveal>
            <div className="flex items-center gap-3 mb-4 md:mb-6">
               <div className="w-10 h-[2px] bg-[#E60000]" />
               <span className="text-gray-500 font-medium tracking-widest uppercase text-xs md:text-sm">ABK Academy</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter leading-tight text-[#111] mb-6 md:mb-8">EMPOWERING <br className="hidden sm:block"/><span className="text-[#E60000]">YOUR STAFF.</span></h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 md:mb-10">Knowledge drives sales. We provide comprehensive, ongoing training for your staff to ensure they confidently recommend the right products to pet parents.</p>
            <div className="space-y-6 md:space-y-8">
               <div className="flex items-start gap-4 md:gap-5 group cursor-default">
                 <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center text-[#E60000] shadow-sm shrink-0 group-hover:scale-110 transition-transform"><GraduationCap size={24} className="w-5 h-5 md:w-6 md:h-6" /></div>
                 <div>
                   <h4 className="font-heading font-bold text-[#111] text-lg md:text-xl">Product Certifications</h4>
                   <p className="text-gray-500 text-sm md:text-base mt-1 md:mt-2 leading-relaxed">Virtual modules covering ingredient profiles, nutritional science, and clinical benefits.</p>
                 </div>
               </div>
               <div className="flex items-start gap-4 md:gap-5 group cursor-default">
                 <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center text-[#E60000] shadow-sm shrink-0 group-hover:scale-110 transition-transform"><Megaphone size={24} className="w-5 h-5 md:w-6 md:h-6" /></div>
                 <div>
                   <h4 className="font-heading font-bold text-[#111] text-lg md:text-xl">Grooming Masterclasses</h4>
                   <p className="text-gray-500 text-sm md:text-base mt-1 md:mt-2 leading-relaxed">On-site hardware training and maintenance seminars led by industry master groomers.</p>
                 </div>
               </div>
            </div>
         </FadeUpReveal>
       </div>
       <div className="lg:w-1/2 w-full h-[300px] sm:h-[400px] md:h-[600px] radius-max overflow-hidden relative shadow-xl">
         <img src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=1200&q=80" alt="Training" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
       </div>
    </div>
  </section>
);

const InteractiveROICalculator = () => {
  const [clients, setClients] = useState(150);
  const avgOrderValue = 2500; 
  const margin = 0.35; 
  const revenue = Math.floor(clients * avgOrderValue);
  const profit = Math.floor(revenue * margin);

  return (
    <section className="py-20 md:py-24 bg-[#0a0a0a] text-white px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] relative overflow-hidden text-left">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[#E60000]/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-16">
        <div className="w-full md:w-1/2">
          <FadeUpReveal>
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-10 h-[2px] bg-[#E60000]" />
              <span className="text-gray-400 font-medium tracking-widest uppercase text-xs md:text-sm">Partner Benefits</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter leading-tight mb-4 md:mb-6">PROJECT YOUR <br className="hidden sm:block"/><span className="text-[#E60000]">GROWTH.</span></h2>
            <p className="text-gray-400 text-sm md:text-base lg:text-lg mb-8 md:mb-10 leading-relaxed">Calculate your estimated monthly revenue potential by integrating ABK Imports' premium catalog into your retail or clinical practice.</p>
            
            <div className="bg-[#111] p-6 md:p-8 radius-max border border-white/10">
              <div className="flex justify-between items-end mb-4 md:mb-6">
                <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400">Monthly Pet Clients</label>
                <span className="text-2xl md:text-3xl font-heading font-black text-white">{clients}</span>
              </div>
              <div className="py-4">
                <input 
                  type="range" 
                  min="50" max="1000" step="10" 
                  value={clients} 
                  onChange={(e) => setClients(e.target.value)} 
                  className="w-full"
                />
              </div>
              <div className="flex justify-between mt-2 text-[10px] md:text-xs text-gray-500 font-mono">
                <span>50</span><span>1000+</span>
              </div>
            </div>
          </FadeUpReveal>
        </div>

        <div className="w-full md:w-1/2">
          <FadeUpReveal delayOffset={200}>
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#111] p-6 md:p-10 radius-max border border-white/10 shadow-2xl relative overflow-hidden group text-left">
                <div className="absolute -right-5 -top-5 md:-right-10 md:-top-10 text-white/5 group-hover:scale-110 transition-transform duration-700">
                  <BarChart3 size={100} className="md:w-[150px] md:h-[150px]" />
                </div>
                <p className="text-[#E60000] text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2">Est. Monthly Revenue</p>
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black">₹{revenue.toLocaleString('en-IN')}</h3>
              </div>
              
              <div className="bg-[#E60000] text-white p-6 md:p-10 radius-max shadow-[0_20px_50px_rgba(230,0,0,0.2)] text-left">
                <p className="text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2">Projected Gross Margin (35%)</p>
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black">₹{profit.toLocaleString('en-IN')}</h3>
                <p className="text-[10px] md:text-xs mt-4 md:mt-6 font-medium bg-white/20 inline-block px-3 py-1.5 md:px-4 md:py-2 rounded-full backdrop-blur-sm">Based on industry average basket size.</p>
              </div>
            </div>
          </FadeUpReveal>
        </div>
      </div>
    </section>
  );
};

const InteractiveLogistics = () => {
  return (
    <section className="py-20 md:py-24 bg-[#F9F9F9] px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] bg-dots relative text-left">
      <div className="max-w-[1800px] mx-auto mb-12 md:mb-16">
        <FadeUpReveal>
          <div className="flex items-center gap-3 mb-4 md:mb-6">
             <div className="w-10 h-[2px] bg-[#E60000]" />
             <span className="text-gray-500 font-medium tracking-widest uppercase text-xs md:text-sm">Operations</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter leading-tight text-[#111] mb-4 md:mb-6">UNMATCHED INFRASTRUCTURE.</h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl leading-relaxed">Real-time inventory visibility and climate-controlled routing ensure your products arrive in pristine condition.</p>
        </FadeUpReveal>
      </div>

      <div className="max-w-[1800px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {[
          { icon: <Box className="w-6 h-6 md:w-8 md:h-8" />, title: "Automated Warehousing", value: "150,000", suffix: "sq ft", desc: "State-of-the-art storage facilities nationwide." },
          { icon: <Truck className="w-6 h-6 md:w-8 md:h-8" />, title: "Cold-Chain Fleet", value: "99.8", suffix: "%", desc: "On-time, temperature-regulated delivery rate." },
          { icon: <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />, title: "Quality Assurance", value: "100", suffix: "%", desc: "Compliance with all domestic regulatory standards." }
        ].map((stat, idx) => (
          <FadeUpReveal key={idx} delayOffset={idx * 150}>
            <div className="bg-white p-8 md:p-10 radius-max border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-start text-left group">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-[#FFF5F5] text-[#E60000] rounded-full flex items-center justify-center mb-5 md:mb-6 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#111] mb-1 md:mb-2">{stat.value}<span className="text-lg md:text-2xl text-[#E60000] ml-1">{stat.suffix}</span></h3>
              <h4 className="text-sm md:text-lg font-bold mb-2 md:mb-3">{stat.title}</h4>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed">{stat.desc}</p>
            </div>
          </FadeUpReveal>
        ))}
      </div>
    </section>
  );
};

const GlobalNetwork = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  useEffect(() => {
    if (window.L) {
      setLeafletLoaded(true);
      return;
    }
    const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'; document.head.appendChild(link);
    const script = document.createElement('script'); script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'; script.async = true; script.onload = () => setLeafletLoaded(true); document.body.appendChild(script);
    return () => { if (mapInstance.current) { mapInstance.current.remove(); mapInstance.current = null; } };
  }, []);

  useEffect(() => {
    if (leafletLoaded && mapRef.current && !mapInstance.current) {
      const L = window.L;
      const map = L.map(mapRef.current, { center: [30, 10], zoom: 2, zoomControl: false, attributionControl: false, scrollWheelZoom: false });
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', { subdomains: 'abcd', maxZoom: 19 }).addTo(map);
      L.control.zoom({ position: 'topright' }).addTo(map);

      const locations = [
        { coords: [39.0997, -94.5786], title: 'North America Hub', desc: 'Sourcing: Premium Nutrition & Tools', type: 'hub' },
        { coords: [51.5074, -0.1278], title: 'European Hub', desc: 'Sourcing: Lifestyle & Vet Care', type: 'hub' },
        { coords: [22.3193, 114.1694], title: 'Asian Hub', desc: 'Sourcing: Innovative Accessories', type: 'hub' },
        { coords: [18.5204, 73.8567], title: 'Pune, India', desc: 'Global Headquarters & Central Dist. Hub', type: 'hq' },
        { coords: [28.7041, 77.1025], title: 'Delhi NCR', desc: 'Regional Distribution Hub', type: 'regional' }
      ];

      locations.forEach(loc => {
        const isHQ = loc.type === 'hq';
        const color = isHQ ? '#E60000' : (loc.type === 'hub' ? '#ffffff' : '#aaaaaa');
        const size = isHQ ? 8 : (loc.type === 'hub' ? 5 : 4); 
        const pulseClass = isHQ ? 'animate-ping opacity-50 absolute inset-0 rounded-full' : '';

        const iconHtml = `<div style="position: relative; width: ${size*2}px; height: ${size*2}px;">${isHQ ? `<div class="${pulseClass}" style="background-color: ${color};"></div>` : ''}<div style="position: absolute; inset: 0; background-color: ${color}; border-radius: 50%; box-shadow: 0 0 10px ${color};"></div></div>`;
        const customIcon = L.divIcon({ className: 'custom-map-marker', html: iconHtml, iconSize: [size*2, size*2], iconAnchor: [size, size] });
        const marker = L.marker(loc.coords, { icon: customIcon }).addTo(map);

        marker.bindTooltip(`
          <div style="background: rgba(17, 17, 17, 0.95); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.1); padding: 12px; border-radius: 8px; color: white; min-width: 150px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <p style="color: ${color}; font-size: 9px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 4px 0;">${loc.type === 'hq' ? 'Headquarters' : 'Network Node'}</p>
            <strong style="color: white; font-size: 14px; font-family: 'Montserrat', sans-serif; display: block; margin-bottom: 6px;">${loc.title}</strong>
            <span style="font-size: 11px; color: #aaa; line-height: 1.4; display: block;">${loc.desc}</span>
          </div>
        `, { direction: 'top', offset: [0, -size], className: 'custom-leaflet-tooltip' });
      });

      mapInstance.current = map;
    }
  }, [leafletLoaded]);

  return (
    <section className="py-20 md:py-32 bg-[#050505] text-white relative overflow-hidden border-t border-white/10 text-left">
      <div className="px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] max-w-[1800px] mx-auto relative z-20">
        <FadeUpReveal>
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="w-10 h-[2px] bg-[#E60000]" />
            <span className="text-gray-400 font-medium tracking-widest uppercase text-xs md:text-sm">Global Footprint</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter leading-tight mb-8 md:mb-12">
            SOURCING WORLDWIDE.<br/>DELIVERING <span className="text-[#E60000]">PAN-INDIA.</span>
          </h2>
        </FadeUpReveal>

        <FadeUpReveal delayOffset={100}>
          <div className="w-full h-[300px] sm:h-[400px] md:h-[50vh] lg:h-[60vh] min-h-[300px] radius-max overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10 bg-[#111]">
            {leafletLoaded ? <div ref={mapRef} className="w-full h-full relative z-10" /> : <div className="w-full h-full flex items-center justify-center text-gray-500 font-mono text-xs md:text-sm">Initializing Geospatial Data...</div>}
            
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-[400] bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-3 md:p-4 pointer-events-none hidden sm:block text-left">
               <h4 className="text-[10px] md:text-xs font-bold text-white uppercase tracking-widest mb-2 md:mb-3">Network Legend</h4>
               <div className="flex flex-col gap-2 md:gap-3">
                  <div className="flex items-center gap-2 md:gap-3"><div className="w-2 h-2 md:w-3 md:h-3 bg-[#E60000] rounded-full shadow-[0_0_8px_#E60000]"></div><span className="text-[10px] md:text-xs text-gray-300">Central HQ & Hub</span></div>
                  <div className="flex items-center gap-2 md:gap-3"><div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 bg-white rounded-full"></div><span className="text-[10px] md:text-xs text-gray-300">Global Sourcing Node</span></div>
                  <div className="flex items-center gap-2 md:gap-3"><div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-500 rounded-full"></div><span className="text-[10px] md:text-xs text-gray-300">Regional Distribution</span></div>
               </div>
            </div>
          </div>
        </FadeUpReveal>

        <div className="mt-12 md:mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 border-t border-white/10 pt-12 md:pt-16 relative">
          <FadeUpReveal delayOffset={100} className="relative text-left">
            <h4 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold mb-3 md:mb-4">North America</h4>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-sm">Partnering with industry titans in the USA and Canada to bring clinically proven nutrition, behavioral toys, and grooming tech to India.</p>
          </FadeUpReveal>
          <FadeUpReveal delayOffset={200} className="relative text-left">
            <h4 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold mb-3 md:mb-4">Europe & UK</h4>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-sm">Sourcing premium lifestyle accessories, specialized veterinary care products, and heritage grooming brands trusted globally.</p>
          </FadeUpReveal>
          <FadeUpReveal delayOffset={300} className="relative text-left sm:col-span-2 md:col-span-1">
            <h4 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold mb-3 md:mb-4">Asian Markets</h4>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-sm">Leveraging high-tech manufacturing hubs for innovative toys, smart pet accessories, and highly reliable daily care items.</p>
            <div className="mt-6 md:mt-8 inline-flex items-center gap-2 md:gap-3 bg-[#1A1A1A]/80 border border-white/20 rounded-full px-4 py-2 md:px-5 md:py-2.5 backdrop-blur-md">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-white rounded-full flex items-center justify-center relative"><div className="absolute inset-0 bg-[#E60000] rounded-full animate-ping opacity-50" /><div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#E60000] rounded-full" /></div>
                <span className="text-[9px] md:text-[11px] font-bold tracking-widest uppercase text-white">Pune Central Hub</span>
            </div>
          </FadeUpReveal>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const reviews = [
    { text: "ABK Imports completely transformed our clinic's supply chain. Their premium grooming tools are unmatched.", author: "Dr. Sarah Jenkins", role: "Head Veterinarian" },
    { text: "Partnering with ABK gave us access to global nutrition brands we couldn't source ourselves. Our clients love the quality.", author: "Michael Chang", role: "Retail Owner" },
    { text: "Reliable distribution, excellent customer support, and a catalog that truly cares about pet well-being.", author: "Emma Roberts", role: "Grooming Director" }
  ];

  useEffect(() => {
    const int = setInterval(() => setActive(prev => (prev + 1) % reviews.length), 5000);
    return () => clearInterval(int);
  }, [reviews.length]);

  return (
    <section className="py-20 md:py-32 bg-[#111] text-white text-left px-5 sm:px-8 md:px-[4vw] lg:px-[3vw]">
      <div className="max-w-[1800px] mx-auto">
        <Star className="text-[#E60000] mb-8 md:mb-10 w-8 h-8 md:w-12 md:h-12" fill="currentColor" />
        <div className="relative h-[280px] sm:h-[220px] md:h-[250px] w-full max-w-5xl">
          {reviews.map((rev, idx) => (
            <div key={idx} className={`absolute top-0 left-0 w-full transition-all duration-1000 ease-in-out ${active === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-medium leading-tight mb-6 md:mb-8">"{rev.text}"</h3>
              <p className="font-bold text-lg md:text-xl">{rev.author}</p>
              <p className="text-gray-500 uppercase tracking-widest text-[10px] md:text-sm mt-1">{rev.role}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-3 md:gap-4 mt-4 md:mt-8">
          {reviews.map((_, idx) => (
            <button key={idx} onClick={() => setActive(idx)} className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${active === idx ? 'w-8 md:w-10 bg-[#E60000]' : 'w-2 bg-gray-600'}`} aria-label="Review Slide" />
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(0);
  const faqs = [
    { q: "How do I become an ABK retail partner?", a: "Simply click 'B2B Partner Login' in our menu and fill out the onboarding application. Our regional sales team will contact you within 24 hours to finalize your account setup." },
    { q: "What is the minimum order quantity (MOQ)?", a: "MOQs vary by brand and category to support both small clinics and large retail chains. Detailed pricing and MOQ tiers are available instantly upon portal login." },
    { q: "Do you offer drop-shipping for e-commerce?", a: "Currently, we focus on wholesale B2B distribution to stock your physical or digital shelves. We do not provide direct-to-consumer drop-shipping." },
    { q: "How are damages or returns handled?", a: "We have a 7-day hassle-free return policy for any transit damages. Our portal includes a one-click RMA process for quick resolutions." }
  ];

  return (
    <section className="py-20 md:py-32 bg-white px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] text-left">
      <div className="max-w-[1000px] mx-auto">
        <FadeUpReveal>
          <div className="mb-10 md:mb-16">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
               <div className="w-10 h-[2px] bg-[#E60000]" />
               <span className="text-gray-500 font-medium tracking-widest uppercase text-xs md:text-sm">Help & Support</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter leading-tight text-[#111]">FREQUENTLY ASKED.</h2>
          </div>
        </FadeUpReveal>

        <div className="flex flex-col gap-3 md:gap-4">
          {faqs.map((faq, idx) => (
            <FadeUpReveal key={idx} delayOffset={idx * 100}>
              <div 
                className={`border border-gray-200 radius-max overflow-hidden transition-all duration-300 cursor-pointer ${openIdx === idx ? 'bg-[#FAFAFA] shadow-md' : 'bg-white hover:border-gray-300'}`}
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
              >
                <div className="p-5 md:p-8 flex justify-between items-center">
                  <h4 className={`text-sm sm:text-base md:text-lg lg:text-xl font-bold transition-colors pr-4 ${openIdx === idx ? 'text-[#E60000]' : 'text-[#111]'}`}>{faq.q}</h4>
                  <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-transform duration-300 shrink-0 ${openIdx === idx ? 'bg-[#E60000] text-white rotate-45' : 'bg-gray-100 text-gray-500'}`}>
                    <Plus size={18} className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </div>
                <div className={`px-5 md:px-8 overflow-hidden transition-all duration-500 ease-in-out ${openIdx === idx ? 'max-h-[800px] pb-6 md:pb-8 opacity-100' : 'max-h-0 pb-0 opacity-0'}`}>
                  <p className="text-gray-600 leading-relaxed text-xs sm:text-sm md:text-base">{faq.a}</p>
                </div>
              </div>
            </FadeUpReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const InsightsNews = () => {
  const articles = [
    { date: "June 02, 2026", category: "Brand Acquisition", title: "ABK Imports Secures Exclusive Rights for Advanced Grooming Line", img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80" },
    { date: "May 18, 2026", category: "Market Insight", title: "The Future of Clinical Nutrition in Indian Veterinary Practices", img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80" },
    { date: "April 30, 2026", category: "Infrastructure", title: "Expanding the Savannah HQ: Inside Our New Cold-Chain Facility", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80" }
  ];

  return (
    <section className="py-20 md:py-32 bg-white px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] text-left">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6 md:gap-8">
          <FadeUpReveal>
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-10 h-[2px] bg-[#E60000]" />
              <span className="text-gray-500 font-medium tracking-widest uppercase text-xs md:text-sm">Corporate News</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter leading-tight text-[#111]">INDUSTRY INSIGHTS.</h2>
          </FadeUpReveal>
          <FadeUpReveal delayOffset={100}>
             <button className="border border-gray-300 text-black px-6 md:px-8 py-3 md:py-4 radius-max text-xs md:text-sm font-semibold hover:border-[#111] hover:bg-[#111] hover:text-white transition-all duration-300 w-max">
               View All News
             </button>
          </FadeUpReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((art, idx) => (
            <FadeUpReveal key={idx} delayOffset={idx * 100}>
              <div className="group cursor-pointer text-left">
                <div className="w-full h-[200px] md:h-[250px] radius-max overflow-hidden mb-5 md:mb-6 relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img src={art.img} alt={art.title} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                  <div className="absolute top-3 left-3 md:top-4 md:left-4 z-20 bg-white px-2 py-1 md:px-3 md:py-1.5 radius-max text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-black">
                    {art.category}
                  </div>
                </div>
                <p className="text-[#E60000] text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 md:mb-3">{art.date}</p>
                <h4 className="text-lg md:text-xl lg:text-2xl font-heading font-bold text-[#111] group-hover:text-[#E60000] transition-colors duration-300 leading-tight">
                  {art.title}
                </h4>
              </div>
            </FadeUpReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const WorkWithUs = () => {
  return (
    <section id="work-with-us" className="py-20 md:py-32 px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] blended-bg border-y border-gray-200 text-left">
      <div className="max-w-[1800px] mx-auto bg-white radius-max shadow-xl overflow-hidden flex flex-col md:flex-row">
         <div className="w-full md:w-1/2 p-8 sm:p-12 md:p-24 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 md:mb-6">PARTNER WITH EXCELLENCE.</h2>
            <p className="text-gray-600 text-sm md:text-lg mb-8 md:mb-10 leading-relaxed">Whether you are a global brand looking to enter the Indian market, or a passionate professional seeking a career at our Savannah HQ, we want to hear from you.</p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <button className="bg-[#E60000] text-white px-6 md:px-8 py-3 md:py-4 radius-max font-bold hover:bg-[#111] transition-colors text-xs md:text-sm text-center">Join Our Network</button>
              <button className="bg-transparent border border-gray-300 text-[#111] px-6 md:px-8 py-3 md:py-4 radius-max font-bold hover:border-[#111] transition-colors text-xs md:text-sm text-center">View Careers</button>
            </div>
         </div>
         <div className="w-full md:w-1/2 h-[250px] sm:h-[350px] md:h-auto">
            <img src="https://images.unsplash.com/photo-1521651201144-634f700b36ef?auto=format&fit=crop&w=1200&q=80" alt="Work with ABK" className="w-full h-full object-cover grayscale-[20%]" />
         </div>
      </div>
    </section>
  );
};

const BrandSpotlight = ({ navigateTo }) => (
  <section className="py-20 md:py-32 bg-[#111] text-white px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] text-left">
    <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
      <div className="lg:w-1/2">
        <FadeUpReveal>
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="w-10 h-[2px] bg-[#E60000]" />
            <span className="text-gray-400 font-medium tracking-widest uppercase text-xs md:text-sm">Brand Spotlight</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-black mb-6 md:mb-8 leading-[1]">ANDIS<br/><span className="text-gray-500">PRO.</span></h2>
          <p className="text-base md:text-xl text-gray-300 leading-relaxed mb-6 md:mb-8 max-w-xl">As the exclusive national distributor for Andis, we empower Indian grooming professionals with world-class clipping and trimming technology built for precision.</p>
          <div className="flex gap-8 md:gap-12 mb-8 md:mb-10">
            <div>
              <p className="text-3xl md:text-4xl font-heading font-bold text-[#E60000]">10k+</p>
              <p className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 mt-1 md:mt-2">Salons Equipped</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-heading font-bold text-[#E60000]">100%</p>
              <p className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 mt-1 md:mt-2">Authentic Spares</p>
            </div>
          </div>
          <button onClick={() => navigateTo('Brand: Andis')} className="border border-white/30 text-white px-6 sm:px-8 py-3 md:py-4 radius-max font-bold hover:bg-white hover:text-black transition-colors text-xs md:text-sm w-full sm:w-auto">View Andis Catalog</button>
        </FadeUpReveal>
      </div>
      <div className="lg:w-1/2 h-[350px] sm:h-[500px] lg:h-[700px] w-full relative radius-max overflow-hidden">
        <img src="https://images.unsplash.com/photo-1585559606675-01e141a02fb4?auto=format&fit=crop&w=1200&q=80" alt="Andis" className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s] grayscale-[20%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111]/80 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  </section>
);

const NewArrivals = () => {
  const arrivals = [
    { name: "Earthbath", category: "Grooming", desc: "Totally natural pet care & shampoos.", img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=600&q=80" },
    { name: "Ruffwear", category: "Outdoor", desc: "Performance dog gear and apparel.", img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80" },
    { name: "Nylabone", category: "Toys", desc: "Durable chew toys & dental solutions.", img: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=600&q=80" },
  ];
  return (
    <section className="py-20 md:py-32 bg-[#FAFAFA] px-5 sm:px-8 md:px-[4vw] lg:px-[3vw]">
       <div className="max-w-[1800px] mx-auto text-left">
          <FadeUpReveal>
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-10 h-[2px] bg-[#E60000]" />
              <span className="text-gray-500 font-medium tracking-widest uppercase text-xs md:text-sm">Just Landed</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter leading-tight text-[#111] mb-10 md:mb-16">NEW ARRIVALS.</h2>
          </FadeUpReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {arrivals.map((brand, i) => (
              <FadeUpReveal key={i} delayOffset={i*150}>
                <div className="group cursor-pointer bg-white p-5 md:p-6 radius-max border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                  <div className="w-full aspect-[4/3] overflow-hidden radius-max mb-4 md:mb-6 relative">
                    <div className="absolute top-3 left-3 md:top-4 md:left-4 z-20 bg-[#E60000] text-white px-3 py-1.5 md:px-4 md:py-1.5 radius-max text-[8px] md:text-[10px] font-bold uppercase tracking-widest shadow-md">New</div>
                    <img src={brand.img} alt={brand.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  </div>
                  <p className="text-[#E60000] text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1 md:mb-2">{brand.category}</p>
                  <h4 className="text-xl md:text-2xl font-heading font-bold text-[#111] mb-1 md:mb-2">{brand.name}</h4>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{brand.desc}</p>
                </div>
              </FadeUpReveal>
            ))}
          </div>
       </div>
    </section>
  )
};

const SelectionCriteria = () => {
  const criteria = [
    { title: "Clinical Efficacy", desc: "Every nutritional and wellness product is stringently vetted by our panel of veterinary experts to ensure true health benefits." },
    { title: "Ethical Sourcing", desc: "We prioritize partnerships with brands deeply committed to sustainable manufacturing and cruelty-free testing methodologies." },
    { title: "Market Viability", desc: "Rigorous market analysis ensures every brand we introduce strongly resonates with the evolving needs of Indian pet parents." }
  ];
  return (
     <section className="py-20 md:py-32 bg-white px-5 sm:px-8 md:px-[4vw] lg:px-[3vw]">
        <div className="max-w-[1800px] mx-auto text-left">
          <FadeUpReveal>
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-10 h-[2px] bg-[#E60000]" />
              <span className="text-gray-500 font-medium tracking-widest uppercase text-xs md:text-sm">Curation Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter leading-tight text-[#111] mb-12 md:mb-20 max-w-4xl">HOW WE SELECT <span className="text-[#E60000]">OUR PARTNERS.</span></h2>
          </FadeUpReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12 lg:gap-24">
             {criteria.map((item, i) => (
               <FadeUpReveal key={i} delayOffset={i * 150}>
                 <div className="border-t border-gray-200 pt-6 md:pt-10 group">
                   <h4 className="text-4xl md:text-6xl font-heading font-black text-gray-100 mb-4 md:mb-8 transition-colors group-hover:text-[#E60000]">0{i+1}</h4>
                   <h3 className="text-lg md:text-2xl font-heading font-bold text-[#111] mb-2 md:mb-4">{item.title}</h3>
                   <p className="text-gray-600 leading-relaxed text-sm md:text-lg">{item.desc}</p>
                 </div>
               </FadeUpReveal>
             ))}
          </div>
        </div>
     </section>
  );
};

const OurMissionVision = () => (
  <section className="py-20 md:py-32 px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] bg-white text-left">
    <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row gap-12 sm:gap-16 lg:gap-24">
      <FadeUpReveal className="flex-1">
        <h3 className="text-xs md:text-sm font-bold tracking-widest text-[#E60000] uppercase mb-4 md:mb-6 flex items-center gap-3 md:gap-4"><div className="w-6 md:w-8 h-[2px] bg-[#E60000]"></div>Our Mission</h3>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#111] mb-4 md:mb-6 leading-tight tracking-tighter">Setting a New Standard for Pet Wellbeing.</h2>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">We are dedicated to enriching the lives of pets by providing Indian pet parents and professionals with uninterrupted access to the world's most trusted, clinically proven, and innovative pet care products.</p>
      </FadeUpReveal>
      <FadeUpReveal className="flex-1" delayOffset={200}>
        <h3 className="text-xs md:text-sm font-bold tracking-widest text-[#E60000] uppercase mb-4 md:mb-6 flex items-center gap-3 md:gap-4"><div className="w-6 md:w-8 h-[2px] bg-[#E60000]"></div>Our Vision</h3>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#111] mb-4 md:mb-6 leading-tight tracking-tighter">An Ecosystem of Global Excellence.</h2>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed">By 2030, we aim to be the backbone of the Asian pet care industry, integrating tech-driven logistics with uncompromising quality assurance to empower every clinic, salon, and retail partner nationwide.</p>
      </FadeUpReveal>
    </div>
  </section>
);

const LeadershipTeam = () => {
  const team = [
    { name: "Kushal Pittie", role: "Co-Founder & Director", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80" },
    { name: "Anand Pittie", role: "Co-Founder & Director", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80" },
  ];
  return (
    <section className="py-20 md:py-32 bg-[#FAFAFA] px-5 sm:px-8 md:px-[4vw] lg:px-[3vw]">
      <div className="max-w-[1800px] mx-auto text-left">
        <FadeUpReveal>
          <div className="flex items-center gap-3 mb-4 md:mb-6">
             <div className="w-10 h-[2px] bg-[#E60000]" />
             <span className="text-gray-500 font-medium tracking-widest uppercase text-xs md:text-sm">The Minds Behind ABK</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter leading-tight text-[#111] mb-10 md:mb-16">LEADERSHIP.</h2>
        </FadeUpReveal>
        
        <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-12 lg:gap-24">
          {team.map((member, i) => (
            <FadeUpReveal key={i} delayOffset={i*150} className="w-full sm:w-[350px] md:w-[400px]">
              <div className="group cursor-pointer">
                <div className="w-full aspect-[4/5] overflow-hidden radius-max mb-4 md:mb-6 relative shadow-lg">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0" />
                </div>
                <h4 className="text-xl md:text-2xl font-heading font-bold text-[#111]">{member.name}</h4>
                <p className="text-[#E60000] text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1 md:mt-2">{member.role}</p>
              </div>
            </FadeUpReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const PartnershipPhilosophy = () => (
  <section className="py-20 md:py-32 bg-[#111] text-white px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] relative overflow-hidden">
    <div className="absolute right-0 top-0 w-full lg:w-1/2 h-full opacity-20 pointer-events-none">
      <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=80" alt="Meeting" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#111] via-transparent to-transparent" />
    </div>
    <div className="max-w-[1800px] mx-auto relative z-10 text-left">
      <FadeUpReveal>
        <div className="w-10 h-[2px] bg-[#E60000] mb-4 md:mb-6" />
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-heading font-black mb-6 md:mb-10 max-w-4xl tracking-tighter leading-[1.05]">
          WE DON'T JUST DISTRIBUTE.<br className="hidden sm:block"/><span className="text-[#E60000]">WE BUILD MARKETS.</span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed mb-8 md:mb-12">Our philosophy goes beyond the simple transaction. When we introduce a global brand to the Indian market, we act as their local custodian—investing heavily in education, market awareness, and brand equity to guarantee long-term success.</p>
        <button className="border border-white/30 text-white px-6 md:px-8 py-3 md:py-4 radius-max text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors w-full sm:w-auto text-center">View Partner Case Studies</button>
      </FadeUpReveal>
    </div>
  </section>
);

const FacilityShowcase = () => (
  <section className="py-20 md:py-32 bg-white px-5 sm:px-8 md:px-[4vw] lg:px-[3vw]">
    <div className="max-w-[1800px] mx-auto text-left">
      <FadeUpReveal>
        <div className="flex items-center gap-3 mb-4 md:mb-6">
           <div className="w-10 h-[2px] bg-[#E60000]" />
           <span className="text-gray-500 font-medium tracking-widest uppercase text-xs md:text-sm">Scale & Security</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter leading-tight text-[#111] mb-10 md:mb-16">INFRASTRUCTURE.</h2>
      </FadeUpReveal>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 h-auto">
        <FadeUpReveal delayOffset={100} className="radius-max overflow-hidden relative group h-[350px] sm:h-[400px] lg:h-auto min-h-[400px] cursor-pointer">
            <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80" alt="Warehouse" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white pr-6 md:pr-10">
              <p className="text-[#E60000] text-[10px] md:text-sm font-bold tracking-widest uppercase mb-2 md:mb-3">Pune, MH</p>
              <h3 className="text-xl sm:text-2xl md:text-4xl font-heading font-bold mb-2 md:mb-3">Central Distribution HQ</h3>
              <p className="text-gray-300 text-xs md:text-base">Over 150,000 sq ft of climate-controlled inventory space.</p>
            </div>
        </FadeUpReveal>
        <div className="flex flex-col gap-6 md:gap-8 h-auto">
            <FadeUpReveal delayOffset={200} className="flex-1 radius-max overflow-hidden relative group min-h-[250px] sm:min-h-[300px] cursor-pointer">
              <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80" alt="Tech" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white pr-6 md:pr-10">
                <h3 className="text-lg sm:text-xl md:text-3xl font-heading font-bold mb-2 md:mb-3">Cold-Chain Network</h3>
                <p className="text-gray-300 text-xs md:text-base">Ensuring clinical nutrition efficacy across all delivery zones.</p>
              </div>
            </FadeUpReveal>
            <FadeUpReveal delayOffset={300} className="flex-1 bg-[#F9F9F9] radius-max p-6 md:p-10 flex flex-col justify-center border border-gray-100">
              <Box size={32} className="text-[#E60000] mb-4 md:mb-6 md:w-10 md:h-10" />
              <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-[#111] mb-2 md:mb-4">Scalable Capacity</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-lg">Our proprietary warehouse management system (WMS) handles over 10,000 pallets, enabling 99.8% on-time fulfillment rates across pan-India orders without compromising quality.</p>
            </FadeUpReveal>
        </div>
      </div>
    </div>
  </section>
);

const InteractiveBrandGrid = ({ navigateTo }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const allBrandsList = [
    { label: "ANDIS", id: "Andis", category: "Grooming" },
    { label: "TROPICLEAN", id: "TropiClean", category: "Grooming" },
    { label: "ORIJEN", id: "Orijen", category: "Nutrition" },
    { label: "KONG", id: "Kong", category: "Toys" },
    { label: "PETKIN", id: "Petkin", category: "Health & Hygiene" },
    { label: "WAHL", id: "Wahl", category: "Grooming" },
    { label: "ROYAL CANIN", id: "Royal Canin", category: "Nutrition" },
    { label: "FARMINA", id: "Farmina", category: "Nutrition" },
    { label: "BEAPHAR", id: "Beaphar", category: "Health & Hygiene" },
    { label: "FLEXI", id: "Flexi", category: "Accessories" },
    { label: "ACANA", id: "Acana", category: "Nutrition" },
    { label: "EARTHBATH", id: "Earthbath", category: "Grooming" },
    { label: "FURMINATOR", id: "Furminator", category: "Grooming" },
    { label: "SAVIC", id: "Savic", category: "Accessories" },
    { label: "TRIXIE", id: "Trixie", category: "Toys" },
    { label: "RUFFWEAR", id: "Ruffwear", category: "Accessories" }
  ];

  const categories = ["All", "Nutrition", "Grooming", "Health & Hygiene", "Toys", "Accessories"];

  const filteredBrands = allBrandsList.filter(brand => {
    const matchesSearch = brand.label.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || brand.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-16 md:py-24 bg-white px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] border-b border-gray-100">
      <div className="max-w-[1800px] mx-auto text-left">
        <FadeUpReveal>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 md:gap-8 mb-10 md:mb-16">
            <div className="relative w-full lg:w-[450px]">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search brands..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAFAFA] border border-gray-200 radius-max py-3 md:py-4 pl-14 pr-5 focus:outline-none focus:border-[#E60000] transition-colors text-sm font-medium"
              />
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 md:px-6 py-2 md:py-3 radius-max text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors ${activeCategory === cat ? 'bg-[#111] text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </FadeUpReveal>
        
        <FadeUpReveal delayOffset={100}>
          {filteredBrands.length > 0 ? (
            <div className="flex flex-wrap gap-x-6 gap-y-4 md:gap-x-12 md:gap-y-8">
              {filteredBrands.map((brand, i) => (
                <span 
                  key={i} 
                  onClick={() => navigateTo(`Brand: ${brand.id}`)} 
                  className="text-2xl sm:text-4xl md:text-5xl lg:text-[4vw] font-heading font-black text-gray-200 hover:text-[#E60000] cursor-pointer transition-colors duration-300"
                >
                  {brand.label}
                </span>
              ))}
            </div>
          ) : (
            <div className="py-16 md:py-20 text-center border border-dashed border-gray-200 radius-max bg-[#FAFAFA]">
              <p className="text-lg md:text-xl text-gray-500 font-heading font-bold px-4">No brands found matching your criteria.</p>
              <button 
                onClick={() => {setSearchQuery(''); setActiveCategory('All');}} 
                className="mt-4 text-[#E60000] font-bold hover:underline text-xs md:text-sm tracking-widest uppercase"
              >
                Clear Filters
              </button>
            </div>
          )}
        </FadeUpReveal>
      </div>
    </section>
  );
};

const PortfolioCategoryCards = ({ navigateTo }) => {
  const categories = [
    { title: "Daily Essentials", desc: "Core nutritional staples and everyday care products ensuring your pets have optimal energy and vitality.", img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=80", link: "Category: Daily Essentials" },
    { title: "Vet Tech", desc: "Clinically proven supplements, specialized veterinary solutions, and diagnostic-assist tools.", img: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=80", link: "Category: Vet Tech" },
    { title: "Salon Pro", desc: "Professional-grade grooming clippers, shears, and salon formulations built for experts.", img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1200&q=80", link: "Category: Salon Pro" }
  ];

  return (
    <section className="py-20 md:py-24 bg-[#FAFAFA] px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] text-left">
      <div className="max-w-[1800px] mx-auto">
        <FadeUpReveal>
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="w-10 h-[2px] bg-[#E60000]" />
            <span className="text-gray-500 font-medium tracking-widest uppercase text-xs md:text-sm">Product Verticals</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter leading-tight text-[#111] mb-8 md:mb-12 uppercase">
            TAILORED <span className="text-[#E60000]">SOLUTIONS.</span>
          </h2>
        </FadeUpReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((cat, i) => (
            <FadeUpReveal key={i} delayOffset={i * 100}>
              <div onClick={() => navigateTo && navigateTo(cat.link)} className="group cursor-pointer radius-max overflow-hidden relative h-[350px] md:h-[450px] shadow-xl">
                <img src={cat.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={cat.title} />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-left">
                  <h3 className="text-2xl md:text-3xl font-heading font-black text-white mb-2 md:mb-3">{cat.title}</h3>
                  <p className="text-gray-200 mb-4 md:mb-6 leading-relaxed text-xs md:text-sm">{cat.desc}</p>
                  <span className="text-[#E60000] font-bold flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest bg-white/10 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 radius-max w-max group-hover:bg-white transition-colors">
                    Explore <ArrowRight size={14} className="md:w-4 md:h-4"/>
                  </span>
                </div>
              </div>
            </FadeUpReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const CategoryPage = ({ categoryId, navigateTo }) => {
  const category = categoryDatabase[categoryId];

  if (!category) {
    return (
      <div className="pt-32 px-10 min-h-screen text-center">
        <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-4 mt-20">Category Not Found</h1>
        <p className="text-gray-500">The requested category could not be loaded.</p>
      </div>
    );
  }

  return (
    <div className="animate-slide-reveal">
      <InternalPageHero 
        title={<span>{category.title}</span>} 
        subtitle={category.subtitle}
        bgImage={category.bgImage}
      />
      <section className="py-20 md:py-24 px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] bg-white text-left">
         <div className="max-w-[1800px] mx-auto">
            <FadeUpReveal>
              <div className="max-w-4xl mb-12 md:mb-16">
                 <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter leading-tight mb-4 md:mb-6">Category Overview</h2>
                 <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">{category.description}</p>
              </div>
            </FadeUpReveal>
            
            <div>
              <FadeUpReveal delayOffset={100}>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold mb-6 md:mb-8 text-left border-b border-gray-100 pb-4">Brands in {category.title.replace('.', '')}</h3>
              </FadeUpReveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                 {category.brands.map((brandName, idx) => {
                    const brandObj = brandDatabase[brandName] || { title: brandName, subtitle: "Premium Pet Product Line", bgImage: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=600&q=80" };
                    return (
                      <FadeUpReveal key={idx} delayOffset={idx * 100}>
                        <div onClick={() => navigateTo(`Brand: ${brandName}`)} className="bg-[#FAFAFA] border border-gray-100 radius-max overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300">
                           <div className="w-full h-[200px] md:h-[250px] relative overflow-hidden">
                             <img src={brandObj.bgImage || "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=600&q=80"} alt={brandObj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                           </div>
                           <div className="p-6 md:p-8">
                             <h4 className="text-xl md:text-2xl font-heading font-bold text-[#111] mb-2">{brandObj.title.replace('.', '')}</h4>
                             <p className="text-gray-500 text-sm leading-relaxed mb-4 md:mb-6 line-clamp-2">{brandObj.subtitle}</p>
                             <span className="text-[#E60000] font-bold flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest">
                               View Catalog <ArrowRight size={14} className="md:w-4 md:h-4"/>
                             </span>
                           </div>
                        </div>
                      </FadeUpReveal>
                    );
                 })}
              </div>
            </div>
         </div>
      </section>
      <PreFooter />
    </div>
  );
};

const BrandPage = ({ brandId }) => {
  const brand = brandDatabase[brandId];

  if (!brand) {
    return (
      <div className="pt-32 px-10 min-h-screen text-center">
        <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-4 mt-20">Brand Profile Not Found</h1>
        <p className="text-gray-500">The detailed catalog for "{brandId}" is not available in the preview dataset.</p>
        <p className="text-gray-400 text-sm mt-4">Try clicking 'Andis', 'TropiClean', 'Orijen', or 'Kong'.</p>
      </div>
    );
  }

  return (
    <div className="animate-slide-reveal">
      <InternalPageHero 
        title={<span>{brand.title}</span>} 
        subtitle={brand.subtitle}
        bgImage={brand.bgImage}
        bgVideo={brand.bgVideo}
      />
      <section className="py-20 md:py-24 px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] bg-white text-left">
         <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row gap-12 sm:gap-16 items-center">
            <div className="w-full md:w-1/2">
               <FadeUpReveal>
                 <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <div className="w-10 h-[2px] bg-[#E60000]" />
                    <span className="text-gray-500 font-medium tracking-widest uppercase text-xs md:text-sm">Brand Heritage</span>
                 </div>
                 <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter leading-tight mb-4 md:mb-6 text-[#111] uppercase">
                    About {brand.title.replace('.', '')}
                 </h2>
                 <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6 md:mb-8">{brand.description}</p>
                 <div className="grid grid-cols-2 gap-6 md:gap-8 border-t border-gray-100 pt-6 md:pt-8">
                    <div>
                      <p className="text-2xl sm:text-3xl font-heading font-black text-[#E60000] mb-1">Top Tier</p>
                      <p className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-bold">Global Ranking</p>
                    </div>
                    <div>
                      <p className="text-2xl sm:text-3xl font-heading font-bold text-[#E60000] mb-1">100%</p>
                      <p className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-bold">Authentic Imports</p>
                    </div>
                 </div>
               </FadeUpReveal>
            </div>
            <div className="w-full md:w-1/2 aspect-[4/3] radius-max overflow-hidden relative shadow-2xl">
               <img src={brand.bgImage || brand.products?.[0]?.img} alt={brand.title} className="w-full h-full object-cover" />
            </div>
         </div>
      </section>

      {brand.products && brand.products.length > 0 && (
        <section className="py-20 md:py-24 px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] bg-[#FAFAFA] text-left">
          <div className="max-w-[1800px] mx-auto">
            <FadeUpReveal>
               <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter leading-tight mb-10 md:mb-12 text-[#111]">FLAGSHIP <span className="text-[#E60000]">LINES.</span></h2>
            </FadeUpReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
               {brand.products.map((product, idx) => (
                 <FadeUpReveal key={idx} delayOffset={idx * 100}>
                   <div className="bg-white border border-gray-100 radius-max p-6 md:p-8 text-left hover:shadow-xl transition-shadow group h-full flex flex-col">
                      <div className="w-full aspect-square overflow-hidden radius-max mb-5 md:mb-6 bg-gray-50">
                        <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-multiply" />
                      </div>
                      <p className="text-[#E60000] text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2">{product.category}</p>
                      <h4 className="text-xl md:text-2xl font-heading font-bold text-[#111] mb-2 md:mb-3">{product.name}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed mt-auto">{product.desc}</p>
                   </div>
                 </FadeUpReveal>
               ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 md:py-24 px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] bg-[#111] text-white text-left">
         <div className="max-w-[1800px] mx-auto">
            <FadeUpReveal>
               <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <div className="w-10 h-[2px] bg-[#E60000]" />
                  <span className="text-gray-400 font-medium tracking-widest uppercase text-xs md:text-sm">B2B Value Proposition</span>
               </div>
               <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter leading-tight mb-10 md:mb-12">WHY STOCK <span className="text-[#E60000]">{brand.title.replace('.', '')}?</span></h2>
            </FadeUpReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <FadeUpReveal delayOffset={100} className="border-l-2 border-white/10 pl-6 py-2 hover:border-[#E60000] transition-colors">
                  <BarChart3 size={32} className="text-[#E60000] mb-3 md:mb-4 w-6 h-6 md:w-8 md:h-8" />
                  <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3">High Sell-Through Rate</h4>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed">Recognized globally, this brand requires minimal customer education, ensuring rapid inventory turnover for your retail space.</p>
               </FadeUpReveal>
               <FadeUpReveal delayOffset={200} className="border-l-2 border-white/10 pl-6 py-2 hover:border-[#E60000] transition-colors">
                  <Target size={32} className="text-[#E60000] mb-3 md:mb-4 w-6 h-6 md:w-8 md:h-8" />
                  <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Premium Margins</h4>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed">Our optimized supply chain allows us to offer this premium line at highly competitive B2B pricing tiers to maximize your profitability.</p>
               </FadeUpReveal>
               <FadeUpReveal delayOffset={300} className="border-l-2 border-white/10 pl-6 py-2 hover:border-[#E60000] transition-colors">
                  <ShieldCheck size={32} className="text-[#E60000] mb-3 md:mb-4 w-6 h-6 md:w-8 md:h-8" />
                  <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Zero Gray Market</h4>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed">As the official importer, we guarantee 100% genuine products, protecting your clinic or store's reputation from counterfeits.</p>
               </FadeUpReveal>
            </div>
         </div>
      </section>

      <section className="py-20 md:py-24 px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] bg-white text-left">
         <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row gap-12 sm:gap-16 items-center">
            <div className="w-full lg:w-1/2">
               <FadeUpReveal>
                 <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter leading-tight mb-4 md:mb-6 text-[#111]">GLOBAL STANDARDS.<br/>LOCAL <span className="text-[#E60000]">COMPLIANCE.</span></h2>
                 <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6 md:mb-8">Every product from {brand.title.replace('.', '')} passes through our rigorous internal auditing system before reaching your shelves. We handle all international certifications and Indian import regulations.</p>
                 <ul className="space-y-3 md:space-y-4">
                    <li className="flex items-center gap-3 text-xs sm:text-sm font-bold text-gray-800"><CheckCircle2 className="text-[#E60000] w-4 h-4 sm:w-5 sm:h-5" /> FSSAI / AQCS Compliant Import</li>
                    <li className="flex items-center gap-3 text-xs sm:text-sm font-bold text-gray-800"><CheckCircle2 className="text-[#E60000] w-4 h-4 sm:w-5 sm:h-5" /> Climate-Controlled Transit Guarantee</li>
                    <li className="flex items-center gap-3 text-xs sm:text-sm font-bold text-gray-800"><CheckCircle2 className="text-[#E60000] w-4 h-4 sm:w-5 sm:h-5" /> Legal Metrology Registration Completed</li>
                 </ul>
               </FadeUpReveal>
            </div>
            <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
               <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80" className="w-full h-40 sm:h-48 md:h-64 object-cover radius-max" alt="Quality Check" />
               <img src="https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&w=600&q=80" className="w-full h-40 sm:h-48 md:h-64 object-cover radius-max mt-6 md:mt-8" alt="Testing" />
            </div>
         </div>
      </section>

      <section className="py-20 md:py-24 px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] bg-[#FAFAFA] text-left border-t border-gray-100">
         <div className="max-w-[1800px] mx-auto text-center flex flex-col items-center">
            <FadeUpReveal>
               <FileText size={48} className="text-[#E60000] mb-4 md:mb-6 mx-auto w-10 h-10 md:w-12 md:h-12" />
               <h2 className="text-3xl md:text-4xl font-heading font-black tracking-tighter leading-tight mb-3 md:mb-4 text-[#111]">BRAND ASSETS & COLLATERAL</h2>
               <p className="text-sm md:text-base text-gray-500 mb-6 md:mb-8 max-w-xl mx-auto">Access high-resolution product images, digital marketing toolkits, and detailed technical specification PDFs for {brand.title.replace('.', '')}.</p>
               <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center w-full sm:w-auto">
                  <button className="bg-[#111] text-white px-6 md:px-8 py-3 md:py-4 radius-max font-bold text-[10px] md:text-xs uppercase tracking-widest hover:bg-[#E60000] transition-colors flex items-center gap-2 justify-center w-full sm:w-auto">
                     Download Brand Kit
                  </button>
                  <button className="bg-white border border-gray-200 text-[#111] px-6 md:px-8 py-3 md:py-4 radius-max font-bold text-[10px] md:text-xs uppercase tracking-widest hover:border-[#E60000] transition-colors flex items-center gap-2 justify-center w-full sm:w-auto">
                     View Price List
                  </button>
               </div>
            </FadeUpReveal>
         </div>
      </section>

      <PreFooter />
    </div>
  );
};


const AboutUsPage = () => (
  <div className="animate-slide-reveal">
    <InternalPageHero 
      title={<span>THE <span className="text-[#E60000]">ABK</span> STORY.</span>} 
      subtitle="The journey of elevating Indian pet care through global excellence."
      bgVideo="https://video.wixstatic.com/video/11062b_a405fb7004454b6bb08801d00cf04cb5/1080p/mp4/file.mp4"
    />
    <OurMissionVision />
    <LeadershipTeam />
    <PartnershipPhilosophy />
    <FacilityShowcase />
    <AboutUs />
    <SustainabilityCommitment />
    <AwardsAndRecognitions />
    <Testimonials />
    <PreFooter />
  </div>
);

const BrandPortfolioPage = ({ navigateTo }) => (
  <div className="animate-slide-reveal">
    <InternalPageHero 
      title={<span>GLOBAL <span className="text-[#E60000]">PORTFOLIO</span>.</span>} 
      subtitle="Discover our 37+ exclusive global partnerships spanning clinical nutrition, grooming tools, and lifestyle accessories."
      bgVideo="https://video.wixstatic.com/video/548938_eb51c35dc901482884a1bba59e95f225/1080p/mp4/file.mp4"
    />
    <InteractiveBrandGrid navigateTo={navigateTo} />
    <PortfolioCategoryCards navigateTo={navigateTo} />
    <BrandSpotlight navigateTo={navigateTo} />
    <InteractiveCategoryExplorer />
    <NewArrivals />
    <SelectionCriteria />
    <ProductCatalogue />
    <PreFooter />
  </div>
);

const WhyChooseABKPage = () => (
  <div className="animate-slide-reveal">
    <InternalPageHero 
      title={<span>THE ABK <span className="text-[#E60000]">ADVANTAGE</span>.</span>} 
      subtitle="Our operational excellence is your competitive advantage. Discover the infrastructure powering India's top pet businesses."
      bgVideo="https://video.wixstatic.com/video/548938_096226587ef947238fc2d59bd40e0eb4/1080p/mp4/file.mp4"
    />
    <WhyChooseABK /> 
    <ABKTechAdvantage /> 
    <AccountManagement /> 
    <InteractiveLogistics /> 
    <QualityAssurance /> 
    <OnboardingSteps /> 
    <MarketingSupport /> 
    <GlobalNetwork /> 
    <RetailerResources /> 
    <Testimonials />
    <PreFooter />
  </div>
);

const WorkWithUsPage = () => (
  <div className="animate-slide-reveal">
    <InternalPageHero 
      title={<span>JOIN THE <span className="text-[#E60000]">VANGUARD</span>.</span>} 
      subtitle="Explore lucrative B2B partnership opportunities and dynamic corporate careers at ABK Imports."
      bgImage="https://images.unsplash.com/photo-1521651201144-634f700b36ef?auto=format&fit=crop&w=1920&q=80"
    />
    <WorkWithUs />
    <CompanyCulture />
    <WorkspaceGallery />
    <EmployeeBenefits />
    <OpenPositions />
    <PartnerApplicationProcess />
    <SupplierStandards />
    <InsightsNews />
    <PreFooter />
  </div>
);

const BlogsPage = () => (
  <div className="animate-slide-reveal">
    <InternalPageHero 
      title={<span>THE <span className="text-[#E60000]">EDITORIAL</span>.</span>} 
      subtitle="Expert insights, deep dives into clinical nutrition, and professional grooming techniques."
      bgImage="https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=1920&q=80"
    />
    <BlogGrid />
    <PreFooter />
  </div>
);

const NewsInsightsPage = () => (
  <div className="animate-slide-reveal">
    <InternalPageHero 
      title={<span>THE <span className="text-[#E60000]">NEWSROOM</span>.</span>} 
      subtitle="The latest press releases, company milestones, and macro-market industry reports."
      bgImage="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=80"
    />
    <NewsInsightsGrid />
    <PreFooter />
  </div>
);

const CSRPage = () => (
  <div className="animate-slide-reveal">
    <InternalPageHero 
      title={<span>BEYOND <span className="text-[#E60000]">BUSINESS</span>.</span>} 
      subtitle="Our unwavering commitment to animal welfare, sustainable operations, and community impact."
      bgImage="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1920&q=80"
    />
    <ExpandedMissionVision />
    <CSRExperiences />
    <SustainabilityCommitment />
    <PreFooter />
  </div>
);

const ContactPage = () => (
  <div className="animate-slide-reveal">
    <InternalPageHero 
      title={<span>GET IN <span className="text-[#E60000]">TOUCH</span>.</span>} 
      subtitle="Whether for distribution inquiries, partnership onboarding, or general support, our regional teams are ready."
      bgImage="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=1920&q=80"
    />
    <div className="bg-white py-20 md:py-32 px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] text-left">
      <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row gap-12 sm:gap-16">
         <div className="lg:w-1/3">
            <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter leading-tight mb-5 md:mb-6 text-[#111]">CONNECT.</h2>
            <p className="text-gray-600 mb-8 md:mb-12 leading-relaxed text-base md:text-lg">Reach out to our global headquarters in Pune or connect directly with our regional B2B support desks.</p>
            <div className="flex flex-col gap-6 md:gap-8">
              <div>
                 <h3 className="font-heading font-bold mb-2 text-[#111] text-lg md:text-xl">Pune Headquarters</h3>
                 <p className="text-gray-500 mb-2 text-sm md:text-base">Gera Imperium Alpha, Kharadi,<br/>Pune, Maharashtra 411014</p>
                 <a href="mailto:hq@abkimports.com" className="font-bold text-[#E60000] hover:underline text-sm md:text-base">hq@abkimports.com</a>
              </div>
              <div>
                 <h3 className="font-heading font-bold mb-2 text-[#111] text-lg md:text-xl">B2B Support</h3>
                 <p className="text-gray-500 mb-2 text-sm md:text-base">Dedicated account management for existing retail partners.</p>
                 <a href="mailto:partners@abkimports.com" className="font-bold text-[#E60000] hover:underline text-sm md:text-base">partners@abkimports.com</a>
              </div>
            </div>
         </div>
         <div className="lg:w-2/3 bg-[#F9F9F9] radius-max p-6 sm:p-10 md:p-16 border border-gray-100">
            <form className="flex flex-col gap-6 md:gap-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="flex flex-col gap-2 md:gap-3">
                     <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500">First Name</label>
                     <input type="text" className="bg-white border border-gray-200 radius-max px-4 py-3 md:px-5 md:py-4 focus:outline-none focus:border-[#E60000] transition-colors text-sm" />
                  </div>
                  <div className="flex flex-col gap-2 md:gap-3">
                     <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500">Last Name</label>
                     <input type="text" className="bg-white border border-gray-200 radius-max px-4 py-3 md:px-5 md:py-4 focus:outline-none focus:border-[#E60000] transition-colors text-sm" />
                  </div>
               </div>
               <div className="flex flex-col gap-2 md:gap-3">
                  <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500">Email Address</label>
                  <input type="email" className="bg-white border border-gray-200 radius-max px-4 py-3 md:px-5 md:py-4 focus:outline-none focus:border-[#E60000] transition-colors text-sm" />
               </div>
               <div className="flex flex-col gap-2 md:gap-3">
                  <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500">Message</label>
                  <textarea rows="5" className="bg-white border border-gray-200 radius-max px-4 py-3 md:px-5 md:py-4 focus:outline-none focus:border-[#E60000] transition-colors resize-none text-sm" />
               </div>
               <button className="bg-[#111] text-white px-8 md:px-10 py-4 md:py-5 radius-max font-bold text-[10px] md:text-xs uppercase tracking-widest hover:bg-[#E60000] transition-colors w-full sm:w-max mt-2 md:mt-4">Send Message</button>
            </form>
         </div>
      </div>
    </div>
    
    <ContactLocations />
    <SupportMatrix />
    <LiveSupport />
    <FacilityTour />
    <WholesaleFastTrack />
    <PartnerQuickLink />

  </div>
);

const PreFooter = () => (
  <section className="py-20 md:py-32 bg-[#E60000] text-white text-left px-5 sm:px-8 md:px-[4vw] lg:px-[3vw]">
    <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12">
      <FadeUpReveal className="flex-1">
        <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tighter leading-tight mb-4 md:mb-6">READY TO <br className="hidden sm:block"/>ELEVATE?</h2>
        <p className="text-base md:text-xl max-w-xl text-white/90 leading-relaxed">Join India's premier import and distribution partner network today.</p>
      </FadeUpReveal>
      <FadeUpReveal delayOffset={100}>
        <button className="bg-white text-[#E60000] px-8 py-4 sm:px-12 sm:py-6 radius-max font-bold text-sm sm:text-base md:text-lg hover:bg-black hover:text-white transition-colors duration-300 w-full sm:w-max mt-6 md:mt-0">
          Contact Us Today
        </button>
      </FadeUpReveal>
    </div>
  </section>
);

const Footer = ({ navigateTo }) => {
  return (
    <footer id="contact" className="bg-[#050505] text-white pt-16 md:pt-24 pb-6 md:pb-8 overflow-hidden text-left">
      <div className="px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] flex flex-col lg:flex-row justify-between gap-12 sm:gap-16 lg:gap-24 mb-16 md:mb-24 max-w-[1800px] mx-auto">
        <div className="max-w-[400px]">
          <img src="https://abkimports.com/wp-content/uploads/2023/04/ABK-Logo_150pix-x-150pix-01.png" alt="ABK Imports Logo" className="h-[50px] sm:h-[60px] md:h-[83px] mb-6 md:mb-8 object-contain origin-left brightness-0 invert" />
          <p className="text-gray-400 font-light leading-relaxed mb-6 md:mb-10 text-sm md:text-[15px]">India's premier import and distribution partner for global pet care brands. Elevating industry standards through superior supply chain management.</p>
          <div className="flex flex-wrap gap-3 md:gap-4">
            {['LINKEDIN', 'FACEBOOK', 'INSTAGRAM'].map((social) => (
              <a key={social} href="#" className="text-[9px] md:text-[11px] font-medium hover:text-white transition-colors border border-white/20 px-4 md:px-5 py-2 md:py-2.5 rounded-full uppercase tracking-widest text-gray-400 hover:border-white">{social}</a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12 lg:gap-16 flex-1 lg:ml-20 mt-2 md:mt-0">
          <div>
            <h4 className="font-heading font-semibold mb-4 md:mb-6 uppercase tracking-widest text-[9px] md:text-[11px] text-gray-500">DISTRIBUTION</h4>
            <ul className="space-y-3 md:space-y-4 text-gray-400 font-light text-sm md:text-[15px]">
              <li><button onClick={() => navigateTo('Work With Us')} className="hover:text-white transition-colors text-left">Partner With Us</button></li>
              <li><button onClick={() => navigateTo('Brand Portfolio')} className="hover:text-white transition-colors text-left">Brand Portfolio</button></li>
              <li><button className="hover:text-white transition-colors text-left">B2B Portal Login</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-4 md:mb-6 uppercase tracking-widest text-[9px] md:text-[11px] text-gray-500">COMPANY</h4>
            <ul className="space-y-3 md:space-y-4 text-gray-400 font-light text-sm md:text-[15px]">
              <li><button onClick={() => navigateTo('About Us')} className="hover:text-white transition-colors text-left">About ABK</button></li>
              <li><button onClick={() => navigateTo('Work With Us')} className="hover:text-white transition-colors text-left">Careers</button></li>
              <li><button onClick={() => navigateTo('Contact')} className="hover:text-white transition-colors text-left">Contact</button></li>
              <li><button onClick={() => navigateTo('CSR & Experiences')} className="hover:text-white transition-colors text-left">CSR & Impact</button></li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1 lg:pl-4 mt-4 sm:mt-0">
              <h4 className="font-heading font-semibold mb-4 md:mb-6 uppercase tracking-widest text-[9px] md:text-[11px] text-gray-500">RESOURCES</h4>
              <ul className="space-y-3 md:space-y-4 text-gray-400 font-light text-sm md:text-[15px]">
                <li><button onClick={() => navigateTo('Blogs')} className="hover:text-white transition-colors text-left">Blogs & Guides</button></li>
                <li><button onClick={() => navigateTo('News & Insights')} className="hover:text-white transition-colors text-left">Newsroom</button></li>
                <li><button onClick={() => navigateTo('Brand Portfolio')} className="hover:text-white transition-colors text-left">Case Studies</button></li>
              </ul>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-white/5 pt-10 md:pt-16 pb-6 md:pb-8 overflow-hidden relative mt-10 md:mt-16">
        <div className="flex w-max animate-footer-marquee whitespace-nowrap">
           {[...Array(8)].map((_, i) => (
              <h1 key={i} className="text-[18vw] sm:text-[16vw] md:text-[14vw] font-heading font-extrabold leading-none tracking-tighter text-[#141414] whitespace-nowrap pr-8 select-none">ABK IMPORTS</h1>
           ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start md:items-center text-[8px] md:text-[10px] font-medium tracking-widest text-gray-600 uppercase gap-4 sm:gap-6 mt-6 md:mt-8 px-5 sm:px-8 md:px-[4vw] lg:px-[3vw] max-w-[1800px] mx-auto">
        <p className="text-center sm:text-left">© 2026 ABK IMPORTS. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-6 md:gap-8">
            <a href="#" className="hover:text-gray-300 transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-gray-300 transition-colors">TERMS OF SERVICE</a>
        </div>
      </div>
    </footer>
  );
};

// ==========================================
// MAIN APP ROUTER
// ==========================================

export default function App() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('Home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else if (!loading) document.body.style.overflow = '';
  }, [menuOpen, loading]);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    if (currentPage.startsWith('Brand: ')) {
      const brandId = currentPage.split('Brand: ')[1];
      return <BrandPage brandId={brandId} />;
    }
    if (currentPage.startsWith('Category: ')) {
      const catId = currentPage.split('Category: ')[1];
      return <CategoryPage categoryId={catId} navigateTo={handleNavigate} />;
    }

    switch (currentPage) {
      case 'Home':
        return (
          <div className="animate-[fadeIn_0.5s_ease-out]">
            <Hero isReady={!loading} />
            <Statistics />
            <WhoAreWe navigateTo={handleNavigate} />
            <DoubleBrandMarquee navigateTo={handleNavigate} />
            <TailoredSolutions navigateTo={handleNavigate} />
            <AboutUs />
            <InteractiveCategoryExplorer />
            <ProductCatalogue />
            <WhyChooseABK />
            <InteractiveLogistics />
            <GlobalNetwork />
            <InteractiveROICalculator />
            <Testimonials />
            <FAQSection />
            <InsightsNews />
            <WorkWithUs />
            <PreFooter />
          </div>
        );
      case 'About Us': return <AboutUsPage />;
      case 'Brand Portfolio': return <BrandPortfolioPage navigateTo={handleNavigate} />;
      case 'Why Choose ABK': return <WhyChooseABKPage />;
      case 'Work With Us': return <WorkWithUsPage />;
      case 'Blogs': return <BlogsPage />;
      case 'News & Insights': return <NewsInsightsPage />;
      case 'CSR & Experiences': return <CSRPage />;
      case 'Contact': return <ContactPage />;
      default: return <div />;
    }
  };

  return (
    <div className="relative bg-white selection:bg-[#E60000] selection:text-white">
      {injectStyles()}
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      <FullScreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} setCurrentPage={handleNavigate} />

      <div className={`transition-opacity duration-1000 ease-in-out ${loading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        <Header onOpenMenu={() => setMenuOpen(true)} setCurrentPage={handleNavigate} currentPage={currentPage} />
        <main>
          {renderPage()}
        </main>
        <Footer navigateTo={handleNavigate} />
      </div>
    </div>
  );
}
