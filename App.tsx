import React, { useState } from 'react';
import { BirthdayHero } from './components/BirthdayHero';
import { GiftBox } from './components/GiftBox';
import { AIWishes } from './components/AIWishes';
import { CelebrationGallery } from './components/CelebrationGallery';
import { ConfettiEffect } from './components/ConfettiEffect';
import { PersonalNote } from './components/PersonalNote';

const App: React.FC = () => {
  const [isSurprised, setIsSurprised] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSurprise = () => {
    setIsSurprised(true);
    setShowConfetti(true);
    // Stop confetti after 8 seconds
    setTimeout(() => setShowConfetti(false), 8000);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-rose-200">
      {showConfetti && <ConfettiEffect />}
      
      {!isSurprised ? (
        <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 to-pink-100 px-4 text-center">
          <div className="max-w-md space-y-8">
            <h1 className="text-4xl md:text-6xl font-serif text-rose-800 opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
              Something special is waiting...
            </h1>
            <p className="text-lg text-rose-600 font-light opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]">
              For an amazing lady named Valentine.
            </p>
            <div className="opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
              <GiftBox onClick={handleSurprise} />
            </div>
            <p className="text-sm text-rose-400 font-medium animate-pulse">
              Click the gift to open your surprise!
            </p>
          </div>
        </div>
      ) : (
        <main className="bg-white">
          <BirthdayHero name="Valentine" />
          
          <section className="max-w-6xl mx-auto px-4 py-20 space-y-32">
            <PersonalNote />
            <AIWishes name="Valentine" />
            <CelebrationGallery />
          </section>

          <footer className="py-20 bg-rose-50 text-center">
            <p className="font-cursive text-3xl text-rose-700">Happy Birthday, Valentine!</p>
            <p className="mt-4 text-rose-500 font-light italic">May your year be as beautiful as your heart.</p>
          </footer>
        </main>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;