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
        <div className="min-h-screen bg-[#0a0a0a] text-white font-body">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/watchlist" element={<Watchlist />} />
            </Routes>
          </main>
        </div>
      </Router>
    </MovieProvider>
  );
}

export default App;
