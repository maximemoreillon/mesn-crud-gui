<script lang="ts">
	import type Movie from '$lib/movie';

	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { PUBLIC_CRUD_API_URL } from '$env/static/public';
	import { Content } from '@smui/card';
	import List, { Item, Text, PrimaryText, SecondaryText } from '@smui/list';

	const { _id } = $page.params;

	let movies: Movie[];

	export let query: string;

	onMount(async () => {
		getMovies();
	});

	const getMovies = async () => {
		try {
			const url = `${PUBLIC_CRUD_API_URL}/movies?${query}=${_id}`;
			const res = await fetch(url);
			const data = await res.json();
			movies = data.items;
		} catch (error) {
			alert('Failed to get person');
			console.error(error);
		}
	};
</script>

{#if movies && movies.length}
	<List twoLine>
		{#each movies as movie}
			<!-- href only seems to work if list used in a drawer -->
			<a href={`/movies/${movie._id}`}>
				<Item>
					<Text>
						<PrimaryText>{movie.title}</PrimaryText>
						<SecondaryText>{movie.year}</SecondaryText>
					</Text>
				</Item>
			</a>
		{/each}
	</List>
{:else}
	<Content>None</Content>
{/if}

<style>
	a {
		text-decoration: none;
	}
</style>
