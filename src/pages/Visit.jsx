import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const locations = [
  {
    id: "paris",
    city: "Paris",
    subtitle: "Flagship Atelier",
    address: "14 Rue de Buci, 75006",
    district: "Saint-Germain-des-Prés",
    hours: { weekdays: "7:00 – 20:00", weekend: "8:00 – 21:00" },
    phone: "+33 1 45 67 89 01",
    features: ["Roastery Viewing", "Cupping Bar", "Retail Shop", "Private Events"],
    mapEmbed: "https://maps.google.com/?q=14+Rue+de+Buci+Paris",
  },
  {
    id: "lyon",
    city: "Lyon",
    subtitle: "Original Roastery",
    address: "8 Place des Jacobins, 69002",
    district: "Presqu'île",
    hours: { weekdays: "7:30 – 19:00", weekend: "8:00 – 19:30" },
    phone: "+33 4 72 45 67 89",
    features: ["Roasting Classes", "Espresso Bar", "Bean Selection"],
    mapEmbed: "https://maps.google.com/?q=8+Place+des+Jacobins+Lyon",
  },
  {
    id: "tokyo",
    city: "Tokyo",
    subtitle: "Asian Outpost",
    address: "3-12-6 Minami-Aoyama, Minato",
    district: "Aoyama",
    hours: { weekdays: "8:00 – 20:00", weekend: "9:00 – 21:00" },
    phone: "+81 3 5468 9012",
    features: ["Pour-Over Studio", "Seasonal Menu", "Omakase Service"],
    mapEmbed: "https://maps.google.com/?q=Minami-Aoyama+Tokyo",
  },
];

const events = [
  {
    date: { day: "14", month: "May" },
    title: "Origins Cupping",
    subtitle: "Guided tasting — Ethiopia vs Colombia",
    location: "Paris Atelier",
    spots: "8 spots left",
    type: "TASTING",
  },
  {
    date: { day: "21", month: "May" },
    title: "Barista Fundamentals",
    subtitle: "Half-day espresso & milk technique",
    location: "Lyon Roastery",
    spots: "4 spots left",
    type: "CLASS",
  },
  {
    date: { day: "28", month: "May" },
    title: "Harvest Season Evening",
    subtitle: "New Kenya AA release — wine-format tasting",
    location: "Paris Atelier",
    spots: "12 spots left",
    type: "TASTING",
  },
  {
    date: { day: "04", month: "Jun" },
    title: "Roastery Open Day",
    subtitle: "Watch a live roast, ask everything",
    location: "Lyon Roastery",
    spots: "Free entry",
    type: "OPEN DAY",
  },
  {
    date: { day: "11", month: "Jun" },
    title: "Omakase Coffee",
    subtitle: "Six-course coffee journey by our head roaster",
    location: "Tokyo Aoyama",
    spots: "6 spots left",
    type: "OMAKASE",
  },
];

const Visit = () => {
  const [activeLocation, setActiveLocation] = useState("paris");
  const [bookingStep, setBookingStep] = useState(null); // null | "form" | "confirmed"
  const [bookingEvent, setBookingEvent] = useState(null);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestCount, setGuestCount] = useState("1");
  const [errors, setErrors] = useState({});

  const loc = locations.find((l) => l.id === activeLocation);

  const handleBooking = (event) => {
    setBookingEvent(event);
    setBookingStep("form");
    setGuestName("");
    setGuestEmail("");
    setGuestCount("1");
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validateBooking = () => {
    const err = {};
    if (!guestName.trim())         err.name  = "Name is required";
    if (!/\S+@\S+\.\S+/.test(guestEmail)) err.email = "Valid email required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleConfirm = () => {
    if (!validateBooking()) return;
    setBookingStep("confirmed");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Jost:wght@100;200;300;400;500&display=swap');

        @keyframes fadeUp   { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scaleIn  { from{opacity:0;transform:scale(0.96)} to{opacity:1;transform:scale(1)} }

        .page-in  { animation: fadeUp  0.5s ease forwards; }
        .panel-in { animation: fadeUp  0.5s ease 0.1s both; }
        .modal-in { animation: scaleIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards; }

        .loc-tab {
          border-bottom: 1px solid rgba(201,169,110,0.08);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .loc-tab:hover { background: rgba(201,169,110,0.03); }
        .loc-tab.active { background: rgba(201,169,110,0.05); border-bottom-color: rgba(201,169,110,0.3); }

        .event-row {
          border: 1px solid rgba(201,169,110,0.08);
          transition: border-color 0.25s ease, background 0.25s ease;
        }
        .event-row:hover { border-color: rgba(201,169,110,0.28); background: rgba(201,169,110,0.025); }

        .feature-tag {
          border: 1px solid rgba(201,169,110,0.14);
        }

        .gold-btn { transition: background 0.22s ease, transform 0.15s ease; }
        .gold-btn:hover:not(:disabled) { background: #d4b87a; }
        .gold-btn:active:not(:disabled) { transform: scale(0.98); }

        .ghost-btn { transition: all 0.2s ease; }
        .ghost-btn:hover { border-color: rgba(201,169,110,0.45); color: #c9a96e; }

        input:-webkit-autofill, input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px #0d0a05 inset !important;
          -webkit-text-fill-color: #f5f0e8 !important;
        }
      `}</style>

      <div className="min-h-screen bg-[#0d0a05] font-['Jost',sans-serif] text-[#f5f0e8]">

        {/* Ambient */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-[#c9a96e]/[0.018] blur-[140px]" />
          <div className="absolute bottom-0 right-0 w-[380px] h-[380px] rounded-full bg-[#c9a96e]/[0.012] blur-[110px]" />
        </div>

        {/* ── BOOKING OVERLAY ── */}
        {bookingStep && (
          <div className="fixed inset-0 z-50 bg-[#0d0a05]/90 backdrop-blur-sm flex items-center justify-center p-6">
            <div className="modal-in w-full max-w-md bg-[#110d07] border border-[#c9a96e]/20">

              {bookingStep === "confirmed" ? (
                <div className="p-10 text-center">
                  {/* Check icon */}
                  <div className="w-14 h-14 border border-[#4ade80]/30 flex items-center justify-center mx-auto mb-6">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="font-['Cormorant_Garamond',serif] text-[1.8rem] font-light text-[#f5f0e8] mb-2">
                    Reservation <span className="italic text-[#c9a96e]">Confirmed</span>
                  </p>
                  <p className="text-[#f5f0e8]/40 text-[12px] mb-2">{bookingEvent?.title}</p>
                  <p className="text-[#f5f0e8]/25 text-[11px] tracking-wide mb-8">
                    A confirmation has been sent to {guestEmail}
                  </p>
                  <button
                    onClick={() => { setBookingStep(null); setBookingEvent(null); }}
                    className="gold-btn px-8 py-3 bg-[#c9a96e] text-[#0d0a05] text-[0.6rem] tracking-[0.4em] uppercase"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-7">
                    <div>
                      <p className="text-[#c9a96e] text-[9px] tracking-[0.45em] uppercase opacity-65 mb-1">RSVP</p>
                      <h3 className="font-['Cormorant_Garamond',serif] text-[1.4rem] font-light text-[#f5f0e8]">
                        {bookingEvent?.title}
                      </h3>
                      <p className="text-[#f5f0e8]/35 text-[11px] mt-0.5">{bookingEvent?.location} · {bookingEvent?.date.day} {bookingEvent?.date.month}</p>
                    </div>
                    <button
                      onClick={() => setBookingStep(null)}
                      className="text-[#f5f0e8]/25 hover:text-[#f5f0e8]/60 transition-colors text-xl leading-none mt-1"
                    >
                      ×
                    </button>
                  </div>

                  <div className="space-y-5">
                    {/* Name */}
                    <div>
                      <label className="text-[#f5f0e8]/40 text-[10px] tracking-[0.35em] uppercase block mb-1.5">Full Name</label>
                      <input
                        type="text"
                        value={guestName}
                        onChange={(e) => { setGuestName(e.target.value); if (errors.name) setErrors({ ...errors, name: "" }); }}
                        placeholder="Your name"
                        className={`w-full bg-[#0d0a05] px-4 py-3 border ${errors.name ? "border-[#f87171]/50" : "border-[#c9a96e]/18"} hover:border-[#c9a96e]/35 focus:border-[#c9a96e]/55 focus:outline-none text-[#f5f0e8] text-[13px] placeholder:text-[#f5f0e8]/18 transition-all`}
                      />
                      {errors.name && <p className="text-[#f87171]/75 text-[10px] tracking-[0.2em] mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-[#f5f0e8]/40 text-[10px] tracking-[0.35em] uppercase block mb-1.5">Email Address</label>
                      <input
                        type="email"
                        value={guestEmail}
                        onChange={(e) => { setGuestEmail(e.target.value); if (errors.email) setErrors({ ...errors, email: "" }); }}
                        placeholder="you@email.com"
                        className={`w-full bg-[#0d0a05] px-4 py-3 border ${errors.email ? "border-[#f87171]/50" : "border-[#c9a96e]/18"} hover:border-[#c9a96e]/35 focus:border-[#c9a96e]/55 focus:outline-none text-[#f5f0e8] text-[13px] placeholder:text-[#f5f0e8]/18 transition-all`}
                      />
                      {errors.email && <p className="text-[#f87171]/75 text-[10px] tracking-[0.2em] mt-1">{errors.email}</p>}
                    </div>

                    {/* Guests */}
                    <div>
                      <label className="text-[#f5f0e8]/40 text-[10px] tracking-[0.35em] uppercase block mb-1.5">Number of Guests</label>
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        className="w-full bg-[#0d0a05] px-4 py-3 border border-[#c9a96e]/18 hover:border-[#c9a96e]/35 focus:outline-none text-[#f5f0e8] text-[13px] transition-all appearance-none"
                      >
                        {["1","2","3","4"].map((n) => (
                          <option key={n} value={n} style={{ background: "#0d0a05" }}>{n} {n === "1" ? "Guest" : "Guests"}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleConfirm}
                    className="gold-btn w-full mt-8 py-4 bg-[#c9a96e] text-[#0d0a05] text-[0.62rem] tracking-[0.38em] uppercase"
                  >
                    Confirm Reservation
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="relative z-10">
          <Navbar />

          {/* ══ HERO ══ */}
          <div className="max-w-screen-xl mx-auto px-6 lg:px-14 pt-16 pb-10 page-in">
            <p className="text-[#c9a96e] text-[10px] tracking-[0.55em] uppercase mb-4 opacity-70">VISIT</p>
            <h1 className="font-['Cormorant_Garamond',serif] text-[clamp(3rem,7vw,5.5rem)] font-light leading-none tracking-wide text-[#f5f0e8] max-w-2xl">
              Come <span className="italic text-[#c9a96e]">Find Us.</span>
            </h1>
            <div className="mt-8 flex items-center gap-3">
              <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-[#c9a96e]/45 via-[#c9a96e]/12 to-transparent" />
              <div className="w-[5px] h-[5px] rotate-45 bg-[#c9a96e]/35 flex-shrink-0" />
            </div>
            <p className="mt-8 text-[#f5f0e8]/45 text-[14px] leading-relaxed max-w-xl font-light tracking-wide">
              Coffee is best understood in person. Visit one of our ateliers for cupping sessions, barista classes,
              and the kind of unhurried conversation about beans that is difficult to have anywhere else.
            </p>
          </div>

          {/* ══ LOCATIONS ══ */}
          <div className="max-w-screen-xl mx-auto px-6 lg:px-14 pb-16 panel-in">
            <div className="mb-10">
              <p className="text-[#c9a96e] text-[9px] tracking-[0.5em] uppercase opacity-65 mb-2">OUR ATELIERS</p>
              <h2 className="font-['Cormorant_Garamond',serif] text-[clamp(2rem,4vw,3rem)] font-light text-[#f5f0e8]">
                Find a <span className="italic text-[#c9a96e]">Location</span>
              </h2>
            </div>

            {/* Location Tabs */}
            <div className="flex gap-0 mb-0 border-b border-[#c9a96e]/08">
              {locations.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setActiveLocation(l.id)}
                  className={`loc-tab px-7 py-4 text-left ${activeLocation === l.id ? "active" : ""}`}
                >
                  <p className={`font-['Cormorant_Garamond',serif] text-[1rem] font-light transition-colors ${activeLocation === l.id ? "text-[#c9a96e]" : "text-[#f5f0e8]/50"}`}>
                    {l.city}
                  </p>
                  <p className="text-[#f5f0e8]/22 text-[8px] tracking-[0.3em] uppercase hidden md:block">{l.subtitle}</p>
                </button>
              ))}
            </div>

            {/* Location Detail */}
            <div key={activeLocation} className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-px bg-[#c9a96e]/08" style={{ animation: "fadeUp 0.3s ease forwards" }}>

              {/* Info */}
              <div className="bg-[#110d07] p-8 lg:p-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                  <div>
                    <p className="font-['Cormorant_Garamond',serif] text-[2rem] font-light text-[#f5f0e8] mb-0.5">{loc.city}</p>
                    <p className="font-['Cormorant_Garamond',serif] italic text-[#c9a96e]/60 text-[1.1rem]">{loc.subtitle}</p>
                  </div>
                  <a
                    href={loc.mapEmbed}
                    target="_blank"
                    rel="noreferrer"
                    className="ghost-btn flex-shrink-0 border border-[#c9a96e]/20 px-5 py-2.5 text-[#f5f0e8]/45 text-[9px] tracking-[0.4em] uppercase self-start"
                  >
                    Open in Maps →
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <p className="text-[#c9a96e]/40 text-[8px] tracking-[0.4em] uppercase mb-2">ADDRESS</p>
                    <p className="font-['Cormorant_Garamond',serif] text-[1rem] text-[#f5f0e8]/70">{loc.address}</p>
                    <p className="text-[#f5f0e8]/30 text-[11px] mt-0.5">{loc.district}</p>
                  </div>
                  <div>
                    <p className="text-[#c9a96e]/40 text-[8px] tracking-[0.4em] uppercase mb-2">CONTACT</p>
                    <p className="font-['Cormorant_Garamond',serif] text-[1rem] text-[#f5f0e8]/70">{loc.phone}</p>
                  </div>
                  <div>
                    <p className="text-[#c9a96e]/40 text-[8px] tracking-[0.4em] uppercase mb-2">WEEKDAYS</p>
                    <p className="font-['Cormorant_Garamond',serif] text-[1rem] text-[#f5f0e8]/70">{loc.hours.weekdays}</p>
                  </div>
                  <div>
                    <p className="text-[#c9a96e]/40 text-[8px] tracking-[0.4em] uppercase mb-2">WEEKENDS</p>
                    <p className="font-['Cormorant_Garamond',serif] text-[1rem] text-[#f5f0e8]/70">{loc.hours.weekend}</p>
                  </div>
                </div>

                <div className="h-px bg-[#c9a96e]/10 mb-6" />

                <div>
                  <p className="text-[#c9a96e]/40 text-[8px] tracking-[0.4em] uppercase mb-3">FEATURES</p>
                  <div className="flex flex-wrap gap-2">
                    {loc.features.map((f) => (
                      <span key={f} className="feature-tag px-4 py-1.5 text-[#f5f0e8]/45 text-[10px] tracking-wide">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-[#0d0a05] relative overflow-hidden min-h-[260px] flex flex-col items-center justify-center gap-4 border-l border-[#c9a96e]/08">
                {/* Decorative map grid */}
                <div className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: "linear-gradient(#c9a96e 1px, transparent 1px), linear-gradient(90deg, #c9a96e 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                <div className="relative z-10 w-10 h-10 border border-[#c9a96e]/30 flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#c9a96e]/50 rounded-full" />
                </div>
                <div className="relative z-10 text-center">
                  <p className="font-['Cormorant_Garamond',serif] text-[1rem] text-[#f5f0e8]/40 mb-1">{loc.city}</p>
                  <p className="text-[#f5f0e8]/20 text-[10px] tracking-wide">{loc.address}</p>
                </div>
                <a
                  href={loc.mapEmbed}
                  target="_blank"
                  rel="noreferrer"
                  className="relative z-10 mt-2 text-[#c9a96e]/45 hover:text-[#c9a96e] text-[9px] tracking-[0.35em] uppercase transition-colors"
                >
                  View Full Map →
                </a>
              </div>
            </div>
          </div>

          <div className="max-w-screen-xl mx-auto px-6 lg:px-14">
            <div className="h-px bg-gradient-to-r from-transparent via-[#c9a96e]/20 to-transparent" />
          </div>

          {/* ══ EVENTS CALENDAR ══ */}
          <div className="max-w-screen-xl mx-auto px-6 lg:px-14 py-20">
            <div className="mb-12">
              <p className="text-[#c9a96e] text-[9px] tracking-[0.5em] uppercase opacity-65 mb-2">UPCOMING</p>
              <h2 className="font-['Cormorant_Garamond',serif] text-[clamp(2rem,4vw,3rem)] font-light text-[#f5f0e8]">
                Events <span className="italic text-[#c9a96e]">&amp; Classes</span>
              </h2>
            </div>

            <div className="space-y-px bg-[#c9a96e]/06">
              {events.map((ev, i) => (
                <div
                  key={i}
                  className="event-row bg-[#0d0a05] p-6 flex flex-col md:flex-row md:items-center gap-5 md:gap-8"
                >
                  {/* Date */}
                  <div className="flex-shrink-0 w-14 text-center border border-[#c9a96e]/15 py-3">
                    <p className="font-['Cormorant_Garamond',serif] text-[1.6rem] font-light text-[#c9a96e] leading-none">
                      {ev.date.day}
                    </p>
                    <p className="text-[#f5f0e8]/30 text-[8px] tracking-[0.3em] uppercase">{ev.date.month}</p>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-['Cormorant_Garamond',serif] text-[1.1rem] text-[#f5f0e8]/80">{ev.title}</p>
                      <span className="text-[#c9a96e]/40 text-[7px] tracking-[0.4em] uppercase border border-[#c9a96e]/15 px-2 py-0.5 flex-shrink-0">
                        {ev.type}
                      </span>
                    </div>
                    <p className="text-[#f5f0e8]/35 text-[11px] mb-0.5">{ev.subtitle}</p>
                    <p className="text-[#f5f0e8]/22 text-[10px] tracking-wide">{ev.location}</p>
                  </div>

                  {/* Right */}
                  <div className="flex-shrink-0 flex flex-col items-end gap-2.5">
                    <p className="text-[#c9a96e]/45 text-[10px] tracking-wide">{ev.spots}</p>
                    <button
                      onClick={() => handleBooking(ev)}
                      className="gold-btn px-5 py-2 bg-[#c9a96e] text-[#0d0a05] text-[0.6rem] tracking-[0.35em] uppercase font-['Jost',sans-serif]"
                    >
                      RSVP
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ══ FOOTER CTA ══ */}
          <div className="max-w-screen-xl mx-auto px-6 lg:px-14 pb-28">
            <div className="border border-[#c9a96e]/12 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 bg-[#110d07]">
              <div>
                <p className="font-['Cormorant_Garamond',serif] text-[clamp(1.5rem,3vw,2.2rem)] font-light text-[#f5f0e8] mb-2">
                  Can't Visit in <span className="italic text-[#c9a96e]">Person?</span>
                </p>
                <p className="text-[#f5f0e8]/35 text-[12px] tracking-wide">
                  Order from our full menu — delivered worldwide.
                </p>
              </div>
              <Link
                to="/menu"
                className="flex-shrink-0 px-8 py-4 bg-[#c9a96e] text-[#0d0a05] text-[0.62rem] tracking-[0.38em] uppercase font-['Jost',sans-serif] hover:bg-[#d4b87a] transition-colors"
              >
                Order Online
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Visit;