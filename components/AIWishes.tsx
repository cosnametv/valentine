
import React, { useState, useEffect, useCallback } from 'react';

interface Wish {
  title: string;
  content: string;
}

interface Props {
  name: string;
}

export const AIWishes: React.FC<Props> = ({ name }) => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [allWishes, setAllWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);

  const shuffleWishes = useCallback((data: Wish[]) => {
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    setWishes(shuffled.slice(0, 3));
  }, []);

  useEffect(() => {
    const loadWishes = async () => {
      try {
        const response = await fetch('./wishes.json');
        const data = await response.json();
        setAllWishes(data);
        shuffleWishes(data);
      } catch (err) {
        console.error("Error loading wishes:", err);
        const fallback = [
          { title: "My Dearest Friend", content: `Happy birthday, ${name}! I am so grateful for every moment we spend together and the way you light up my world.` },
          { title: "Your Beautiful Soul", content: `Wishing you a day as radiant as your smile. I feel so incredibly lucky to call you my friend.` },
          { title: "To Many More Years", content: `May this year bring you as much happiness as you've brought into my life. I'll always be here for you.` }
        ];
        setWishes(fallback);
      } finally {
        setLoading(false);
      }
    };

    loadWishes();
  }, [name, shuffleWishes]);

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-serif text-rose-900 italic">Messages From Me</h2>
        <p className="text-rose-500 font-light italic">Reflections on our wonderful friendship</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="bg-rose-50 p-8 rounded-3xl animate-pulse space-y-4">
              <div className="h-6 w-1/2 bg-rose-200 rounded"></div>
              <div className="h-20 bg-rose-100 rounded"></div>
            </div>
          ))
        ) : (
          wishes.map((wish, index) => (
            <div 
              key={`${index}-${wish.title}`} 
              className="bg-white p-10 rounded-3xl border border-rose-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                 <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-rose-600">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                 </svg>
              </div>
              <h3 className="text-2xl font-serif text-rose-800 mb-4 group-hover:text-rose-600 transition-colors">
                {wish.title}
              </h3>
              <p className="text-rose-700 leading-relaxed italic font-light">
                "{wish.content}"
              </p>
              <div className="mt-6 flex justify-end">
                <span className="text-rose-200 text-3xl">“</span>
              </div>
            </div>
          ))
        )}
      </div>

      {!loading && (
        <div className="flex justify-center mt-12">
          <button 
            onClick={() => shuffleWishes(allWishes)}
            className="px-8 py-3 bg-rose-100 text-rose-700 rounded-full font-medium hover:bg-rose-200 transition-colors flex items-center gap-2 group"
          >
            <span className="group-active:rotate-180 transition-transform duration-500">✨</span>
            See more messages
          </button>
        </div>
      )}
    </div>
  );
};
