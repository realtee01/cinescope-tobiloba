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
        const options = { headers: { Authorization: `Bearer ${token}` } };
        
        const [movieRes, castRes, similarRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${id}`, options),
          fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, options),
          fetch(`https://api.themoviedb.org/3/movie/${id}/similar`, options)
        ]);

        const movieData = await movieRes.json();
        const castData = await castRes.json();
        const similarData = await similarRes.json();

        setMovie(movieData);
        setCast(castData.cast.slice(0, 10)); // Top 10 cast members
        setSimilar(similarData.results.slice(0, 4)); // Top 4 similar
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <div className="p-20 text-center animate-pulse text-2xl">Loading Movie Details...</div>;
  if (!movie) return <div className="p-20 text-center">Movie not found.</div>;

  return (
    <div className="pb-20">
      <button onClick={() => navigate(-1)} className="m-6 flex items-center gap-2 text-white/60 hover:text-white">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-[400px_1fr] gap-12">
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          className="rounded-3xl shadow-2xl w-full"
          alt={movie.title}
        />
        
        <div className="space-y-6">
          <h1 className="text-5xl font-display font-black">{movie.title}</h1>
          <p className="text-terra-light italic text-xl">{movie.tagline}</p>
          
          <div className="flex flex-wrap gap-6 text-sm text-white/70">
            <div className="flex items-center gap-2"><Star className="w-4 h-4 text-amber-400 fill-current" /> {movie.vote_average.toFixed(1)}</div>
            <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {movie.runtime} min</div>
            <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {movie.release_date.split('-')[0]}</div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold">Overview</h3>
            <p className="leading-relaxed text-white/80">{movie.overview}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Top Cast</h3>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {cast.map(person => (
                <div key={person.id} className="min-w-[100px] text-center">
                  <img 
                    src={person.profile_path ? `https://image.tmdb.org/t/p/w200${person.profile_path}` : 'https://via.placeholder.com/200x300?text=No+Photo'} 
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-2 border-2 border-white/10"
                    alt={person.name}
                  />
                  <p className="text-[10px] font-bold truncate w-24">{person.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
