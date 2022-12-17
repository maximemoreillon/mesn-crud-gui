<Drawer variant="dismissible" bind:open>
  <Content>
    <!-- TODO: icons -->
    <List>
      <Item href="/movies">
          <Graphic class="material-icons">movie</Graphic>
          <Text>Movies</Text>
      </Item>
      <Item href="/persons">
        <Graphic class="material-icons">person</Graphic>
        <Text>Persons</Text>
      </Item>
      <Item href="/about">
        <Graphic class="material-icons">help</Graphic>
        <Text>About</Text>
      </Item>
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
    
import TopAppBar, {
    Row,
    Section,
    Title,
    AutoAdjust,
} from '@smui/top-app-bar';
import IconButton from '@smui/icon-button';
import Drawer, { AppContent, Content } from '@smui/drawer';
import List, { Item, Text, Graphic} from '@smui/list';

let topAppBar: TopAppBar;
let open = false

</script>

<style>
main {
  padding: 1em;
}
</style>