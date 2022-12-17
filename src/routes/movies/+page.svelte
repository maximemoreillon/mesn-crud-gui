<Card padded>
    <h2 class="mdc-typography--headline6">
      Movies
    </h2>
    <Actions>
        <NewMovieDialog />
    </Actions>
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
                                <a href={`/movies/${movie._id}`}>{movie.title}</a>
                            </Cell>
                            <Cell>{movie.year}</Cell>
                            {#if movie.director}
                            <Cell>
                                {movie.director.name}
                            </Cell>
                            {:else}
                            <Cell>
                                Undefined
                            </Cell>
                            {/if}
                        </Row>
                    {/each}
                </Body>
            </DataTable>
        {/if}
      </Content>
</Card>


<script lang="ts">
import type Movie from 'src/types/movie'

import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
import Card, { Content, Actions, } from '@smui/card'
import { onMount } from 'svelte'

import NewMovieDialog from '/src/components/NewMovieDialog.svelte';

import { PUBLIC_CRUD_API_URL } from '$env/static/public'

let movies: [Movie] | [] = []

onMount( () => {
    getMovie()
})

const getMovie = async () => {

    const url = `${PUBLIC_CRUD_API_URL}/movies/`

    const res = await fetch(url)
    const data = await res.json()

    movies = data.items
}

</script>