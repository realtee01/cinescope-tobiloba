import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import SkeletonCard from '../components/SkeletonCard';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const token = import.meta.env.VITE_TMDB_TOKEN;
        const options = { headers: { Authorization: `Bearer ${token}` } };
        
        [span_16](start_span)// Fetch Genres and Trending[span_16](end_span)
        const [gRes, mRes] = await Promise.all([
          fetch('https://api.themoviedb.org/3/genre/movie/list', options),
          fetch(searchQuery 
            ? `https://api.themoviedb.org/3/search/movie?query=${searchQuery}`
            : 'https://api.themoviedb.org/3/trending/movie/week', options)
        ]);

        const gData = await gRes.json();
        const mData = await mRes.json();
        
        setGenres(gData.genres);
        setMovies(mData.results);
      } catch (err) {
        console.error("Fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, [searchQuery]);

  return (
    <div className="pb-20">
      [span_17](start_span){/* Hero Section[span_17](end_span) */}
      {!searchQuery && movies[0] && (
        <div className="relative h-[70vh] w-full overflow-hidden">
          <img 
            src={`https://image.tmdb.org/t/p/original${movies[0].backdrop_path}`} 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent" />
          <div className="absolute bottom-20 left-10 max-w-2xl">
            <h1 className="text-6xl font-display font-black mb-4">{movies[0].title}</h1>
            <p className="text-white/70 line-clamp-3 mb-6">{movies[0].overview}</p>
            <button className="bg-terra px-8 py-3 rounded-full font-bold">View Details</button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 mt-10">
        <h2 className="text-2xl font-bold mb-8">{searchQuery ? `Results for "${searchQuery}"` : 'Trending Now'}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {loading 
            ? Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />) 
            : movies.map(m => <MovieCard key={m.id} movie={m} />)
          }
        </div>
      </div>
    </div>
  );
};

export default Home;
