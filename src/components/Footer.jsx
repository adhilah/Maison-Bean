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
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

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

//             {/* Social Icons - UPDATED */}
//             <div className="flex gap-5">
//   <a href="#" className="text-[#9c7635] hover:text-[#6c5225] transition">
//     <FaFacebook className="text-2xl" />
//   </a>
//   <a href="#" className="text-[#9c7635] hover:text-[#6c5225] transition">
//     <FaInstagram className="text-2xl" />
//   </a>
//   <a href="#" className="text-[#9c7635] hover:text-[#6c5225] transition">
//     <FaTwitter className="text-2xl" />
//   </a>
// </div>
//           </div>


//           {/* Column 3: Our Features */}
//           <div>
//             <h3 className="text-lg font-semibold text-[#6c5225] mb-6">Our Features</h3>
//             <ul className="space-y-3">
//               <ListItem icon="check_circle">Coffee Customization</ListItem>
//               <ListItem icon="check_circle">Calories & Benefits Display</ListItem>
//               <ListItem icon="check_circle">Rating & Review System</ListItem>
//               <ListItem icon="check_circle">Multiple Bean & Milk Options</ListItem>
//             </ul>
//           </div>

//           {/* Column 4: Contact & Newsletter */}
//           <div>
//             <h3 className="text-lg font-semibold text-[#6c5225] mb-6">Contact Us</h3>
//             <ul className="space-y-4">
//               <ListItem icon="location_on">123 Coffee Street, Brew City, kozhikode, kerala</ListItem>
//               <ListItem icon="phone">+91 0987654321</ListItem>
//               <ListItem icon="mail">info@maisonbean.com</ListItem>
//             </ul>
//           </div>
//         </div>

//         {/* Copyright & Bottom Links */}
//         <div className="mt-10 pt-8 border-t border-amber-200 text-center text-sm text-[#9c7635]">
//           <p className="mb-4">&copy; {year} Maison Bean. All rights reserved.</p>
//           <div className="flex justify-center gap-6 flex-wrap">
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;




import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();

  const Icon = ({ name, className = "text-3xl" }) => (
    <span className={`material-symbols-rounded ${className}`}>{name}</span>
  );

  const ListItem = ({ icon, children }) => (
    <li className="flex items-center text-[#6c5225]">
      <Icon name={icon} className="text-[#9c7635] mr-3 text-xl" />
      <span>{children}</span>
    </li>
  );

  return (
    <footer className="bg-white border-t border-[#cfbea1]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Column 1: Brand & Social */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#9c7635] rounded-full flex items-center justify-center mr-3 shadow-md">
                <span className="text-white font-bold text-xl">MB</span>
              </div>
              <h2 className="text-2xl font-bold text-[#6c5225]">Maison Bean</h2>
            </div>
            <p className="text-[#9c7635] mb-6 leading-relaxed">
              A modern coffee house offering specialty brews, fresh bakery items, and wholesome snacks 
              with full customization and nutritional transparency.
            </p>

            {/* Social Icons */}
            <div className="flex gap-5">
              <FaFacebook className="text-2xl text-[#9c7635] hover:text-[#6c5225] transition cursor-pointer" />
              <FaInstagram className="text-2xl text-[#9c7635] hover:text-[#6c5225] transition cursor-pointer" />
              <FaTwitter className="text-2xl text-[#9c7635] hover:text-[#6c5225] transition cursor-pointer" />
            </div>
          </div>

          {/* Column 2: Our Features */}
          <div>
            <h3 className="text-lg font-semibold text-[#6c5225] mb-6">Our Features</h3>
            <ul className="space-y-3">
              <ListItem icon="check_circle">Coffee Customization</ListItem>
              <ListItem icon="check_circle">Calories & Benefits Display</ListItem>
              <ListItem icon="check_circle">Rating & Review System</ListItem>
              <ListItem icon="check_circle">Multiple Bean & Milk Options</ListItem>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-lg font-semibold text-[#6c5225] mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <ListItem icon="location_on">123 Coffee Street, Brew City, Kozhikode, Kerala</ListItem>
              <ListItem icon="phone">+91 0987654321</ListItem>
              <ListItem icon="mail">info@maisonbean.com</ListItem>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-10 pt-8 border-t border-amber-200 text-center text-sm text-[#9c7635]">
          <p>&copy; {year} Maison Bean. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
