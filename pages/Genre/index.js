// pages/Genre/index.js
import path from 'path';
import fs from 'fs/promises';
import Link from 'next/link';

export default function GenresPage(props) {
  return (
    <div>
      <h1><strong>All Genres</strong></h1>
      <ul>
        {props.genres.map(genre => (
          <li key={genre.id}>
            <Link href={`/Genre/${genre.id}`}>{genre.name}</Link>
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
