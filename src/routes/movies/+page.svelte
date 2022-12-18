<Card>
    <Content class="toolbar">
        <h2 style="margin: 0;">Movies</h2>
        <div class="spacer"></div>
        <NewMovieDialog />
    </Content>
    <Content>
    {#if movies.length}
        <DataTable style="width: 100%;">
            <Head>
                <Row>
                    <Cell>Title</Cell>
                    <Cell>Year</Cell>
                    <Cell>Director</Cell>
                </Row>
            </Head>
            <Body>
                {#each movies as movie}
                    <Row>
                        <Cell>
                            <a href={`/movies/${movie._id}`}>{movie.title || 'Untitled movie'}</a>
                        </Cell>
                        <Cell>{movie.year}</Cell>
                        <Cell>
                            {#if movie.director}
                            <a href={`/persons/${movie.director._id}`}>{movie.director.name}</a>
                            {:else}
                            Undefined
                            {/if}
                        </Cell>
                    </Row>
                {/each}
            </Body>
            <LinearProgress
                indeterminate
                bind:closed={loaded}/>
        </DataTable>
    {/if}
    </Content>
    
</Card>


<script lang="ts">
import type Movie from 'src/types/movie'

import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
import Card, { Content, Actions, } from '@smui/card'
import LinearProgress from '@smui/linear-progress';

import { onMount } from 'svelte'
import NewMovieDialog from '$lib/movies/NewMovieDialog.svelte';
import { PUBLIC_CRUD_API_URL } from '$env/static/public'


let movies: [Movie] | [] = []
let loaded = false

onMount( () => {
    getMovie()
})

const getMovie = async () => {

    try {
        const url = `${PUBLIC_CRUD_API_URL}/movies/`

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