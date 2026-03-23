import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, Calendar, ArrowLeft, PlayCircle } from 'lucide-react';
import MovieCard from '../components/MovieCard';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Reset state whenever the ID changes to prevent "Ghost Data"
    setLoading(true);
    setMovie(null);
    
    const fetchMovieDetails = async () => {
      try {
        const token = import.meta.env.VITE_TMDB_TOKEN;
        const options = {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: 'application/json'
          }
        };

        // Fetch both the movie details and similar movies at once
        const [movieRes, similarRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${id}?append_to_response=videos`, options),
          fetch(`https://api.themoviedb.org/3/movie/${id}/similar`, options)
        ]);

        const movieData = await movieRes.json();
        const similarData = await similarRes.json();

        if (movieData.success === false) {
           navigate('/'); // If API returns error, go home safely
           return;
        }

        setMovie(movieData);
        setSimilar(similarData.results?.slice(0, 4) || []);
      } catch (err) {
        console.error("Error fetching details:", err);
        navigate('/'); // Safety redirect if the network fails
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
    
    // 2. This ensures the user starts at the top of the new movie page
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }, [id, navigate]); // <--- THE PERMANENT FIX: Re-runs when ID changes

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#C4622D] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-20">
      {/* Backdrop Hero */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent z-10" />
        <img 
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`} 
          className="w-full h-full object-cover transform scale-105 animate-pulse-slow"
          alt=""
        />
        
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-20 p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10 hover:bg-[#C4622D] transition-all"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 -mt-40 relative z-20">
        <div className="grid lg:grid-cols-[350px_1fr] gap-12">
          {/* Poster */}
          <div className="hidden lg:block">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} 
              className="rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5"
              alt={movie?.title}
            />
          </div>

          {/* Details */}
          <div className="pt-10">
            <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-6">
              {movie?.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/60 mb-8 font-bold uppercase tracking-widest text-xs">
              <span className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-md border border-white/10">
                <Star size={14} className="text-yellow-500 fill-yellow-500" /> 
                {movie?.vote_average?.toFixed(1)}
              </span>
              <span className="flex items-center gap-2"><Clock size={14} /> {movie?.runtime} MIN</span>
              <span className="flex items-center gap-2"><Calendar size={14} /> {movie?.release_date?.split('-')[0]}</span>
            </div>

            <p className="text-xl md:text-2xl text-white/70 leading-relaxed mb-10 font-light">
              {movie?.overview}
            </p>

            <div className="flex gap-4 mb-16">
              <button className="bg-[#C4622D] text-black px-8 py-4 rounded-full font-black uppercase flex items-center gap-3 hover:scale-105 transition-transform">
                <PlayCircle /> Watch Trailer
              </button>
            </div>
          </div>
        </div>

        {/* Similar Movies Section */}
        {similar.length > 0 && (
          <div className="mt-24 border-t border-white/5 pt-16">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-10 flex items-center gap-4">
              <span className="w-12 h-[2px] bg-[#C4622D]"></span>
              More like this
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {similar.map(m => (
                <MovieCard key={m.id} movie={m} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
