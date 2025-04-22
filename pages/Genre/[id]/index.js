import path from 'path';
import fs from 'fs/promises';

export default function GenreDetail(props) {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎬 Genre: {props.genreName}</h1>
      {props.movies.length === 0 ? (
        <p style={styles.noMoviesText}>No movies found for this genre.</p>
      ) : (
        <div style={styles.moviesGrid}>
          {props.movies.map(movie => (
            <div key={movie.id} style={styles.movieCard}>
              <h3 style={styles.movieTitle}>{movie.title}</h3>
              <p><strong>Description:</strong> {movie.description}</p>
              <p><strong>Release Year:</strong> {movie.releaseYear}</p>
              <p><strong>Rating:</strong> ⭐ {movie.rating}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export async function getStaticPaths() {
  const p = path.join(process.cwd(), 'Data', 'Properties.json');
  const data = await fs.readFile(p);
  const parsed_data = JSON.parse(data);

  const paths = parsed_data.genres.map(genre => ({
    params: { id: genre.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const p = path.join(process.cwd(), 'Data', 'Properties.json');
  const data = await fs.readFile(p);
  const parsed_data = JSON.parse(data);

  const genre = parsed_data.genres.find(g => g.id === id);
  const genreName = genre ? genre.name : 'Unknown Genre';
  const movies = parsed_data.movies.filter(movie => movie.genreId === id);

  return {
    props: {
      genreName,
      movies,
    },
  };
}


const styles = {
  container: {
    maxWidth: '900px',
    margin: '2rem auto',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fff',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '2rem',
    color: '#333',
  },
  noMoviesText: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#777',
  },
  moviesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  movieCard: {
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '1rem',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
  },
  movieTitle: {
    fontSize: '1.3rem',
    marginBottom: '0.5rem',
    color: '#0070f3',
  },
};
