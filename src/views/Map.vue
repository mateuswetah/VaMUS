<template>
  <ion-page>
    <ion-header :transluscent="true">
      <ion-toolbar>
        <ion-title>VaMUS</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Mapa</ion-title>
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
  name: 'Map',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  data(): {
    map: L.Map | undefined; 
  } {
    return {
      map: undefined
    }
  },
  methods: {
    ionViewDidEnter() {
      this.map = L.map('mapId').setView([-15.809365, -49.521065], 5);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'edupala.com © Angular LeafLet',
      })
        .addTo(this.map);

      L.marker([-15.80, -49.52])
        .addTo(this.map)
        .bindPopup('Algum museu')
        .openPopup();
    },
    ionViewWillLeave() {
      if (this.map)
        this.map.remove();
    }
  }
});
</script>