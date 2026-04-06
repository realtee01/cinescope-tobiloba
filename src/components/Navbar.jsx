import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Heart, Search, LogIn, UserPlus } from 'lucide-react';
import { useMovieContext } from '../context/MovieContext'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { watchlist } = useMovieContext(); // Matches your context export exactly

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-[#0a0a0a] border-b border-white/10 px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo - Keeping your Italic Style */}
        <Link 
          to="/" 
          className="text-2xl font-bold italic text-orange-500 tracking-tighter"
          onClick={() => setIsOpen(false)}
        >
          CineScope
        </Link>

        {/* Desktop Navigation (Visible on Laptops) */}
        <div className="hidden lg:flex items-center gap-8 font-medium">
          <Link to="/" className="hover:text-orange-500 transition">Movies</Link>
          
          <Link to="/watchlist" className="relative hover:text-orange-500 transition flex items-center gap-1">
            Watchlist
            <div className="relative ml-1">
              <Heart size={22} />
              {watchlist?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-black">
                  {watchlist.length}
                </span>
              )}
            </div>
          </Link>

          <Link to="/login" className="hover:text-orange-500 transition border-l border-white/10 pl-8">Login</Link>
          <Link to="/signup" className="bg-orange-500 px-6 py-2 rounded-full font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-500/20">
            Sign Up
          </Link>
        </div>

        {/* Mobile Icons Group (Visible on Phones) */}
        <div className="flex lg:hidden items-center gap-5">
           {/* Mobile Watchlist Heart with Counter */}
           <Link to="/watchlist" className="relative p-1" onClick={() => setIsOpen(false)}>
             <Heart size={26} />
             {watchlist?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-black">
                  {watchlist.length}
                </span>
             )}
           </Link>
           
           {/* Hamburger Toggle */}
           <button onClick={toggleMenu} className="text-white p-1 focus:outline-none">
             {isOpen ? <X size={30} /> : <Menu size={30} />}
           </button>
        </div>
      </div>

      {/* Mobile Slide-out Menu Overlay (Fixed Transparency) */}
      <div className={`fixed inset-0 top-[60px] bg-[#0a0a0a] z-[99] flex flex-col transition-all duration-300 ease-in-out lg:hidden ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        <div className="flex flex-col p-8 gap-8 text-2xl font-bold tracking-tight">
          <Link to="/" onClick={toggleMenu} className="border-b border-white/5 pb-4">
            Movies
          </Link>
          <Link to="/watchlist" onClick={toggleMenu} className="border-b border-white/5 pb-4 flex justify-between items-center">
            My Watchlist
            <span className="bg-orange-500 text-sm px-4 py-1 rounded-full">{watchlist?.length || 0}</span>
          </Link>
          <Link to="/login" onClick={toggleMenu} className="border-b border-white/5 pb-4 flex items-center gap-3">
            <LogIn size={24} /> Login
          </Link>
          <Link to="/signup" onClick={toggleMenu} className="bg-orange-500 p-5 rounded-2xl flex items-center justify-center gap-3 text-white">
            <UserPlus size={24} /> Create Account
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
