import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { useMovieContext } from '../context/MovieContext';

const MovieCard = ({ movie }) => {
  const { addToWatchlist, removeFromWatchlist, isWatchlisted } = useMovieContext();
  const saved = isWatchlisted(movie.id);

  const toggleWatchlist = (e) => {
    e.preventDefault();
    saved ? removeFromWatchlist(movie.id) : addToWatchlist(movie);
  };

  // Image null handling
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  return (
    <div className="group relative bg-white/5 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300">
      <Link to={`/movie/${movie.id}`}>
        <img src={posterUrl} alt={movie.title} className="w-full aspect-[2/3] object-cover" />
        <div className="p-4">
          <h3 className="font-bold truncate">{movie.title}</h3>
          <div className="flex items-center justify-between mt-2 text-sm text-white/60">
            <span>{movie.release_date?.split('-')[0]}</span>
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3 h-3 fill-current" />
              <span>{movie.vote_average?.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </Link>
      <button 
        onClick={toggleWatchlist}
        className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 hover:bg-terra transition-colors"
      >
        <Heart className={`w-4 h-4 ${saved ? 'fill-white text-white' : 'text-white'}`} />
      </button>
    </div>
  );
};

export default MovieCard;
