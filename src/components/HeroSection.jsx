import React from 'react';
// import coffeeVideo from '../assets/coffee-video1.mp4';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
       <div className="absolute inset-0 z-0">
        {/* <video 
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={coffeeVideo} type="video/mp4" />
        </video> */}

        <img src='https://i.pinimg.com/736x/c6/1f/8f/c61f8f42ee089bee27de77f4a64cdbf6.jpg'
        className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
            Maison <span className="text-amber-400">Bean</span>
          </h1>
          <p className="text-xl text-amber-100">Artisanal Coffee Experience</p>
        </div>

        {/* Main Message */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          Premium Custom Creations
        </h2>

        {/* Description */}
        <p className="text-lg text-amber-100 mb-10 max-w-2xl mx-auto">
          Create your perfect drink with our interactive builder. 
          Customize every detail to match your taste and preferences.
        </p>

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 px-8 rounded-lg transition">
            Start Creating
          </button>
          <button className="bg-transparent border border-amber-300 hover:bg-amber-300/10 text-amber-100 font-bold py-3 px-8 rounded-lg transition">
            View Menu
          </button>
        </div>

        {/* Stats */}
        {/* <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-300">150+</div>
            <div className="text-amber-100 text-sm">Combinations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-300">4.8★</div>
            <div className="text-amber-100 text-sm">Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-300">Fresh</div>
            <div className="text-amber-100 text-sm">Daily</div>
          </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default HeroSection;