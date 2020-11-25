<template>
  <ion-content class="ion-padding">
    <ion-list lines="none">
          
          <items-list is-items-by-location-list :is-loading-items="isLoadingItems" />

          <collections-list is-collections-by-location-list :is-loading-collections="isLoadingCollections" />

          <institutes-list is-institutes-by-location-list :is-loading-institutes="isLoadingInstitutes" />
      
      </ion-list>
  </ion-content>
</template>

<script>
import { IonContent, IonList } from '@ionic/vue';
import { defineComponent } from 'vue';
import ItemsList from '@/components/lists/ItemsList.vue'
import CollectionsList from '@/components/lists/CollectionsList.vue'
import InstitutesList from '@/components/lists/InstitutesList.vue'

export default defineComponent({
  name: 'Popover',
  components: { 
    IonContent,
    IonList,
    InstitutesList,
    CollectionsList,
    ItemsList
  },
  watch: {
      '$route' (){
          if (typeof this.onDismissPopover == 'function')
            this.onDismissPopover();
      }
  },
  props: {
    onDismissPopover: () => { }
  },
  data() {
    return {
      isLoadingCollections: false,
      isLoadingItems: false,
      isLoadingInstitutes: false,
    }
  }
});
</script>

<style>
/* Popover styling must be done globally as it is scoped on component; */
.map-marker-popover {
    --width: 100%;
}
.map-marker-popover .popover-wrapper .popover-content {
    max-width: calc(100% - 20px);
    top: auto !important;
    bottom: 10px !important;
    left: 10px !important;
}
</style>