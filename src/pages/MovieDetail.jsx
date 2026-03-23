import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, Calendar, ArrowLeft } from 'lucide-react';
import MovieCard from '../components/MovieCard';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const token = import.meta.env.VITE_TMDB_TOKEN;
        const options = {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: 'application/json'
          }
        };

        // We use Promise.all to fetch everything at the same time correctly
        const [movieRes, castRes, similarRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${id}`, options),
          fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, options),
          fetch(`https://api.themoviedb.org/3/movie/${id}/similar`, options)
        ]);

        const movieData = await movieRes.json();
        const castData = await castRes.json();
        const similarData = await similarRes.json();

        setMovie(movieData);
        setCast(castData.cast?.slice(0, 10) || []);
        setSimilar(similarData.results?.slice(0, 4) || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
    window.scrollTo(0, 0); // Reset scroll to top when opening a movie
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!movie) return <div className="min-h-screen flex items-center justify-center">Movie not found.</div>;

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Header */}
      <div className="relative h-[70vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
        <img 
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} 
          className="w-full h-full object-cover"
          alt=""
        />
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-8 left-8 z-20 p-3 bg-black/50 backdrop-blur-xl rounded-full border border-white/10 hover:bg-[#C4622D] transition-all"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-20">
        <div className="grid md:grid-cols-[300px_1fr] gap-12">
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            className="rounded-2xl shadow-2xl border border-white/10 hidden md:block"
            alt={movie.title}
          />
          <div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase italic tracking-tighter">
              {movie.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/60 mb-8 font-medium">
              <span className="flex items-center gap-2"><Star size={18} className="text-yellow-500 fill-yellow-500"/> {movie.vote_average?.toFixed(1)}</span>
              <span className="flex items-center gap-2"><Clock size={18}/> {movie.runtime} mins</span>
              <span className="flex items-center gap-2"><Calendar size={18}/> {movie.release_date?.split('-')[0]}</span>
            </div>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-3xl">
              {movie.overview}
            </p>
            
            {/* Cast List */}
            <div className="mb-12">
              <h2 className="text-xl font-bold mb-4 uppercase tracking-widest text-[#C4622D]">Top Cast</h2>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {cast.map(person => (
                  <div key={person.id} className="min-w-[100px] text-center">
                    <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-2 border border-white/10">
                      <img src={`https://image.tmdb.org/t/p/w200${person.profile_path}`} className="w-full h-full object-cover" alt=""/>
                    </div>
                    <p className="text-[10px] font-bold truncate">{person.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Movies */}
        {similar.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-8 italic uppercase tracking-tighter">You might also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {similar.map(item => <MovieCard key={item.id} movie={item} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
