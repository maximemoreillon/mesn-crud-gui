<Drawer variant="dismissible" bind:open>
    <Header>
        <Title>MESN CRUD</Title>
        <Subtitle>MongoDB, Express, Svelte, Node</Subtitle>
    </Header>
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

<script lang="ts">
    

import Drawer, {
    Content,
    Header,
    Title,
    Subtitle,
} from '@smui/drawer';
import List, { 
    Item, 
    Text, 
    Graphic,
} from '@smui/list';


export let open = false

const links = [
  { text: 'Home', href: '/', icon: 'home'},
  { text: 'Movies', href: '/movies', icon: 'movie'},
  { text: 'Persons', href: '/persons', icon: 'person'},
  { text: 'About', href: '/about', icon: 'help'},
]

</script>
