<Dialog
  bind:open>
    <Title>Edit {label}</Title>
    <form on:submit={saveContent}>
        <Content>
            <Textfield bind:value={contentLocal} input$emptyValueUndefined/>
        </Content>
        <Actions>
            <Button on:click={() => (open = false)}>
                <Label>Cancel</Label>
            </Button>
            <Button type="submit">
                <Label>Save</Label>
            </Button>
        </Actions>
    </form>
</Dialog>
 

<div  class="editableContent">
    <slot></slot>
    <IconButton on:click={() => (open = true)} class="material-icons editButton">
        edit
    </IconButton>
</div>


<script lang="ts">

import Button, { Label } from '@smui/button';
import IconButton from '@smui/icon-button';
import Dialog, { Title, Content, Actions } from '@smui/dialog';
import Textfield from '@smui/textfield';

import { onMount } from 'svelte';

let open = false
export let content: string | number
export let label: string = ''

let contentLocal: string | number
onMount( () => {
    contentLocal = content
})

const saveContent = () => {
    content = contentLocal
}


</script>

<style>
.editableContent {
    display: flex;
    align-items: baseline;
    cursor: pointer;
}

</style>