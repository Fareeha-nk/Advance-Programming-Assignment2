// pages/Genre/[id].js
import path from 'path';
import fs from 'fs/promises';

export default function GenreDetail(props) {
return (
    <div>
    <h1>Genre: {props.genreName}</h1>
    {props.movies.length === 0 ? (
        <p>No movies found for this genre.</p>
    ) : (
        <div>
        {props.movies.map(movie => (
            <div key={movie.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h3>{movie.title}</h3>
            <p><strong>Description:</strong> {movie.description}</p>
            <p><strong>Release Year:</strong> {movie.releaseYear}</p>
            <p><strong>Rating:</strong> {movie.rating}</p>
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
const parsed_data= JSON.parse(data);

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
