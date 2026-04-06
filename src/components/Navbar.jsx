import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Heart, Search } from 'lucide-react';
import { useMovieContext } from '../ context/MovieContext';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { watchlist = useMovieContext () ;//Get the watchlist array to show the count

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-[#0a0a0a] border-b border-white/10 px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold italic text-orange-500 tracking-tighter" onClick={() => setIsOpen(false)}>
          CineScope
        </Link>

        {/* Desktop Links (Hidden on Mobile) */}
        <div className="hidden lg:flex items-center gap-8">
          <Link to="/" className="hover:text-orange-500 transition font-medium">Movies</Link>
          <Link to="/watchlist" className="relative hover:text-orange-500 transition flex items-center gap-1">
            Watchlist
            <div className="relative">
              <Heart size={22} />
              {watchlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {watchlist.length}
                </span>
              )}
            </div>
          </Link>
          <Link to="/login" className="hover:text-orange-500 font-medium">Login</Link>
          <Link to="/signup" className="bg-orange-500 px-6 py-2 rounded-full font-bold hover:bg-orange-600">Sign Up</Link>
        </div>

        {/* Mobile Icons Group */}
        <div className="flex lg:hidden items-center gap-5">
           {/* Mobile Watchlist Heart with Counter */}
           <Link to="/watchlist" className="relative p-1">
             <Heart size={26} />
             {watchlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {watchlist.length}
                </span>
             )}
           </Link>
           
           {/* Hamburger Toggle */}
           <button onClick={() => setIsOpen(!isOpen)} className="text-white p-1">
             {isOpen ? <X size={30} /> : <Menu size={30} />}
           </button>
        </div>
      </div>

      {/* Mobile Menu Overlay - FIXED TRANSPARENCY & SPACING */}
      <div className={`fixed inset-0 top-[60px] bg-[#0a0a0a] z-[99] flex flex-col transition-all duration-300 ease-in-out lg:hidden ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        <div className="flex flex-col p-8 gap-8 text-2xl font-bold">
          <Link to="/" onClick={() => setIsOpen(false)} className="border-b border-white/5 pb-4">Movies</Link>
          <Link to="/watchlist" onClick={() => setIsOpen(false)} className="border-b border-white/5 pb-4 flex justify-between items-center">
            Watchlist
            <span className="bg-orange-500 text-sm px-3 py-1 rounded-full">{watchlist.length}</span>
          </Link>
          <Link to="/login" onClick={() => setIsOpen(false)} className="border-b border-white/5 pb-4">Login</Link>
          <Link to="/signup" onClick={() => setIsOpen(false)} className="text-orange-500">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
