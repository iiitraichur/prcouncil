'use client';

import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = ['Home', 'About', 'Services', 'Portfolio', 'Contact'];

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="w-full bg-black shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo (only on mobile) */}
        <div className="sm:block lg:hidden text-white text-2xl font-bold">
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
        </div>

        {/* Navbar for Desktop */}
        <nav className="hidden lg:flex gap-6 items-center justify-center p-2 border border-lime-500 rounded-full bg-transparent max-w-4xl mx-auto">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={`#${item.toLowerCase()}`}
              className="text-white text-lg font-semibold px-4 py-2 rounded-full hover:bg-lime-500 hover:text-black transition-all duration-300"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Hamburger Icon for Mobile */}
        <button
          className="lg:hidden text-white text-xl focus:outline-none"
          onClick={toggleMenu}
        >
          ☰
        </button>
      </div>

      {/* Side Drawer for Mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black shadow-lg transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 z-50`}
      >
        <button
          className="text-white text-2xl p-4 focus:outline-none"
          onClick={toggleMenu}
        >
          ×
        </button>
        <nav className="flex flex-col gap-4 p-6">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={`#${item.toLowerCase()}`}
              className="text-white text-lg font-semibold px-4 py-2 rounded hover:bg-lime-500 transition-colors duration-300"
              onClick={toggleMenu}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
