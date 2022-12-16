<Drawer variant="dismissible" bind:open>
  <Content>
    <List>
      <a href="/movies">
      <Item>
          <Text>Movies</Text>
        </Item>
      </a>
      <a href="/about">
      <Item>
          <Text>About</Text>
        </Item>
      </a>
    </List>
  </Content>
</Drawer>

<AppContent> 
  <TopAppBar bind:this={topAppBar} variant="standard">
    <Row>
      <Section>
        <IconButton class="material-icons" on:click={() => open = !open}>menu</IconButton>
        <Title>MESN CRUD</Title>
      </Section>
    </Row>
  </TopAppBar>
  <AutoAdjust {topAppBar}>
    <slot></slot>
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
import List, { Item, Text } from '@smui/list';

let topAppBar: TopAppBar;
let open = false

</script>
