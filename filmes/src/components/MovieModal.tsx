import React from 'react';
import { X, Calendar, Star, Clock, Users } from 'lucide-react';

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

interface MovieModalProps {
  movie: Movie;
  isOpen: boolean;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, isOpen, onClose }) => {
  if (!isOpen) return null;

  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatRuntime = (minutes?: number) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
        >
          <X size={24} />
        </button>

        {/* Backdrop Image */}
        {backdropUrl && (
          <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
            <img 
              src={backdropUrl} 
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Poster */}
            <div className="flex-shrink-0">
              <img 
                src={imageUrl} 
                alt={movie.title}
                className="w-48 h-72 object-cover rounded-xl shadow-lg mx-auto md:mx-0"
              />
            </div>

            {/* Movie Info */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {movie.title}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Star size={16} fill="currentColor" />
                  {movie.vote_average.toFixed(1)}
                </div>
                <span className="text-gray-600 text-sm">/ 10</span>
              </div>

              {/* Movie Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar size={18} className="text-blue-600" />
                  <span className="font-medium">Lançamento:</span>
                  <span>{formatDate(movie.release_date)}</span>
                </div>

                {movie.runtime && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock size={18} className="text-green-600" />
                    <span className="font-medium">Duração:</span>
                    <span>{formatRuntime(movie.runtime)}</span>
                  </div>
                )}
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Gêneros:</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span 
                        key={genre.id}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Overview */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">Sinopse:</h3>
                <p className="text-gray-700 leading-relaxed">
                  {movie.overview || 'Sem descrição disponível.'}
                </p>
              </div>

              {/* Production Companies */}
              {movie.production_companies && movie.production_companies.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Users size={18} />
                    Produção:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.production_companies.slice(0, 3).map((company) => (
                      <span 
                        key={company.id}
                        className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                      >
                        {company.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;