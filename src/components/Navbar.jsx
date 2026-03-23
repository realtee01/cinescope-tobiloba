import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart } from 'lucide-react';
import { useMovieContext } from '../context/MovieContext';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const { watchlist } = useMovieContext();
  const navigate = useNavigate();
  const location = useLocation();

  // FIX: Only trigger the search redirect if the user is actually typing
  useEffect(() => {
    if (query.trim().length > 0) {
      const timer = setTimeout(() => {
        navigate(`/?search=${encodeURIComponent(query)}`);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [query, navigate]);

  // FIX: Clear search bar when navigating away from Home
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
            className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-[#C4622D]"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <Link to="/watchlist" className="relative p-2">
          <Heart className={`w-6 h-6 ${watchlist.length > 0 ? 'fill-[#C4622D] text-[#C4622D]' : 'text-white'}`} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
