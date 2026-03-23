import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart } from 'lucide-react';
import { useMovieContext } from '../context/MovieContext';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const { watchlist } = useMovieContext();
  const navigate = useNavigate();
  const location = useLocation();

  // Keep the search fix: Only navigate if user is typing
  useEffect(() => {
    if (query.trim().length > 0) {
      const timer = setTimeout(() => {
        navigate(`/?search=${encodeURIComponent(query)}`);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [query, navigate]);

  // Clear search bar when navigating away from Home
  useEffect(() => {
    if (location.pathname !== '/') {
      setQuery('');
    }
  }, [location.pathname]);

  return (
    <nav className="bg-black/95 border-b border-white/10 sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <Link to="/" className="text-2xl font-black italic text-[#C4622D]">
          CineScope
        </Link>
        
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search movies..." 
            className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-[#C4622D] text-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* WATCHLIST HEART + COUNTER BADGE */}
        <Link to="/watchlist" className="relative p-2 group">
          <Heart 
            className={`w-6 h-6 transition-colors ${
              watchlist.length > 0 ? 'fill-[#C4622D] text-[#C4622D]' : 'text-white/70 group-hover:text-white'
            }`} 
          />
          
          {/* THE COUNTER ICON */}
          {watchlist.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#C4622D] text-white text-[10px] font-black px-1.5 py-0.5 rounded-full border-2 border-black min-w-[20px] text-center">
              {watchlist.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
