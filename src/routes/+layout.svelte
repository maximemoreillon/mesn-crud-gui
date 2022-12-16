<TopAppBar bind:this={topAppBar} variant="standard">
  <Row>
    <Section>
      <Title>MESN CRUD</Title>
    </Section>
    <Section align="end" toolbar>
        <IconButton class="material-icons">
            information
        </IconButton>
    </Section>
  </Row>
</TopAppBar>
<AutoAdjust {topAppBar} style="padding: 5em 1em; ">
  <slot></slot>
</AutoAdjust>


<script lang="ts">
    
import TopAppBar, {
    Row,
    Section,
    Title,
    AutoAdjust,
} from '@smui/top-app-bar';
import IconButton from '@smui/icon-button';

let topAppBar: TopAppBar;
</script>
