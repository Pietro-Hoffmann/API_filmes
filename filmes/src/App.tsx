import React, { useState, useCallback } from 'react';
import { Film } from 'lucide-react';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import MovieModal from './components/MovieModal';
import { useMovies } from './hooks/useMovies';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  backdrop_path?: string;
  runtime?: number;
  genres?: { id: number; name: string }[];
  production_companies?: { id: number; name: string }[];
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  
  const { movies, loading, error, searchMovies, getMovieDetails } = useMovies();

  const handleSearchChange = useCallback(
    async (term: string) => {
      setSearchTerm(term);
      await searchMovies(term);
    },
    [searchMovies]
  );

  const handleMovieDetailsClick = async (movie: Movie) => {
    setLoadingDetails(true);
    setIsModalOpen(true);
    
    // Buscar detalhes completos do filme
    const detailedMovie = await getMovieDetails(movie.id);
    
    if (detailedMovie) {
      setSelectedMovie(detailedMovie);
    } else {
      // Se não conseguir buscar os detalhes, usar os dados básicos
      setSelectedMovie(movie);
    }
    
    setLoadingDetails(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Film className="h-10 w-10 text-blue-400" />
            <h1 className="text-3xl font-bold text-white">
              CineScope
            </h1>
          </div>
          
          <div className="text-center mb-6">
            <p className="text-white/80 text-lg">
              Descubra os melhores filmes do momento
            </p>
          </div>
          
          <SearchBar 
            searchTerm={searchTerm} 
            onSearchChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            {searchTerm ? `Resultados para "${searchTerm}"` : 'Filmes Populares'}
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </div>

        <MovieGrid 
          movies={movies} 
          loading={loading} 
          error={error} 
          searchTerm={searchTerm}
          onMovieDetailsClick={handleMovieDetailsClick}
        />
      </div>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}

      {/* Loading overlay for modal */}
      {loadingDetails && isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 flex items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-gray-700">Carregando detalhes...</span>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white/5 backdrop-blur-lg border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-white/60 text-sm">
            Dados fornecidos por The Movie Database (TMDb)
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;