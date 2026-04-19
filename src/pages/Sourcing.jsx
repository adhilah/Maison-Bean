import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const origins = [
  {
    code: "ET",
    country: "Ethiopia",
    region: "Yirgacheffe",
    altitude: "1,800 – 2,200m",
    process: "Washed & Natural",
    harvest: "Oct – Jan",
    flavor: ["Jasmine", "Bergamot", "Peach"],
    story:
      "Our oldest sourcing relationship — fifteen years of trust with the Kochere cooperative. The volcanic red clay here produces coffees with an almost supernatural florality that we rarely intervene with.",
    since: "2009",
  },
  {
    code: "CO",
    country: "Colombia",
    region: "Huila",
    altitude: "1,600 – 2,000m",
    process: "Honey & Washed",
    harvest: "Apr – Jun · Oct – Dec",
    flavor: ["Dark Chocolate", "Tamarind", "Brown Sugar"],
    story:
      "The Páez indigenous community of Huila have been farming coffee for six generations. We pay 40% above Fair Trade minimums and co-fund a local processing station they operate independently.",
    since: "2013",
  },
  {
    code: "JP",
    country: "Japan",
    region: "Kagoshima",
    altitude: "200 – 600m",
    process: "Anaerobic Natural",
    harvest: "Aug – Oct",
    flavor: ["Umami", "Tropical Fruit", "Green Tea"],
    story:
      "One of the world's rarest growing regions. Hideo Tanaka farms just 1.2 hectares on volcanic soil near Sakurajima. His meticulous anaerobic fermentation produces coffees unlike anything else we carry.",
    since: "2021",
  },
  {
    code: "GT",
    country: "Guatemala",
    region: "Antigua",
    altitude: "1,500 – 1,700m",
    process: "Fully Washed",
    harvest: "Jan – Mar",
    flavor: ["Molasses", "Dried Apricot", "Walnut"],
    story:
      "Surrounded by three volcanoes, the Antigua valley offers some of the most stable microclimates in Central America. We work with seven small-plot farmers who share a single wet mill.",
    since: "2016",
  },
  {
    code: "KE",
    country: "Kenya",
    region: "Kirinyaga",
    altitude: "1,700 – 2,100m",
    process: "Double Washed (AA)",
    harvest: "Nov – Jan",
    flavor: ["Blackcurrant", "Tomato", "Citrus Zest"],
    story:
      "Kenya AA from Kirinyaga is not subtle — it announces itself. The double-washing protocol at the Baragwi factory produces a clarity and brightness we find irresistible every single harvest.",
    since: "2018",
  },
  {
    code: "ID",
    country: "Indonesia",
    region: "Sumatra",
    altitude: "1,200 – 1,500m",
    process: "Wet-Hulled (Giling Basah)",
    harvest: "May – Sep",
    flavor: ["Cedar", "Dark Earth", "Tobacco"],
    story:
      "Sumatra's unique giling basah process produces the lowest-acid, heaviest-body coffees in our portfolio. For espresso blends that need gravitas and structure, there is simply no substitute.",
    since: "2017",
  },
];

const metrics = [
  { value: "34+", label: "Origin Partners", sub: "Across 4 continents" },
  { value: "100%", label: "Arabica", sub: "No compromises" },
  { value: "40%", label: "Above Fair Trade", sub: "Our minimum premium" },
  { value: "6", label: "Direct Farms", sub: "Full-transparency sourcing" },
];

const Sourcing = () => {
  const [activeOrigin, setActiveOrigin] = useState(0);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVisibleItems((p) => new Set([...p, e.target.dataset.index]));
        });
      },
      { threshold: 0.1 }
    );
    cardRefs.current.forEach((r) => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  const origin = origins[activeOrigin];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Jost:wght@100;200;300;400;500&display=swap');

        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .page-in  { animation: fadeUp 0.5s ease forwards; }
        .panel-in { animation: fadeUp 0.5s ease 0.1s both; }

        .reveal { opacity:0; transform:translateY(14px); transition: opacity 0.55s ease, transform 0.55s ease; }
        .reveal.visible { opacity:1; transform:translateY(0); }

        .origin-tab {
          border: 1px solid rgba(201,169,110,0.10);
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .origin-tab:hover { border-color: rgba(201,169,110,0.3); }
        .origin-tab.active {
          border-color: rgba(201,169,110,0.5);
          background: rgba(201,169,110,0.05);
        }

        .flavor-pill {
          border: 1px solid rgba(201,169,110,0.18);
          transition: border-color 0.2s ease;
        }
        .flavor-pill:hover { border-color: rgba(201,169,110,0.45); }

        .metric-card {
          border: 1px solid rgba(201,169,110,0.10);
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .metric-card:hover {
          border-color: rgba(201,169,110,0.3);
          background: rgba(201,169,110,0.03);
        }

        .detail-panel { animation: fadeUp 0.3s ease forwards; }

        .harvest-bar {
          height: 2px;
          background: linear-gradient(90deg, rgba(201,169,110,0) 0%, rgba(201,169,110,0.6) 40%, rgba(201,169,110,0.6) 80%, rgba(201,169,110,0) 100%);
        }
      `}</style>

      <div className="min-h-screen bg-[#0d0a05] font-['Jost',sans-serif] text-[#f5f0e8]">

        {/* Ambient */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#c9a96e]/[0.018] blur-[140px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#c9a96e]/[0.012] blur-[120px]" />
        </div>

        <div className="relative z-10">
          <Navbar />

          {/* ══ HERO ══ */}
          <div className="max-w-screen-xl mx-auto px-6 lg:px-14 pt-16 pb-10 page-in">
            <p className="text-[#c9a96e] text-[10px] tracking-[0.55em] uppercase mb-4 opacity-70">SOURCING</p>
            <h1 className="font-['Cormorant_Garamond',serif] text-[clamp(3rem,7vw,5.5rem)] font-light leading-none tracking-wide text-[#f5f0e8] max-w-2xl">
              From <span className="italic text-[#c9a96e]">Field</span> to Cup.
            </h1>
            <div className="mt-8 flex items-center gap-3">
              <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-[#c9a96e]/45 via-[#c9a96e]/12 to-transparent" />
              <div className="w-[5px] h-[5px] rotate-45 bg-[#c9a96e]/35 flex-shrink-0" />
            </div>
            <p className="mt-8 text-[#f5f0e8]/45 text-[14px] leading-relaxed max-w-xl font-light tracking-wide">
              We never buy coffee through intermediaries. Every origin in our portfolio begins with a handshake —
              between us and the farmers who grow it. Transparency is not a marketing position. It is the only
              way we know how to work.
            </p>
          </div>

          {/* ══ METRICS ══ */}
          <div className="max-w-screen-xl mx-auto px-6 lg:px-14 pb-16 panel-in">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#c9a96e]/08">
              {metrics.map((m) => (
                <div key={m.label} className="metric-card bg-[#0d0a05] p-7">
                  <p className="font-['Cormorant_Garamond',serif] text-[2.4rem] font-light text-[#c9a96e] leading-none mb-1">
                    {m.value}
                  </p>
                  <p className="text-[#f5f0e8]/60 text-[11px] tracking-[0.25em] uppercase mb-0.5">{m.label}</p>
                  <p className="text-[#f5f0e8]/25 text-[10px]">{m.sub}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-screen-xl mx-auto px-6 lg:px-14">
            <div className="h-px bg-gradient-to-r from-transparent via-[#c9a96e]/20 to-transparent" />
          </div>

          {/* ══ ORIGIN EXPLORER ══ */}
          <div className="max-w-screen-xl mx-auto px-6 lg:px-14 py-20">
            <div className="mb-12">
              <p className="text-[#c9a96e] text-[9px] tracking-[0.5em] uppercase opacity-65 mb-2">ORIGIN MAP</p>
              <h2 className="font-['Cormorant_Garamond',serif] text-[clamp(2rem,4vw,3rem)] font-light text-[#f5f0e8]">
                Our <span className="italic text-[#c9a96e]">Origins</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-px bg-[#c9a96e]/08">

              {/* Origin tabs */}
              <div className="bg-[#0d0a05] space-y-px">
                {origins.map((o, i) => (
                  <div
                    key={i}
                    className={`origin-tab p-5 ${activeOrigin === i ? "active" : "bg-[#0d0a05]"}`}
                    onClick={() => setActiveOrigin(i)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-['Cormorant_Garamond',serif] text-[1.05rem] font-light text-[#f5f0e8]/80">
                          {o.country}
                        </p>
                        <p className="text-[#c9a96e]/45 text-[9px] tracking-[0.3em] uppercase">{o.region}</p>
                      </div>
                      <span className="text-[#f5f0e8]/20 text-[10px] font-light">{o.code}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Detail panel */}
              <div key={activeOrigin} className="detail-panel bg-[#110d07] p-8 lg:p-10">

                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <p className="text-[#c9a96e]/55 text-[9px] tracking-[0.45em] uppercase mb-1">
                      Partner Since {origin.since}
                    </p>
                    <h3 className="font-['Cormorant_Garamond',serif] text-[2rem] font-light text-[#f5f0e8]">
                      {origin.country}
                    </h3>
                    <p className="font-['Cormorant_Garamond',serif] text-[1.1rem] italic text-[#c9a96e]/65">
                      {origin.region}
                    </p>
                  </div>
                  <div className="w-14 h-14 border border-[#c9a96e]/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-['Cormorant_Garamond',serif] text-[1.3rem] text-[#c9a96e]/50">{origin.code}</span>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-px bg-[#c9a96e]/08 mb-8">
                  {[
                    { label: "Altitude", value: origin.altitude },
                    { label: "Process", value: origin.process },
                    { label: "Harvest", value: origin.harvest },
                  ].map((s) => (
                    <div key={s.label} className="bg-[#110d07] p-4">
                      <p className="text-[#c9a96e]/40 text-[8px] tracking-[0.4em] uppercase mb-1.5">{s.label}</p>
                      <p className="font-['Cormorant_Garamond',serif] text-[0.95rem] text-[#f5f0e8]/70">{s.value}</p>
                    </div>
                  ))}
                </div>

                {/* Harvest bar */}
                <div className="harvest-bar mb-8 rounded" />

                {/* Tasting notes */}
                <div className="mb-8">
                  <p className="text-[#c9a96e]/40 text-[8px] tracking-[0.4em] uppercase mb-3">TASTING NOTES</p>
                  <div className="flex flex-wrap gap-2">
                    {origin.flavor.map((f) => (
                      <span key={f} className="flavor-pill px-4 py-1.5 text-[#f5f0e8]/55 text-[11px] tracking-wide">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-[#c9a96e]/10 mb-6" />

                {/* Story */}
                <p className="text-[#f5f0e8]/40 text-[13px] leading-relaxed font-light">{origin.story}</p>
              </div>
            </div>
          </div>

          <div className="max-w-screen-xl mx-auto px-6 lg:px-14">
            <div className="h-px bg-gradient-to-r from-transparent via-[#c9a96e]/20 to-transparent" />
          </div>

          {/* ══ SUSTAINABILITY ══ */}
          <div className="max-w-screen-xl mx-auto px-6 lg:px-14 py-20">
            <div className="mb-12">
              <p className="text-[#c9a96e] text-[9px] tracking-[0.5em] uppercase opacity-65 mb-2">RESPONSIBILITY</p>
              <h2 className="font-['Cormorant_Garamond',serif] text-[clamp(2rem,4vw,3rem)] font-light text-[#f5f0e8]">
                Our <span className="italic text-[#c9a96e]">Commitments</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#c9a96e]/08">
              {[
                {
                  title: "Farmer First Pricing",
                  body: "We set prices before the harvest, not after. Farmers know their income before they plant. This stability is the foundation of quality.",
                  stat: "40%+ above FT minimum",
                },
                {
                  title: "Carbon Conscious Shipping",
                  body: "All ocean freight is offset through verified reforestation projects in the countries we source from — keeping investment in origin communities.",
                  stat: "100% offset since 2020",
                },
                {
                  title: "Processing Infrastructure",
                  body: "We co-invest in wet mills and drying stations that farmer cooperatives own and operate. Better equipment means better coffee for everyone.",
                  stat: "6 mills co-funded",
                },
              ].map((c, i) => (
                <div
                  key={i}
                  ref={(el) => (cardRefs.current[i + 10] = el)}
                  data-index={i + 10}
                  className={`reveal ${visibleItems.has(String(i + 10)) ? "visible" : ""} bg-[#0d0a05] p-8`}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <p className="font-['Cormorant_Garamond',serif] text-[1.2rem] font-light text-[#f5f0e8] mb-3">{c.title}</p>
                  <p className="text-[#f5f0e8]/38 text-[13px] leading-relaxed mb-6">{c.body}</p>
                  <div className="h-px bg-[#c9a96e]/12 mb-4" />
                  <p className="text-[#c9a96e]/65 text-[10px] tracking-[0.3em] uppercase">{c.stat}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ══ FOOTER CTA ══ */}
          <div className="max-w-screen-xl mx-auto px-6 lg:px-14 pb-28">
            <div className="border border-[#c9a96e]/12 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 bg-[#110d07]">
              <div>
                <p className="font-['Cormorant_Garamond',serif] text-[clamp(1.5rem,3vw,2.2rem)] font-light text-[#f5f0e8] mb-2">
                  Choose Your <span className="italic text-[#c9a96e]">Origin</span>
                </p>
                <p className="text-[#f5f0e8]/35 text-[12px] tracking-wide">
                  Every coffee in our menu carries a full origin story.
                </p>
              </div>
              <Link
                to="/menu"
                className="flex-shrink-0 px-8 py-4 bg-[#c9a96e] text-[#0d0a05] text-[0.62rem] tracking-[0.38em] uppercase font-['Jost',sans-serif] hover:bg-[#d4b87a] transition-colors"
              >
                Shop by Origin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sourcing;