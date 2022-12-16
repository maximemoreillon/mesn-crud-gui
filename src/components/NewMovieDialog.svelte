<Dialog
  bind:open
  aria-labelledby="simple-title"
  aria-describedby="simple-content">
  <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
  <Title id="simple-title">New movie</Title>
  <form on:submit={createMovie}>
  <Content id="simple-content">
    <LayoutGrid>
        <Cell>
            <Textfield bind:value={newMovie.title} label="Title" />
        </Cell>
        <Cell>
            <Textfield type="number" bind:value={newMovie.year} label="Year" />
        </Cell>
    </LayoutGrid>

    </Content>
    <Actions>
        <Button on:click={() => (open = false)}>
            <Label>Cancel</Label>
        </Button>
        <Button type="submit">
                <Label>Create movie</Label>
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

    import type Movie from 'src/types/movie'

    import { PUBLIC_CRUD_API_URL } from '$env/static/public'


    let open = false;

    const newMovie: Movie = {
    title: '',
    year: new Date().getFullYear(),
    }

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
        const res = await fetch(url, options)
        const {_id} = await res.json()

        goto(`/movies/${_id}`)
    }
</script>