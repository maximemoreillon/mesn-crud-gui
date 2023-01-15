import type Person from './person';

interface Movie {
	_id: string;
	title: string;
	year: number;
	director?: Person;
	actors: Person[];
}

export default Movie;
