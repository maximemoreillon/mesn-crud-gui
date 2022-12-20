<Dialog
  bind:open>
  <Title>New person</Title>
  <form on:submit={createMovie}>
  <Content>
    <LayoutGrid>
        <Cell>
            <Textfield bind:value={newPerson.name} label="Name" />
        </Cell>
    </LayoutGrid>

    </Content>
    <Actions>
        <Button on:click={() => (open = false)} type="reset">
            <Label>Cancel</Label>
        </Button>
        <Button type="submit">
            <Label>Create person</Label>
        </Button>
    </Actions>
</form>
</Dialog>
 
<Button on:click={() => (open = true)}>
    <Icon class="material-icons">add</Icon>
    <Label>New person</Label>
</Button>
 
 
<script lang="ts">
import Dialog, { Title, Content, Actions } from '@smui/dialog';

import Button, { Label, Icon} from '@smui/button';
import Textfield from '@smui/textfield';
import { goto } from '$app/navigation';
import LayoutGrid, { Cell } from '@smui/layout-grid';

import { PUBLIC_CRUD_API_URL } from '$env/static/public'


let open = false;

type NewPerson = {
    name: string
}

const newPerson: NewPerson = { name: '' }

const createMovie = async () => {

    const url = `${PUBLIC_CRUD_API_URL}/persons/`
    const options = { 
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(newPerson)
    }
    
    try {
        const res = await fetch(url, options)
        const {_id} = await res.json()

        goto(`/persons/${_id}`)
        
    } catch (error) {
        alert('Failed to create movie')
        console.error(error)
    }
    
}
</script>