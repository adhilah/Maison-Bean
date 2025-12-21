import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();

  const Icon = ({ name, className = "text-3xl" }) => (
    <span className={`material-symbols-rounded ${className}`}>{name}</span>
  );

  const ListItem = ({ icon, children }) => (
    <li className="flex items-center text-amber-800">
      <Icon name={icon} className="text-amber-600 mr-3 text-xl" />
      <span>{children}</span>
    </li>
  );

  return (
    <footer className="bg-white border-t border-amber-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Column 1: Brand & Social */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-amber-700 rounded-full flex items-center justify-center mr-3 shadow-md">
                <span className="text-white font-bold text-xl">MB</span>
              </div>
              <h2 className="text-2xl font-bold text-amber-900">Maison Bean</h2>
            </div>
            <p className="text-amber-700 mb-6 leading-relaxed">
              A modern coffee house offering specialty brews, fresh bakery items, and wholesome snacks 
              with full customization and nutritional transparency.
            </p>

            {/* Social Icons - UPDATED */}
            <div className="flex gap-5">
  <a href="#" className="text-amber-700 hover:text-amber-900 transition">
    <FaFacebook className="text-2xl" />
  </a>
  <a href="#" className="text-amber-700 hover:text-amber-900 transition">
    <FaInstagram className="text-2xl" />
  </a>
  <a href="#" className="text-amber-700 hover:text-amber-900 transition">
    <FaTwitter className="text-2xl" />
  </a>
</div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-amber-900 mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {["/", "/menu", "/coffee", "/bakery", "/snacks", "/customize"].map((path, i) => {
                const labels = ["Home", "Menu", "Specialty Coffee", "Bakery Items", "Healthy Snacks", "Customize Your Order"];
                return (
                  <li key={i}>
                    <Link to={path} className="text-amber-800 hover:text-amber-900 transition">
                      {labels[i]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Our Features */}
          <div>
            <h3 className="text-lg font-semibold text-amber-900 mb-6">Our Features</h3>
            <ul className="space-y-3">
              <ListItem icon="check_circle">Coffee Customization</ListItem>
              <ListItem icon="check_circle">Calories & Benefits Display</ListItem>
              <ListItem icon="check_circle">Rating & Review System</ListItem>
              <ListItem icon="check_circle">Dynamic Price Updates</ListItem>
              <ListItem icon="check_circle">Multiple Bean & Milk Options</ListItem>
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-amber-900 mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <ListItem icon="location_on">123 Coffee Street, Brew City, BC 12345</ListItem>
              <ListItem icon="phone">(123) 456-7890</ListItem>
              <ListItem icon="mail">info@maisonbean.com</ListItem>
            </ul>

            <div className="mt-6">
              <p className="text-sm text-amber-700 mb-3">Subscribe to Our Newsletter</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 border border-amber-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50 text-amber-900 placeholder-amber-600"
                />
                <button className="bg-amber-700 hover:bg-amber-800 text-white px-5 py-2 rounded-r-lg transition font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Bottom Links */}
        <div className="mt-10 pt-8 border-t border-amber-200 text-center text-sm text-amber-700">
          <p className="mb-4">&copy; {year} Maison Bean. All rights reserved.</p>
          <div className="flex justify-center gap-6 flex-wrap">
            <Link to="/privacy" className="hover:text-amber-900 transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-amber-900 transition">Terms of Service</Link>
            <Link to="/faq" className="hover:text-amber-900 transition">FAQ</Link>
            <Link to="/sitemap" className="hover:text-amber-900 transition">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;