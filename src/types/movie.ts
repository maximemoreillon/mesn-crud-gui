import type Person from "./person"

type Movie = {
    title: string,
    year?: number,
    director?: Person,
    _id?: string,
}

export default Movie