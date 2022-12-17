<Card>


    {#if loading}
        <LinearProgress indeterminate/>

    {:else if movie}

    <IconButton href="/movies" class="material-icons">
        arrow_back
    </IconButton>

    <Content>
        <h2 class="mdc-typography--headline6" style="margin: 0;">
            {movie.title || 'Untitled movie'}
        </h2>
        <h3 class="mdc-typography--subtitle2" style="margin: 0; color: #888;">
            {movie.year}
        </h3>

        <div>
            {#if movie.director}
            <span>
                Directed by <a href={`/persons/${movie.director._id}`}>{movie.director.name}</a>
            </span>
            {:else}
            <span>Unknown director</span>
            {/if}
            <EditMovieDirector on:selection={directorSelectedHandler}/>
        </div>


        <div>
            <Textfield bind:value={movie.title} label="Title" />
        </div>
        <div>
            <Textfield type="number" bind:value={movie.year} label="Year" />
        </div>

        <h3>Actors</h3>
        <List class="demo-list">
            {#each movie.actors as actor}
            <Item>
                <Text>{actor.name}</Text>
                <Meta class="material-icons" on:click={removeActor(actor)}>delete</Meta>
            </Item>
            {/each}
        </List>
        <AddActorDialog on:selection={actorAddHandler} />
            


    </Content>
        
    <Actions>
        <Button type="submit" on:click={deleteMovie}>
            <Icon class="material-icons">delete</Icon>
            <Label>Delete movie</Label>
        </Button>
        <Button type="submit" on:click={saveMovie}>
            <Icon class="material-icons">save</Icon>
            <Label>Save movie</Label>
        </Button>
    </Actions>

    {:else}

    <div>
        No data
    </div>
    
    {/if}
</Card>

<script lang="ts">
import type Movie from 'src/types/movie';
import type Person from 'src/types/person';

import EditMovieDirector from '/src/components/EditMovieDirector.svelte';
import AddActorDialog from '/src/components/AddActorDialog.svelte';

import Button, { Label, Icon } from '@smui/button';
import Card, { Content, Actions, ActionButtons } from '@smui/card';
import Textfield from '@smui/textfield';
import LinearProgress from '@smui/linear-progress';
import IconButton from '@smui/icon-button';
import List, { Item, Text, Meta } from '@smui/list';


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

const removeActor = (actor: Person) => {
    const actorIndex = movie.actors.findIndex( ({_id}) => _id === actor._id)
    if(actorIndex >= 0) {
        movie.actors.splice(actorIndex, 1)
        movie.actors = movie.actors
    }
}

</script>