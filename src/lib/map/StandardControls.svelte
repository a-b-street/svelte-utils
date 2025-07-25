<script lang="ts">
  import { run } from "svelte/legacy";

  import { NavigationControl, ScaleControl } from "svelte-maplibre";
  import type { Map } from "maplibre-gl";

  interface Props {
    map: Map | undefined;
  }

  let { map }: Props = $props();

  run(() => {
    if (map) {
      map.keyboard.disableRotation();
      map.dragRotate.disable();
      map.touchZoomRotate.disableRotation();
    }
  });
</script>

<NavigationControl showCompass={false} />
<ScaleControl />
