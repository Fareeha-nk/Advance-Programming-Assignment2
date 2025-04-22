import path from 'path';
import fs from 'fs/promises';
import Link from 'next/link';

export default function GenresPage(props) {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}><strong>🎞️ All Genres</strong></h1>
      <ul style={styles.genreList}>
        {props.genres.map(genre => (
          <li key={genre.id} style={styles.genreItem}>
            <Link href={`/Genre/${genre.id}`} style={styles.genreLink}>
              {genre.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const p = path.join(process.cwd(), 'Data', 'Properties.json');
  const data = await fs.readFile(p);
  const parsed_data = JSON.parse(data);

  return {
    props: {
      genres: parsed_data.genres,
    },
  };
}


const styles = {
  container: {
    maxWidth: '800px',
    margin: 'auto',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fefefe',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '2rem',
    color: '#222',
  },
  genreList: {
    listStyle: 'none',
    padding: 0,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '1rem',
  },
  genreItem: {
    backgroundColor: '#f1f1f1',
    padding: '1rem',
    borderRadius: '10px',
    textAlign: 'center',
    transition: 'background-color 0.2s ease',
  },
  genreLink: {
    textDecoration: 'none',
    color: '#0070f3',
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },
};
