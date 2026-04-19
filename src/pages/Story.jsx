import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const milestones = [
  {
    year: "2009",
    title: "The Seed",
    subtitle: "Lyon, France",
    desc: "Founded in a small Lyon atelier by master roaster Édouard Villeneuve, driven by a singular obsession — to find the world's most expressive coffees and honour them without interference.",
  },
  {
    year: "2013",
    title: "First Origin Journey",
    subtitle: "Yirgacheffe, Ethiopia",
    desc: "Édouard traveled to the Yirgacheffe highlands, forming direct relationships with smallholder farmers. The handshake agreements forged here remain the backbone of our sourcing philosophy.",
  },
  {
    year: "2016",
    title: "The Atelier Opens",
    subtitle: "Paris, 6th Arrondissement",
    desc: "Our first public roastery and tasting room opened its doors on Rue de Buci — a space designed for ritualised slow coffee, where guests could watch every roast as it happened.",
  },
  {
    year: "2019",
    title: "SCA Excellence Award",
    subtitle: "World of Coffee, Berlin",
    desc: "Three of our single-origins placed in the top five of the SCA Roaster of the Year competition, marking Maison Bean's arrival on the international specialty stage.",
  },
  {
    year: "2022",
    title: "Digital Atelier",
    subtitle: "Worldwide",
    desc: "We launched the Custom Cup Builder — an online experience allowing customers everywhere to compose their perfect drink by origin, bean, and brew method, just as they would in our Paris atelier.",
  },
  {
    year: "2024",
    title: "Maison Bean Today",
    subtitle: "34 Origins · 12 Blends",
    desc: "With sourcing partnerships across four continents and a team of dedicated sensory specialists, we continue to pursue the same singular goal: coffees that speak honestly of the land they came from.",
  },
];

const team = [
  {
    initials: "ÉV",
    name: "Édouard Villeneuve",
    role: "Founder & Head Roaster",
    philosophy: "Coffee is an argument between soil, sun, and time. My job is to stay out of the way.",
  },
  {
    initials: "SK",
    name: "Saoirse Kelly",
    role: "Director of Sourcing",
    philosophy: "Every cup traces back to a decision made in a field. I want those decisions to be fair ones.",
  },
  {
    initials: "RN",
    name: "Rémi Nakashima",
    role: "Head of Sensory",
    philosophy: "Tasting is translation. We are turning the language of the land into something you can feel.",
  },
];

const Story = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, entry.target.dataset.index]));
          }
        });
      },
      { threshold: 0.15 }
    );
    itemRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Jost:wght@100;200;300;400;500&display=swap');

        @keyframes fadeUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes lineGrow { from{transform:scaleY(0)} to{transform:scaleY(1)} }

        .page-in   { animation: fadeUp 0.5s ease forwards; }
        .panel-in  { animation: fadeUp 0.5s ease 0.1s both; }
        .panel-in2 { animation: fadeUp 0.5s ease 0.2s both; }

        .reveal { opacity:0; transform:translateY(18px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .reveal.visible { opacity:1; transform:translateY(0); }

        .timeline-line { transform-origin: top; animation: lineGrow 1.2s ease 0.4s both; }

        .quote-mark::before {
          content: '"';
          font-family: 'Cormorant Garamond', serif;
          font-size: 5rem;
          color: rgba(201,169,110,0.12);
          position: absolute;
          top: -1.5rem;
          left: -0.5rem;
          line-height: 1;
          pointer-events: none;
        }

        .press-badge {
          border: 1px solid rgba(201,169,110,0.12);
          transition: border-color 0.2s ease, color 0.2s ease;
        }
        .press-badge:hover { border-color: rgba(201,169,110,0.4); color: #c9a96e; }

        .team-card {
          border: 1px solid rgba(201,169,110,0.10);
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .team-card:hover { border-color: rgba(201,169,110,0.3); background: rgba(201,169,110,0.03); }
      `}</style>

      <div className="min-h-screen bg-[#0d0a05] font-['Jost',sans-serif] text-[#f5f0e8]">

        {/* Ambient */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute -top-20 left-1/4 w-[600px] h-[600px] rounded-full bg-[#c9a96e]/[0.018] blur-[140px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#c9a96e]/[0.012] blur-[120px]" />
        </div>

        <div className="relative z-10">
          <Navbar />

          {/* ══ HERO ══ */}
          <div className="max-w-screen-xl mx-auto px-6 lg:px-14 pt-16 pb-10 page-in">
            <p className="text-[#c9a96e] text-[10px] tracking-[0.55em] uppercase mb-4 opacity-70">
              OUR STORY
            </p>
            <h1 className="font-['Cormorant_Garamond',serif] text-[clamp(3rem,7vw,5.5rem)] font-light leading-none tracking-wide text-[#f5f0e8] max-w-2xl">
              Rooted in <span className="italic text-[#c9a96e]">Obsession.</span>
            </h1>
            <div className="mt-8 flex items-center gap-3">
              <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-[#c9a96e]/45 via-[#c9a96e]/12 to-transparent" />
              <div className="w-[5px] h-[5px] rotate-45 bg-[#c9a96e]/35 flex-shrink-0" />
            </div>
            <p className="mt-8 text-[#f5f0e8]/45 text-[14px] leading-relaxed max-w-xl font-light tracking-wide">
              Maison Bean was never about coffee as a commodity. From a small Lyon atelier to sourcing partnerships
              across four continents, every decision we have made has been guided by a single question:
              does this honour the farmer, the land, and the cup?
            </p>
          </div>

          {/* ══ PULL QUOTE ══ */}
          <div className="max-w-screen-xl mx-auto px-6 lg:px-14 py-14 panel-in">
            <div className="border-l-2 border-[#c9a96e]/35 pl-8 relative quote-mark max-w-2xl">
              <p className="font-['Cormorant_Garamond',serif] text-[clamp(1.4rem,3vw,2rem)] font-light italic text-[#f5f0e8]/75 leading-relaxed">
                We do not roast coffee. We translate the conversations between soil, altitude, and farmer into something
                you can hold in your hands.
              </p>
              <p className="mt-5 text-[#c9a96e]/60 text-[10px] tracking-[0.4em] uppercase">
                — Édouard Villeneuve, Founder
              </p>
            </div>
          </div>

          <div className="max-w-screen-xl mx-auto px-6 lg:px-14">
            <div className="h-px bg-gradient-to-r from-transparent via-[#c9a96e]/20 to-transparent" />
          </div>

          {/* ══ TIMELINE ══ */}
          <div className="max-w-screen-xl mx-auto px-6 lg:px-14 py-20">
            <div className="mb-14 panel-in2">
              <p className="text-[#c9a96e] text-[9px] tracking-[0.5em] uppercase opacity-65 mb-2">HISTORY</p>
              <h2 className="font-['Cormorant_Garamond',serif] text-[clamp(2rem,4vw,3rem)] font-light text-[#f5f0e8]">
                The <span className="italic text-[#c9a96e]">Timeline</span>
              </h2>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="hidden md:block absolute left-[88px] top-0 bottom-0 w-px bg-[#c9a96e]/12 timeline-line" />

              <div className="space-y-0">
                {milestones.map((m, i) => (
                  <div
                    key={i}
                    ref={(el) => (itemRefs.current[i] = el)}
                    data-index={i}
                    className={`reveal ${visibleItems.has(String(i)) ? "visible" : ""} flex gap-0 md:gap-12 group`}
                    style={{ transitionDelay: `${i * 0.06}s` }}
                  >
                    {/* Year */}
                    <div className="hidden md:flex flex-col items-end w-[88px] flex-shrink-0 pt-1">
                      <span className="font-['Cormorant_Garamond',serif] text-[1.1rem] font-light text-[#c9a96e]/60 group-hover:text-[#c9a96e] transition-colors">
                        {m.year}
                      </span>
                    </div>

                    {/* Dot */}
                    <div className="hidden md:flex flex-col items-center flex-shrink-0 w-0">
                      <div className="w-2 h-2 rounded-full border border-[#c9a96e]/35 bg-[#0d0a05] mt-2 group-hover:border-[#c9a96e] group-hover:bg-[#c9a96e]/20 transition-all duration-300 translate-x-[-4px]" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-12 border-b border-[#c9a96e]/06 ml-0 md:ml-8">
                      <div className="md:hidden mb-1">
                        <span className="font-['Cormorant_Garamond',serif] text-[#c9a96e]/60 text-[0.95rem]">{m.year}</span>
                      </div>
                      <p className="font-['Cormorant_Garamond',serif] text-[1.4rem] font-light text-[#f5f0e8] mb-0.5">
                        {m.title}
                      </p>
                      <p className="text-[#c9a96e]/55 text-[9px] tracking-[0.4em] uppercase mb-3">{m.subtitle}</p>
                      <p className="text-[#f5f0e8]/40 text-[13px] leading-relaxed font-light max-w-xl">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-screen-xl mx-auto px-6 lg:px-14">
            <div className="h-px bg-gradient-to-r from-transparent via-[#c9a96e]/20 to-transparent" />
          </div>

          {/* ══ TEAM ══ */}
          <div className="max-w-screen-xl mx-auto px-6 lg:px-14 py-20">
            <div className="mb-14">
              <p className="text-[#c9a96e] text-[9px] tracking-[0.5em] uppercase opacity-65 mb-2">THE PEOPLE</p>
              <h2 className="font-['Cormorant_Garamond',serif] text-[clamp(2rem,4vw,3rem)] font-light text-[#f5f0e8]">
                Meet the <span className="italic text-[#c9a96e]">Roasters</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#c9a96e]/08">
              {team.map((member, i) => (
                <div key={i} className="team-card bg-[#0d0a05] p-8">
                  {/* Avatar */}
                  <div className="w-14 h-14 border border-[#c9a96e]/25 flex items-center justify-center mb-6">
                    <span className="font-['Cormorant_Garamond',serif] text-[1.1rem] text-[#c9a96e]/70">
                      {member.initials}
                    </span>
                  </div>
                  <p className="font-['Cormorant_Garamond',serif] text-[1.2rem] font-light text-[#f5f0e8] mb-0.5">
                    {member.name}
                  </p>
                  <p className="text-[#c9a96e]/50 text-[9px] tracking-[0.4em] uppercase mb-5">{member.role}</p>
                  <div className="h-px bg-[#c9a96e]/10 mb-5" />
                  <p className="font-['Cormorant_Garamond',serif] text-[1rem] italic text-[#f5f0e8]/35 leading-relaxed">
                    "{member.philosophy}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-screen-xl mx-auto px-6 lg:px-14">
            <div className="h-px bg-gradient-to-r from-transparent via-[#c9a96e]/20 to-transparent" />
          </div>

          {/* ══ PRESS & AWARDS ══ */}
          <div className="max-w-screen-xl mx-auto px-6 lg:px-14 py-20">
            <div className="mb-12">
              <p className="text-[#c9a96e] text-[9px] tracking-[0.5em] uppercase opacity-65 mb-2">RECOGNITION</p>
              <h2 className="font-['Cormorant_Garamond',serif] text-[clamp(2rem,4vw,3rem)] font-light text-[#f5f0e8]">
                Press <span className="italic text-[#c9a96e]">&amp; Awards</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: "Le Monde", note: "Best Roastery 2023" },
                { name: "SCA", note: "Top 5 Global Roaster" },
                { name: "The Guardian", note: "Coffee of the Year" },
                { name: "Monocle", note: "Design Award 2022" },
                { name: "Sprudge", note: "Most Innovative" },
                { name: "Rainforest Alliance", note: "Certified Partner" },
                { name: "Slow Food", note: "Presidium Member" },
                { name: "Forbes", note: "30 Under 30 Food" },
              ].map((p) => (
                <div key={p.name} className="press-badge p-5 text-center cursor-default">
                  <p className="font-['Cormorant_Garamond',serif] text-[1rem] text-[#f5f0e8]/55 mb-1">{p.name}</p>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-[#c9a96e]/35">{p.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ══ FOOTER CTA ══ */}
          <div className="max-w-screen-xl mx-auto px-6 lg:px-14 pb-28">
            <div className="border border-[#c9a96e]/12 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 bg-[#110d07]">
              <div>
                <p className="font-['Cormorant_Garamond',serif] text-[clamp(1.5rem,3vw,2.2rem)] font-light text-[#f5f0e8] mb-2">
                  Taste the <span className="italic text-[#c9a96e]">Story</span>
                </p>
                <p className="text-[#f5f0e8]/35 text-[12px] tracking-wide">
                  Every cup carries fifteen years of obsessive craft.
                </p>
              </div>
              <Link
                to="/menu"
                className="flex-shrink-0 px-8 py-4 bg-[#c9a96e] text-[#0d0a05] text-[0.62rem] tracking-[0.38em] uppercase font-['Jost',sans-serif] hover:bg-[#d4b87a] transition-colors"
              >
                Explore the Menu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Story;