import { useState, useEffect } from 'react';

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

interface UseMoviesReturn {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  searchMovies: (query: string) => Promise<void>;
  getMovieDetails: (movieId: number) => Promise<Movie | null>;
}

export const useMovies = (): UseMoviesReturn => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiKey = import.meta.env.VITE_REACT_APP_KEY;
  const baseUrl = 'https://api.themoviedb.org/3';

  const fetchPopularMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!apiKey) {
        throw new Error('API key não encontrada. Verifique o arquivo .env');
      }
      
      const response = await fetch(
        `${baseUrl}/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`
      );
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.status_message || `Erro HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      setMovies(data.results || []);
    } catch (err) {
      console.error('Erro ao carregar filmes:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao carregar filmes');
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async (query: string) => {
    if (!query.trim()) {
      await fetchPopularMovies();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      if (!apiKey) {
        throw new Error('API key não encontrada. Verifique o arquivo .env');
      }
      
      const response = await fetch(
        `${baseUrl}/search/movie?api_key=${apiKey}&language=pt-BR&query=${encodeURIComponent(query)}&page=1`
      );
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.status_message || `Erro HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      setMovies(data.results || []);
    } catch (err) {
      console.error('Erro ao buscar filmes:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao buscar filmes');
    } finally {
      setLoading(false);
    }
  };

  const getMovieDetails = async (movieId: number): Promise<Movie | null> => {
    try {
      if (!apiKey) {
        throw new Error('API key não encontrada. Verifique o arquivo .env');
      }
      
      const response = await fetch(
        `${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=pt-BR`
      );
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.status_message || `Erro HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Erro ao carregar detalhes do filme:', err);
      return null;
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return { movies, loading, error, searchMovies, getMovieDetails };
};