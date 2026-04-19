// import React from 'react';
// import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

// const Footer = () => {
//   const year = new Date().getFullYear();

//   const Icon = ({ name, className = "text-3xl" }) => (
//     <span className={`material-symbols-rounded ${className}`}>{name}</span>
//   );

//   const ListItem = ({ icon, children }) => (
//     <li className="flex items-center text-[#6c5225]">
//       <Icon name={icon} className="text-[#9c7635] mr-3 text-xl" />
//       <span>{children}</span>
//     </li>
//   );

//   return (
//     <footer className="bg-white border-t border-[#cfbea1]">
//       <div className="max-w-7xl mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

//           {/* Column 1: Brand & Social */}
//           <div>
//             <div className="flex items-center mb-4">
//               <div className="w-12 h-12 bg-[#9c7635] rounded-full flex items-center justify-center mr-3 shadow-md">
//                 <span className="text-white font-bold text-xl">MB</span>
//               </div>
//               <h2 className="text-2xl font-bold text-[#6c5225]">Maison Bean</h2>
//             </div>
//             <p className="text-[#9c7635] mb-6 leading-relaxed">
//               A modern coffee house offering specialty brews, fresh bakery items, and wholesome snacks 
//               with full customization and nutritional transparency.
//             </p>

//             {/* Social Icons */}
//             <div className="flex gap-5">
//               <FaFacebook className="text-2xl text-[#9c7635] hover:text-[#6c5225] transition cursor-pointer" />
//               <FaInstagram className="text-2xl text-[#9c7635] hover:text-[#6c5225] transition cursor-pointer" />
//               <FaTwitter className="text-2xl text-[#9c7635] hover:text-[#6c5225] transition cursor-pointer" />
//             </div>
//           </div>

//           {/* Column 2: Our Features */}
//           <div>
//             <h3 className="text-lg font-semibold text-[#6c5225] mb-6">Our Features</h3>
//             <ul className="space-y-3">
//               <ListItem icon="check_circle">Coffee Customization</ListItem>
//               <ListItem icon="check_circle">Calories & Benefits Display</ListItem>
//               <ListItem icon="check_circle">Rating & Review System</ListItem>
//               <ListItem icon="check_circle">Multiple Bean & Milk Options</ListItem>
//             </ul>
//           </div>

//           {/* Column 3: Contact */}
//           <div>
//             <h3 className="text-lg font-semibold text-[#6c5225] mb-6">Contact Us</h3>
//             <ul className="space-y-4">
//               <ListItem icon="location_on">123 Coffee Street, Brew City, Kozhikode, Kerala</ListItem>
//               <ListItem icon="phone">+91 0987654321</ListItem>
//               <ListItem icon="mail">info@maisonbean.com</ListItem>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Copyright */}
//         <div className="mt-10 pt-8 border-t border-amber-200 text-center text-sm text-[#9c7635]">
//           <p>&copy; {year} Maison Bean. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;




//=================================================================================================================
import { Link } from "react-router-dom";

const LINKS = {
  Explore: [
    { label: "Menu",     to: "/menu"     },
    { label: "Story",    to: "/story"    },
    { label: "Sourcing", to: "/sourcing" },
    { label: "Visit",    to: "/visit"    },
  ],
  Order: [
    { label: "Build Your Cup", to: "/customize" },
    { label: "Cart",           to: "/cart"      },
    { label: "My Orders",      to: "/orders"    },
    { label: "Track Order",    to: "/orders"    },
  ],
};

const Footer = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Jost:wght@200;300&display=swap');
      .ft-link { transition: color 0.25s ease, letter-spacing 0.25s ease; }
      .ft-link:hover { color: #c9a96e; letter-spacing: 0.22em; }
      .ft-legal:hover { color: rgba(201,169,110,0.55); }
    `}</style>

    <footer
      className="bg-[#080602] border-t border-[#c9a96e]/12"
      style={{ fontFamily: "'Jost', sans-serif" }}
    >
      {/* ── Main grid ── */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-14 py-16">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12">

          {/* Brand */}
          <div>
            <h2
              className="text-[#f5f0e8] font-light tracking-[0.3em] uppercase leading-none mb-1"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem" }}
            >
              Maison <em className="italic text-[#c9a96e] not-italic" style={{ fontStyle: "italic" }}>Bean</em>
            </h2>
            <p className="text-[#c9a96e]/40 text-[9px] tracking-[0.45em] uppercase mb-6">
              Specialty Coffee Atelier
            </p>
            <p className="text-[#f5f0e8]/28 text-[12px] font-light leading-relaxed max-w-[260px] mb-8">
              Sourced from the world's finest micro-lots. Roasted in small batches, served with precision.
            </p>

            {/* Socials */}
            <div className="flex gap-2">
              {["IG", "PT", "TW", "YT"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 border border-[#c9a96e]/20 flex items-center justify-center text-[#f5f0e8]/30 text-[9px] tracking-wider hover:border-[#c9a96e]/50 hover:text-[#c9a96e] transition-all duration-200"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, links]) => (
            <div key={heading}>
              <p className="text-[#c9a96e]/45 text-[9px] tracking-[0.45em] uppercase mb-5 font-light">
                {heading}
              </p>
              <ul className="space-y-3">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="ft-link text-[#f5f0e8]/35 text-[11px] font-light tracking-[0.15em]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-14">
        <div className="h-px bg-gradient-to-r from-transparent via-[#c9a96e]/20 to-transparent" />
      </div>

      {/* ── Bottom bar ── */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-14 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[#f5f0e8]/18 text-[10px] tracking-[0.15em] font-light">
          © {new Date().getFullYear()} Maison Bean. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          {["Privacy", "Terms", "Accessibility"].map((item) => (
            <a
              key={item}
              href="#"
              className="ft-legal text-[#f5f0e8]/18 text-[10px] tracking-[0.12em] font-light transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </div>

        <p
          className="text-[#c9a96e]/25 text-[11px] font-light tracking-[0.1em] italic"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Est. Paris, 2019
        </p>
      </div>
    </footer>
  </>
);

export default Footer;