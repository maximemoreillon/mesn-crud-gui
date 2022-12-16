<Card padded>
      <Content>
        <h2 class="mdc-typography--headline6">
          Movies
        </h2>
        <p>
            <a href="/movies/new">New movie</a>
        </p>

        <table>
            <tr>
                <th>Title</th>
            </tr>
            {#each movies as movie}
            <tr>
                <td>
                    <a href={`/movies/${movie._id}`}>{movie.title}</a>
                </td>
            </tr>
            {/each}
        </table>

      </Content>
</Card>


<script lang="ts">
import type Movie from 'src/types/movie';

import Card, { Content } from '@smui/card';
import { onMount } from 'svelte';

let movies: [Movie] | [] = []

onMount( () => {
    getMovie()
})

const getMovie = async () => {

    const url = `http://172.16.98.151:7070/movies/`

    const res = await fetch(url)
    const data = await res.json()

    movies = data.items
}

</script>