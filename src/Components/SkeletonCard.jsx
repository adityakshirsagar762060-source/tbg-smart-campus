import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="glass card animate-pulse p-6 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
      <div className="h-2 w-16 bg-white/10 rounded mb-4"></div>
      <div className="h-4 w-32 bg-white/10 rounded mb-6"></div>
      <div className="h-3 w-24 bg-white/10 rounded"></div>
    </div>
  );
};

export default SkeletonCard;