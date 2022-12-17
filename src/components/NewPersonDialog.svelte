<Dialog
  bind:open
  aria-labelledby="simple-title"
  aria-describedby="simple-content">
  <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
  <Title id="simple-title">New person</Title>
  <form on:submit={createMovie}>
  <Content id="simple-content">
    <LayoutGrid>
        <Cell>
            <Textfield bind:value={newPerson.name} label="Name" />
        </Cell>
    </LayoutGrid>

    </Content>
    <Actions>
        <Button on:click={() => (open = false)}>
            <Label>Cancel</Label>
        </Button>
        <Button type="submit">
            <Label>Create person</Label>
        </Button>
    </Actions>
</form>
</Dialog>
 
<Fab on:click={() => (open = true)}>
    <Icon class="material-icons">add</Icon>
</Fab>
 
 
<script lang="ts">
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Fab, { Icon } from '@smui/fab';

    import Button, { Label } from '@smui/button';
    import Textfield from '@smui/textfield';
    import { goto } from '$app/navigation';
    import LayoutGrid, { Cell } from '@smui/layout-grid';

    import type Person from 'src/types/person'

    import { PUBLIC_CRUD_API_URL } from '$env/static/public'


    let open = false;

    const newPerson: Person = { name: '' }

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
        const res = await fetch(url, options)
        const {_id} = await res.json()

        goto(`/persons/${_id}`)
    }
</script>