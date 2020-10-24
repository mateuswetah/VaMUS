<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        
        <ion-tab-button tab="list" href="/tabs/list">
          <ion-icon :icon="list" />
          <ion-label>Listagem</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="map" href="/tabs/map">
          <ion-icon :icon="map" />
          <ion-label>Mapa</ion-label>
        </ion-tab-button>
        
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from '@ionic/vue';
import { list, map } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      list,
      map
    }
  }
}
</script>