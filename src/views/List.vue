<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>VaMUS</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Listagem</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <ion-list>
        <ion-item 
            v-for="(collection, index) of collections"
            :key="index">
          {{ collection.name }}
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, loadingController } from '@ionic/vue';
import { mapActions, mapGetters } from 'vuex';

export default defineComponent({
  name: 'List',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonList, IonItem },
  computed: {
    ...mapGetters('collection', {
        collections: 'getCollections'
    })
  },
  async mounted() {
    const loading = await loadingController
      .create({
        message: 'Carregando coleções...',
      });

    await loading.present();

    this.fetchCollections()
      .then(() => loading.dismiss())
      .catch(() => loading.dismiss());
  },
  methods: {
    ...mapActions('collection', [
        'fetchCollections'
    ]), 
  }
})
</script>