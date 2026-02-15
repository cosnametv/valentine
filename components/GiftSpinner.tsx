
import React, { useState, useEffect } from 'react';

const GIFTS = [
  "A Scented Soy Candle",
  "A Personalized Leather Journal",
  "Gourmet Dark Chocolates",
  "A Beautiful Potted Succulent",
  "A Soft Infinity Scarf",
  "A Box of Premium Hibiscus Tea",
  "Handcrafted Flower Earrings",
  "A Decorative Glass Vase"
];

interface Props {
  onComplete: (gift: string) => void;
}

export const GiftSpinner: React.FC<Props> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStopping, setIsStopping] = useState(false);
  const [speed, setSpeed] = useState(50);

  useEffect(() => {
    let timer: number;
    
    if (!isStopping) {
      timer = window.setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % GIFTS.length);
      }, speed);
    } else if (speed < 600) {
      timer = window.setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % GIFTS.length);
        setSpeed((prev) => prev * 1.3);
      }, speed);
    } else {
      setTimeout(() => onComplete(GIFTS[currentIndex]), 1000);
    }

    return () => clearTimeout(timer);
  }, [currentIndex, isStopping, speed, onComplete]);

  useEffect(() => {
    // Start slowing down after 2 seconds
    const stopTimer = setTimeout(() => setIsStopping(true), 2500);
    return () => clearTimeout(stopTimer);
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-rose-50 px-4 overflow-hidden">
      <div className="max-w-xl w-full text-center space-y-12">
        <h2 className="text-3xl font-serif text-rose-800 animate-pulse">
          Choosing a little something special...
        </h2>
        
        <div className="relative h-40 flex items-center justify-center overflow-hidden border-y-2 border-rose-200 bg-white/50 rounded-xl shadow-inner">
          <div className="absolute inset-0 flex flex-col items-center transition-transform duration-100">
             <div className="text-3xl md:text-5xl font-cursive text-rose-600 animate-[bounce_0.5s_infinite]">
               {GIFTS[currentIndex]}
             </div>
          </div>
          {/* Indicator arrows */}
          <div className="absolute left-4 text-4xl text-rose-300 opacity-50">✦</div>
          <div className="absolute right-4 text-4xl text-rose-300 opacity-50">✦</div>
        </div>

        <p className="text-rose-400 font-light italic">
          (Under 1000 Ksh, but priceless in sentiment!)
        </p>
      </div>
    </div>
  );
};
