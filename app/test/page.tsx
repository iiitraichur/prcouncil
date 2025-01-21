import React from 'react';
import Squares from "../components/Squares";

const Test: React.FC = () => {
  return (
    <div className="relative h-[84vh] overflow-hidden">
      {/* Background animation */}
      <Squares 
        speed={0.3} 
        squareSize={40}
        direction="diagonal"
        borderColor="rgba(255, 255, 255, 0.1)"
        hoverFillColor="#ace501"
      />

      {/* Floating content */}
      <main className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center">
        <h1
          className="text-4xl md:text-6xl font-extrabold text-lime-400 tracking-tight drop-shadow-lg opacity-0 translate-y-[-50px] animate-fadeInUp"
        >
          Welcome to
        </h1>
        <h2
          className="text-3xl md:text-5xl font-bold text-white mt-4 opacity-0 translate-y-[50px] animate-fadeInUp"
        >
          Public Relations Council
        </h2>
        <p
          className="text-sm md:text-base text-gray-400 mt-6 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fadeIn"
        >
          Building bridges, fostering connections, and shaping the future of public engagement.
        </p>

        {/* CTA Button */}
        <div
          className="mt-10 opacity-0 scale-90 animate-fadeInScale"
        >
          <a 
            href="#events"
            className="px-6 py-3 bg-lime-400 text-black font-bold rounded-full hover:bg-lime-500 transition-all transform hover:scale-105"
          >
            Latest Events
          </a>
        </div>
      </main>

    </div>
  );
};

export default Test;
