<Card >
    
    {#if loading}
        <LinearProgress indeterminate/>
    {:else if person}

        <Actions class="toolbar">
            <IconButton href="/persons" class="material-icons">
                arrow_back
            </IconButton>
            <div class="spacer"></div>
            <Button type="submit" on:click={deletePerson}>
                <Icon class="material-icons">delete</Icon>
                <Label>Delete person</Label>
            </Button>
            <Button type="submit" on:click={savePerson}>
                <Icon class="material-icons">save</Icon>
                <Label>Save person</Label>
            </Button>
        </Actions>

        <Content>

            <EditableContentDialog bind:content={person.name} label="Name">
                <h2 style="margin: 0;">{person.name}</h2>
            </EditableContentDialog>


            <h3>Directed</h3>
            <RelatedMovies query="director"/>

            <h3>Starred in</h3>
            <RelatedMovies query="actors"/>
        </Content>


    {:else}

    <Content>
        No data
    </Content>
    
    {/if}
</Card>

<script lang="ts">
import Button, { Label, Icon } from '@smui/button';
import Card, { Content, Actions, ActionButtons } from '@smui/card';
import LinearProgress from '@smui/linear-progress';
import IconButton from '@smui/icon-button';

import type Person from 'src/types/person';

import RelatedMovies from '$lib/persons/[_id]/RelatedMovies.svelte';
import EditableContentDialog from '$lib/EditableContentDialog.svelte';

import { page } from '$app/stores';
import { onMount } from 'svelte';
import { goto } from '$app/navigation';

import { PUBLIC_CRUD_API_URL } from '$env/static/public'

let person: Person

let loading = false

onMount( async () => {
    await getPerson()
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