'use client';

import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Define the navigation items with routes
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'PR Members', path: '/members' },
    { name: 'Social Media', path: '/social-media' },
    { name: 'Request Deletion', path: '/request-deletion' },
    { name: 'Feedback', path: '/feedback' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="w-full bg-black shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">


        {/* Navbar for Desktop */}
        <nav className="hidden lg:flex gap-6 items-center justify-center p-2 border border-lime-500 rounded-full bg-transparent max-w-4xl mx-auto">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.path}
              className="text-white text-lg font-semibold px-4 py-2 rounded-full hover:bg-lime-500 hover:text-black transition-all duration-300"
            >
              {item.name}
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
              href={item.path}
              className="text-white text-lg font-semibold px-4 py-2 rounded hover:bg-lime-500 transition-colors duration-300"
              onClick={toggleMenu}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
