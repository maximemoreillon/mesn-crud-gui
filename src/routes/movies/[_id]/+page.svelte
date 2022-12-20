<Card>

    {#if loading}
        <LinearProgress indeterminate/>
    {:else if movie}
        <Content>
            <EditableContentDialog bind:content={movie.title} label="Title">
                <h2>{movie.title || 'Untitled movie'}</h2>
            </EditableContentDialog>

            <Textfield bind:value={movie.year} label="Year" input$emptyValueUndefined/>
           
            <p>
                Directed by
                {#if movie.director}
                    <a href={`/persons/${movie.director._id}`}>{movie.director.name}</a>
                {:else}
                    <span>Unknown director</span>
                {/if}
                <EditMovieDirector on:selection={directorSelectedHandler}/>
            </p>

            <h5>Actors</h5>
            <AddActorDialog on:selection={actorAddHandler} />
            <Actors actors={movie.actors} />
                
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
import type Movie from 'src/types/movie';
import type Person from 'src/types/person';

import EditMovieDirector from '$lib/movies/[_id]/EditDirector.svelte';
import AddActorDialog from '$lib/movies/[_id]/AddActorDialog.svelte';
import Actors from '$lib/movies/[_id]/Actors.svelte';
import EditableContentDialog from '$lib/EditableContentDialog.svelte';

import Button, { Label, Icon } from '@smui/button';
import Card, { Content, Actions, ActionButtons } from '@smui/card';
import LinearProgress from '@smui/linear-progress';
import IconButton from '@smui/icon-button';
import Textfield from '@smui/textfield';


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

const directorSelectedHandler = (event: CustomEvent) => {
    const director : Person = event.detail
    movie.director = director
}

const actorAddHandler = (event: CustomEvent) => {
    const newActor: Person = event.detail
    // Note: Svelte reactivity works by assignment
    movie.actors = [...movie.actors, newActor]
}


</script>

