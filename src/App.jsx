/**
 * CineScope - Movie Discovery Web App
 * Built by: Tobiloba Akala
 * Features: Context API, TMDB Integration, Persistent Watchlist
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Watchlist from './pages/Watchlist';

function App() {
  return (
    <MovieProvider>
      <Router>
        <div className="min-h-screen bg-[#0a0a0a] text-white">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/watchlist" element={<Watchlist />} />
              {/* REMOVED: The redirect line that was causing the loop */}
            </Routes>
          </main>
        </div>
      </Router>
    </MovieProvider>
  );
}

export default App;
