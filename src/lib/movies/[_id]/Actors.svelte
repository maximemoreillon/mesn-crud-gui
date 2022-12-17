{#if actors}
<DataTable style="width: 100%;">
    <Head>
        <Row>
            <Cell>Name</Cell>
            <Cell>Remove</Cell>
        </Row>
    </Head>
    <Body>
        {#each actors as actor}
            <Row>
                <Cell>
                    <a href={`/persons/${actor._id}`}>{actor.name || 'Unnamed actor'}</a>
                </Cell>
                <Cell>
                    <IconButton on:click={() => removeActor(actor)} class="material-icons">
                        delete
                    </IconButton>
                </Cell>
            </Row>
        {/each}
    </Body>
</DataTable>
{/if}

<script lang="ts">

import type Person from 'src/types/person';

import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
import IconButton from '@smui/icon-button';


export let actors: Person[]


const removeActor = (actor: Person) => {
    const actorIndex = actors.findIndex( ({_id}) => _id === actor._id)
    if(actorIndex >= 0) {
        actors.splice(actorIndex, 1)
        actors = actors
    }
}



</script>