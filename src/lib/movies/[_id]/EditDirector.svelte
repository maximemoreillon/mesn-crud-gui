<script lang="ts">
	import type Person from '$lib/person';

	import PersonSelectionTable from '$lib/movies/[_id]/PersonSelectionTable.svelte';

	import { createEventDispatcher } from 'svelte';

	import Button, { Label } from '@smui/button';
	import IconButton from '@smui/icon-button';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';

	const dispatch = createEventDispatcher();
	let open = false;

	const selectionHandler = (person: Person) => {
		dispatch('selection', person);
		open = false;
	};
</script>

<Dialog bind:open>
	<Title>Select a director</Title>
	<Content>
		<PersonSelectionTable on:selection={(event) => selectionHandler(event.detail)} />
	</Content>
	<Actions>
		<Button on:click={() => (open = false)}>
			<Label>Cancel</Label>
		</Button>
	</Actions>
</Dialog>

<IconButton on:click={() => (open = true)} class="material-icons">edit</IconButton>
