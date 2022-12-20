<NavDrawer bind:open={open}/>

<AppContent> 
  <TopAppBar bind:this={topAppBar} variant="fixed">
    <Row>
      <Section>
        <IconButton class="material-icons" on:click={() => open = !open}>menu</IconButton>
        <Title>MESN CRUD</Title>
      </Section>
    </Row>
  </TopAppBar>
  <AutoAdjust {topAppBar}>
    <main>
      <slot></slot>
    </main>
  </AutoAdjust>
</AppContent>



<script lang="ts">
// export const prerender = true;

import NavDrawer from '$lib/NavDrawer.svelte';

import IconButton from '@smui/icon-button';
import { AppContent } from '@smui/drawer';
import TopAppBar, {
    Row,
    Section,
    Title,
    AutoAdjust,
} from '@smui/top-app-bar';

let topAppBar: TopAppBar;
let open = true

</script>
