<Card padded>
    <h2 class="mdc-typography--headline6">
      Persons
    </h2>
    <Actions>
        <NewPersonDialog />
    </Actions>
      <Content>
        {#if persons.length}
            <DataTable style="width: 100%;">
                <Head>
                    <Row>
                        <Cell>Name</Cell>
                    </Row>
                </Head>
                <Body>
                    {#each persons as person}
                        <Row>
                            <Cell>
                                <a href={`/persons/${person._id}`}>{person.name || 'Unknown person'}</a>
                            </Cell>
                        </Row>
                    {/each}
                </Body>
            </DataTable>
        {/if}
      </Content>
</Card>


<script lang="ts">
import type Person from 'src/types/person'

import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
import Card, { Content, Actions, } from '@smui/card'
import { onMount } from 'svelte'

import NewPersonDialog from '$lib/persons/NewPersonDialog.svelte';

import { PUBLIC_CRUD_API_URL } from '$env/static/public'

let persons: [Person] | [] = []

onMount( () => {
    getMovie()
})

const getMovie = async () => {

    const url = `${PUBLIC_CRUD_API_URL}/persons/`

    const res = await fetch(url)
    const data = await res.json()

    persons = data.items
}

</script>