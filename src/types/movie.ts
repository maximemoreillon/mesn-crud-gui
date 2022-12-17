import type Person from "./person"

type Movie = {
    title: string,
    year: number,
    director?: Person,
    actors: Person[]
    _id?: string, // No ID for new movies
}

export default Movie