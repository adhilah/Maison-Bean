// import React from "react";
// // import coffeeVideo from '../assets/coffee-video1.mp4';

// const HeroSection = () => {
//   return (
//     <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
//       {/* Background */}
//       <div className="absolute inset-0 z-0">
//         {/* <video 
//           autoPlay
//           loop
//           muted
//           playsInline
//           className="w-full h-full object-cover"
//         >
//           <source src={coffeeVideo} type="video/mp4" />
//         </video> */}

//         <img
//           src="https://i.pinimg.com/736x/c6/1f/8f/c61f8f42ee089bee27de77f4a64cdbf6.jpg"
//           className="w-full h-full object-cover"
//           alt="Coffee background"
//         />
//         <div className="absolute inset-0 bg-black/50"></div>
//       </div>

//       {/* Content */}
//       <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
//         {/* Logo / Brand */}
//         <div className="mb-6 sm:mb-8">
//           <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-2">
//             Maison <span className="text-[#6c5225]">Bean</span>
//           </h1>
//           <p className="text-base sm:text-lg md:text-xl text-amber-100">
//             Artisanal Coffee Experience
//           </p>
//         </div>

//         {/* Main Message */}
//         <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
//           Premium Custom Creations
//         </h2>

//         {/* Description */}
//         <p className="text-sm sm:text-base md:text-lg text-amber-100 mb-8 sm:mb-10 max-w-2xl mx-auto">
//           Create your perfect drink with our interactive builder.
//           Customize every detail to match your taste and preferences.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;
import React, { useEffect, useRef, useState } from "react";

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const ringPos = useRef({ x: -200, y: -200 });
  const mousePos = useRef({ x: -200, y: -200 });
  const rafRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setCursorVisible(true);
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = e.clientX + "px";
        cursorDotRef.current.style.top = e.clientY + "px";
      }
    };
    const animate = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.08;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.08;
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = ringPos.current.x + "px";
        cursorRingRef.current.style.top = ringPos.current.y + "px";
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    window.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const parallaxY = scrollY * 0.35;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');

        body { cursor: none; overflow-x: hidden; }

        .mb-cursor-dot {
          position: fixed;
          width: 5px; height: 5px;
          background: #c9a96e;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: opacity 0.2s;
        }
        .mb-cursor-ring {
          position: fixed;
          width: 32px; height: 32px;
          border: 1px solid rgba(201,169,110,0.45);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
        }

        @keyframes mb-pan {
          0%, 100% { transform: scale(1.1) translateX(0) translateY(0); }
          33% { transform: scale(1.1) translateX(-1.2%) translateY(-0.6%); }
          66% { transform: scale(1.1) translateX(0.8%) translateY(-1%); }
        }

        @keyframes mb-fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes mb-fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes mb-lineGrow {
          from { transform: scaleX(0); transform-origin: left; }
          to { transform: scaleX(1); transform-origin: left; }
        }

        @keyframes mb-steam {
          0% { opacity: 0; transform: translateY(0) scaleX(1); }
          40% { opacity: 0.6; }
          100% { opacity: 0; transform: translateY(-36px) scaleX(2.2); }
        }

        .mb-h-eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 0.55rem;
          font-weight: 200;
          letter-spacing: 0.55em;
          text-transform: uppercase;
          color: #c9a96e;
          margin: 0 0 1.5rem;
          animation: mb-fadeIn 1.2s ease 0.3s both;
        }

        .mb-h-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(4rem, 7vw, 7.5rem);
          font-weight: 300;
          line-height: 0.9;
          color: #f5f0e8;
          margin: 0 0 2rem;
          animation: mb-fadeUp 1.1s ease 0.5s both;
        }

        .mb-h-title em {
          font-style: italic;
          color: #c9a96e;
        }

        .mb-h-divider {
          width: 80px;
          height: 1px;
          background: linear-gradient(to right, #c9a96e, rgba(201,169,110,0.1));
          margin-bottom: 2rem;
          animation: mb-lineGrow 1s ease 0.9s both;
        }

        .mb-h-desc {
          font-family: 'Jost', sans-serif;
          font-size: 0.78rem;
          font-weight: 200;
          line-height: 2;
          letter-spacing: 0.03em;
          color: rgba(245,240,232,0.45);
          max-width: 340px;
          margin: 0 0 3rem;
          animation: mb-fadeUp 1.1s ease 0.7s both;
        }

        .mb-h-ctas {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          animation: mb-fadeUp 1.1s ease 0.9s both;
        }

        .mb-btn-primary {
          font-family: 'Jost', sans-serif;
          font-size: 0.6rem;
          font-weight: 300;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #0d0a05;
          background: #c9a96e;
          padding: 1rem 2.2rem;
          text-decoration: none;
          display: inline-block;
          transition: background 0.3s, letter-spacing 0.3s;
        }
        .mb-btn-primary:hover {
          background: #d4b87a;
          letter-spacing: 0.38em;
        }

        .mb-btn-ghost {
          font-family: 'Jost', sans-serif;
          font-size: 0.6rem;
          font-weight: 300;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.5);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: color 0.3s;
        }
        .mb-btn-ghost::after {
          content: '';
          display: block;
          width: 24px;
          height: 1px;
          background: currentColor;
          transition: width 0.3s;
        }
        .mb-btn-ghost:hover {
          color: #c9a96e;
        }
        .mb-btn-ghost:hover::after {
          width: 36px;
        }

        .mb-stats-bar {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          z-index: 10;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0;
          animation: mb-fadeIn 1.4s ease 1.2s both;
        }

        .mb-stat-item {
          padding: 1.4rem 4rem;
          text-align: center;
          border-right: 1px solid rgba(201,169,110,0.1);
          position: relative;
        }
        .mb-stat-item:last-child { border-right: none; }

        .mb-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          font-weight: 300;
          color: #c9a96e;
          line-height: 1;
          margin-bottom: 0.3rem;
        }

        .mb-stat-label {
          font-family: 'Jost', sans-serif;
          font-size: 0.5rem;
          font-weight: 200;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.3);
        }

        /* Right editorial panel */
        .mb-right-panel {
          position: absolute;
          right: 4rem;
          bottom: 8rem;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1rem;
          animation: mb-fadeIn 1.4s ease 1.1s both;
        }

        .mb-vertical-text {
          font-family: 'Jost', sans-serif;
          font-size: 0.5rem;
          font-weight: 200;
          letter-spacing: 0.45em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.2);
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }

        .mb-scroll-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .mb-scroll-line {
          width: 1px;
          height: 48px;
          background: linear-gradient(to bottom, transparent, rgba(201,169,110,0.5));
          animation: mb-fadeIn 1s ease 1.5s both;
        }
      `}</style>

      {/* Custom Cursor */}
      <div ref={cursorDotRef} className="mb-cursor-dot" style={{ opacity: cursorVisible ? 1 : 0 }} />
      <div ref={cursorRingRef} className="mb-cursor-ring" style={{ opacity: cursorVisible ? 1 : 0 }} />

      {/* HERO */}
      <section style={{
        position: "relative",
        height: "100vh",
        minHeight: "680px",
        overflow: "hidden",
        fontFamily: "'Jost', sans-serif",
      }}>

        {/* Background with parallax */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img
            src="https://i.pinimg.com/736x/c6/1f/8f/c61f8f42ee089bee27de77f4a64cdbf6.jpg"
            alt=""
            aria-hidden
            style={{
              width: "100%",
              height: "115%",
              objectFit: "cover",
              objectPosition: "center 30%",
              transform: `translateY(${parallaxY}px)`,
              animation: "mb-pan 22s ease-in-out infinite",
            }}
          />
          {/* Layered overlays for depth */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(105deg, rgba(8,5,2,0.85) 0%, rgba(8,5,2,0.55) 50%, rgba(8,5,2,0.3) 100%)",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(8,5,2,1) 0%, transparent 40%)",
          }} />
          {/* Subtle warm vignette on left */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 0% 60%, rgba(201,169,110,0.06) 0%, transparent 60%)",
          }} />
        </div>

        {/* Main content */}
        <div style={{
          position: "relative",
          zIndex: 10,
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 4.5rem",
          paddingBottom: "6rem",
        }}>
          <div style={{ maxWidth: "560px" }}>
            <p className="mb-h-eyebrow">Specialty Coffee Atelier</p>
            <h1 className="mb-h-title">
              Premium<br />
              <em>Custom</em><br />
              Creations.
            </h1>
            <div className="mb-h-divider" />
            <p className="mb-h-desc">
              Build your perfect drink with our interactive creator. Every detail crafted to honor your taste — from origin to cup.
            </p>
            <div className="mb-h-ctas">
              <a href="#builder" className="mb-btn-primary">Build Your Cup</a>
              <a href="/menu" className="mb-btn-ghost">View Menu</a>
            </div>
          </div>
        </div>

        {/* Right side vertical decorative */}
        <div className="mb-right-panel">
          <span className="mb-vertical-text">Single Origin · Specialty Grade</span>
          <div className="mb-scroll-indicator">
            <div className="mb-scroll-line" />
          </div>
        </div>

        {/* Stats bar */}
        <div className="mb-stats-bar" style={{
          borderTop: "1px solid rgba(201,169,110,0.1)",
          background: "linear-gradient(to top, rgba(8,5,2,0.9), rgba(8,5,2,0.6))",
          backdropFilter: "blur(12px)",
        }}>
          {[
            { num: "34+", label: "Origins" },
            { num: "100%", label: "Arabica" },
            { num: "12", label: "Signature Blends" },
            { num: "7", label: "Brew Methods" },
          ].map(({ num, label }) => (
            <div className="mb-stat-item" key={label}>
              <p className="mb-stat-num">{num}</p>
              <p className="mb-stat-label">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HeroSection;