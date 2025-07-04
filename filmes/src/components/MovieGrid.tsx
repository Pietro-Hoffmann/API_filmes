import React from 'react';
import MovieCard from './MovieCard';
import LoadingSpinner from './LoadingSpinner';
import { Film } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  onMovieDetailsClick: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ 
  movies, 
  loading, 
  error, 
  searchTerm, 
  onMovieDetailsClick 
}) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-400 text-lg mb-4 bg-red-50 p-4 rounded-lg border border-red-200">
          {error}
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <Film className="mx-auto h-16 w-16 text-white/40 mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">
          {searchTerm ? 'Nenhum filme encontrado' : 'Nenhum filme disponível'}
        </h3>
        <p className="text-white/70">
          {searchTerm 
            ? `Não encontramos filmes para "${searchTerm}". Tente outro termo.`
            : 'Não há filmes disponíveis no momento.'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard 
          key={movie.id} 
          movie={movie} 
          onDetailsClick={onMovieDetailsClick}
        />
      ))}
    </div>
  );
};

export default MovieGrid;