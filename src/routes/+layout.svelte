<Drawer variant="dismissible" bind:open>
  <Content>
    <List>
      {#each links as link}
        <Item href={link.href}>
        <Graphic class="material-icons">{link.icon}</Graphic>
        <Text>{link.text}</Text>
      </Item>
      {/each}
    </List>
  </Content>
</Drawer>

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
    

import IconButton from '@smui/icon-button';
import Drawer, { AppContent, Content } from '@smui/drawer';
import List, { Item, Text, Graphic} from '@smui/list';
import TopAppBar, {
    Row,
    Section,
    Title,
    AutoAdjust,
} from '@smui/top-app-bar';

let topAppBar: TopAppBar;
let open = false

const links = [
  { text: 'Home', href: '/', icon: 'home'},
  { text: 'Movies', href: '/movies', icon: 'movie'},
  { text: 'Persons', href: '/persons', icon: 'person'},
  { text: 'About', href: '/about', icon: 'help'},
]

</script>

<style>
main {
  padding: 1em;
}
</style>