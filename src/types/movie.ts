import type Person from "./person"

type Movie = {
    _id: string,
    title: string,
    year: number,
    director?: Person,
    actors: Person[]
}

export default Movie