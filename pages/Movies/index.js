// pages/Movies/index.js
import { useState, useEffect } from 'react';
import path from 'path';
import fs from 'fs/promises';
import Link from 'next/link';

export default function MoviesPage(props) {
  const [filtered, setFiltered] = useState(props.all_movies);
  const [selectedGenre, setSelectedGenre] = useState("All");

  useEffect(() => {
    if (selectedGenre === "All") {
      setFiltered(props.all_movies);
    } else {
      const filtered_movies = props.all_movies.filter(movie => movie.genreId === selectedGenre);
      setFiltered(filtered_movies);
    }
  }, [selectedGenre, props.all_movies]);

  const uniqueGenres = ["All", ...new Set(props.all_movies.map(m => m.genreId))];

  return (
    <div>
      <h1>All Movies</h1>
      <label>Filter by Genre:</label>
      <select value={selectedGenre} onChange={e => setSelectedGenre(e.target.value)}>
        {uniqueGenres.map(genre => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
        {filtered.map(movie => (
          <div key={movie.id} style={{ border: '1px solid #ccc', padding: '1rem', width: '200px' }}>
            <h3>{movie.title}</h3>
            <p>Rating: {movie.rating}</p>
            <p>Genre: {movie.genreId}</p>
            <Link href={`/Movies/${movie.id}`}>
              <button>View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const p = path.join(process.cwd(), 'Data', 'Properties.json');
  const data = await fs.readFile(p);
  const parsed_data = JSON.parse(data);
  const movies = parsed_data.movies;

  if (!movies) {
    return {
        notFound: true
   }
  }

  return {
    props: {
      all_movies: movies,
    },
    revalidate: 60, 
  };
}
