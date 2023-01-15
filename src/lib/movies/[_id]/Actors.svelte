<script lang="ts">
	import type Person from '$lib/person';

	import List, { Item, Text, Meta } from '@smui/list';

	export let actors: Person[];

	const removeActor = (actor: Person) => {
		const actorIndex = actors.findIndex(({ _id }) => _id === actor._id);
		if (actorIndex >= 0) {
			actors.splice(actorIndex, 1);
			actors = actors;
		}
	};
</script>

{#if actors}
	<List>
		{#each actors as actor}
			<Item>
				<Text>
					<a href={`/persons/${actor._id}`}>{actor.name}</a>
				</Text>
				<Meta class="material-icons" on:click={() => removeActor(actor)}>delete</Meta>
			</Item>
		{/each}
	</List>
{/if}
