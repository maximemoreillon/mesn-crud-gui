<script lang="ts">
	import Button, { Label, Icon } from '@smui/button';
	import LinearProgress from '@smui/linear-progress';
	import Textfield from '@smui/textfield';
	import Snackbar, { Actions, Label as SnackbarLabel } from '@smui/snackbar';
	import IconButton from '@smui/icon-button';

	import type Person from '$lib/person';

	import RelatedMovies from '$lib/persons/[_id]/RelatedMovies.svelte';
	import EditableContentDialog from '$lib/EditableContentDialog.svelte';

	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { PUBLIC_CRUD_API_URL } from '$env/static/public';

	let person: Person;
	let loading = false;
	let snackbar: Snackbar;
	let snackbarLabel = '';

	onMount(async () => {
		await getPerson();
	});

	const { _id } = $page.params;
	const url = `${PUBLIC_CRUD_API_URL}/persons/${_id}`;

	const getPerson = async () => {
		loading = true;
		try {
			const res = await fetch(url);
			person = await res.json();
		} catch (error) {
			snackbar.open();
			snackbarLabel = 'Query failed';
			console.error(error);
		} finally {
			loading = false;
		}
	};

	const deletePerson = async () => {
		if (!confirm(`Delete ${person.name}?`)) return;
		const options = { method: 'DELETE' };
		try {
			await fetch(url, options);
			goto(`/persons`);
		} catch (error) {
			snackbar.open();
			snackbarLabel = 'Deletion failed';
		}
	};

	const savePerson = async () => {
		const options = {
			method: 'PATCH',
			body: JSON.stringify(person),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		};
		try {
			await fetch(url, options);
			snackbar.open();
			snackbarLabel = 'Update successful';
		} catch (error) {
			console.error(error);
			snackbar.open();
			snackbarLabel = 'Update failed';
		}
	};
</script>

{#if loading}
	<LinearProgress indeterminate />
{:else if person}
	<EditableContentDialog bind:content={person.name} label="Name">
		<h2>{person.name}</h2>
	</EditableContentDialog>

	<Textfield bind:value={person.age} label="Age" input$emptyValueUndefined />

	<h5>Directed</h5>
	<RelatedMovies query="director" />

	<h5>Starred in</h5>
	<RelatedMovies query="actors" />

	<Button type="submit" on:click={deletePerson}>
		<Icon class="material-icons">delete</Icon>
		<Label>Delete person</Label>
	</Button>
	<Button type="submit" on:click={savePerson}>
		<Icon class="material-icons">save</Icon>
		<Label>Save person</Label>
	</Button>
{:else}
	<div>No data</div>
{/if}

<Snackbar bind:this={snackbar}>
	<SnackbarLabel>{snackbarLabel}</SnackbarLabel>
	<Actions>
		<IconButton class="material-icons" title="Dismiss">close</IconButton>
	</Actions>
</Snackbar>
