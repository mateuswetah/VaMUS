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
        <ion-item-group>
          <ion-item-divider>
            <ion-label>Itens</ion-label>
            <ion-note slot="end">{{ totalItems }}</ion-note>
          </ion-item-divider>
          <ion-grid>
            <ion-row>
              <ion-col
                  size="4" 
                  v-for="(item, index) of items"
                  :key="index">
                <ion-img 
                    v-if="item.thumbnail && item.thumbnail.thumbnail && item.thumbnail.thumbnail[0]"
                    :src="item.thumbnail.thumbnail[0]" />
               <ion-label>{{ item.title }}</ion-label>
              </ion-col>
            </ion-row>
            <ion-row v-if="isLoadingItems">
              <ion-col
                  size="4" 
                  v-for="n in 6"
                  :key="n">
                <ion-skeleton-text style="min-height: 31vw"></ion-skeleton-text>
              </ion-col>
            </ion-row>
          </ion-grid>

        </ion-item-group>

        <ion-item-group>
          <ion-item-divider>
            <ion-label>Coleções</ion-label>
            <ion-note slot="end">{{ totalCollections }}</ion-note>
          </ion-item-divider>
          <ion-item 
              v-for="(collection, index) of collections"
              :key="index">
            <ion-thumbnail slot="start">
              <ion-img 
                  v-if="collection.thumbnail && collection.thumbnail.thumbnail && collection.thumbnail.thumbnail[0]"
                  :src="collection.thumbnail.thumbnail[0]" />
              <ion-skeleton-text v-else />
            </ion-thumbnail>
            <ion-label>
              <h3>
                {{ collection.name }}
              </h3>
              <p>
                {{ collection.description }}
              </p>
            </ion-label>
          </ion-item>
          <ion-item v-if="isLoadingCollections">
            <ion-thumbnail slot="start">
              <ion-skeleton-text></ion-skeleton-text>
            </ion-thumbnail>
            <ion-label>
              <h3>
                <ion-skeleton-text animated style="width: 80%"></ion-skeleton-text>
              </h3>
              <p>
                <ion-skeleton-text animated style="width: 60%"></ion-skeleton-text>
              </p>
              <p>
                <ion-skeleton-text animated style="width: 30%"></ion-skeleton-text>
              </p>
            </ion-label>
          </ion-item>
        </ion-item-group>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonImg, IonThumbnail, IonItemDivider, IonSkeletonText, IonItemGroup, IonGrid, IonCol, IonRow } from '@ionic/vue';
import { mapActions, mapGetters } from 'vuex';

export default defineComponent({
  name: 'List',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonList, IonItem, IonLabel, IonImg, IonItemGroup, IonItemDivider, IonThumbnail, IonSkeletonText, IonGrid, IonCol, IonRow },
  data() {
    return {
      isLoadingCollections: false,
      isLoadingItems: false
    }
  },
  computed: {
    ...mapGetters('collection', {
        collections: 'getCollections',
        totalCollections: 'getTotalCollections'
    }),
    ...mapGetters('item', {
        items: 'getItems',
        totalItems: 'getTotalItems'
    })
  },
  mounted() {

    // Load items
    this.isLoadingItems = true;
    this.fetchItems({ perpage: 6 })
      .then(() => this.isLoadingItems = false)
      .catch(() => this.isLoadingItems = false);

    // Load collections
    this.isLoadingCollections = true;
    this.fetchCollections()
      .then(() => this.isLoadingCollections = false)
      .catch(() => this.isLoadingCollections = false);

  },
  methods: {
    ...mapActions('collection', [
        'fetchCollections'
    ]),
    ...mapActions('item', [
        'fetchItems'
    ])
  }
})
</script>