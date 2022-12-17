{#if movies}
<DataTable style="width: 100%;">
    <Head>
        <Row>
            <Cell>Title</Cell>
            <Cell>Year</Cell>
        </Row>
    </Head>
    <Body>
        {#each movies as movie}
            <Row>
                <Cell>
                    <a href={`/movies/${movie._id}`}>{movie.title || 'Untitled movie'}</a>
                </Cell>
                <Cell>{movie.year}</Cell>
            </Row>
        {/each}
    </Body>
</DataTable>
{/if}

<script lang="ts">
import { page } from '$app/stores';
import { onMount } from 'svelte';
import { PUBLIC_CRUD_API_URL } from '$env/static/public'
import type Movie from 'src/types/movie';
import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';

const {_id} = $page.params

let movies: Movie[]

export let query : string

onMount( async () => {
    getMovies()
})

const getMovies = async () => {
    try {
        const url = `${PUBLIC_CRUD_API_URL}/movies?${query}=${_id}`
        const res = await fetch(url)
        const data = await res.json()
        movies = data.items
    } catch (error) {
        alert('Failed to get person')
        console.error(error)
    } 
} 

</script>