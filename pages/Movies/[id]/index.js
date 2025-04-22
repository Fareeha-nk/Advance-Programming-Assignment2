import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

export default function MovieDetail(props) {
  if (!props.movie) return <p style={styles.notFound}>🎬 Movie Not Found.</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{props.movie.title}</h1>

      <p style={styles.description}>
        <strong>Description:</strong> {props.movie.description}
      </p>

      <p style={styles.text}>
        <strong>Director:</strong>{' '}
        <Link href={`/Movies/${props.movie.id}/director`}>
          <span style={styles.link}>
            {props.director?.name || 'Unknown'}
          </span>
        </Link>
      </p>

      <p style={styles.text}>
        <strong>Release Year:</strong> {props.movie.releaseYear}
      </p>

      <p style={styles.text}>
        <strong>Rating:</strong> ⭐ {props.movie.rating}
      </p>
    </div>
  );
}

export async function getStaticPaths() {
  const p = path.join(process.cwd(), 'Data', 'Properties.json');
  const data = await fs.readFile(p);
  const parsed_data = JSON.parse(data);
  const movies = parsed_data.movies;

  const paths = movies.map((movie) => ({
    params: { id: movie.id.toString() },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const p = path.join(process.cwd(), 'Data', 'Properties.json');
  const data = await fs.readFile(p);
  const parsed_data = JSON.parse(data);

  const movie = parsed_data.movies.find((m) => m.id.toString() === id);

  if (!movie) {
    return {
      notFound: true,
    };
  }

  const director = parsed_data.directors.find((d) => d.id === movie.directorId);

  return {
    props: {
      movie,
      director,
    },
  };
}


const styles = {
  container: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: '#fefefe',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    borderRadius: '10px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '2.2rem',
    marginBottom: '1rem',
    color: '#222',
    textAlign: 'center',
  },
  description: {
    marginBottom: '1rem',
    lineHeight: '1.6',
    color: '#444',
  },
  text: {
    marginBottom: '0.8rem',
    color: '#444',
  },
  link: {
    color: '#0070f3',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  notFound: {
    textAlign: 'center',
    fontSize: '1.3rem',
    padding: '3rem',
    color: '#999',
  },
};
