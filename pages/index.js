// pages/index.js
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
    <div>
      <ul>
        {data.map(val => (
          <li key={val.id}>
            <strong>{val.title}</strong><br />
            Rating: {val.rating}<br />
            Description: {val.description}
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button onClick={handler}>Browse Genres</button>
        <button onClick={handler2}>Browse Movies</button>
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
