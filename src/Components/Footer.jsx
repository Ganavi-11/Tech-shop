import React from 'react';
import { footMenu, footSocial } from '../data/footerData';
import { FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[#0f0f0f] text-gray-400 pt-10 pb-6 relative">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1  md:grid-cols-4 gap-10">
        {/* Subscription Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Tech-Shop</h2>
          <p className="text-sm mb-4">
            Subscribe to our Email alerts to receive early discount offers, and new products info.
          </p>
          <form className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Email Address*"
              className="px-4 py-2 mb-4 rounded text-gray-400 border"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Footer Menus */}
        {footMenu.map((section) => (
          <div key={section.id} className='mx-10'>
            <h3 className="text-lg font-bold mb-4">{section.title}</h3>
            <ul className="space-y-2 text-m">
              {section.menu.map((item) => (
                <li key={item.id}>
                  <p  className="hover:underline">
                    {item.link}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t border-gray-700 pt-6 px-4 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
        <p className="text-sm">2025 | All Rights Reserved ©</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          {footSocial.map((social) => (
            <a
              key={social.id}
              href={social.path}
              className="text-white hover:text-red-500 text-lg"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Back to Top Arrow */}
      <button
        onClick={scrollToTop}
        className="absolute right-4 bottom-4 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg"
        aria-label="Back to top"
      >
        <FaArrowUp />
      </button>
    </footer>
  );
};

export default Footer;