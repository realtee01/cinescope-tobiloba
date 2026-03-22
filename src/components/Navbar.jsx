import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, Menu, X } from 'lucide-react';
import { useMovieContext } from '../context/MovieContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { watchlist } = useMovieContext();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) navigate(`/?search=${encodeURIComponent(query)}`);
      else navigate('/');
    [span_5](start_span)}, 400); // Debounce requirement[span_5](end_span)
    return () => clearTimeout(timer);
  }, [query, navigate]);

  return (
    <nav className="bg-black/95 border-b border-white/10 sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <Link to="/" className="text-2xl font-black italic text-terra-light font-display">CineScope</Link>
        
        [span_6](start_span){/* Search Bar[span_6](end_span) */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search movies..." 
            className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-terra"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-6">
          <Link to="/watchlist" className="relative">
            <Heart className={`w-6 h-6 ${watchlist.length > 0 ? 'fill-terra text-terra' : 'text-white'}`} />
            {watchlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-terra text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {watchlist.length}
              </span>
            )}
          </Link>
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      [span_7](start_span){/* Mobile Hamburger Menu[span_7](end_span) */}
      {isOpen && (
        <div className="md:hidden pt-4 pb-2 border-t border-white/10 mt-4">
          <input 
            type="text" 
            placeholder="Search movies..." 
            className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
