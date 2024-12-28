import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen bg-black flex flex-col justify-start items-center text-center pt-20">
      {/* Subtle Background Element */}
      <div className="absolute inset-0">
        <div className="h-full w-full">
          <div className="absolute bg-lime-500 opacity-10 h-40 w-40 rounded-full blur-2xl top-1/4 left-1/3"></div>
          <div className="absolute bg-lime-500 opacity-10 h-48 w-48 rounded-full blur-2xl top-1/3 right-1/3"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-lime-400">
          Welcome to
        </h1>
        <h2 className="text-3xl md:text-5xl font-semibold text-white mt-2">
          Public Relations Council
        </h2>
        <p className="text-sm md:text-base text-gray-400 mt-4 max-w-lg mx-auto">
          Building bridges, fostering connections, and shaping the future of public engagement.
        </p>
      </div>
    </div>
  );
};

export default Hero;
