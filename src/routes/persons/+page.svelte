<Card >
    <Content>
        <h2 style="margin: 0;">
        Persons
        </h2>
    </Content>
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
                <LinearProgress
                    indeterminate
                    bind:closed={loaded}/>
            </DataTable>
        {/if}
      </Content>
      <Actions>
        <NewPersonDialog />
    </Actions>
</Card>


<script lang="ts">
import type Person from 'src/types/person'

import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
import Card, { Content, Actions, } from '@smui/card'
import LinearProgress from '@smui/linear-progress';


import NewPersonDialog from '$lib/persons/NewPersonDialog.svelte';

import { onMount } from 'svelte'
import { PUBLIC_CRUD_API_URL } from '$env/static/public'

let persons: [Person] | [] = []
let loaded = false

onMount( () => {
    getMovie()
})

const getMovie = async () => {

    loaded = false
    try {
        const url = `${PUBLIC_CRUD_API_URL}/persons/`

        const res = await fetch(url)
        const data = await res.json()

        persons = data.items
    } catch (error) {
        alert('Failed to get persons')
        console.error(error)
    } finally {
        loaded = true
    }

    
}

</script>