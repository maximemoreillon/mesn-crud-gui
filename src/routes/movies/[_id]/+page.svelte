<Card padded>
    
    {#if loading}
        <LinearProgress indeterminate/>
    {:else if movie}

        <a href="/movies">Return</a>

        <h2 class="mdc-typography--headline6" style="margin: 0;">
            {movie.title}
        </h2>
        <h3 class="mdc-typography--subtitle2" style="margin: 0; color: #888;">
            {movie.year}
        </h3>
        <Content>
            <LayoutGrid>
                <Cell>
                    <Textfield bind:value={movie.title} label="Title" />
                </Cell>
                <Cell>
                    <Textfield type="number" bind:value={movie.year} label="Year" />
                </Cell>
            </LayoutGrid>
        </Content>

        <Actions>
            <ActionButtons>
                <Button type="submit" on:click={deleteMovie}>
                    <Icon class="material-icons">delete</Icon>
                    <Label>Delete movie</Label>
                </Button>
                <Button type="submit" on:click={saveMovie}>
                    <Icon class="material-icons">save</Icon>
                    <Label>Save movie</Label>
                </Button>
            </ActionButtons>
        </Actions>

    {:else}

    <Content>
        No data
    </Content>
    
    {/if}
</Card>

<script lang="ts">
import Button, { Label, Icon } from '@smui/button';
import Card, { Content, Actions, ActionButtons } from '@smui/card';
import Textfield from '@smui/textfield';
import LayoutGrid, { Cell } from '@smui/layout-grid';
import LinearProgress from '@smui/linear-progress';

import type Movie from 'src/types/movie';

import { page } from '$app/stores';
import { onMount } from 'svelte';
import { goto } from '$app/navigation';

import { PUBLIC_CRUD_API_URL } from '$env/static/public'

let movie: Movie
let loading = false
onMount( () => {
    getMovie()
})

const {_id} = $page.params
const url = `${PUBLIC_CRUD_API_URL}/movies/${_id}`


const getMovie = async () => {
    loading = true
    try {
        const res = await fetch(url)
        movie = await res.json()
    } catch (error) {
        alert('Failed to get movie')
        console.error(error)
    } finally {
        loading = false
    }
}

const deleteMovie = async () => {
    if(!confirm(`Delete ${movie.title}?`)) return
    const options = { method: 'DELETE'}
    try {
        await fetch(url, options)
        goto(`/movies`)
    } catch (error) {
        alert('Deletion failed')
    }

}

const saveMovie = async () => {
    const options = { 
        method: 'PATCH', 
        body: JSON.stringify(movie),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, 
    }
    try {
        await fetch(url, options)
        alert('Movie updated successfully')
    } catch (error) {
        alert('Update failed')
    }
}

</script>