'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa'; // Import icons

type TeamMember = {
  name: string;
  role: string;
  photo: string;
  bio: string;
  linkedin: string;
  email: string;
};

const teamMembers: TeamMember[] = [
  {
    name: 'Harsha',
    role: 'PR Lead',
    photo: '/images/harsha.jpg',
    bio: 'Dedicated leader with a passion for innovation.',
    linkedin: 'https://www.linkedin.com/in/kvjharsha/', // Replace with actual LinkedIn profile
    email: 'cs23b1034@iiitr.ac.in', // Replace with actual email
  },
  {
    name: 'Santhosh',
    role: 'Shutter Squad',
    photo: '/images/santhosh.jpg',
    bio: 'Dedicated to photography and passionate about technology.',
    linkedin: 'https://www.linkedin.com/in/santhosh-yanamadni-801b56299?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    email: 'ad23b1060@iiitr.ac.in',
  },
  {
    name: 'Abhishek',
    role: 'CC Ideation Lead',
    photo: '/images/abhishek.jpg',
    bio: 'Creative thinker and innovation enthusiast.',
    linkedin: 'https://www.linkedin.com/in/abhishek-buddiga-bb5a0b2b8/',
    email: 'ad23b1012@iiitr.ac.in',
  },
];

const Page: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      className="min-h-screen flex flex-col items-center bg-gradient-to-b from-black via-gray-900 to-gray-800 px-4 py-8"
    >
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-extrabold text-lime-400 mb-12"
      >
        Meet Our Team
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: index * 0.2 }}
            className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl shadow-xl p-6 flex flex-col items-center text-center"
          >
            <img
              src={member.photo}
              alt={member.name}
              className="w-32 h-32 rounded-full border-4 border-lime-400 mb-4"
            />
            <h2 className="text-xl font-bold text-white">{member.name}</h2>
            <p className="text-lime-400 text-sm font-semibold">{member.role}</p>
            <p className="text-gray-400 mt-4">{member.bio}</p>
            <div className="flex space-x-4 mt-4">
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lime-400 hover:text-lime-500 transition-all text-2xl"
              >
                <FaLinkedin />
              </a>
              <a
                href={`mailto:${member.email}`}
                className="text-lime-400 hover:text-lime-500 transition-all text-2xl"
              >
                <FaEnvelope />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Page;
