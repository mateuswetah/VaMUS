<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 2</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 2</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <div id="mapId" style="width: 100%; height: 100%" />

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import * as L from 'leaflet';

export default defineComponent({
  name: 'Tab2',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  data(): {
    map: L.Map | undefined; 
  } {
    return {
      map: undefined
    }
  },
  mounted() {
    this.initializeMap();
  },
  beforeDestroy() {
    // this.map.remove();
  },
  methods: {
    initializeMap() {
      this.map = L.map('mapId').setView([-15.809365, -49.521065], 5);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'edupala.com © Angular LeafLet',
      })
        .addTo(this.map);

      L.marker([-15.80, -49.52])
        .addTo(this.map)
        .bindPopup('Algum museu')
        .openPopup();
    }
  }
});
</script>