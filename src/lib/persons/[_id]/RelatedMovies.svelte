{#if movies && movies.length}
<List twoLine>
    {#each movies as movie}
    <Item href={`/movies/${movie._id}`}>
        <Text>
            <PrimaryText>{movie.title}</PrimaryText>
            <SecondaryText>{movie.year}</SecondaryText>
        </Text>
    </Item>
    {/each}
</List>
{:else}
<Content>
    None
</Content>


{/if}

<script lang="ts">
import type Movie from 'src/types/movie';

import { page } from '$app/stores';
import { onMount } from 'svelte';
import { PUBLIC_CRUD_API_URL } from '$env/static/public'

import { Content } from '@smui/card';
import List, {
Item,
Graphic,
Meta,
Text,
PrimaryText,
SecondaryText,
} from '@smui/list';

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