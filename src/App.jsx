import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Splash from './components/Splash';

function App() {
  const [loading, setLoading] = useState(true);

  // Automatically hide splash after 4.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Splash />
      ) : (
        <Router>
          <div className="bg-black min-h-screen text-white selection:bg-orange-500 selection:text-white">
            <Navbar />
            <main className="pt-20"> {/* Prevents content from hiding under fixed Navbar */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={
                  <div className="h-[80vh] flex items-center justify-center">
                    <p className="text-gray-500 italic">Login functionality coming soon via Supabase...</p>
                  </div>
                } />
                <Route path="/signup" element={
                  <div className="h-[80vh] flex items-center justify-center">
                    <p className="text-gray-500 italic">Signup functionality coming soon via Supabase...</p>
                  </div>
                } />
              </Routes>
            </main>
          </div>
        </Router>
      )}
    </>
  );
}

export default App;

