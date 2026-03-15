import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

/**
 * Extracts YouTube video ID from various URL formats.
 */
function getYouTubeVideoId(url: string): string | null {
  if (!url?.trim()) return null;
  const trimmed = url.trim();
  const watchMatch = trimmed.match(/(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];
  const shortMatch = trimmed.match(/(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];
  const embedMatch = trimmed.match(/(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];
  return null;
}

export const SeeMorePage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePasteOrSubmit = useCallback(() => {
    setError(null);
    const id = getYouTubeVideoId(inputValue);
    if (id) {
      setVideoId(id);
    } else {
      setError('Please paste a valid YouTube link (e.g. youtube.com/watch?v=... or youtu.be/...)');
      setVideoId(null);
    }
  }, [inputValue]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100">
      <div className="max-w-2xl mx-auto px-4 py-12 md:py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-medium mb-10 focus:outline-none focus:ring-2 focus:ring-rose-300 rounded-lg px-2 py-1"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to celebration
        </Link>

        <div className="bg-white rounded-3xl shadow-xl border border-rose-100 p-6 md:p-10">
          <h1 className="text-3xl font-serif text-rose-900 mb-2">See More</h1>
          <p className="text-rose-600 mb-8">Paste a YouTube link below to watch a preview.</p>

          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <input
              type="url"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handlePasteOrSubmit()}
              placeholder="https://www.youtube.com/watch?v=..."
              className="flex-1 px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
              aria-label="YouTube link"
            />
            <button
              type="button"
              onClick={handlePasteOrSubmit}
              className="px-6 py-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 whitespace-nowrap"
            >
              Preview
            </button>
          </div>

          {error && (
            <p className="text-sm text-rose-600 bg-rose-50 px-4 py-2 rounded-lg mb-4" role="alert">
              {error}
            </p>
          )}

          {videoId && (
            <div className="rounded-2xl overflow-hidden bg-rose-50 border border-rose-100 mt-6">
              <div className="aspect-video w-full">
                <iframe
                  title="YouTube video preview"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
