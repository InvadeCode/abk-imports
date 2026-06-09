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

    /* SMOOTH ANIMATIONS & BLENDS */
    .hover-image-scale img { transition: transform 1.5s cubic-bezier(0.25, 1, 0.5, 1); }
    .hover-image-scale:hover img { transform: scale(1.05); }
    
    .blended-bg {
      background: linear-gradient(135deg, #FFF 0%, #FFF5F5 50%, #FDFDFD 100%);
    }

    @keyframes slowZoom { 0% { transform: scale(1); } 100% { transform: scale(1.15); } }
    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    .animate-marquee { animation: marquee 35s linear infinite; }
    @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .animate-spin-slow { animation: spin-slow 25s linear infinite; }
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
        
        {/* Header - Logo removed as requested */}
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

const BrandMarquee = () => {
  const brands = ["ANDIS", "TROPICLEAN", "ORIJEN", "KONG", "PETKIN", "WAHL", "ROYAL CANIN", "FARMINA", "BEAPHAR", "FLEXI", "ACANA", "EARTHBATH", "FURMINATOR", "SAVIC", "TRIXIE"];
  const scrollBrands = [...brands, ...brands];
  return (
    <section className="py-12 bg-white border-b border-gray-100 overflow-hidden relative flex items-center">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      <div className="flex animate-marquee whitespace-nowrap items-center">
        {scrollBrands.map((brand, i) => (
          <div key={i} className="mx-10 text-3xl md:text-5xl font-heading font-black text-gray-200 hover:text-[#E60000] transition-colors duration-300 cursor-pointer select-none" data-cursor="hover">{brand}</div>
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
    <section id="about-us" className="py-32 blended-bg overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#E60000]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[30vw] h-[30vw] bg-[#E60000]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="px-[3vw] max-w-[1800px] mx-auto relative z-10">
        <FadeUpReveal>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-[2px] bg-[#E60000]" />
            <span className="text-gray-500 font-medium tracking-widest uppercase text-sm">Who We Are</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tighter text-[#111] mb-20 max-w-3xl relative">
            OUR JOURNEY IS FUELED BY THE <span className="text-[#E60000]">SPIRIT</span> OF CARE.
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

const BrandPortfolio = () => {
  const scrollRef = useRef(null);
  
  const globalBrands = [
    { name: "Andis", img: "https://images.unsplash.com/photo-1585559606675-01e141a02fb4?auto=format&fit=crop&w=800&q=80" },
    { name: "TropiClean", img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80" },
    { name: "Orijen", img: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80" },
    { name: "Kong", img: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=800&q=80" }
  ];

  const inHouseBrands = [
    { name: "ABK Grooming", desc: "Our signature line of professional tools.", img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80" },
    { name: "Petkin Essentials", desc: "Daily care formulations built in-house.", img: "https://images.unsplash.com/photo-1537151608804-ea6f11cc3622?auto=format&fit=crop&w=800&q=80" }
  ];

  return (
    <section id="brand-portfolio" className="py-32 bg-[#111] text-white overflow-hidden relative">
      <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80" alt="Cat peeking" className="absolute -right-20 top-20 w-64 h-64 object-cover rounded-full opacity-10 mix-blend-screen pointer-events-none" />

      <div className="px-[3vw] mb-16">
        <FadeUpReveal>
          <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-[2px] bg-[#E60000]" />
             <span className="text-gray-400 font-medium tracking-widest uppercase text-sm">The Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tighter mb-8">GLOBAL BRANDS.</h2>
        </FadeUpReveal>
      </div>

      <div ref={scrollRef} className="portfolio-container flex gap-6 px-[3vw] overflow-x-auto snap-x snap-mandatory no-scrollbar pb-20" data-cursor="drag">
        {globalBrands.map((brand, idx) => (
          <div key={idx} className="portfolio-card snap-start shrink-0 w-[85vw] md:w-[400px] h-[500px] relative radius-max overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
            <img src={brand.img} alt={brand.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
              <h3 className="text-3xl font-heading font-bold text-white tracking-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{brand.name}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="px-[3vw] max-w-[1800px] mx-auto mt-20 border-t border-white/10 pt-20">
         <FadeUpReveal>
           <h2 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tighter mb-12">HOME GROWN EXCELLENCE.</h2>
         </FadeUpReveal>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {inHouseBrands.map((brand, idx) => (
              <div key={idx} className="group relative h-[400px] radius-max overflow-hidden" data-cursor="hover">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                 <img src={brand.img} alt={brand.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0" />
                 <div className="absolute bottom-0 left-0 p-10 z-20">
                    <p className="text-[#E60000] text-xs font-bold uppercase tracking-widest mb-2">In-House Brand</p>
                    <h3 className="text-4xl font-heading font-bold text-white mb-2">{brand.name}</h3>
                    <p className="text-gray-300 text-lg">{brand.desc}</p>
                 </div>
              </div>
            ))}
         </div>
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
    <section className="py-24 bg-white px-[3vw]">
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
    <section className="bg-[#E64C3C] relative overflow-hidden">
       <div className="max-w-[1800px] mx-auto px-[3vw] py-24 md:py-32 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2 relative z-10 text-white">
             <img src="https://abkimports.com/wp-content/uploads/2023/04/ABK-Logo_150pix-x-150pix-01.png" alt="ABK Imports" className="h-[80px] mb-8 brightness-0 invert object-contain" />
             <h2 className="text-6xl md:text-[6vw] font-heading font-black leading-[0.9] tracking-tighter mb-4 uppercase">
               PRODUCT <br/> CATALOGUE
             </h2>
             <p className="text-3xl font-heading font-bold tracking-widest mb-12">2026-27</p>
             <Magnetic strength={0.2}>
                <button className="bg-white text-[#E64C3C] px-10 py-5 radius-max font-bold text-sm hover:bg-black hover:text-white transition-colors duration-300 shadow-2xl flex items-center gap-3" data-cursor="hover">
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
    <section id="why-choose-abk" className="py-32 bg-[#F9F9F9] relative overflow-hidden bg-dots">
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-white rounded-full blur-[100px] pointer-events-none" />
      
      <div className="px-[3vw] max-w-[1800px] mx-auto text-center mb-20 relative z-10">
         <FadeUpReveal>
            <div className="flex items-center justify-center gap-3 mb-6">
               <div className="w-10 h-[2px] bg-[#E60000]" />
               <span className="text-gray-500 font-medium tracking-widest uppercase text-sm">Capabilities</span>
               <div className="w-10 h-[2px] bg-[#E60000]" />
            </div>
            <h2 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tighter mb-6 leading-[1]">WHY CHOOSE <span className="text-[#E60000]">ABK IMPORTS.</span></h2>
            <p className="text-gray-600 text-xl leading-relaxed max-w-2xl mx-auto">We provide more than just products. We provide a robust, tech-enabled infrastructure designed to scale your retail or clinical operations.</p>
         </FadeUpReveal>
      </div>

      <div className="px-[3vw] max-w-[1800px] mx-auto relative">
        <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-[#E60000]/20 to-transparent" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
           {points.map((pt, idx) => (
             <FadeUpReveal key={idx} delayOffset={idx * 150}>
               <div className="bg-white border border-gray-100 radius-max p-10 md:p-14 hover:shadow-xl transition-all duration-500 group text-center h-full hover:-translate-y-2" data-cursor="hover">
                  <div className="w-24 h-24 mx-auto bg-[#FFF5F5] rounded-full flex items-center justify-center text-[#E60000] font-heading font-black text-4xl mb-8 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(230,0,0,0.1)]">0{idx + 1}</div>
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
    <section className="py-24 bg-[#0a0a0a] text-white px-[3vw] relative overflow-hidden">
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
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#111] p-10 radius-max border border-white/10 shadow-2xl relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 text-white/5 group-hover:scale-110 transition-transform duration-700">
                  <BarChart3 size={150} />
                </div>
                <p className="text-[#E60000] text-sm font-bold uppercase tracking-widest mb-2">Est. Monthly Revenue</p>
                <h3 className="text-5xl md:text-6xl font-heading font-black">₹{revenue.toLocaleString('en-IN')}</h3>
              </div>
              
              <div className="bg-[#E60000] text-white p-10 radius-max shadow-[0_20px_50px_rgba(230,0,0,0.2)]">
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
    <section className="py-24 bg-[#F9F9F9] px-[3vw] bg-dots relative">
      <div className="max-w-[1800px] mx-auto text-center mb-16">
        <FadeUpReveal>
          <h2 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tighter text-[#111] mb-6">UNMATCHED INFRASTRUCTURE.</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Real-time inventory visibility and climate-controlled routing ensure your products arrive in pristine condition.</p>
        </FadeUpReveal>
      </div>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <Box size={32} />, title: "Automated Warehousing", value: "150,000", suffix: "sq ft", desc: "State-of-the-art storage facilities nationwide." },
          { icon: <Truck size={32} />, title: "Cold-Chain Fleet", value: "99.8", suffix: "%", desc: "On-time, temperature-regulated delivery rate." },
          { icon: <ShieldCheck size={32} />, title: "Quality Assurance", value: "100", suffix: "%", desc: "Compliance with all domestic regulatory standards." }
        ].map((stat, idx) => (
          <FadeUpReveal key={idx} delayOffset={idx * 150}>
            <div className="bg-white p-10 radius-max border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center group" data-cursor="hover">
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
    <section className="py-32 bg-[#050505] text-white relative overflow-hidden border-t border-white/10">
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
            
            <div className="absolute bottom-6 left-6 z-[400] bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-4 pointer-events-none hidden md:block">
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
          <FadeUpReveal delayOffset={100} className="relative">
            <h4 className="text-3xl font-heading font-bold mb-4">North America</h4>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">Partnering with industry titans in the USA and Canada to bring clinically proven nutrition, behavioral toys, and grooming tech to India.</p>
          </FadeUpReveal>
          <FadeUpReveal delayOffset={200} className="relative">
            <h4 className="text-3xl font-heading font-bold mb-4">Europe & UK</h4>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">Sourcing premium lifestyle accessories, specialized veterinary care products, and heritage grooming brands trusted globally.</p>
          </FadeUpReveal>
          <FadeUpReveal delayOffset={300} className="relative">
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
    <section className="py-32 bg-[#111] text-white text-center flex flex-col items-center justify-center px-[3vw]">
      <Star className="text-[#E60000] mb-10" size={48} fill="currentColor" />
      <div className="relative h-[250px] w-full max-w-4xl">
        {reviews.map((rev, idx) => (
          <div key={idx} className={`absolute top-0 left-0 w-full transition-all duration-1000 ease-in-out ${active === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
            <h3 className="text-2xl md:text-4xl font-heading font-medium leading-relaxed mb-8">"{rev.text}"</h3>
            <p className="font-bold text-lg">{rev.author}</p>
            <p className="text-gray-500 uppercase tracking-widest text-sm mt-1">{rev.role}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-8">
        {reviews.map((_, idx) => (
          <button key={idx} onClick={() => setActive(idx)} className={`h-2 rounded-full transition-all duration-500 ${active === idx ? 'w-10 bg-[#E60000]' : 'w-2 bg-gray-600'}`} data-cursor="hover" />
        ))}
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
    <section className="py-32 bg-white px-[3vw]">
      <div className="max-w-[1000px] mx-auto">
        <FadeUpReveal>
          <div className="text-center mb-16">
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
    <section className="py-32 bg-white px-[3vw]">
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
               <button className="border border-gray-300 text-black px-8 py-4 radius-max text-sm font-semibold hover:border-[#111] hover:bg-[#111] hover:text-white transition-all duration-300" data-cursor="hover">
                 View All News
               </button>
             </Magnetic>
          </FadeUpReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art, idx) => (
            <FadeUpReveal key={idx} delayOffset={idx * 100}>
              <div className="group cursor-pointer" data-cursor="hover">
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
    <section id="work-with-us" className="py-32 px-[3vw] blended-bg border-y border-gray-200">
      <div className="max-w-[1800px] mx-auto bg-white radius-max shadow-xl overflow-hidden flex flex-col md:flex-row">
         <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">PARTNER WITH EXCELLENCE.</h2>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed">Whether you are a global brand looking to enter the Indian market, or a passionate professional seeking a career at our Savannah HQ, we want to hear from you.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#E60000] text-white px-8 py-4 radius-max font-bold hover:bg-[#111] transition-colors" data-cursor="hover">Join Our Network</button>
              <button className="bg-transparent border border-gray-300 text-[#111] px-8 py-4 radius-max font-bold hover:border-[#111] transition-colors" data-cursor="hover">View Careers</button>
            </div>
         </div>
         <div className="w-full md:w-1/2 h-[400px] md:h-auto">
            <img src="https://images.unsplash.com/photo-1521651201144-634f700b36ef?auto=format&fit=crop&w=1200&q=80" alt="Work with ABK" className="w-full h-full object-cover grayscale-[20%]" />
         </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// DEDICATED PAGES (SIMULATED ROUTING)
// ----------------------------------------------------

const AboutUsPage = () => (
  <div className="pt-24 animate-[fadeIn_0.5s_ease-out]">
    <div className="bg-[#111] text-white py-24 text-center px-[3vw]">
      <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tighter mb-4">ABOUT US</h1>
      <p className="text-xl text-gray-400">The journey of elevating Indian pet care.</p>
    </div>
    <AboutUs />
    <Testimonials />
    <PreFooter />
  </div>
);

const BrandPortfolioPage = () => (
  <div className="pt-24 animate-[fadeIn_0.5s_ease-out]">
    <div className="bg-[#111] text-white py-24 text-center px-[3vw]">
      <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tighter mb-4">PORTFOLIO</h1>
      <p className="text-xl text-gray-400">Discover our 37+ exclusive global partnerships.</p>
    </div>
    <BrandPortfolio />
    <ProductCatalogue />
    <PreFooter />
  </div>
);

const WhyChooseABKPage = () => (
  <div className="pt-24 animate-[fadeIn_0.5s_ease-out]">
    <div className="bg-[#111] text-white py-24 text-center px-[3vw]">
      <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tighter mb-4">WHY ABK?</h1>
      <p className="text-xl text-gray-400">Our operational excellence is your competitive advantage.</p>
    </div>
    <WhyChooseABK />
    <InteractiveLogistics />
    <GlobalNetwork />
    <PreFooter />
  </div>
);

const WorkWithUsPage = () => (
  <div className="pt-24 animate-[fadeIn_0.5s_ease-out]">
    <div className="bg-[#111] text-white py-24 text-center px-[3vw]">
      <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tighter mb-4">CAREERS & PARTNERS</h1>
      <p className="text-xl text-gray-400">Join the vanguard of the pet industry.</p>
    </div>
    <WorkWithUs />
    <InsightsNews />
    <PreFooter />
  </div>
);

const ContactPage = () => (
  <div className="pt-24 animate-[fadeIn_0.5s_ease-out] bg-white min-h-screen flex items-center justify-center py-20 px-[3vw]">
    <div className="max-w-[800px] w-full text-center">
       <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tighter mb-8">GET IN TOUCH.</h1>
       <p className="text-xl text-gray-600 mb-12">Whether for distribution inquiries or general support, our team is ready.</p>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-[#F9F9F9] p-8 radius-max border border-gray-100 text-left">
             <h3 className="font-heading font-bold mb-2">Pune Headquarters</h3>
             <p className="text-gray-500 mb-4">Gera Imperium Alpha, Kharadi,<br/>Pune, Maharashtra 411014</p>
             <p className="font-bold text-[#E60000]">hq@abkimports.com</p>
          </div>
          <div className="bg-[#F9F9F9] p-8 radius-max border border-gray-100 text-left">
             <h3 className="font-heading font-bold mb-2">B2B Support</h3>
             <p className="text-gray-500 mb-4">Dedicated account management for existing retail partners.</p>
             <p className="font-bold text-[#E60000]">partners@abkimports.com</p>
          </div>
       </div>
       <button className="bg-[#111] text-white px-10 py-5 radius-max font-bold text-lg hover:bg-[#E60000] transition-colors w-full md:w-auto">Open B2B Partner Ticket</button>
    </div>
  </div>
);

const PreFooter = () => (
  <section className="py-24 bg-[#E60000] text-white text-center px-[3vw]">
    <FadeUpReveal>
      <h2 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tighter mb-6">READY TO ELEVATE?</h2>
      <p className="text-xl max-w-2xl mx-auto mb-10 text-white/90">Join India's premier import and distribution partner network today.</p>
      <Magnetic>
        <button className="bg-white text-[#E60000] px-10 py-4 radius-max font-bold text-lg hover:bg-black hover:text-white transition-colors duration-300" data-cursor="hover">
          Contact Us Today
        </button>
      </Magnetic>
    </FadeUpReveal>
  </section>
);

const Footer = ({ navigateTo }) => {
  return (
    <footer id="contact" className="bg-[#050505] text-white pt-24 pb-8 overflow-hidden">
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
    const updateMouse = (e) => { mousePos.x = e.clientX; mousePos.y = e.clientY; };
    const animate = () => {
      dotPos.x += (mousePos.x - dotPos.x) * 0.2;
      dotPos.y += (mousePos.y - dotPos.y) * 0.2;
      if (cursorDotRef.current) cursorDotRef.current.style.transform = `translate(${dotPos.x}px, ${dotPos.y}px) translate(-50%, -50%)`;
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
    switch (currentPage) {
      case 'Home':
        return (
          <div className="animate-[fadeIn_0.5s_ease-out]">
            <Hero isReady={!loading} />
            <Statistics />
            <BrandMarquee />
            <AboutUs />
            <BrandPortfolio />
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
      case 'Brand Portfolio': return <BrandPortfolioPage />;
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
        <Header onOpenMenu={() => setMenuOpen(true)} scrolled={scrolled || currentPage !== 'Home'} />
        <main>
          {renderPage()}
        </main>
        <Footer navigateTo={handleNavigate} />
      </div>
    </div>
  );
}
