import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Search, Menu, ShoppingBag, X, ChevronRight, ChevronLeft, ArrowUpRight, Star, Plus, Minus, Box, Truck, BarChart3, ShieldCheck } from 'lucide-react';

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

    /* ELEGANT CUSTOM CURSOR */
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
      opacity: 0; /* Hidden by default until mouse moves */
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
    .leaflet-container { background-color: #050505 !important; font-family: 'Inter', sans-serif; }
  `}</style>
);

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
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={`inline-block ${className}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)`, transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)' }}
    >
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
        <img src="https://abkimports.com/wp-content/uploads/2023/04/ABK-Logo_150pix-x-150pix-01.png" alt="ABK Imports Logo" className="h-[73px] md:h-[94px] mb-8 object-contain brightness-0 invert" />
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

const Header = ({ onOpenMenu, scrolled }) => {
  return (
    <header className={`fixed top-0 w-full z-50 px-[3vw] py-6 flex justify-between items-center transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 py-4 shadow-sm' : 'bg-transparent text-white'}`}>
      <Magnetic strength={0.2}>
        <div className="cursor-pointer block" data-cursor="hover" onClick={() => window.scrollTo(0,0)}>
          <img src="https://abkimports.com/wp-content/uploads/2023/04/ABK-Logo_150pix-x-150pix-01.png" alt="ABK Imports Logo" className={`h-[52px] md:h-[73px] object-contain transition-all duration-500 ${scrolled ? '' : 'brightness-0 invert'}`} />
        </div>
      </Magnetic>
      <div className={`flex items-center gap-4 md:gap-8 ${scrolled ? 'text-black' : 'text-white'}`}>
        <Magnetic>
          <button onClick={onOpenMenu} data-cursor="hover" className="flex items-center gap-2 hover:text-[#E60000] transition-colors ml-2 md:ml-6 group">
            <span className="hidden md:block text-sm font-bold uppercase tracking-widest mt-1">Menu</span>
            <Menu size={36} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
          </button>
        </Magnetic>
      </div>
    </header>
  );
};

const SideMenu = ({ isOpen, onClose, navigateTo }) => {
  const links = ['Home', 'About Us', 'Brand Portfolio', 'Why Choose ABK', 'Work With Us', 'Contact'];

  return (
    <div className={`fixed inset-0 z-[90000] flex justify-end ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      {/* Dark Backdrop */}
      <div className={`absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-700 ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />

      {/* Floating Menu Drawer */}
      <div className={`relative w-[100vw] md:w-[600px] h-full bg-[#0a0a0a] text-white flex flex-col transition-transform duration-[0.8s] ease-[cubic-bezier(0.77,0,0.175,1)] shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="px-8 md:px-16 py-6 md:py-8 flex justify-end items-center">
          <Magnetic>
            <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-full transition-colors group" data-cursor="hover">
              <X size={32} strokeWidth={1.5} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </Magnetic>
        </div>

        {/* Links with Float In/Out Animation */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 pb-8 overflow-y-auto">
          <div className="flex flex-col gap-2 md:gap-4">
            {links.map((link, i) => (
              <div key={link} className="overflow-hidden py-1">
                <button
                  onClick={() => navigateTo(link)}
                  className={`block text-3xl md:text-4xl lg:text-[44px] font-heading font-bold text-left hover:text-[#E60000] hover:translate-x-4 transition-all duration-[0.8s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'
                  }`}
                  style={{ transitionDelay: `${isOpen ? 200 + i * 80 : 0}ms`, lineHeight: '1.2' }}
                  data-cursor="hover"
                >
                  {link}
                </button>
              </div>
            ))}
          </div>

          {/* Bottom actions */}
          <div className={`mt-8 md:mt-10 overflow-hidden py-2 transition-all duration-1000 delay-700 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button className="bg-white text-black px-10 py-4 radius-max font-bold text-sm hover:bg-[#E60000] hover:text-white transition-colors duration-300 w-full md:w-auto text-center tracking-widest uppercase" data-cursor="hover">
              B2B Partner Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// BRAND DATABASE & DEDICATED BRAND PAGES
// ==========================================

const brandDatabase = {
  "Andis": {
    title: "ANDIS PRO.",
    subtitle: "World-class clipping and trimming technology built for precision.",
    bgImage: "https://images.unsplash.com/photo-1585559606675-01e141a02fb4?auto=format&fit=crop&w=1920&q=80",
    bgVideo: null,
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
  }
};

const BrandPage = ({ brandId }) => {
  const brand = brandDatabase[brandId];
  
  if (!brand) return (
    <div className="pt-32 text-center h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-4xl font-heading font-black text-[#111] mb-4">Brand not found.</h1>
      <p className="text-gray-500">The requested brand data is not available in the current portfolio.</p>
    </div>
  );

  return (
    <div className="animate-slide-reveal bg-white">
      <InternalPageHero 
        title={<span>{brand.title}</span>} 
        subtitle={brand.subtitle}
        bgImage={brand.bgImage}
        bgVideo={brand.bgVideo}
      />
      
      <section className="py-24 px-[3vw] bg-[#FAFAFA] text-left border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto">
          <FadeUpReveal>
            <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-[2px] bg-[#E60000]" />
               <span className="text-gray-500 font-medium tracking-widest uppercase text-sm">Brand Philosophy</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-[#111] mb-8 leading-tight">{brand.description}</h2>
          </FadeUpReveal>
        </div>
      </section>

      <section className="py-32 px-[3vw] text-left">
         <div className="max-w-[1800px] mx-auto">
           <FadeUpReveal>
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-[2px] bg-[#E60000]" />
                 <span className="text-gray-500 font-medium tracking-widest uppercase text-sm">Product Lines</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-heading font-black text-[#111] mb-16">AVAILABLE <span className="text-[#E60000]">CATALOG.</span></h2>
           </FadeUpReveal>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {brand.products.map((product, idx) => (
                <FadeUpReveal key={idx} delayOffset={idx * 150}>
                   <div className="group border border-gray-100 radius-max p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white" data-cursor="hover">
                      <div className="w-full aspect-[4/3] radius-max overflow-hidden mb-6 relative bg-gray-50">
                         <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                      </div>
                      <p className="text-[#E60000] text-xs font-bold uppercase tracking-widest mb-2">{product.category}</p>
                      <h4 className="text-2xl font-heading font-bold text-[#111] mb-3">{product.name}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed mb-6">{product.desc}</p>
                      <button className="text-sm font-bold text-[#111] border-b-2 border-transparent group-hover:border-[#E60000] transition-colors pb-1 flex items-center gap-2 mt-auto">
                        View Logistics Data <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                   </div>
                </FadeUpReveal>
              ))}
           </div>
         </div>
      </section>
      <PreFooter />
    </div>
  );
};

// ==========================================
// SHARED INTERNAL HERO (LARGER + VIDEO SUPPORT)
// ==========================================
const InternalPageHero = ({ title, subtitle, bgImage, bgVideo }) => (
  <div className="relative w-full h-[85vh] flex items-end pb-24 pt-32 px-[3vw] bg-[#050505] overflow-hidden">
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
        <div className="w-12 h-[3px] bg-[#E60000] mb-8 shadow-[0_0_15px_#E60000]" />
        <h1 className="text-5xl md:text-7xl lg:text-[8vw] font-heading font-black tracking-tighter mb-6 text-white leading-[0.9] max-w-5xl drop-shadow-2xl">
          {title}
        </h1>
        <p className="text-xl md:text-3xl text-gray-300 font-light max-w-3xl leading-relaxed drop-shadow-md">
          {subtitle}
        </p>
      </FadeUpReveal>
    </div>
  </div>
);

// ==========================================
// HOME PAGE COMPONENTS
// ==========================================

const Hero = ({ isReady }) => {
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

  return (
    <section id="home" className="relative w-full h-screen flex items-end pb-24 md:pb-32 px-[3vw] overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 z-0 grid grid-cols-3 gap-1 md:gap-[2px] bg-black h-[120%] -top-[10%]">
        <div className={`relative w-full h-full overflow-hidden bg-[#111] transition-transform duration-[1.5s] ease-[cubic-bezier(0.77,0,0.175,1)] ${isReady ? 'translate-y-0' : '-translate-y-full'}`} style={{ transitionDelay: '100ms' }}>
           <div ref={col1Ref} className="absolute inset-0 w-full h-full will-change-transform scale-[1.15]">
             <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover animate-[slowZoom_25s_linear_infinite_alternate] opacity-70 md:opacity-80"><source src="https://video.wixstatic.com/video/548938_9ce4b3046ac6488e9e5c9435da62afb8/1080p/mp4/file.mp4" type="video/mp4" /></video>
           </div>
        </div>
        <div className={`relative w-full h-full overflow-hidden bg-[#111] transition-transform duration-[1.5s] ease-[cubic-bezier(0.77,0,0.175,1)] ${isReady ? 'translate-y-0' : 'translate-y-full'}`} style={{ transitionDelay: '300ms' }}>
           <div ref={col2Ref} className="absolute inset-0 w-full h-full will-change-transform scale-[1.15]">
             <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover animate-[slowZoom_20s_linear_infinite_alternate-reverse] opacity-70 md:opacity-80"><source src="https://video.wixstatic.com/video/548938_eb51c35dc901482884a1bba59e95f225/1080p/mp4/file.mp4" type="video/mp4" /></video>
           </div>
        </div>
        <div className={`relative w-full h-full overflow-hidden bg-[#111] transition-transform duration-[1.5s] ease-[cubic-bezier(0.77,0,0.175,1)] ${isReady ? 'translate-y-0' : '-translate-y-full'}`} style={{ transitionDelay: '500ms' }}>
           <div ref={col3Ref} className="absolute inset-0 w-full h-full will-change-transform scale-[1.15]">
             <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover animate-[slowZoom_22s_linear_infinite_alternate] opacity-70 md:opacity-80"><source src="https://video.wixstatic.com/video/548938_096226587ef947238fc2d59bd40e0eb4/1080p/mp4/file.mp4" type="video/mp4" /></video>
           </div>
        </div>
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#000000] via-black/50 to-transparent pointer-events-none" />

      <div ref={textRef} className="relative z-20 w-full max-w-7xl will-change-transform">
        <FadeUpReveal>
          <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-[2px] bg-[#E60000]" />
             <span className="text-white font-medium tracking-widest uppercase text-xs md:text-sm shadow-sm">Global Pet Care Importers</span>
          </div>
        </FadeUpReveal>
        <FadeUpReveal delayOffset={100}>
          <h1 className="text-5xl md:text-7xl lg:text-[8vw] font-heading font-extrabold text-white leading-[0.95] tracking-tighter mb-8 drop-shadow-lg">
            ELEVATING <br className="hidden md:block" /> THE STANDARD.
          </h1>
        </FadeUpReveal>
        <FadeUpReveal delayOffset={200}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Magnetic>
              <button data-cursor="hover" className="bg-[#E60000] text-white px-8 py-4 md:px-10 md:py-5 radius-max font-semibold text-sm hover:bg-white hover:text-[#E60000] transition-colors duration-300 flex items-center gap-3">
                Discover Our Network <ArrowRight size={18} />
              </button>
            </Magnetic>
          </div>
        </FadeUpReveal>
      </div>
    </section>
  );
};

const Statistics = () => (
  <section className="py-24 bg-white border-b border-gray-100 z-20 relative">
    <div className="px-[3vw] max-w-[1800px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 divide-y md:divide-y-0 lg:divide-x divide-gray-200">
        <FadeUpReveal delayOffset={0} className="flex flex-col pt-6 md:pt-0 lg:pl-8 first:pl-0">
          <h3 className="text-6xl md:text-7xl font-heading font-black text-[#111] mb-2 tracking-tighter flex items-start">#1<span className="text-[#E60000] text-4xl">.</span></h3>
          <p className="text-[#E60000] text-sm font-bold uppercase tracking-wider mb-2">In India</p>
          <p className="text-gray-500 text-sm font-medium leading-relaxed">The premier pet products distribution network nationwide.</p>
        </FadeUpReveal>
        <FadeUpReveal delayOffset={100} className="flex flex-col pt-6 md:pt-0 lg:pl-8">
          <h3 className="text-6xl md:text-7xl font-heading font-black text-[#111] mb-2 tracking-tighter flex items-start">37<span className="text-[#E60000] text-4xl">+</span></h3>
          <p className="text-[#E60000] text-sm font-bold uppercase tracking-wider mb-2">Premium Brands</p>
          <p className="text-gray-500 text-sm font-medium leading-relaxed">Exclusive international partnerships bringing global quality home.</p>
        </FadeUpReveal>
        <FadeUpReveal delayOffset={200} className="flex flex-col pt-6 md:pt-0 lg:pl-8">
          <h3 className="text-6xl md:text-7xl font-heading font-black text-[#111] mb-2 tracking-tighter flex items-start">2500<span className="text-[#E60000] text-4xl">+</span></h3>
          <p className="text-[#E60000] text-sm font-bold uppercase tracking-wider mb-2">Unique Products</p>
          <p className="text-gray-500 text-sm font-medium leading-relaxed">A comprehensive catalog covering clinical nutrition to grooming.</p>
        </FadeUpReveal>
        <FadeUpReveal delayOffset={300} className="flex flex-col pt-6 md:pt-0 lg:pl-8">
          <h3 className="text-6xl md:text-7xl font-heading font-black text-[#111] mb-2 tracking-tighter flex items-start">1000<span className="text-[#E60000] text-4xl">+</span></h3>
          <p className="text-[#E60000] text-sm font-bold uppercase tracking-wider mb-2">Retail Partners</p>
          <p className="text-gray-500 text-sm font-medium leading-relaxed">Trusted by clinics, salons, and pet boutiques across the country.</p>
        </FadeUpReveal>
      </div>
    </div>
  </section>
);

// NEW: Interactive Split-Screen Hover Tailored Categories Section
const TailoredSolutions = ({ navigateTo }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const categories = [
    { title: "Daily Essentials", desc: "Core nutritional staples and everyday care products ensuring your pets have optimal energy and vitality.", img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=80", link: "Brand: Orijen" },
    { title: "Vet Tech", desc: "Clinically proven supplements, specialized veterinary solutions, and diagnostic-assist tools.", img: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=80", link: "Brand: TropiClean" },
    { title: "Salon Pro", desc: "Professional-grade grooming clippers, shears, and salon formulations built for experts.", img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1200&q=80", link: "Brand: Andis" }
  ];

  return (
    <section className="py-32 bg-[#FAFAFA] relative px-[3vw]">
      <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
         {/* Left Side: Typography & Interactions */}
         <div className="w-full lg:w-1/2 order-2 lg:order-1 flex flex-col justify-center text-left">
            <FadeUpReveal>
               <h2 className="text-5xl md:text-7xl lg:text-[5.5vw] font-heading font-black text-[#111] leading-[1.05] tracking-tighter mb-16">
                 Tailored <span className="text-[#E60000]">Pet Care</span><br/>Solutions
               </h2>
            </FadeUpReveal>
            <div className="flex flex-col gap-8">
               {categories.map((cat, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => navigateTo(cat.link)}
                    className={`cursor-pointer transition-all duration-500 border-l-[4px] pl-6 py-2 group ${activeIdx === idx ? 'border-[#E60000]' : 'border-gray-200 opacity-40 hover:opacity-70'}`}
                    data-cursor="hover"
                  >
                     <h3 className={`text-4xl md:text-5xl lg:text-6xl font-heading font-black transition-colors duration-300 ${activeIdx === idx ? 'text-[#E60000]' : 'text-[#111]'}`}>{cat.title}</h3>
                     <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeIdx === idx ? 'max-h-[150px] mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                       <p className="text-gray-600 text-lg mb-4 leading-relaxed max-w-lg">{cat.desc}</p>
                       <button className="flex items-center gap-2 text-sm font-bold text-[#111] group-hover:text-[#E60000] transition-colors">Explore Category <ArrowRight size={16} /></button>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Right Side: Image Canvas */}
         <div className="w-full lg:w-1/2 order-1 lg:order-2 h-[400px] lg:h-[700px] relative radius-max overflow-hidden shadow-2xl" data-cursor="hover">
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
}

// NEW: Double row faint marquee slider
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
    <section className="py-20 bg-white overflow-hidden relative border-b border-gray-100 flex flex-col gap-2">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      
      {/* Row 1 (Left to Right) */}
      <div className="flex animate-marquee-reverse whitespace-nowrap items-center w-max">
        {scroll1.map((brand, i) => (
          <div key={`row1-${i}`} onClick={() => navigateTo(`Brand: ${brand.id}`)} className="mx-6 text-5xl md:text-7xl lg:text-[7vw] leading-none font-heading font-black text-[#F2F2F2] hover:text-[#E60000] transition-colors duration-300 cursor-pointer select-none" data-cursor="hover">
            {brand.label}
          </div>
        ))}
      </div>

      {/* Row 2 (Right to Left) */}
      <div className="flex animate-marquee whitespace-nowrap items-center w-max">
        {scroll2.map((brand, i) => (
          <div key={`row2-${i}`} onClick={() => navigateTo(`Brand: ${brand.id}`)} className="mx-6 text-5xl md:text-7xl lg:text-[7vw] leading-none font-heading font-black text-[#F2F2F2] hover:text-[#E60000] transition-colors duration-300 cursor-pointer select-none" data-cursor="hover">
            {brand.label}
          </div>
        ))}
      </div>
    </section>
  );
};


// ==========================================
// SHARED SECTIONS
// ==========================================

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
    <section className="py-32 blended-bg overflow-hidden relative text-left">
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#E60000]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[30vw] h-[30vw] bg-[#E60000]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="px-[3vw] max-w-[1800px] mx-auto relative z-10">
        <FadeUpReveal>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-[2px] bg-[#E60000]" />
            <span className="text-gray-500 font-medium tracking-widest uppercase text-sm">Timeline</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tighter text-[#111] mb-20 max-w-3xl relative">
            A LEGACY BUILT ON THE <span className="text-[#E60000]">SPIRIT</span> OF CARE.
            <Star className="absolute -top-12 -left-12 text-[#E60000]/10 animate-spin-slow w-32 h-32 hidden md:block" />
          </h2>
        </FadeUpReveal>

        <div className="mb-32 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          <div className="w-full lg:w-1/2">
            <FadeUpReveal delayOffset={100}>
              <div className="relative border-l-[2px] border-[#E8ECEF] py-6 space-y-16">
                {timelineData.map((item, idx) => (
                  <div key={idx} className="relative group cursor-pointer pl-10 md:pl-16" onMouseEnter={() => setActiveTimeline(idx)} data-cursor="hover">
                    <div className={`absolute top-2 left-[-13px] w-[24px] h-[24px] bg-[#FAFAFA] border-[4px] rounded-full transition-all duration-300 z-10 ${activeTimeline === idx ? 'border-[#E60000] scale-125' : 'border-[#CBD5E1] group-hover:border-[#E60000] group-hover:scale-110'}`} />
                    <h4 className={`text-5xl font-heading font-black transition-colors duration-300 mb-3 ${activeTimeline === idx ? 'text-[#E60000]' : 'text-[#CBD5E1] group-hover:text-[#E60000]'}`}>{item.year}</h4>
                    <p className={`text-lg transition-colors duration-300 max-w-md font-medium ${activeTimeline === idx ? 'text-gray-900' : 'text-gray-500'}`}>{item.text}</p>
                  </div>
                ))}
              </div>
            </FadeUpReveal>
          </div>
          <div className="w-full lg:w-1/2 h-[450px] md:h-[550px] relative radius-max overflow-hidden shadow-2xl mt-10 lg:mt-0">
             {timelineData.map((item, idx) => (
               <img key={idx} src={item.img} alt={`Roadmap ${item.year}`} className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${activeTimeline === idx ? 'opacity-100 scale-100 filter-none' : 'opacity-0 scale-110 blur-sm'}`} />
             ))}
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10" />
             <div className="absolute bottom-8 left-8 right-8 z-20 flex items-end justify-between">
                <div>
                  <p className="text-[#E60000] text-[10px] font-bold tracking-widest uppercase mb-2">Company Milestone</p>
                  <p className="text-white font-heading font-bold text-3xl md:text-4xl tracking-wide leading-none">Roadmap<br/>{timelineData[activeTimeline].year}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shrink-0"><ArrowUpRight size={24} /></div>
             </div>
          </div>
        </div>

        <FadeUpReveal delayOffset={200}>
          <h3 className="text-2xl font-heading font-bold mb-8 uppercase tracking-widest">Our Core Values</h3>
          <div className="flex flex-col md:flex-row w-full h-[600px] md:h-[400px] gap-2 md:gap-4">
            {spirit.map((item, idx) => (
              <div key={idx} className="spirit-card bg-white border border-gray-100 radius-max p-6 flex flex-col justify-between overflow-hidden shadow-sm relative group" data-cursor="hover">
                <div className="text-5xl md:text-7xl font-heading font-black text-gray-200 group-hover:text-white/20 transition-colors">{item.l}</div>
                <div className="spirit-title w-full md:w-[250px]">
                   <h4 className="text-2xl font-heading font-bold mb-2 whitespace-nowrap">{item.title}</h4>
                   <p className="text-sm opacity-90 leading-relaxed hidden md:block">{item.desc}</p>
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
    <section className="py-24 bg-white px-[3vw] text-left">
      <div className="max-w-[1800px] mx-auto">
        <FadeUpReveal>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-[2px] bg-[#E60000]" />
            <span className="text-gray-500 font-medium tracking-widest uppercase text-sm">Product Verticals</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tighter text-[#111] mb-12">EXPLORE CATEGORIES.</h2>
        </FadeUpReveal>

        <div className="flex flex-col md:flex-row h-[600px] md:h-[500px] gap-4 w-full">
          {categories.map((cat, idx) => (
            <div key={idx} className="category-card relative radius-max overflow-hidden group" data-cursor="hover">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
              <img src={cat.img} alt={cat.title} className="absolute inset-0 w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s]" />
              <div className="absolute bottom-0 left-0 p-8 z-20 text-white w-full">
                <p className="text-[#E60000] text-xs font-bold uppercase tracking-widest mb-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full inline-block">{cat.count}</p>
                <h3 className="text-3xl md:text-4xl font-heading font-bold mb-2 whitespace-nowrap">{cat.title}</h3>
                <div className="cat-content h-0 overflow-hidden group-hover:h-auto">
                  <p className="text-sm text-gray-200 mt-2 max-w-xs">{cat.desc}</p>
                  <button className="mt-4 flex items-center gap-2 text-sm font-semibold hover:text-[#E60000] transition-colors">
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
       <div className="max-w-[1800px] mx-auto px-[3vw] py-24 md:py-32 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2 relative z-10 text-white">
             <img src="https://abkimports.com/wp-content/uploads/2023/04/ABK-Logo_150pix-x-150pix-01.png" alt="ABK Imports" className="h-[80px] mb-8 brightness-0 invert object-contain" />
             <h2 className="text-6xl md:text-[6vw] font-heading font-black leading-[0.9] tracking-tighter mb-4 uppercase">
               PRODUCT <br/> CATALOGUE
             </h2>
             <p className="text-3xl font-heading font-bold tracking-widest mb-12">2026-27</p>
             <Magnetic strength={0.2}>
                <button className="bg-white text-[#E64C3C] px-10 py-5 radius-max font-bold text-sm hover:bg-black hover:text-white transition-colors duration-300 shadow-2xl flex items-center gap-3 w-max" data-cursor="hover">
                   Download Master PDF <ArrowRight size={20}/>
                </button>
             </Magnetic>
          </div>
          <div className="w-full md:w-1/2 relative flex justify-center">
             <div className="w-[80%] max-w-[500px] aspect-[3/4] bg-white rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] rotate-2 hover:rotate-0 transition-transform duration-700 flex flex-col items-center justify-center p-8 border-8 border-gray-100">
                <img src="https://abkimports.com/wp-content/uploads/2023/04/ABK-Logo_150pix-x-150pix-01.png" alt="Logo" className="w-32 mb-8 opacity-20" />
                <h3 className="text-4xl font-heading font-black text-center text-gray-800">MASTER CATALOGUE</h3>
                <div className="w-16 h-2 bg-[#E64C3C] mt-6"></div>
             </div>
          </div>
       </div>
    </section>
  );
}

const WhyChooseABK = () => {
  const points = [
    { title: "Intelligent Logistics", desc: "Climate-controlled warehousing and automated routing ensuring product integrity." },
    { title: "B2B Partner Portal", desc: "Seamless ordering, real-time inventory tracking, and dedicated account management." },
    { title: "Regulatory Compliance", desc: "In-house legal teams ensuring all global products meet domestic certifications." }
  ];

  return (
    <section id="why-choose-abk" className="py-32 bg-[#F9F9F9] relative overflow-hidden bg-dots text-left">
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-white rounded-full blur-[100px] pointer-events-none" />
      
      <div className="px-[3vw] max-w-[1800px] mx-auto mb-20 relative z-10">
         <FadeUpReveal>
            <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-[2px] bg-[#E60000]" />
               <span className="text-gray-500 font-medium tracking-widest uppercase text-sm">Capabilities</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tighter mb-6 leading-[1]">WHY CHOOSE <span className="text-[#E60000]">ABK IMPORTS.</span></h2>
            <p className="text-gray-600 text-xl leading-relaxed max-w-3xl">We provide more than just products. We provide a robust, tech-enabled infrastructure designed to scale your retail or clinical operations.</p>
         </FadeUpReveal>
      </div>

      <div className="px-[3vw] max-w-[1800px] mx-auto relative">
        <div className="hidden md:block absolute top-[60px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E60000]/20 to-transparent" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
           {points.map((pt, idx) => (
             <FadeUpReveal key={idx} delayOffset={idx * 150}>
               <div className="bg-white border border-gray-100 radius-max p-10 md:p-14 hover:shadow-xl transition-all duration-500 group h-full hover:-translate-y-2 text-left" data-cursor="hover">
                  <div className="w-20 h-20 bg-[#FFF5F5] rounded-full flex items-center justify-center text-[#E60000] font-heading font-black text-3xl mb-8 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(230,0,0,0.1)]">0{idx + 1}</div>
                  <h3 className="text-2xl font-heading font-bold mb-4 text-[#111]">{pt.title}</h3>
                  <p className="text-gray-600 text-base leading-relaxed">{pt.desc}</p>
               </div>
             </FadeUpReveal>
           ))}
        </div>
      </div>
    </section>
  );
};

const InteractiveROICalculator = () => {
  const [clients, setClients] = useState(150);
  const avgOrderValue = 2500; // INR
  const margin = 0.35; // 35% margin
  const revenue = Math.floor(clients * avgOrderValue);
  const profit = Math.floor(revenue * margin);

  return (
    <section className="py-24 bg-[#0a0a0a] text-white px-[3vw] relative overflow-hidden text-left">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[#E60000]/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2">
          <FadeUpReveal>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[2px] bg-[#E60000]" />
              <span className="text-gray-400 font-medium tracking-widest uppercase text-sm">Partner Benefits</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tighter mb-6">PROJECT YOUR <br/><span className="text-[#E60000]">GROWTH.</span></h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">Calculate your estimated monthly revenue potential by integrating ABK Imports' premium catalog into your retail or clinical practice.</p>
            
            <div className="bg-[#111] p-8 radius-max border border-white/10">
              <div className="flex justify-between items-end mb-6">
                <label className="text-sm font-bold uppercase tracking-widest text-gray-400">Monthly Pet Clients</label>
                <span className="text-3xl font-heading font-black text-white">{clients}</span>
              </div>
              <input 
                type="range" 
                min="50" max="1000" step="10" 
                value={clients} 
                onChange={(e) => setClients(e.target.value)} 
                data-cursor="drag"
              />
              <div className="flex justify-between mt-3 text-xs text-gray-500 font-mono">
                <span>50</span><span>1000+</span>
              </div>
            </div>
          </FadeUpReveal>
        </div>

        <div className="w-full md:w-1/2">
          <FadeUpReveal delayOffset={200}>
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#111] p-10 radius-max border border-white/10 shadow-2xl relative overflow-hidden group text-left">
                <div className="absolute -right-10 -top-10 text-white/5 group-hover:scale-110 transition-transform duration-700">
                  <BarChart3 size={150} />
                </div>
                <p className="text-[#E60000] text-sm font-bold uppercase tracking-widest mb-2">Est. Monthly Revenue</p>
                <h3 className="text-5xl md:text-6xl font-heading font-black">₹{revenue.toLocaleString('en-IN')}</h3>
              </div>
              
              <div className="bg-[#E60000] text-white p-10 radius-max shadow-[0_20px_50px_rgba(230,0,0,0.2)] text-left">
                <p className="text-white/80 text-sm font-bold uppercase tracking-widest mb-2">Projected Gross Margin (35%)</p>
                <h3 className="text-5xl md:text-6xl font-heading font-black">₹{profit.toLocaleString('en-IN')}</h3>
                <p className="text-sm mt-6 font-medium bg-white/20 inline-block px-4 py-2 rounded-full backdrop-blur-sm">Based on industry average basket size.</p>
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
    <section className="py-24 bg-[#F9F9F9] px-[3vw] bg-dots relative text-left">
      <div className="max-w-[1800px] mx-auto mb-16">
        <FadeUpReveal>
          <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-[2px] bg-[#E60000]" />
             <span className="text-gray-500 font-medium tracking-widest uppercase text-sm">Operations</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tighter text-[#111] mb-6">UNMATCHED INFRASTRUCTURE.</h2>
          <p className="text-gray-600 text-lg max-w-2xl">Real-time inventory visibility and climate-controlled routing ensure your products arrive in pristine condition.</p>
        </FadeUpReveal>
      </div>

      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <Box size={32} />, title: "Automated Warehousing", value: "150,000", suffix: "sq ft", desc: "State-of-the-art storage facilities nationwide." },
          { icon: <Truck size={32} />, title: "Cold-Chain Fleet", value: "99.8", suffix: "%", desc: "On-time, temperature-regulated delivery rate." },
          { icon: <ShieldCheck size={32} />, title: "Quality Assurance", value: "100", suffix: "%", desc: "Compliance with all domestic regulatory standards." }
        ].map((stat, idx) => (
          <FadeUpReveal key={idx} delayOffset={idx * 150}>
            <div className="bg-white p-10 radius-max border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-start text-left group" data-cursor="hover">
              <div className="w-16 h-16 bg-[#FFF5F5] text-[#E60000] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <h3 className="text-5xl font-heading font-black text-[#111] mb-2">{stat.value}<span className="text-2xl text-[#E60000] ml-1">{stat.suffix}</span></h3>
              <h4 className="text-lg font-bold mb-3">{stat.title}</h4>
              <p className="text-sm text-gray-500">{stat.desc}</p>
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
        const size = isHQ ? 10 : (loc.type === 'hub' ? 6 : 4);
        const pulseClass = isHQ ? 'animate-ping opacity-50 absolute inset-0 rounded-full' : '';

        const iconHtml = `<div style="position: relative; width: ${size*2}px; height: ${size*2}px;">${isHQ ? `<div class="${pulseClass}" style="background-color: ${color};"></div>` : ''}<div style="position: absolute; inset: 0; background-color: ${color}; border-radius: 50%; box-shadow: 0 0 10px ${color};"></div></div>`;
        const customIcon = L.divIcon({ className: 'custom-map-marker', html: iconHtml, iconSize: [size*2, size*2], iconAnchor: [size, size] });
        const marker = L.marker(loc.coords, { icon: customIcon }).addTo(map);

        marker.bindTooltip(`
          <div style="background: rgba(17, 17, 17, 0.95); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.1); padding: 16px; border-radius: 12px; color: white; min-width: 200px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <p style="color: ${color}; font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 4px 0;">${loc.type === 'hq' ? 'Headquarters' : 'Network Node'}</p>
            <strong style="color: white; font-size: 16px; font-family: 'Montserrat', sans-serif; display: block; margin-bottom: 8px;">${loc.title}</strong>
            <span style="font-size: 13px; color: #aaa; line-height: 1.4; display: block;">${loc.desc}</span>
          </div>
        `, { direction: 'top', offset: [0, -size], className: 'custom-leaflet-tooltip' });
      });

      mapInstance.current = map;
    }
  }, [leafletLoaded]);

  return (
    <section className="py-32 bg-[#050505] text-white relative overflow-hidden border-t border-white/10 text-left">
      <div className="px-[3vw] max-w-[1800px] mx-auto relative z-20">
        <FadeUpReveal>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-[2px] bg-[#E60000]" />
            <span className="text-gray-400 font-medium tracking-widest uppercase text-sm">Global Footprint</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-[5vw] font-heading font-extrabold tracking-tighter mb-12 leading-[1]">
            SOURCING WORLDWIDE.<br/>DELIVERING <span className="text-[#E60000]">PAN-INDIA.</span>
          </h2>
        </FadeUpReveal>

        <FadeUpReveal delayOffset={100}>
          <div className="w-full h-[50vh] md:h-[60vh] min-h-[400px] radius-max overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10 bg-[#111]" data-cursor="drag">
            {leafletLoaded ? <div ref={mapRef} className="w-full h-full" /> : <div className="w-full h-full flex items-center justify-center text-gray-500 font-mono text-sm">Initializing Geospatial Data...</div>}
            
            <div className="absolute bottom-6 left-6 z-[400] bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-4 pointer-events-none hidden md:block text-left">
               <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-3">Network Legend</h4>
               <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3"><div className="w-3 h-3 bg-[#E60000] rounded-full shadow-[0_0_8px_#E60000]"></div><span className="text-xs text-gray-300">Central HQ & Hub</span></div>
                  <div className="flex items-center gap-3"><div className="w-2.5 h-2.5 bg-white rounded-full"></div><span className="text-xs text-gray-300">Global Sourcing Node</span></div>
                  <div className="flex items-center gap-3"><div className="w-2 h-2 bg-gray-500 rounded-full"></div><span className="text-xs text-gray-300">Regional Distribution</span></div>
               </div>
            </div>
          </div>
        </FadeUpReveal>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-16 relative">
          <FadeUpReveal delayOffset={100} className="relative text-left">
            <h4 className="text-3xl font-heading font-bold mb-4">North America</h4>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">Partnering with industry titans in the USA and Canada to bring clinically proven nutrition, behavioral toys, and grooming tech to India.</p>
          </FadeUpReveal>
          <FadeUpReveal delayOffset={200} className="relative text-left">
            <h4 className="text-3xl font-heading font-bold mb-4">Europe & UK</h4>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">Sourcing premium lifestyle accessories, specialized veterinary care products, and heritage grooming brands trusted globally.</p>
          </FadeUpReveal>
          <FadeUpReveal delayOffset={300} className="relative text-left">
            <h4 className="text-3xl font-heading font-bold mb-4">Asian Markets</h4>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">Leveraging high-tech manufacturing hubs for innovative toys, smart pet accessories, and highly reliable daily care items.</p>
            <div className="mt-8 inline-flex items-center gap-3 bg-[#1A1A1A]/80 border border-white/20 rounded-full px-5 py-2.5 backdrop-blur-md">
                <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center relative"><div className="absolute inset-0 bg-[#E60000] rounded-full animate-ping opacity-50" /><div className="w-2 h-2 bg-[#E60000] rounded-full" /></div>
                <span className="text-[11px] font-bold tracking-widest uppercase text-white">Pune Central Hub</span>
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
    <section className="py-32 bg-[#111] text-white text-left px-[3vw]">
      <div className="max-w-[1800px] mx-auto">
        <Star className="text-[#E60000] mb-10" size={48} fill="currentColor" />
        <div className="relative h-[250px] w-full max-w-5xl">
          {reviews.map((rev, idx) => (
            <div key={idx} className={`absolute top-0 left-0 w-full transition-all duration-1000 ease-in-out ${active === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
              <h3 className="text-3xl md:text-5xl font-heading font-medium leading-tight mb-8">"{rev.text}"</h3>
              <p className="font-bold text-xl">{rev.author}</p>
              <p className="text-gray-500 uppercase tracking-widest text-sm mt-1">{rev.role}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-8">
          {reviews.map((_, idx) => (
            <button key={idx} onClick={() => setActive(idx)} className={`h-2 rounded-full transition-all duration-500 ${active === idx ? 'w-10 bg-[#E60000]' : 'w-2 bg-gray-600'}`} data-cursor="hover" />
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
    <section className="py-32 bg-white px-[3vw] text-left">
      <div className="max-w-[1000px] mx-auto">
        <FadeUpReveal>
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-[2px] bg-[#E60000]" />
               <span className="text-gray-500 font-medium tracking-widest uppercase text-sm">Help & Support</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tighter text-[#111]">FREQUENTLY ASKED.</h2>
          </div>
        </FadeUpReveal>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => (
            <FadeUpReveal key={idx} delayOffset={idx * 100}>
              <div 
                className={`border border-gray-200 radius-max overflow-hidden transition-all duration-300 cursor-pointer ${openIdx === idx ? 'bg-[#FAFAFA] shadow-md' : 'bg-white hover:border-gray-300'}`}
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
              >
                <div className="p-6 md:p-8 flex justify-between items-center">
                  <h4 className={`text-lg md:text-xl font-bold transition-colors ${openIdx === idx ? 'text-[#E60000]' : 'text-[#111]'}`}>{faq.q}</h4>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${openIdx === idx ? 'bg-[#E60000] text-white rotate-45' : 'bg-gray-100 text-gray-500'}`}>
                    <Plus size={20} />
                  </div>
                </div>
                <div className={`px-6 md:px-8 overflow-hidden transition-all duration-500 ease-in-out ${openIdx === idx ? 'max-h-[200px] pb-8 opacity-100' : 'max-h-0 pb-0 opacity-0'}`}>
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
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
    <section className="py-32 bg-white px-[3vw] text-left">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <FadeUpReveal>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[2px] bg-[#E60000]" />
              <span className="text-gray-500 font-medium tracking-widest uppercase text-sm">Corporate News</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tighter text-[#111]">INDUSTRY INSIGHTS.</h2>
          </FadeUpReveal>
          <FadeUpReveal delayOffset={100}>
             <Magnetic>
               <button className="border border-gray-300 text-black px-8 py-4 radius-max text-sm font-semibold hover:border-[#111] hover:bg-[#111] hover:text-white transition-all duration-300 w-max" data-cursor="hover">
                 View All News
               </button>
             </Magnetic>
          </FadeUpReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art, idx) => (
            <FadeUpReveal key={idx} delayOffset={idx * 100}>
              <div className="group cursor-pointer text-left" data-cursor="hover">
                <div className="w-full h-[300px] radius-max overflow-hidden mb-6 relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img src={art.img} alt={art.title} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                  <div className="absolute top-4 left-4 z-20 bg-white px-3 py-1 radius-max text-[10px] font-bold uppercase tracking-widest text-black">
                    {art.category}
                  </div>
                </div>
                <p className="text-[#E60000] text-xs font-bold uppercase tracking-widest mb-3">{art.date}</p>
                <h4 className="text-2xl font-heading font-bold text-[#111] group-hover:text-[#E60000] transition-colors duration-300 leading-tight">
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
    <section id="work-with-us" className="py-32 px-[3vw] blended-bg border-y border-gray-200 text-left">
      <div className="max-w-[1800px] mx-auto bg-white radius-max shadow-xl overflow-hidden flex flex-col md:flex-row">
         <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">PARTNER WITH EXCELLENCE.</h2>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed">Whether you are a global brand looking to enter the Indian market, or a passionate professional seeking a career at our Savannah HQ, we want to hear from you.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#E60000] text-white px-8 py-4 radius-max font-bold hover:bg-[#111] transition-colors w-max" data-cursor="hover">Join Our Network</button>
              <button className="bg-transparent border border-gray-300 text-[#111] px-8 py-4 radius-max font-bold hover:border-[#111] transition-colors w-max" data-cursor="hover">View Careers</button>
            </div>
         </div>
         <div className="w-full md:w-1/2 h-[400px] md:h-auto">
            <img src="https://images.unsplash.com/photo-1521651201144-634f700b36ef?auto=format&fit=crop&w=1200&q=80" alt="Work with ABK" className="w-full h-full object-cover grayscale-[20%]" />
         </div>
      </div>
    </section>
  );
}

const OurMissionVision = () => (
  <section className="py-32 px-[3vw] bg-white text-left">
    <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row gap-16 lg:gap-24">
      <FadeUpReveal className="flex-1">
        <h3 className="text-sm font-bold tracking-widest text-[#E60000] uppercase mb-6 flex items-center gap-4"><div className="w-8 h-[2px] bg-[#E60000]"></div>Our Mission</h3>
        <h2 className="text-4xl md:text-5xl font-heading font-black text-[#111] mb-6 leading-tight">Setting a New Standard for Pet Wellbeing.</h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-8">We are dedicated to enriching the lives of pets by providing Indian pet parents and professionals with uninterrupted access to the world's most trusted, clinically proven, and innovative pet care products.</p>
      </FadeUpReveal>
      <FadeUpReveal className="flex-1" delayOffset={200}>
        <h3 className="text-sm font-bold tracking-widest text-[#E60000] uppercase mb-6 flex items-center gap-4"><div className="w-8 h-[2px] bg-[#E60000]"></div>Our Vision</h3>
        <h2 className="text-4xl md:text-5xl font-heading font-black text-[#111] mb-6 leading-tight">An Ecosystem of Global Excellence.</h2>
        <p className="text-gray-600 text-lg leading-relaxed">By 2030, we aim to be the backbone of the Asian pet care industry, integrating tech-driven logistics with uncompromising quality assurance to empower every clinic, salon, and retail partner nationwide.</p>
      </FadeUpReveal>
    </div>
  </section>
);

const LeadershipTeam = () => {
  const team = [
    { name: "Arun K.", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80" },
    { name: "Priya S.", role: "Chief Operating Officer", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" },
    { name: "David M.", role: "Head of Global Sourcing", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80" },
  ];
  return (
    <section className="py-32 bg-[#FAFAFA] px-[3vw]">
      <div className="max-w-[1800px] mx-auto text-left">
        <FadeUpReveal>
          <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-[2px] bg-[#E60000]" />
             <span className="text-gray-500 font-medium tracking-widest uppercase text-sm">The Minds Behind ABK</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-black text-[#111] mb-16">LEADERSHIP.</h2>
        </FadeUpReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <FadeUpReveal key={i} delayOffset={i*150}>
              <div className="group cursor-pointer" data-cursor="hover">
                <div className="w-full aspect-[4/5] overflow-hidden radius-max mb-6 relative shadow-lg">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0" />
                </div>
                <h4 className="text-2xl font-heading font-bold text-[#111]">{member.name}</h4>
                <p className="text-[#E60000] text-sm font-bold uppercase tracking-widest mt-2">{member.role}</p>
              </div>
            </FadeUpReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const PartnershipPhilosophy = () => (
  <section className="py-32 bg-[#111] text-white px-[3vw] relative overflow-hidden">
    <div className="absolute right-0 top-0 w-full lg:w-1/2 h-full opacity-20 pointer-events-none">
      <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=80" alt="Meeting" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#111] via-transparent to-transparent" />
    </div>
    <div className="max-w-[1800px] mx-auto relative z-10 text-left">
      <FadeUpReveal>
        <div className="w-10 h-[2px] bg-[#E60000] mb-6" />
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black mb-10 max-w-4xl leading-[1.1]">
          WE DON'T JUST DISTRIBUTE.<br/><span className="text-[#E60000]">WE BUILD MARKETS.</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl leading-relaxed mb-12">Our philosophy goes beyond the simple transaction. When we introduce a global brand to the Indian market, we act as their local custodian—investing heavily in education, market awareness, and brand equity to guarantee long-term success.</p>
        <Magnetic>
          <button className="border border-white/30 text-white px-8 py-4 radius-max text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors" data-cursor="hover">View Partner Case Studies</button>
        </Magnetic>
      </FadeUpReveal>
    </div>
  </section>
);

const FacilityShowcase = () => (
  <section className="py-32 bg-white px-[3vw]">
    <div className="max-w-[1800px] mx-auto text-left">
      <FadeUpReveal>
        <div className="flex items-center gap-3 mb-6">
           <div className="w-10 h-[2px] bg-[#E60000]" />
           <span className="text-gray-500 font-medium tracking-widest uppercase text-sm">Scale & Security</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-heading font-black text-[#111] mb-16">INFRASTRUCTURE.</h2>
      </FadeUpReveal>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-auto lg:h-[600px]">
        <FadeUpReveal delayOffset={100} className="radius-max overflow-hidden relative group h-[400px] lg:h-full cursor-pointer" data-cursor="hover">
            <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80" alt="Warehouse" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-10 left-10 text-white pr-10">
              <p className="text-[#E60000] text-sm font-bold tracking-widest uppercase mb-3">Pune, MH</p>
              <h3 className="text-3xl md:text-4xl font-heading font-bold mb-3">Central Distribution HQ</h3>
              <p className="text-gray-300">Over 150,000 sq ft of climate-controlled inventory space.</p>
            </div>
        </FadeUpReveal>
        <div className="flex flex-col gap-8 h-auto lg:h-full">
            <FadeUpReveal delayOffset={200} className="flex-1 radius-max overflow-hidden relative group h-[300px] lg:h-auto cursor-pointer" data-cursor="hover">
              <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80" alt="Tech" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-10 left-10 text-white pr-10">
                <h3 className="text-2xl md:text-3xl font-heading font-bold mb-3">Cold-Chain Network</h3>
                <p className="text-gray-300">Ensuring clinical nutrition efficacy across all delivery zones.</p>
              </div>
            </FadeUpReveal>
            <FadeUpReveal delayOffset={300} className="flex-1 bg-[#F9F9F9] radius-max p-10 flex flex-col justify-center border border-gray-100">
              <Box size={40} className="text-[#E60000] mb-6" />
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-[#111] mb-4">Scalable Capacity</h3>
              <p className="text-gray-600 leading-relaxed text-lg">Our proprietary warehouse management system (WMS) handles over 10,000 pallets, enabling 99.8% on-time fulfillment rates across pan-India orders.</p>
            </FadeUpReveal>
        </div>
      </div>
    </div>
  </section>
);

const SustainabilityCommitment = () => (
  <section className="py-24 bg-[#E60000] text-white px-[3vw]">
    <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 text-left">
        <div className="lg:w-1/2">
          <FadeUpReveal>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-6 leading-[1.1]">COMMITTED TO A <br/>GREENER FUTURE.</h2>
            <p className="text-white/90 text-lg leading-relaxed max-w-xl">We are continuously optimizing our logistics to reduce our carbon footprint. From utilizing 100% recyclable packaging materials in our warehouse to deploying route-optimization AI for our delivery fleet.</p>
          </FadeUpReveal>
        </div>
        <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <FadeUpReveal delayOffset={100} className="bg-white/10 p-10 radius-max backdrop-blur-sm border border-white/20 hover:-translate-y-2 transition-transform duration-500" data-cursor="hover">
              <h4 className="text-6xl font-heading font-black mb-3">-40%</h4>
              <p className="text-sm font-bold uppercase tracking-widest text-white/80">Emission Reduction</p>
              <p className="text-xs text-white/60 mt-4 leading-relaxed">Achieved since 2020 through fleet optimization.</p>
          </FadeUpReveal>
          <FadeUpReveal delayOffset={200} className="bg-white/10 p-10 radius-max backdrop-blur-sm border border-white/20 hover:-translate-y-2 transition-transform duration-500" data-cursor="hover">
              <h4 className="text-6xl font-heading font-black mb-3">100%</h4>
              <p className="text-sm font-bold uppercase tracking-widest text-white/80">Recyclable Fillers</p>
              <p className="text-xs text-white/60 mt-4 leading-relaxed">Eliminated single-use plastics from B2B packaging.</p>
          </FadeUpReveal>
        </div>
    </div>
  </section>
);

const AwardsAndRecognitions = () => {
  const awards = [
    { title: "Excellence in Distribution", year: "2025" },
    { title: "Global Partner of the Year - Andis", year: "2024" },
    { title: "Pet Care Innovation Award", year: "2024" },
    { title: "Top 50 B2B Networks India", year: "2023" },
    { title: "Supply Chain Resilience Award", year: "2022" }
  ];
  return (
    <section className="py-32 bg-[#FAFAFA] px-[3vw] text-left">
      <div className="max-w-[1800px] mx-auto">
        <FadeUpReveal>
          <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-[2px] bg-[#E60000]" />
             <span className="text-gray-500 font-medium tracking-widest uppercase text-sm">Industry Accolades</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-black text-[#111] mb-12">RECOGNITIONS.</h2>
        </FadeUpReveal>
        <div className="flex flex-wrap gap-4">
          {awards.map((award, i) => (
            <FadeUpReveal key={i} delayOffset={i*100}>
              <div className="bg-white border border-gray-200 text-[#111] px-8 py-5 radius-max hover:border-[#E60000] hover:shadow-xl transition-all duration-300 cursor-default group" data-cursor="hover">
                  <p className="text-[#E60000] font-bold text-xs tracking-widest mb-1">{award.year}</p>
                  <h4 className="font-heading font-bold text-lg">{award.title}</h4>
              </div>
            </FadeUpReveal>
          ))}
        </div>
      </div>
    </section>
  );
};


// ----------------------------------------------------
// DEDICATED PAGES (SIMULATED ROUTING)
// ----------------------------------------------------

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
    <TailoredSolutions navigateTo={navigateTo} />
    <DoubleBrandMarquee navigateTo={navigateTo} />
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
    <InteractiveLogistics />
    <GlobalNetwork />
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
    <InsightsNews />
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
    <div className="bg-white py-32 px-[3vw] text-left">
      <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row gap-16">
         <div className="lg:w-1/3">
            <h2 className="text-4xl font-heading font-black mb-6 text-[#111]">CONNECT.</h2>
            <p className="text-gray-600 mb-12 leading-relaxed text-lg">Reach out to our global headquarters in Pune or connect directly with our regional B2B support desks.</p>
            <div className="flex flex-col gap-8">
              <div>
                 <h3 className="font-heading font-bold mb-2 text-[#111]">Pune Headquarters</h3>
                 <p className="text-gray-500 mb-2">Gera Imperium Alpha, Kharadi,<br/>Pune, Maharashtra 411014</p>
                 <a href="mailto:hq@abkimports.com" className="font-bold text-[#E60000] hover:underline" data-cursor="hover">hq@abkimports.com</a>
              </div>
              <div>
                 <h3 className="font-heading font-bold mb-2 text-[#111]">B2B Support</h3>
                 <p className="text-gray-500 mb-2">Dedicated account management for existing retail partners.</p>
                 <a href="mailto:partners@abkimports.com" className="font-bold text-[#E60000] hover:underline" data-cursor="hover">partners@abkimports.com</a>
              </div>
            </div>
         </div>
         <div className="lg:w-2/3 bg-[#F9F9F9] radius-max p-10 md:p-16 border border-gray-100">
            <form className="flex flex-col gap-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                     <label className="text-xs font-bold uppercase tracking-widest text-gray-500">First Name</label>
                     <input type="text" className="bg-white border border-gray-200 radius-max px-5 py-4 focus:outline-none focus:border-[#E60000] transition-colors" />
                  </div>
                  <div className="flex flex-col gap-3">
                     <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Last Name</label>
                     <input type="text" className="bg-white border border-gray-200 radius-max px-5 py-4 focus:outline-none focus:border-[#E60000] transition-colors" />
                  </div>
               </div>
               <div className="flex flex-col gap-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email Address</label>
                  <input type="email" className="bg-white border border-gray-200 radius-max px-5 py-4 focus:outline-none focus:border-[#E60000] transition-colors" />
               </div>
               <div className="flex flex-col gap-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Message</label>
                  <textarea rows="6" className="bg-white border border-gray-200 radius-max px-5 py-4 focus:outline-none focus:border-[#E60000] transition-colors resize-none" />
               </div>
               <button className="bg-[#111] text-white px-10 py-5 radius-max font-bold text-sm uppercase tracking-widest hover:bg-[#E60000] transition-colors w-max mt-4" data-cursor="hover">Send Message</button>
            </form>
         </div>
      </div>
    </div>
  </div>
);

const PreFooter = () => (
  <section className="py-32 bg-[#E60000] text-white text-left px-[3vw]">
    <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
      <FadeUpReveal className="flex-1">
        <h2 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tighter mb-6 leading-tight">READY TO <br/>ELEVATE?</h2>
        <p className="text-xl max-w-xl text-white/90">Join India's premier import and distribution partner network today.</p>
      </FadeUpReveal>
      <FadeUpReveal delayOffset={100}>
        <Magnetic>
          <button className="bg-white text-[#E60000] px-12 py-6 radius-max font-bold text-lg hover:bg-black hover:text-white transition-colors duration-300 w-max" data-cursor="hover">
            Contact Us Today
          </button>
        </Magnetic>
      </FadeUpReveal>
    </div>
  </section>
);

const Footer = ({ navigateTo }) => {
  return (
    <footer id="contact" className="bg-[#050505] text-white pt-24 pb-8 overflow-hidden text-left">
      <div className="px-[3vw] flex flex-col lg:flex-row justify-between gap-16 lg:gap-24 mb-24 max-w-[1800px] mx-auto">
        <div className="max-w-[400px]">
          <img src="https://abkimports.com/wp-content/uploads/2023/04/ABK-Logo_150pix-x-150pix-01.png" alt="ABK Imports Logo" className="h-[73px] md:h-[83px] mb-8 object-contain origin-left brightness-0 invert" />
          <p className="text-gray-400 font-light leading-relaxed mb-10 text-[15px]">India's premier import and distribution partner for global pet care brands. Elevating industry standards through superior supply chain management.</p>
          <div className="flex gap-4">
            {['LINKEDIN', 'FACEBOOK', 'INSTAGRAM'].map((social) => (
              <Magnetic key={social} strength={0.2}>
                <a href="#" className="text-[11px] font-medium hover:text-white transition-colors border border-white/20 px-5 py-2.5 rounded-full uppercase tracking-widest text-gray-400 hover:border-white" data-cursor="hover">{social}</a>
              </Magnetic>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 flex-1 lg:ml-20 mt-4 md:mt-0">
          <div>
            <h4 className="font-heading font-semibold mb-6 uppercase tracking-widest text-[11px] text-gray-500">DISTRIBUTION</h4>
            <ul className="space-y-4 text-gray-400 font-light text-[15px]">
              <li><button onClick={() => navigateTo('Work With Us')} className="hover:text-white transition-colors text-left" data-cursor="hover">Partner With Us</button></li>
              <li><button onClick={() => navigateTo('Brand Portfolio')} className="hover:text-white transition-colors text-left" data-cursor="hover">Brand Portfolio</button></li>
              <li><button className="hover:text-white transition-colors text-left" data-cursor="hover">B2B Portal Login</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-6 uppercase tracking-widest text-[11px] text-gray-500">COMPANY</h4>
            <ul className="space-y-4 text-gray-400 font-light text-[15px]">
              <li><button onClick={() => navigateTo('About Us')} className="hover:text-white transition-colors text-left" data-cursor="hover">About ABK</button></li>
              <li className="flex items-center gap-3"><button className="hover:text-white transition-colors text-left" data-cursor="hover">RESQ HQ</button><div className="w-2.5 h-2.5 bg-[#E64C3C] rounded-full" /></li>
              <li><button onClick={() => navigateTo('Work With Us')} className="hover:text-white transition-colors text-left" data-cursor="hover">Careers</button></li>
              <li><button onClick={() => navigateTo('Contact')} className="hover:text-white transition-colors text-left" data-cursor="hover">Contact</button></li>
            </ul>
          </div>
          <div className="col-span-1 md:col-span-1 lg:pl-4">
              <h4 className="font-heading font-semibold mb-6 uppercase tracking-widest text-[11px] text-gray-500">NEWSLETTER</h4>
              <p className="text-gray-400 font-light text-[15px] mb-6">Subscribe for B2B<br className="hidden lg:block"/> industry insights.</p>
              
              <div className="relative w-full max-w-[350px]">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full bg-[#111] border border-white/10 focus:border-white/30 rounded-2xl py-3.5 pl-5 pr-[110px] text-white text-[15px] outline-none transition-colors shadow-inner" 
                />
                <button 
                  className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#D65A47] text-white px-8 rounded-xl font-medium text-[15px] hover:bg-white hover:text-[#D65A47] transition-all duration-300 flex items-center justify-center" 
                  data-cursor="hover"
                >
                  Join
                </button>
              </div>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-white/5 pt-16 pb-8 overflow-hidden relative mt-16">
        <div className="flex w-max animate-[scroll_30s_linear_infinite]">
           {[...Array(4)].map((_, i) => (
              <h1 key={i} className="text-[14vw] font-heading font-extrabold leading-none tracking-tighter text-[#141414] whitespace-nowrap pr-8 select-none">ABK IMPORTS</h1>
           ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-medium tracking-widest text-gray-600 uppercase gap-6 mt-8 px-[3vw] max-w-[1800px] mx-auto">
        <p>© 2026 ABK IMPORTS. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8">
            <a href="#" className="hover:text-gray-300 transition-colors" data-cursor="hover">PRIVACY POLICY</a>
            <a href="#" className="hover:text-gray-300 transition-colors" data-cursor="hover">TERMS OF SERVICE</a>
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
  const [cursorText, setCursorText] = useState("");
  const [currentPage, setCurrentPage] = useState('Home');
  const [scrolled, setScrolled] = useState(false);
  
  const cursorDotRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    let dotPos = { x: window.innerWidth/2, y: window.innerHeight/2 };
    let mousePos = { x: window.innerWidth/2, y: window.innerHeight/2 };
    let hasMoved = false;

    const updateMouse = (e) => { 
      mousePos.x = e.clientX; 
      mousePos.y = e.clientY; 
      
      if (!hasMoved && cursorDotRef.current) {
        cursorDotRef.current.classList.add('visible');
        hasMoved = true;
      }
    };
    
    const animate = () => {
      dotPos.x += (mousePos.x - dotPos.x) * 0.2;
      dotPos.y += (mousePos.y - dotPos.y) * 0.2;
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${dotPos.x}px, ${dotPos.y}px) translate(-50%, -50%)`;
      }
      requestAnimationFrame(animate);
    };
    
    window.addEventListener('mousemove', updateMouse);
    const raf = requestAnimationFrame(animate);
    return () => { window.removeEventListener('mousemove', updateMouse); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    const handleMouseOver = (e) => {
      if (containerRef.current) {
        containerRef.current.classList.remove('cursor-hover', 'cursor-drag');
        setCursorText("");
        const target = e.target.closest('[data-cursor]');
        if (target) {
          const cursorType = target.getAttribute('data-cursor');
          if (cursorType === 'hover') containerRef.current.classList.add('cursor-hover');
          else if (cursorType === 'drag') { containerRef.current.classList.add('cursor-drag'); setCursorText("DRAG"); }
        }
      }
    };
    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
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

    switch (currentPage) {
      case 'Home':
        return (
          <div className="animate-[fadeIn_0.5s_ease-out]">
            <Hero isReady={!loading} />
            <Statistics />
            <TailoredSolutions navigateTo={handleNavigate} />
            <DoubleBrandMarquee navigateTo={handleNavigate} />
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
      case 'Contact': return <ContactPage />;
      default: return <div />;
    }
  };

  return (
    <div ref={containerRef} className="relative bg-white selection:bg-[#E60000] selection:text-white">
      {injectStyles()}
      <div className="hidden md:block"><div ref={cursorDotRef} className="cursor-dot">{cursorText}</div></div>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} navigateTo={handleNavigate} />

      <div className={`transition-opacity duration-1000 ease-in-out ${loading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        <Header onOpenMenu={() => setMenuOpen(true)} scrolled={scrolled} />
        <main>
          {renderPage()}
        </main>
        <Footer navigateTo={handleNavigate} />
      </div>
    </div>
  );
}
