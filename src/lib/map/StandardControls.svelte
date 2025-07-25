<script lang="ts">
  import { NavigationControl, ScaleControl } from "svelte-maplibre";
  import type { Map } from "maplibre-gl";

  let { map }: { map: Map | undefined } = $props();

  $effect(() => {
    if (map) {
      map.keyboard.disableRotation();
      map.dragRotate.disable();
      map.touchZoomRotate.disableRotation();
    }
  });
</script>

<NavigationControl showCompass={false} />
<ScaleControl />
