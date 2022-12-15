<TopAppBar bind:this={topAppBar} variant="standard">
  <Row>
    <Section>
      <Title>MESN CRUD</Title>
    </Section>
    <Section align="end" toolbar>
      <IconButton class="material-icons" aria-label="Bookmark this page"
        >bookmark</IconButton
      >
    </Section>
  </Row>
</TopAppBar>
<AutoAdjust {topAppBar}>
  Hello
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

