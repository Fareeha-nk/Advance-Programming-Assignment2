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
    <div style={styles.container}>
      <h1 style={styles.heading}>🎞️ All Movies</h1>

      <div style={styles.filterContainer}>
        <label htmlFor="genre-select" style={styles.label}>Filter by Genre:</label>
        <select
          id="genre-select"
          value={selectedGenre}
          onChange={e => setSelectedGenre(e.target.value)}
          style={styles.select}
        >
          {uniqueGenres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      <div style={styles.grid}>
        {filtered.map(movie => (
          <div key={movie.id} style={styles.card}>
            <h3 style={styles.movieTitle}>{movie.title}</h3>
            <p><strong>Rating:</strong> ⭐ {movie.rating}</p>
            <p><strong>Genre ID:</strong> {movie.genreId}</p>
            <Link href={`/Movies/${movie.id}`}>
              <button style={styles.button}>View Details</button>
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
    };
  }

  return {
    props: {
      all_movies: movies,
    },
    revalidate: 60,
  };
}


const styles = {
  container: {
    maxWidth: '1100px',
    margin: '2rem auto',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fff',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2.5rem',
    marginBottom: '2rem',
    color: '#333',
  },
  filterContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '2rem',
  },
  label: {
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },
  select: {
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: '#f4f4f4',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
  },
  movieTitle: {
    fontSize: '1.3rem',
    marginBottom: '0.5rem',
    color: '#0070f3',
  },
  button: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
