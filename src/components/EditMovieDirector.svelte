<Dialog
  bind:open>
  <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
  <Title id="simple-title">Select</Title>
  <Content>
    {#if persons.length}
            <DataTable style="width: 100%;">
                <Head>
                    <Row>
                        <Cell>Name</Cell>
                        <Cell>Select</Cell>
                    </Row>
                </Head>
                <Body>
                    {#each persons as person}
                        <Row>
                            <Cell>
                                <a href={`/persons/${person._id}`}>{person.name}</a>
                            </Cell>
                            <Cell>
                                <Button on:click={() => (selectDirector(person))}>
                                    <Label>Select</Label>
                                </Button>
                            </Cell>
                        </Row>
                    {/each}
                </Body>
            </DataTable>
        {/if}

    </Content>
    <Actions>
        <Button on:click={() => (open = false)}>
            <Label>Cancel</Label>
        </Button>
    </Actions>
</Dialog>
 
<IconButton on:click={() => (open = true)} class="material-icons">
    edit
</IconButton>



<script lang="ts">
import type Person from 'src/types/person';

import { onMount, createEventDispatcher} from 'svelte';
import { PUBLIC_CRUD_API_URL } from '$env/static/public'

import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
import Dialog, { Title, Content, Actions } from '@smui/dialog';
import IconButton from '@smui/icon-button';
import Button, { Label } from '@smui/button';


const dispatch = createEventDispatcher();
let persons: Person[] | [] = []
let open = false

const getPersons = async () => {
    try {
        const url = `${PUBLIC_CRUD_API_URL}/persons`
        const res = await fetch(url)
        const data = await res.json()
        persons = data.items
    } catch (error) {
        alert('Failed to get persons')
        console.error(error)
    } 
}

onMount( () => {
    getPersons()
})

const selectDirector = (director: Person) => {
    dispatch('directorSelected', director)
    open = false
}

</script>