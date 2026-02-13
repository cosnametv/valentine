
import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

interface Props {
  name: string;
}

interface Wish {
  title: string;
  content: string;
}

export const AIWishes: React.FC<Props> = ({ name }) => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `I am writing a birthday surprise for my amazing friend Valentine. 
          Generate 3 short, elegant, and heartfelt birthday wishes from ME to HER. 
          Use a first-person perspective ("I", "me", "my"). 
          The tone should be deeply personal and sincere. 
          Each should be about 2-3 sentences. Return them in JSON format with title and content fields. 
          Mention her kindness, her beauty, and how lucky I feel to know her.`,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  content: { type: Type.STRING }
                },
                required: ["title", "content"]
              }
            }
          }
        });

        const data = JSON.parse(response.text);
        setWishes(data);
      } catch (err) {
        console.error("Error fetching wishes:", err);
        // Fallback wishes in first-person tone
        setWishes([
          { title: "My Dearest Friend", content: `Happy birthday, ${name}! I am so grateful for every moment we spend together and the way you light up my world.` },
          { title: "Your Beautiful Soul", content: `Wishing you a day as radiant as your smile. I feel so incredibly lucky to call you my friend.` },
          { title: "To Many More Years", content: `May this year bring you as much happiness as you've brought into my life. I'll always be here for you.` }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchWishes();
  }, [name]);

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
              key={index} 
              className="bg-white p-10 rounded-3xl border border-rose-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
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
    </div>
  );
};
