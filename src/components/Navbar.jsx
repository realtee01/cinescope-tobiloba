import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, Heart } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Your Original CineScope Logo Style */}
        <Link to="/" className="text-2xl font-bold italic text-orange-500 tracking-tighter">
          CineScope
        </Link>

        {/* Your Original Search Bar (Hidden on very small phones, visible on rest) */}
        <div className="hidden sm:flex relative items-center flex-1 max-w-md mx-8">
           <Search className="absolute left-3 text-gray-500" size={18} />
           <input 
             type="text" 
             placeholder="Search movies..." 
             className="w-full bg-[#1a1a1a] border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-500"
           />
        </div>

        {/* Desktop Links (Your preferred Watchlist and Heart) */}
        <div className="hidden lg:flex items-center gap-6">
          <Link to="/watchlist" className="hover:text-orange-500 transition flex items-center gap-2">
            Watchlist <Heart size={20} fill="currentColor" />
          </Link>
          <Link to="/login" className="hover:text-orange-500">Login</Link>
          <Link to="/signup" className="bg-orange-500 px-5 py-2 rounded-full font-bold">Sign Up</Link>
        </div>

        {/* Mobile Toggle & Mobile Heart */}
        <div className="flex lg:hidden items-center gap-4">
           <Link to="/watchlist"><Heart size={24} /></Link>
           <button onClick={() => setIsOpen(!isOpen)} className="text-white">
             {isOpen ? <X size={28} /> : <Menu size={28} />}
           </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 top-[60px] bg-black z-[90] transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}>
        <div className="flex flex-col p-8 gap-8 text-2xl font-bold">
          <Link to="/" onClick={() => setIsOpen(false)}>Movies</Link>
          <Link to="/watchlist" onClick={() => setIsOpen(false)}>Watchlist</Link>
          <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
          <Link to="/signup" onClick={() => setIsOpen(false)} className="text-orange-500">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
