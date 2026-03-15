import React from 'react';
import { Link } from 'react-router-dom';

export const SeeMore: React.FC = () => {
  return (
    <div className="flex justify-center py-8">
      <Link
        to="/see-more"
        className="px-8 py-4 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-semibold tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 inline-block"
      >
        See More
      </Link>
    </div>
  );
};
