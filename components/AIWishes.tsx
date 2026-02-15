
import React, { useState, useEffect } from 'react';

interface Wish {
  title: string;
  content: string;
}

interface Props {
  name: string;
}

const DATA = {
  openers: [
    "Valentine, I was just thinking about how",
    "I want you to know that",
    "Today is such a special day because",
    "Looking back at our friendship, I realize",
    "My heart is always so full knowing",
    "It's hard to put into words, but",
    "Thinking of you today makes me feel so lucky that",
    "I'm sitting here reflecting on how much",
    "To my dearest Valentine: I hope you know",
    "Every time I think of our bond, I feel that",
    "You are such an amazing lady, and",
    "I'm so incredibly grateful that"
  ],
  themes: [
    "your trust with my secrets is something I cherish deeply.",
    "your laughter is the one thing that can always brighten my day.",
    "you make my heart feel so warm just by being yourself.",
    "knowing I can tell you absolutely anything is my favorite thing.",
    "the way we can laugh for hours is a gift I never take for granted.",
    "you have a way of making every moment feel brighter and warmer.",
    "our shared secrets are the threads that hold my world together.",
    "your presence in my life is a constant source of joy and peace.",
    "the trust we share is the most beautiful thing I've ever known.",
    "you are the person who truly understands my heart without words.",
    "your kindness and grace inspire me to be a better person.",
    "you are the amazing confidante I always dreamed of having."
  ],
  closers: [
    "I'm so lucky to call you my best friend.",
    "Happy Birthday, my dear! You deserve the world.",
    "I'll always be here for you, no matter what happens.",
    "You deserve all the happiness your heart can hold today.",
    "Here's to a lifetime of more secrets and endless laughter.",
    "My life is infinitely better simply because you're in it.",
    "I hope your day is as beautiful as your heart is.",
    "Thank you for being the amazing lady that you are.",
    "I cherish you more than words could ever express.",
    "May this year be your most magical one yet, Valentine.",
    "You are my safe haven, and I love you for that.",
    "I'm sending you all the warmth in my heart today."
  ],
  titles: [
    "A Personal Note", "From My Heart", "Thinking of You", 
    "Our Sacred Bond", "Today's Wish", "My Dearest Friend", 
    "Shared Secrets", "Warm Reflections", "To My Favorite Lady",
    "A Rare Friendship", "Heartfelt Wishes", "My Confidante"
  ]
};

// A simple pseudo-random generator seeded by a number
const mulberry32 = (a: number) => {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

export const AIWishes: React.FC<Props> = ({ name }) => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Get current date as a unique number (YYYYMMDD)
    const now = new Date();
    const dateSeed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
    
    // 2. Initialize our seeded random generator
    const random = mulberry32(dateSeed);

    const generateDailyWishes = () => {
      const results: Wish[] = [];
      const usedCombos = new Set<string>();

      // Generate 3 unique wishes for the day
      while (results.length < 3) {
        // We use the random() function multiple times to pick indices
        const oIdx = Math.floor(random() * DATA.openers.length);
        const tIdx = Math.floor(random() * DATA.themes.length);
        const cIdx = Math.floor(random() * DATA.closers.length);
        const titleIdx = Math.floor(random() * DATA.titles.length);

        const comboKey = `${oIdx}-${tIdx}-${cIdx}`;
        if (!usedCombos.has(comboKey)) {
          usedCombos.add(comboKey);
          results.push({
            title: DATA.titles[titleIdx],
            content: `${DATA.openers[oIdx]} ${DATA.themes[tIdx]} ${DATA.closers[cIdx]}`
          });
        }
      }
      setWishes(results);
      setLoading(false);
    };

    // Small delay to simulate "careful selection"
    const timer = setTimeout(generateDailyWishes, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-serif text-rose-900 italic">Messages From Me</h2>
        <p className="text-rose-500 font-light italic text-lg uppercase tracking-widest">
          Three special thoughts for today
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="bg-rose-50 p-10 rounded-[2.5rem] animate-pulse space-y-4 h-64 border border-rose-100">
              <div className="h-6 w-1/2 bg-rose-200 rounded"></div>
              <div className="h-4 bg-rose-100 rounded w-full"></div>
              <div className="h-4 bg-rose-100 rounded w-5/6"></div>
              <div className="h-4 bg-rose-100 rounded w-3/4"></div>
            </div>
          ))
        ) : (
          wishes.map((wish, index) => (
            <div 
              key={`${index}-${wish.title}`} 
              className="bg-white p-10 rounded-[2.5rem] border border-rose-100 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-700 group relative overflow-hidden flex flex-col justify-between min-h-[340px]"
            >
              {/* Decorative Heart Background */}
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-all duration-500 group-hover:rotate-12 group-hover:scale-125">
                 <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" className="text-rose-600">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                 </svg>
              </div>

              <div>
                <h3 className="text-2xl font-serif text-rose-800 mb-6 group-hover:text-rose-600 transition-colors">
                  {wish.title}
                </h3>
                <p className="text-rose-700 text-lg leading-relaxed italic font-light">
                  "{wish.content}"
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <div className="flex gap-1.5">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-rose-200"></div>
                  ))}
                </div>
                <div className="text-rose-100 text-5xl font-serif select-none italic">”</div>
              </div>
            </div>
          ))
        )}
      </div>

      {!loading && (
        <div className="flex flex-col items-center gap-4 mt-16">
          <div className="h-px w-24 bg-rose-100 mb-4"></div>
          <p className="text-[11px] text-rose-300 uppercase tracking-[0.4em] font-bold text-center">
            New messages arrive with every sunrise
          </p>
        </div>
      )}
    </div>
  );
};
