import type Movie from "./movie"

type Person = {
    name: string,
    movies: Movie[],
    age?: number,
    _id?: string,


}

export default Person
