import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import SkeletonCard from '../components/SkeletonCard';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = import.meta.env.VITE_TMDB_TOKEN;
      const options = { 
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } 
      };
      
      const endpoint = searchQuery 
        ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery)}`
        : 'https://api.themoviedb.org/3/trending/movie/week';

      const response = await fetch(endpoint, options);
      if (!response.ok) throw new Error('Failed to fetch movies');
      const data = await response.json();
      setMovies(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [searchQuery]);

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <p className="text-terra font-bold">Error: {error}</p>
      <button onClick={fetchMovies} className="bg-terra px-6 py-2 rounded-full">Retry</button>
    </div>
  );

  return (
    <div className="pb-20">
      {/* Hero Section - Only shows on main trending page */}
      {!searchQuery && movies[0] && (
        <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
          <img 
            src={`https://image.tmdb.org/t/p/original${movies[0].backdrop_path}`} 
            className="w-full h-full object-cover opacity-50"
            alt="Hero Backdrop"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent" />
          <div className="absolute bottom-10 left-6 md:left-12 max-w-2xl">
            <h1 className="text-4xl md:text-7xl font-display font-black mb-4 leading-tight">{movies[0].title}</h1>
            <p className="text-white/70 line-clamp-3 mb-6 text-sm md:text-base">{movies[0].overview}</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 mt-10">
        <h2 className="text-2xl font-bold mb-8">
          {searchQuery ? `Results for "${searchQuery}"` : 'Trending Movies'}
        </h2>
        
        {movies.length === 0 && !loading ? (
          <p className="text-white/50 text-center py-20">No movies found. Try a different search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            
            {loading 
  ? Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />) 
  : movies.map(m => <MovieCard key={m.id} movie={m} />)
}

          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
