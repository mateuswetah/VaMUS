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
                    <ion-title size="large">VaMUS</ion-title>
                </ion-toolbar>
            </ion-header>

            <ion-list>
                
                <items-list :is-loading-items="isLoadingItems" />

                <collections-list :is-loading-collections="isLoadingCollections" />
            
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList
} from "@ionic/vue"
import { mapActions, mapGetters } from "vuex"
import ItemsList from '@/components/ItemsList.vue'
import CollectionsList from '@/components/CollectionsList.vue'

export default defineComponent({
    name: "List",
    components: {
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonPage,
        IonList,
        ItemsList,
        CollectionsList
    },
    data() {
        return {
            isLoadingCollections: false,
            isLoadingItems: false,
        };
    },
    computed: {
        ...mapGetters("collection", {
            collections: "getCollections",
            totalCollections: "getTotalCollections",
        }),
    },
    mounted() {
        // Load items
        this.isLoadingItems = true;
        this.fetchItems({ perpage: 6, orderby: 'relevance' })
            .then(() => (this.isLoadingItems = false))
            .catch(() => (this.isLoadingItems = false));

        // Load collections
        this.isLoadingCollections = true;
        this.fetchCollections()
            .then(() => (this.isLoadingCollections = false))
            .catch(() => (this.isLoadingCollections = false));
    },
    methods: {
        ...mapActions("collection", ["fetchCollections"]),
        ...mapActions("item", ["fetchItems"]),
    },
});
</script>