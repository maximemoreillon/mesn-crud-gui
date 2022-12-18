<Dialog
  bind:open>
  <Title id="simple-title">Add an actor</Title>
  <Content>
    <PersonSelectionTable on:selection={ (event) => selectionHandler(event.detail) }/>
    </Content>
    <Actions>
        <Button on:click={() => (open = false)}>
            <Label>Cancel</Label>
        </Button>
    </Actions>
</Dialog>
 
<Button on:click={() => (open = true)}>
    <Icon class="material-icons">person_add</Icon>
    <Label>Add actor</Label>
</Button>




<script lang="ts">
import type Person from 'src/types/person';

import PersonSelectionTable from '$lib/movies/[_id]/PersonSelectionTable.svelte';

import { createEventDispatcher} from 'svelte';

import Button, { Label, Icon} from '@smui/button';
import Dialog, { Title, Content, Actions } from '@smui/dialog';


const dispatch = createEventDispatcher();
let open = false


const selectionHandler = (person: Person) => {
    dispatch('selection', person)
    open = false
}

</script>