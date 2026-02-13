
import React from 'react';

export const PersonalNote: React.FC = () => {
  return (
    <section className="relative py-24 bg-rose-50 rounded-[4rem] px-8 overflow-hidden">
      <div className="absolute top-0 right-0 p-12 opacity-10">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" className="text-rose-600">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
      
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h2 className="text-3xl font-serif text-rose-800 italic">From My Heart to Yours</h2>
        <div className="relative">
          <p className="text-2xl md:text-4xl font-cursive leading-relaxed text-rose-900">
            "Thank you for trusting me with your secrets, for all the shared laughter that fills our days, and for the way you simply make my heart warm just by being you."
          </p>
        </div>
        <p className="text-rose-600 font-medium tracking-widest uppercase text-sm">— With so much love</p>
      </div>
    </section>
  );
};
