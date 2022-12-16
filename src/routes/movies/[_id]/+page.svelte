<Card padded>
      <Content>
        {#if movie}
        <h2 class="mdc-typography--headline6">
            {movie.title}
        </h2>
        <h3 class="mdc-typography--subtitle2">
            {movie.year}
        </h3>
        <p>
            <Button type="submit" on:click={deleteMovie}>
                <Icon class="material-icons">delete</Icon>
                <Label>Delete movie</Label>
            </Button>
        </p>
        {/if}
      </Content>
</Card>

<script lang="ts">
import Button, { Label, Icon } from '@smui/button';
import Card, { Content } from '@smui/card';

import type Movie from 'src/types/movie';

import { page } from '$app/stores';
import { onMount } from 'svelte';
import { goto } from '$app/navigation';

let movie: Movie

onMount( () => {
    getMovie()
})

const getMovie = async () => {
    const {_id} = $page.params
    const url = `http://172.16.98.151:7070/movies/${_id}`
    const res = await fetch(url)
    movie = await res.json()
}

const deleteMovie = async () => {
    if(!confirm(`Delete ${movie.title}?`)) return
    const {_id} = $page.params
    const url = `http://172.16.98.151:7070/movies/${_id}`
    const options = { method: 'DELETE'}
    try {
        await fetch(url, options)
        goto(`/movies`)
    } catch (error) {
        alert('Deletion failed')
    }

}

</script>