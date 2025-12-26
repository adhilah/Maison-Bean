import React from 'react';
import { Link } from 'react-router-dom';
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

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

            {/* Social Icons - UPDATED */}
            <div className="flex gap-5">
  <a href="#" className="text-[#9c7635] hover:text-[#6c5225] transition">
    <FaFacebook className="text-2xl" />
  </a>
  <a href="#" className="text-[#9c7635] hover:text-[#6c5225] transition">
    <FaInstagram className="text-2xl" />
  </a>
  <a href="#" className="text-[#9c7635] hover:text-[#6c5225] transition">
    <FaTwitter className="text-2xl" />
  </a>
</div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#6c5225] mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {["/", "/menu", "/product", "/customize"].map((path, i) => {
                const labels = ["Home", "Menu", "Specialty Coffee", "Customize Your Order"];
                return (
                  <li key={i}>
                    <Link to={path} className="text-[#9c7635] hover:text-[#6c5225] transition">
                      {labels[i]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Our Features */}
          <div>
            <h3 className="text-lg font-semibold text-[#6c5225] mb-6">Our Features</h3>
            <ul className="space-y-3">
              <ListItem icon="check_circle">Coffee Customization</ListItem>
              <ListItem icon="check_circle">Calories & Benefits Display</ListItem>
              <ListItem icon="check_circle">Rating & Review System</ListItem>
              {/* <ListItem icon="check_circle">Dynamic Price Updates</ListItem> */}
              <ListItem icon="check_circle">Multiple Bean & Milk Options</ListItem>
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-[#6c5225] mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <ListItem icon="location_on">123 Coffee Street, Brew City, kozhikode, kerala</ListItem>
              <ListItem icon="phone">+91 0987654321</ListItem>
              <ListItem icon="mail">info@maisonbean.com</ListItem>
            </ul>

            <div className="mt-6">
              <p className="text-sm text-[#9c7635] mb-3">Subscribe to Our Newsletter</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 border border-[#b6ae85] rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#b3996c] bg-amber-50 text-[#6c5225] placeholder-[#a99269]"
                />
                <button className="bg-[#9c7635] hover:bg-[#6c5225] text-white px-5 py-2 rounded-r-lg transition font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Bottom Links */}
        <div className="mt-10 pt-8 border-t border-amber-200 text-center text-sm text-[#9c7635]">
          <p className="mb-4">&copy; {year} Maison Bean. All rights reserved.</p>
          <div className="flex justify-center gap-6 flex-wrap">
            <Link to="/privacy" className="hover:text-[#6c5225] transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#6c5225] transition">Terms of Service</Link>
            <Link to="/faq" className="hover:text-[#6c5225] transition">FAQ</Link>
            <Link to="/sitemap" className="hover:text-[#6c5225] transition">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;