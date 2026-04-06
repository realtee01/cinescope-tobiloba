import { useEffect } from 'react';

const Splash = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
      <div className="relative">
        <h1 className="text-5xl font-bold text-orange-500 animate-pulse tracking-tighter">
          CINESCOPE
        </h1>
        <div className="mt-4 w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-orange-500 animate-loading-bar origin-left"></div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
