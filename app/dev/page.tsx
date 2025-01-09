"use client";
import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const developers = [
  {
    name: 'K V Jaya Harsha',
    linkedin: 'https://linkedin.com/in/kvjharsha/',
    github: 'https://github.com/kvj-harsha',
    email: 'mailto:cs23b1034@iiitr.ac.in',
    photo: 'members/harsha.png',
    batch: 'CSE 2023',
  },
  {
    name: 'Y Santhosh',
    linkedin: 'https://www.linkedin.com/in/santhosh-yanamadni-801b56299',
    github: 'https://github.com/Y-Santhosh',
    email: 'mailto:ad23b1060@iiitr.ac.in',
    photo: 'members/santhosh.png',
    batch: 'AI & DS 2023',

  },
  {
    name: 'Abhishek Buddiga',
    linkedin: 'https://www.linkedin.com/in/abhishek-buddiga-bb5a0b2b8/',
    github: 'https://github.com/ad23b1012',
    email: 'mailto:ad23b1012@iiitr.ac.in',
    photo: 'members/abhishek.png',
    batch: 'AI & DS 2023',

  },
];

export default function DevelopersPage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="lg:h-[80vh] bg-black text-white flex flex-col items-center py-10 px-4">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          Meet the Developers
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {developers.map((dev, index) => (
          <div
            ref={ref}
            key={index}
            className={`bg-gray-800 p-6 rounded-2xl shadow-lg transform transition-all duration-500 hover:scale-105 ${
              inView ? 'animate-slide-in' : 'opacity-0 translate-y-10'
            }`}
          >
            <img
              src={dev.photo}
              alt={`${dev.name}'s profile`}
              className="w-32 h-32 rounded-full mx-auto mb-4 border-[4px] border-gradient-to-r from-purple-400 to-pink-500"
            />
            <h2 className="text-2xl font-bold text-center mb-4">{dev.name}</h2>
            <p align="center">Batch {dev.batch}</p>
            <div className="flex justify-center space-x-6 mt-4">
              <a
                href={dev.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl hover:text-purple-500 transition-transform duration-200"
              >
                <FaLinkedin />
              </a>
              <a
                href={dev.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl hover:text-purple-500 transition-transform duration-200"
              >
                <FaGithub />
              </a>
              <a
                href={dev.email}
                className="text-3xl hover:text-purple-500 transition-transform duration-200"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12">
        <a
          href="https://github.com/kvj-harsha/prcouncil"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-lime-400 to-green-500 text-black font-bold rounded-lg hover:from-green-500 hover:to-lime-600 transition-colors shadow-lg"
        >
          <FaGithub className="mr-2 text-2xl" />
          Check the Website GitHub
        </a>
      </div>
    </div>
  );
}
