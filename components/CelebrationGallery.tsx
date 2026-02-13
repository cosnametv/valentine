
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

export const CelebrationGallery: React.FC = () => {
  const [aiImageUrl, setAiImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateCelebrationImage = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{
              text: 'An elegant birthday celebration scene for a lady named Valentine. Pink and gold balloons, a beautiful cake with flowers, high-end photography, soft bokeh background, elegant and celebratory atmosphere.'
            }]
          },
          config: {
            imageConfig: {
              aspectRatio: "16:9"
            }
          }
        });

        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setAiImageUrl(`data:image/png;base64,${part.inlineData.data}`);
            break;
          }
        }
      } catch (err) {
        console.error("Image generation failed:", err);
        setAiImageUrl("https://picsum.photos/id/493/1200/675");
      } finally {
        setLoading(false);
      }
    };

    generateCelebrationImage();
  }, []);

  return (
    <div className="space-y-16">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-serif text-rose-900">Visual Celebration</h2>
        <p className="text-rose-500 font-light">A portrait of a perfect day</p>
      </div>

      <div className="grid gap-8">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
          {loading ? (
            <div className="w-full aspect-video bg-rose-100 animate-pulse flex items-center justify-center">
              <p className="text-rose-400 font-serif italic text-xl">Creating something beautiful...</p>
            </div>
          ) : (
            <img 
              src={aiImageUrl || "https://picsum.photos/id/493/1200/675"} 
              alt="Celebration" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-rose-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-12">
            <p className="text-white text-3xl font-cursive">Created exclusively for Valentine</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[102, 399, 429, 658].map((id, i) => (
            <div key={i} className="aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
              <img 
                src={`https://picsum.photos/id/${id}/500/500`} 
                alt="Memory" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
