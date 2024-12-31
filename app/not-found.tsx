const Custom404: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center h-[50vh] bg-black text-white">
      <div className="text-6xl font-bold mb-4 animate-slide-in">
        404 :/
      </div>
      <div className="text-xl mb-8 animate-fade-in">
        Oops! The page you are looking for doesn't exist.
      </div>
      
      {/* Animated CTA Button */}
      <div className="mt-5 animate-slide-in">
        <a
          href="/"
          className="px-8 py-4 bg-lime-600 text-black rounded-lg shadow-lg hover:bg-lime-700 transition-transform transform hover:scale-105"
        >
          Go Back Home
        </a>
      </div>
    </section>
  );
};

export default Custom404;
