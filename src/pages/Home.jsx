import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import SkeletonCard from '../components/MovieSkeleton'; // FIXED: Matches your filename

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const fetchMovies = async (query) => {
    try {
      setLoading(true);
      setError(null);
      
      const token = import.meta.env.VITE_TMDB_TOKEN;
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json'
        }
      };

      // Search endpoint if query exists, otherwise Trending
      const endpoint = query
        ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`
        : `https://api.themoviedb.org/3/trending/movie/day?language=en-US`;

      const response = await fetch(endpoint, options);
      if (!response.ok) throw new Error('Failed to fetch movies. Check your connection.');
      
      const data = await response.json();
      setMovies(data.results || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- DEBOUNCE LOGIC (Satisfies Requirement) ---
  useEffect(() => {
    const getData = setTimeout(() => {
      fetchMovies(searchQuery);
    }, 500); // Waits 0.5s after you stop typing

    return () => clearTimeout(getData);
  }, [searchQuery]); 

  if (error) return (
    <div className="flex flex-col items-center justify-center h-screen p-6 text-center">
      <p className="text-red-500 font-bold mb-4">Error: {error}</p>
      <button 
        onClick={() => fetchMovies(searchQuery)} 
        className="bg-orange-500 px-6 py-2 rounded-full text-white"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div className="pb-20 min-h-screen bg-black text-white">
      {/* Hero Section - Only shows on trending page */}
      {!searchQuery && movies[0] && !loading && (
        <div className="relative h-[60vh] w-full mb-10">
          <img 
            src={`https://image.tmdb.org/t/p/original${movies[0].backdrop_path}`}
            className="w-full h-full object-cover opacity-60"
            alt="Hero Backdrop"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute bottom-10 left-6 md:left-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-2">{movies[0].title}</h1>
            <p className="text-white/70 line-clamp-2 max-w-xl">{movies[0].overview}</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6 mt-10">
          {searchQuery ? `Results for "${searchQuery}"` : 'Trending Today'}
        </h2>

        {movies.length === 0 && !loading ? (
          <p className="text-white/50 text-center py-20">No movies found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {loading 
              ? Array(10).fill(0).map((_, i) => <SkeletonCard key={i} />) // FIXED: Uses SkeletonCard
              : movies.map(m => <MovieCard key={m.id} movie={m} />)
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
