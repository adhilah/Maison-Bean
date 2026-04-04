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


import React from "react";

const FOOTER_LINKS = {
  Explore:  ["Menu", "Our Story", "Sourcing", "Reservations"],
  Order:    ["Build Your Cup", "Catering", "Gift Cards", "Subscriptions"],
  Connect:  ["Instagram", "Pinterest", "Press", "Careers"],
};

const Footer = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Jost:wght@200;300&display=swap');

        .mb-footer-link {
          font-family: 'Jost', sans-serif;
          font-size: 0.65rem; font-weight: 200;
          letter-spacing: 0.12em;
          color: rgba(250,248,245,0.4);
          text-decoration: none;
          display: block; margin-bottom: 0.8rem;
          transition: color 0.3s, letter-spacing 0.3s;
        }
        .mb-footer-link:hover { color: #c4a96a; letter-spacing: 0.2em; }

        .mb-footer-social {
          display: inline-flex; align-items: center; justify-content: center;
          width: 34px; height: 34px;
          border: 1px solid rgba(108,82,37,0.3);
          color: rgba(250,248,245,0.4);
          text-decoration: none;
          font-family: 'Jost', sans-serif;
          font-size: 0.6rem; font-weight: 200;
          transition: border-color 0.3s, color 0.3s, background 0.3s;
        }
        .mb-footer-social:hover {
          border-color: #c4a96a;
          color: #c4a96a;
          background: rgba(108,82,37,0.08);
        }

        @keyframes mb-lineExpand {
          from { width: 0; }
          to   { width: 100%; }
        }
      `}</style>

      <footer style={{
        background: "#0a0804",
        borderTop: "1px solid rgba(108,82,37,0.2)",
        fontFamily: "'Jost', sans-serif",
        padding: "5rem 5rem 2.5rem",
      }}>

        {/* Top row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "4rem",
          marginBottom: "4rem",
        }}>

          {/* Brand column */}
          <div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2rem", fontWeight: 300,
              letterSpacing: "0.3em", textTransform: "uppercase",
              color: "#faf8f5", marginBottom: "0.5rem",
            }}>
              Maison <em style={{ fontStyle: "italic", color: "#c4a96a" }}>Bean</em>
            </h2>
            <p style={{
              fontSize: "0.58rem", fontWeight: 200,
              letterSpacing: "0.35em", textTransform: "uppercase",
              color: "rgba(196,169,106,0.5)", marginBottom: "1.75rem",
            }}>Specialty Coffee Atelier</p>
            <p style={{
              fontSize: "0.72rem", fontWeight: 200,
              lineHeight: 2, color: "rgba(250,248,245,0.35)",
              maxWidth: "280px", marginBottom: "2rem",
            }}>
              Sourced from the world's finest micro-lots. Roasted in small batches, served with precision.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "0.6rem" }}>
              {["IG", "PT", "TW", "YT"].map((s) => (
                <a key={s} href="#" className="mb-footer-social">{s}</a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <p style={{
                fontSize: "0.55rem", fontWeight: 300,
                letterSpacing: "0.4em", textTransform: "uppercase",
                color: "#6c5225", marginBottom: "1.5rem",
              }}>{heading}</p>
              {links.map((link) => (
                <a key={link} href="#" className="mb-footer-link">{link}</a>
              ))}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(108,82,37,0.4), transparent)",
          marginBottom: "2rem",
        }} />

        {/* Bottom row */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <p style={{
            fontSize: "0.55rem", fontWeight: 200,
            letterSpacing: "0.15em", color: "rgba(250,248,245,0.2)",
          }}>
            © {new Date().getFullYear()} Maison Bean. All rights reserved.
          </p>

          <div style={{ display: "flex", gap: "2rem" }}>
            {["Privacy Policy", "Terms of Use", "Accessibility"].map((item) => (
              <a key={item} href="#" style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.55rem", fontWeight: 200,
                letterSpacing: "0.12em",
                color: "rgba(250,248,245,0.2)", textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseOver={e => e.currentTarget.style.color = "rgba(196,169,106,0.6)"}
              onMouseOut={e => e.currentTarget.style.color = "rgba(250,248,245,0.2)"}
              >{item}</a>
            ))}
          </div>

          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic", fontSize: "0.85rem", fontWeight: 300,
            color: "rgba(108,82,37,0.4)", letterSpacing: "0.1em",
          }}>
            Est. Paris, 2019
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;