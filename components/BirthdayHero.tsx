
import React from 'react';

interface Props {
  name: string;
}

export const BirthdayHero: React.FC<Props> = ({ name }) => {
  return (
    <header className="relative h-screen min-h-[600px] flex items-center justify-center text-center px-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=2070&auto=format&fit=crop" 
          alt="Celebration" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-rose-100/50 to-white"></div>
      </div>

      <div className="relative z-10 max-w-4xl">
        <div className="mb-6 inline-block">
          <span className="bg-rose-600 text-white px-6 py-2 rounded-full text-sm font-semibold tracking-widest uppercase">
            A Special Day for You
          </span>
        </div>
        
        <h1 className="text-6xl md:text-9xl font-serif text-rose-900 mb-6 leading-tight">
          Happy Birthday,<br />
          <span className="text-rose-600 font-cursive italic tracking-normal">{name}</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-rose-700 font-light max-w-2xl mx-auto leading-relaxed">
          To an amazing lady and my dear friend. I wanted to create something as beautiful as you are to celebrate your special day.
        </p>

        <div className="mt-12 flex justify-center gap-4">
          <div className="w-16 h-1 bg-rose-300 rounded-full"></div>
          <div className="w-4 h-1 bg-rose-400 rounded-full"></div>
          <div className="w-16 h-1 bg-rose-300 rounded-full"></div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 left-10 float opacity-30 hidden md:block">
        <div className="text-6xl text-rose-400">❤</div>
      </div>
      <div className="absolute top-20 right-20 float opacity-30 hidden md:block" style={{ animationDelay: '1s' }}>
        <div className="text-5xl text-rose-400">✨</div>
      </div>
    </header>
  );
};
