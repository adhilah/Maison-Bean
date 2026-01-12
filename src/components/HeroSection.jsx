import React from "react";
// import coffeeVideo from '../assets/coffee-video1.mp4';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
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

        <img
          src="https://i.pinimg.com/736x/c6/1f/8f/c61f8f42ee089bee27de77f4a64cdbf6.jpg"
          className="w-full h-full object-cover"
          alt="Coffee background"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Logo / Brand */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-2">
            Maison <span className="text-[#6c5225]">Bean</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-amber-100">
            Artisanal Coffee Experience
          </p>
        </div>

        {/* Main Message */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
          Premium Custom Creations
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg text-amber-100 mb-8 sm:mb-10 max-w-2xl mx-auto">
          Create your perfect drink with our interactive builder.
          Customize every detail to match your taste and preferences.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
