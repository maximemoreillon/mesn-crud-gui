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
                    <Button on:click={() => (selectPerson(person))}>
                        <Label>Select</Label>
                    </Button>
                </Cell>
            </Row>
        {/each}
    </Body>
</DataTable>

<script lang="ts">
import type Person from 'src/types/person';

import { onMount, createEventDispatcher} from 'svelte';
import { PUBLIC_CRUD_API_URL } from '$env/static/public'

import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
import Button, { Label } from '@smui/button';

const dispatch = createEventDispatcher();
let persons: Person[] | [] = []

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

const selectPerson = (person: Person) => {
    dispatch('selection', person)
}
</script>