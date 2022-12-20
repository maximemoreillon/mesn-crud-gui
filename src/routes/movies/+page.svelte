
<h2>Movies</h2>
<NewMovieDialog />
<DataTable style="width: 100%;">
    <Head>
        <Row>
            <Cell>Title</Cell>
            <Cell>Year</Cell>
            <Cell>Director</Cell>
        </Row>
    </Head>
    {#if movies}
        <Body>
            {#each movies as movie}
                <Row>
                    <Cell>
                        <a href={`/movies/${movie._id}`}>{movie.title || 'Untitled movie'}</a>
                    </Cell>
                    <Cell>{movie.year}</Cell>
                    <Cell>
                        {#if movie.director}
                            <a href={`/persons/${movie.director._id}`}>
                                {movie.director.name}
                            </a>
                        {:else}
                            Undefined
                        {/if}
                    </Cell>
                </Row>
            {/each}
        </Body>
    {/if}
    <LinearProgress
        indeterminate
        bind:closed={loaded}/>
</DataTable>




<script lang="ts">
import type Movie from 'src/types/movie'

import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
import LinearProgress from '@smui/linear-progress';

import NewMovieDialog from '$lib/movies/NewMovieDialog.svelte';
import { PUBLIC_CRUD_API_URL } from '$env/static/public'
import { onMount } from 'svelte'

let movies: Movie[]
let loaded = false

onMount( () => {
    getMovies()
})

const getMovies = async () => {

    const url = `${PUBLIC_CRUD_API_URL}/movies`
    loaded = false
    try {
        const res = await fetch(url)
        const data = await res.json()
        movies = data.items
    } catch (error) {
        alert('Failed to get movies')
        console.error(error)
    } finally {
        loaded = true
    }
}

</script>