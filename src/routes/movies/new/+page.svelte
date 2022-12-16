<Card padded >
      <Content>
        <h2 class="mdc-typography--headline6">
          New movie
        </h2>
        <form on:submit={createMovie}>
            <p>
                <Textfield bind:value={newMovie.title} label="Title" />
            </p>
            <p>
                <Button type="submit">
                    <Icon class="material-icons">add</Icon>
                    <Label>Create movie</Label>
                </Button>
            </p>
        </form>
      </Content>
</Card>

<script lang="ts">
import Card, { Content } from '@smui/card';
import Textfield from '@smui/textfield';
import Button, { Label, Icon } from '@smui/button';
import { goto } from '$app/navigation';
import type Movie from 'src/types/movie'

const newMovie: Movie = {
    title: '',
}

const createMovie = async () => {
    const url = 'http://172.16.98.151:7070/movies'
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