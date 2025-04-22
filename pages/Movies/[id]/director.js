import React from "react";
import useSWR from "swr";
import data from "../../../Data/Properties.json"; 
import { useRouter } from "next/router";

const fetcher = ([_, movieId]) => {
  const movie = data.movies.find((movie) => movie.id === movieId);
  if (!movie) return null;

  const director = data.directors.find((director) => director.id === movie.directorId);
  if (!director) return null;

  const directedMovies = data.movies.filter((m) => m.directorId === director.id);

  return {
    director,
    movieTitle: movie.title,
    directedMovies,
  };
};

export default function DirectorPage() {
  const router = useRouter();
  const movieId = router.query.id;

  const { data: result, error, isValidating } = useSWR(
    movieId ? ["movie-director", movieId] : null,
    fetcher
  );

  if (isValidating) return <div style={styles.loading}>Loading...</div>;
  if (error) return <div style={styles.error}>Failed to load director details: {error.message}</div>;
  if (!result) return <div style={styles.loading}>Loading Director Details...</div>;

  const { director, movieTitle, directedMovies } = result;

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>🎬 Director Details</h1>
      <div style={styles.card}>
        <p><strong>🎞️ Movie:</strong> {movieTitle || "Movie title not available"}</p>
        <p><strong>👤 Name:</strong> {director.name || "Name not available"}</p>
        <p><strong>📝 Biography:</strong> {director.biography || "Biography not available"}</p>
      </div>

      <h2 style={styles.subHeader}>🎥 Movies Directed</h2>
      <ul style={styles.movieList}>
        {directedMovies.map((movie) => (
          <li key={movie.id} style={styles.movieItem}>
            <strong>{movie.title}</strong> ({movie.releaseYear}) — ⭐ {movie.rating}
          </li>
        ))}
      </ul>
    </div>
  );
}


const styles = {
  container: {
    maxWidth: "800px",
    margin: "2rem auto",
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fdfdfd",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    borderRadius: "10px",
  },
  header: {
    fontSize: "2rem",
    marginBottom: "1rem",
    textAlign: "center",
    color: "#333",
  },
  card: {
    backgroundColor: "#fafafa",
    padding: "1.5rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
    marginBottom: "2rem",
  },
  subHeader: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
    color: "#444",
  },
  movieList: {
    listStyleType: "none",
    padding: 0,
  },
  movieItem: {
    padding: "0.8rem",
    borderBottom: "1px solid #eee",
    fontSize: "1rem",
  },
  loading: {
    textAlign: "center",
    padding: "3rem",
    color: "#888",
  },
  error: {
    textAlign: "center",
    padding: "2rem",
    color: "red",
  },
};
