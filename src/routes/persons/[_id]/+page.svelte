<Card padded>
    
    {#if loading}
        <LinearProgress indeterminate/>
    {:else if person}

        <IconButton href="/movies" class="material-icons">
            arrow_back
        </IconButton>

        <h2 class="mdc-typography--headline6" style="margin: 0;">
            {person.name}
        </h2>

        <div>
            <Textfield bind:value={person.name} label="Name" />
        </div>

        {#if directedMovies}
            <h3>Movies directed</h3>
            <List>
                {#each directedMovies as movie}
                <Item href="/movies">
                    <Text>{movie.title}</Text>
                </Item>
                {/each}
            </List>
        {/if}
        


        <Actions>
            <ActionButtons>
                <Button type="submit" on:click={deletePerson}>
                    <Icon class="material-icons">delete</Icon>
                    <Label>Delete person</Label>
                </Button>
                <Button type="submit" on:click={savePerson}>
                    <Icon class="material-icons">save</Icon>
                    <Label>Save person</Label>
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
import LinearProgress from '@smui/linear-progress';
import IconButton from '@smui/icon-button';
import List, { Item, Text } from '@smui/list';

import type Person from 'src/types/person';
import type Movie from 'src/types/movie';

import { page } from '$app/stores';
import { onMount } from 'svelte';
import { goto } from '$app/navigation';

import { PUBLIC_CRUD_API_URL } from '$env/static/public'

let person: Person
let directedMovies: Movie[]

let loading = false
onMount( async () => {
    await getPerson()
    await getDirectedMovies()
})

const {_id} = $page.params
const url = `${PUBLIC_CRUD_API_URL}/persons/${_id}`


const getPerson = async () => {
    loading = true
    try {
        const res = await fetch(url)
        person = await res.json()
    } catch (error) {
        alert('Failed to get person')
        console.error(error)
    } finally {
        loading = false
    }
}

const getDirectedMovies = async () => {
    try {
        const url = `${PUBLIC_CRUD_API_URL}/movies?director=${person._id}`
        const res = await fetch(url)
        const data = await res.json()
        directedMovies = data.items
    } catch (error) {
        alert('Failed to get person')
        console.error(error)
    } 
} 

const deletePerson = async () => {
    if(!confirm(`Delete ${person.name}?`)) return
    const options = { method: 'DELETE'}
    try {
        await fetch(url, options)
        goto(`/persons`)
    } catch (error) {
        alert('Deletion failed')
    }

}

const savePerson = async () => {
    const options = { 
        method: 'PATCH', 
        body: JSON.stringify(person),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, 
    }
    try {
        await fetch(url, options)
        alert('Person updated successfully')
    } catch (error) {
        alert('Update failed')
    }
}

</script>