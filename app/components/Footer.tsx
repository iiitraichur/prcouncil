"use client"
import React, { useState } from "react";
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const [prLogoClicks, setPrLogoClicks] = useState(0);
  const [iiitrLogoClicks, setIiitrLogoClicks] = useState(0);

  const handlePrLogoClick = () => {
    setPrLogoClicks((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount === 5) {
        // Redirect after 3 clicks on PR logo
        window.location.href = "/admin"; // Replace with the desired URL
      }
      return newCount;
    });
  };

  const handleIiitrLogoClick = () => {
    setIiitrLogoClicks((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount === 1) {
        // Redirect after 2 clicks on IIIT Raichur logo
        window.location.href = "https://iiitr.ac.in"; // Replace with the desired URL
      }
      return newCount;
    });
  };

  return (
    <div className="bg-black text-gray-500">
      <footer className="py-8 px-4">
        <div className="grid md:grid-cols-3 grid-cols-1 items-center gap-6">
          {/* IIIT Raichur Logo */}
          <div className="flex justify-center">
            <img
              src="/logos/iiitr.png"
              alt="IIIT Raichur Logo"
              className="h-16 w-auto object-contain cursor-pointer"
              onClick={handleIiitrLogoClick}
            />
          </div>

          {/* Links Section */}
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-300">
              Inspiring Connections, Amplifying Voices
            </h2>
            <p className="mt-2 text-sm">
              Enabling impactful communication for IIIT Raichur.
            </p>
            <div className="mt-4">
              <div className="flex items-center justify-center space-x-2">
                <FaEnvelope className="text-gray-400" size={20} />
                <a
                  href="mailto:pr.council@iiitr.ac.in"
                  className="text-gray-400 hover:text-white transition"
                >
                  pr.council@iiitr.ac.in
                </a>
              </div>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <FaPhone className="text-gray-400" size={20} />
                <a
                  href="tel:+916363996166"
                  className="text-gray-400 hover:text-white transition"
                >
                  +91 63639 96166
                </a>
              </div>
            </div>
            <div className="flex justify-center mt-5 space-x-6">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition"
              >
                <FaYoutube size={24} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition"
              >
                <FaFacebookF size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>

          {/* PR Logo with Click Handler */}
          <div className="flex justify-center">
            <img
              src="/logos/pr_logo.jpg"
              alt="PR Logo"
              className="h-32 w-auto object-contain cursor-pointer"
              onClick={handlePrLogoClick}
            />
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="text-center text-sm mt-6">
          <p>© {currentYear} Public Relations Council, IIIT Raichur. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
