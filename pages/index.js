import { useEffect, useState } from "react";
import fs from 'fs/promises';
import path from 'path';
import { useRouter } from "next/router";

export default function Home(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const filtered_data = props.trending_movies_data.filter(val => val.rating >= 8.5);
    setData(filtered_data);
  }, [props.trending_movies_data]);

  const r = useRouter();

  function handler() {
    r.push('/Genre');
  }

  function handler2() {
    r.push('/Movies');
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎬 Welcome to Movie House</h1>
      <h2 style={styles.subheading}>🔥 Trending Movies (Rating 8.5+)</h2>

      <div style={styles.movieGrid}>
        {data.map(val => (
          <div key={val.id} style={styles.card}>
            <h3 style={styles.title}>{val.title}</h3>
            <p><strong>Rating:</strong> {val.rating}</p>
            <p><strong>Description:</strong> {val.description}</p>
          </div>
        ))}
      </div>

      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={handler}>Browse Genres</button>
        <button style={styles.button} onClick={handler2}>Browse Movies</button>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const p = path.join(process.cwd(), 'Data', 'Properties.json');
  const data = await fs.readFile(p, 'utf-8');
  const parsed_data = JSON.parse(data);
  const movies = parsed_data.movies;

  const trending_movies = movies.map(movie => ({
    id: movie.id,
    title: movie.title,
    directorId: movie.directorId,
    description: movie.description,
    releaseYear: movie.releaseYear,
    genreId: movie.genreId,
    rating: movie.rating,
  }));

  if (!trending_movies) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      trending_movies_data: trending_movies,
    },
    revalidate: 60,
  };
}


const styles = {
  container: {
    maxWidth: '1000px',
    margin: 'auto',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2.5rem',
    marginBottom: '1rem',
    color: '#222',
  },
  subheading: {
    textAlign: 'center',
    fontSize: '1.5rem',
    marginBottom: '2rem',
    color: '#555',
  },
  movieGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1.2rem',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s ease-in-out',
  },
  title: {
    fontSize: '1.25rem',
    marginBottom: '0.5rem',
    color: '#333',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '2rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#0070f3',
    color: 'white',
    cursor: 'pointer',
    transition: 'background 0.2s ease-in-out',
  }
};
