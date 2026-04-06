import { useEffect, useState } from 'react';

const Splash = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4000); // 4 seconds splash
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
      <div className="relative">
        {/* Animated Logo Text */}
        <h1 className="text-5xl font-bold text-orange-500 animate-pulse tracking-tighter">
          CineScope
        </h1>
        {/* Subtle loading line */}
        <div className="mt-4 w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-orange-500 animate-[loading_4s_ease-in-out]" 
               style={{ width: '100%', transformOrigin: 'left' }}>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
