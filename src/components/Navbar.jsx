import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, LogIn, Home, Heart } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 w-full z-[60] bg-black/60 backdrop-blur-xl px-6 py-4 flex justify-between items-center border-b border-white/5">
      <Link to="/" className="text-2xl font-black text-orange-500 tracking-tighter">
        CINESCOPE
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-8 items-center font-medium">
        <Link to="/" className="hover:text-orange-500 transition">Movies</Link>
        <Link to="/watchlist" className="hover:text-orange-500 transition">Watchlist</Link>
        <Link to="/login" className="hover:text-orange-500 transition border-l border-white/10 pl-8">Login</Link>
        <Link to="/signup" className="bg-orange-500 px-6 py-2 rounded-full font-bold hover:bg-orange-600 transition">
          Sign Up
        </Link>
      </div>

      {/* Mobile Toggle */}
      <button className="md:hidden text-white p-2" onClick={toggleMenu}>
        {isOpen ? <X size={30} /> : <Menu size={30} />}
      </button>

      {/* Mobile Side Menu */}
      <div className={`fixed inset-0 bg-black/90 backdrop-blur-sm z-[70] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} md:hidden`}>
        <div className={`fixed right-0 top-0 h-full w-[75%] bg-zinc-950 p-8 flex flex-col gap-8 transition-transform duration-300 border-l border-white/10 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          
          <div className="flex justify-between items-center mb-4">
             <span className="text-orange-500 font-bold text-xl uppercase tracking-widest">Menu</span>
             <button onClick={toggleMenu}><X size={32} /></button>
          </div>

          <div className="flex flex-col gap-6 text-xl font-semibold">
            <Link to="/" onClick={toggleMenu} className="flex items-center gap-4 hover:text-orange-500">
              <Home size={24} /> Home
            </Link>
            <Link to="/watchlist" onClick={toggleMenu} className="flex items-center gap-4 hover:text-orange-500">
              <Heart size={24} /> My Watchlist
            </Link>
            <hr className="border-white/10" />
            <Link to="/login" onClick={toggleMenu} className="flex items-center gap-4 hover:text-orange-500">
              <LogIn size={24} /> Login
            </Link>
            <Link to="/signup" onClick={toggleMenu} className="bg-orange-500 p-4 rounded-2xl text-center font-bold flex items-center justify-center gap-2">
              <User size={20} /> Create Account
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
