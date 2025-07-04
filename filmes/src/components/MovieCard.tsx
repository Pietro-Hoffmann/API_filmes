import React from 'react';
import { Calendar, Star, Info } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

interface MovieCardProps {
  movie: Movie;
  onDetailsClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onDetailsClick }) => {
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={movie.title}
          className="w-full h-80 object-cover"
        />
        <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-sm font-bold flex items-center gap-1">
          <Star size={14} fill="currentColor" />
          {movie.vote_average.toFixed(1)}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {movie.title}
        </h3>
        
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <Calendar size={16} />
          <span className="text-sm">{formatDate(movie.release_date)}</span>
        </div>
        
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-3 mb-4">
          {movie.overview || 'Sem descrição disponível.'}
        </p>

        <button
          onClick={() => onDetailsClick(movie)}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          <Info size={18} />
          Ver Detalhes
        </button>
      </div>
    </div>
  );
};

export default MovieCard;