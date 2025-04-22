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

  if (isValidating) return <div>Loading...</div>;
  if (error) return <div>Failed to load director details: {error.message}</div>;
  if (!result) return <div>Loading Director Details...</div>;

  const { director, movieTitle, directedMovies } = result;

  return (
    <div>
      <h1><strong>Director Details</strong></h1>
      <ul>
        <li>Movie: {movieTitle || "Movie title not available"}</li>
        <li>Name: {director.name || "Name not available"}</li>
        <li>Biography: {director.biography || "Biography not available"}</li>
      </ul>

      <h2><strong>Movies Directed</strong></h2>
      <ul>
        {directedMovies.map((movie) => (
          <li key={movie.id}>
            {movie.title} ({movie.releaseYear}) — Rating: {movie.rating}
          </li>
        ))}
      </ul>
    </div>
  );
}