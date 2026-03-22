import { createContext, useContext, useState, useEffect } from 'react';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  [span_10](start_span)// Load watchlist from localStorage on startup[span_10](end_span)
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('cinescope_watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  [span_11](start_span)[span_12](start_span)// Save to localStorage whenever watchlist changes[span_11](end_span)[span_12](end_span)
  useEffect(() => {
    localStorage.setItem('cinescope_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie) => {
    if (!watchlist.find(m => m.id === movie.id)) {
      setWatchlist([...watchlist, movie]);
    }
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist(watchlist.filter(m => m.id !== movieId));
  };

  const isWatchlisted = (movieId) => watchlist.some(m => m.id === movieId);

  return (
    <MovieContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isWatchlisted }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);
