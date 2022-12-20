<Dialog
  bind:open>
    <Title>New movie</Title>
    <form on:submit={createMovie}>
        <Content id="simple-content">
            <Textfield bind:value={newMovie.title} label="Title" />
        </Content>
        <Actions>
            <!-- BUG: This button submits the form -->
            <Button on:click={() => (open = false)} type="reset">
                <Label>Cancel</Label>
            </Button>
            <Button type="submit">
                <Label>Create movie</Label>
            </Button>
        </Actions>
    </form>
</Dialog>
 
<Button on:click={() => (open = true)}>
    <Icon class="material-icons">add</Icon>
    <Label>Add movie</Label>
</Button>
 
 
<script lang="ts">

import Dialog, { Title, Content, Actions } from '@smui/dialog';
import Button, { Label, Icon } from '@smui/button';
import Textfield from '@smui/textfield';
import { goto } from '$app/navigation';
import LayoutGrid, { Cell } from '@smui/layout-grid';


import { PUBLIC_CRUD_API_URL } from '$env/static/public'


let open = false;

type NewMovie = {
    title: string
}

const newMovie: NewMovie = { title: '' }

const createMovie = async () => {
    const url = `${PUBLIC_CRUD_API_URL}/movies/`
    const options = { 
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(newMovie)
    }

    try {
        const res = await fetch(url, options)
        const {_id} = await res.json()

        goto(`/movies/${_id}`)
    } catch (error) {
        alert('Failed to create movie')
        console.error(error)
    }
    
}
</script>