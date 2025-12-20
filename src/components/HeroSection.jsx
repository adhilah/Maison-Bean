import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      
      {/* Background with coffee beans pattern */}
      <div className="absolute inset-0  from-amber-50 via-white to-amber-100"></div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content */}
          <div>
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-800 text-white rounded-full text-sm font-semibold mb-6">
                <span>☕</span>
                <span>Premium Coffee Experience</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Discover Coffee<br />
                <span className="text-amber-900">Perfected</span>
              </h1>
              
              <p className="text-xl text-gray-800 mb-10 leading-relaxed">
                From single-origin beans to handcrafted beverages, we bring you 
                the finest coffee experience. Freshly roasted, expertly brewed, 
                and delivered with care.
              </p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-900 mb-2">150+</div>
                <div className="text-gray-700 font-medium">Coffee Varieties</div>
              </div>
              <div className="text-center border-x border-gray-200">
                <div className="text-3xl font-bold text-amber-900 mb-2">4.9★</div>
                <div className="text-gray-700 font-medium">Customer Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-900 mb-2">24/7</div>
                <div className="text-gray-700 font-medium">Online Orders</div>
              </div>
            </div>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-amber-900 text-white font-bold rounded-lg hover:bg-amber-950 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                </svg>
                <span>Order Coffee</span>
              </button>
              
              <button className="px-8 py-4 bg-white border-2 border-amber-800 text-amber-800 font-bold rounded-lg hover:bg-amber-50 transition flex items-center justify-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>View Full Menu</span>
              </button>
            </div>
          </div>
          
          {/* Right: Coffee Images Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Main coffee image */}
            <div className="col-span-2">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl h-80">
                {/* Replace with your coffee image */}
                <div className="absolute inset-0  from-amber-600 to-amber-800 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <div className="text-6xl mb-4">☕</div>
                    <h3 className="text-2xl font-bold">Signature Blend</h3>
                    <p className="text-amber-200">Rich & Smooth</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Side images */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg h-48">
              {/* Replace with bakery image */}
              <div className="absolute inset-0  from-amber-500 to-amber-700 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-4xl mb-2">🥐</div>
                  <p className="font-bold">Fresh Bakery</p>
                </div>
              </div>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-lg h-48">
              {/* Replace with beans image */}
              <div className="absolute inset-0 from-amber-700 to-amber-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-4xl mb-2">🌰</div>
                  <p className="font-bold">Coffee Beans</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;