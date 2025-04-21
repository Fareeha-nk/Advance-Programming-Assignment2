import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function MovieDetail(props) {
if (!props.movie) return <p>Movie Not Found.</p>;

return (
    <div>
    <h1>{props.movie.title}</h1>
    <p><strong>Description:</strong> {props.movie.description}</p>
    <p>
        <strong>Director:</strong>{' '}
        <Link href={`/Movies/${props.movie.id}/director`}>
        <span style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
            {props.director?.name}
        </span>
        </Link>
    </p>
    <p><strong>Release Year:</strong> {props.movie.releaseYear}</p>
    <p><strong>Rating:</strong> {props.movie.rating}</p>
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
        notFound: true
}
}

const director = parsed_data.directors.find((d) => d.id === movie.directorId);

return {
    props: {
    movie,
    director,
    },
};
}
