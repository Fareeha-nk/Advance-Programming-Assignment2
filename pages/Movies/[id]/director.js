import path from 'path';
import fs from 'fs/promises';

export default function DirectorPage(props){
    return (
        <div>
            <h1> {props.director.name}</h1>
            <p><strong>Biography: </strong>{props.director.biography}</p>
        </div>
    );
}


export async function getStaticPaths(){
    const p=path.join(process.cwd(), 'Data', 'Properties.json');
    const data= await fs.readFile(p);
    const parsed_data=JSON.parse(data);

    const paths=parsed_data.movies.map(movie => ({
        params: {id: movie.id},
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({params}){
    const p=path.join(process.cwd(), 'Data', 'Properties.json');
    const data= await fs.readFile(p);
    const parsed_data=JSON.parse(data);

    const movie= parsed_data.movies.find(m => m.id===params.id);
    const director=parsed_data.directors.find(d => d.id===movie.directorId);

    return {
        props: {
            director,
        },
    };
}