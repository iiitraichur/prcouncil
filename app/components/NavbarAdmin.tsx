'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation'; 
import { auth, firebaseAuth } from '@/lib/firebase';
import router from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';


const NavbarAdmin: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); 

  const navItems = [
    { name: 'Home', path: '/admin' },
    { name: 'Add Events', path: '/admin/add-event' },
    { name: 'Edit Events', path: '/admin/events' },
    { name: 'Deletion-request', path: '/admin/deletion' },
    { name: 'Feedback', path: '/admin/feedback' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    await firebaseAuth.signOut(auth);
    router.push("/sign-in");
  };

  return (
    <header className="w-full bg-black pt-6 shadow-md">
      {/* External links */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com"  />
      <link
        href="https://fonts.googleapis.com/css2?family=Audiowide&family=Lexend:wght@100..900&display=swap"
        rel="stylesheet"
      />

      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-6 items-center justify-center p-2 border border-lime-500 rounded-full bg-transparent max-w-4xl mx-auto">
          {navItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.path}
              className={`text-lg font-semibold px-4 py-2 rounded-full hover:bg-lime-500 hover:text-black transition-all duration-300 ${
                pathname === item.path ? 'bg-lime-500 text-black' : 'text-white'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {item.name}
            </motion.a>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-700 px-6 py-2 rounded-full text-white font-medium shadow-lg hover:from-red-600 hover:to-red-800 hover:shadow-xl focus:outline-none transition duration-300"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="text-white w-5 h-5" />
            Logout
          </button>
        </nav>

        {/* Hamburger Icon for Mobile */}
        <button
          className="lg:hidden text-white text-xl focus:outline-none"
          onClick={toggleMenu}
        >
          ☰
        </button>

        {/* Logo and Admin Text */}
        <div className="text-white lg:hidden md:hidden flex-grow flex justify-center items-center">
          <Link href="/admin">
            <motion.div
              whileHover={{ rotateY: 180 }} // Flip animation on hover
              whileTap={{ scale: 0.9 }} // Slight scale-down on click
              transition={{ duration: 0.5 }} // Animation duration
              className="cursor-pointer"
            >
              <Image
                src="/pr_logo.jpg"
                alt="PR Logo"
                width={60}
                height={60}
                className="object-contain"
              />
            </motion.div>
          </Link>
          <div className="text-xl audiowide-regular text-lime-400">Admin</div>
        </div>

        {/* Invisible spacer for right alignment */}
        <div className="w-6 md:hidden"></div>
      </div>

      {/* Side Drawer for Mobile */}
      <motion.div
        className={`fixed top-0 right-0 h-full w-64 bg-black shadow-lg transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 z-50`}
        initial={{ x: '100%' }}
        animate={{ x: isMenuOpen ? 0 : '100%' }}
        exit={{ x: '100%' }}
      >
        <button
          className="text-white text-2xl p-4 focus:outline-none"
          onClick={toggleMenu}
        >
          ×
        </button>
        <nav className="flex flex-col gap-4 p-6">
          {navItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.path}
              className={`text-white text-lg font-semibold px-4 py-2 rounded hover:bg-lime-500 transition-colors duration-300 ${
                pathname === item.path ? 'bg-lime-500 text-black' : ''
              }`}
              onClick={toggleMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {item.name}
            </motion.a>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-700 px-6 py-2 rounded-full text-white font-medium shadow-lg hover:from-red-600 hover:to-red-800 hover:shadow-xl focus:outline-none transition duration-300"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="text-white w-5 h-5" />
            Logout
          </button>
        </nav>
      </motion.div>
    </header>
  );
};

export default NavbarAdmin;
