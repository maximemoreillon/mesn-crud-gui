<Card>


    {#if loading}
        <LinearProgress indeterminate/>

    {:else if movie}

    <IconButton href="/movies" class="material-icons">
        arrow_back
    </IconButton>



            

            <Content>
                <h2 class="mdc-typography--headline6" style="margin: 0;">
                    {movie.title}
                </h2>
                <h3 class="mdc-typography--subtitle2" style="margin: 0; color: #888;">
                    {movie.year}
                </h3>

                {#if movie.director}
                    <div>
                        Directed by <a href={`/persons/${movie.director._id}`}>{movie.director.name}</a>  <EditMovieDirector on:directorSelected={directorSelectedHandler}/>
                    </div>
                {:else}
                    <div>
                        Unknown director<EditMovieDirector on:directorSelected={directorSelectedHandler}/>
                    </div>
                {/if}

                <div>
                    <Textfield bind:value={movie.title} label="Title" />
                </div>
                <div>
                    <Textfield type="number" bind:value={movie.year} label="Year" />

                </div>
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

import Button, { Label, Icon } from '@smui/button';
import Card, { Content, Actions, ActionButtons } from '@smui/card';
import Textfield from '@smui/textfield';
import LinearProgress from '@smui/linear-progress';
import IconButton from '@smui/icon-button';


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

</script>