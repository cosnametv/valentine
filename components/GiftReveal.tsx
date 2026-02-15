
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface Props {
  gift: string;
  name: string;
}

export const GiftReveal: React.FC<Props> = ({ gift, name }) => {
  const [reasoning, setReasoning] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReasoning = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `I have chosen "${gift}" as a birthday gift for my friend ${name}. 
          It's a thoughtful gift under 1000 Ksh. 
          Write a short, heartwarming message (2-3 sentences) from ME to HER explaining why this small gift represents my appreciation for her. 
          Tone: Very personal, "best friend" vibes, focus on how she makes my heart warm. Use "I" and "me".`,
        });
        setReasoning(response.text || "");
      } catch (err) {
        setReasoning(`I picked this ${gift} for you because even the smallest things remind me of your beautiful spirit. You deserve the world, Valentine.`);
      } finally {
        setLoading(false);
      }
    };
    fetchReasoning();
  }, [gift, name]);

  return (
    <div className="bg-gradient-to-br from-rose-50 to-white p-8 md:p-16 rounded-[3rem] border border-rose-100 shadow-xl overflow-hidden relative">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-rose-200/20 rounded-full blur-3xl"></div>
      
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-rose-100 flex-shrink-0 relative">
          <span className="text-6xl animate-bounce">🎁</span>
          <div className="absolute -bottom-2 bg-rose-500 text-white text-xs px-3 py-1 rounded-full font-bold uppercase tracking-widest shadow-md">
            Selected
          </div>
        </div>

        <div className="flex-1 space-y-6 text-center md:text-left">
          <div>
            <span className="text-rose-400 font-medium text-sm tracking-widest uppercase">My small token for you</span>
            <h3 className="text-4xl md:text-5xl font-serif text-rose-900 mt-2">{gift}</h3>
          </div>
          
          <div className="min-h-[100px] flex items-center">
            {loading ? (
              <div className="space-y-2 w-full">
                <div className="h-4 bg-rose-100 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-rose-100 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-rose-100 rounded w-1/2 animate-pulse"></div>
              </div>
            ) : (
              <p className="text-xl text-rose-800 font-cursive leading-relaxed">
                "{reasoning}"
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
