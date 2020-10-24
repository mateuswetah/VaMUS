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

                <institutes-list :is-loading-institutes="isLoadingInstitutes" />
            
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
import { mapActions } from "vuex"
import ItemsList from '@/components/ItemsList.vue'
import CollectionsList from '@/components/CollectionsList.vue'
import InstitutesList from '@/components/InstitutesList.vue'

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
        CollectionsList,
        InstitutesList
    },
    data() {
        return {
            isLoadingCollections: false,
            isLoadingItems: false,
            isLoadingInstitutes: false
        };
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

        // Load institutes
        this.isLoadingInstitutes = true;
        this.fetchInstitutes()
            .then(() => (this.isLoadingInstitutes = false))
            .catch(() => (this.isLoadingInstitutes = false));
    },
    methods: {
        ...mapActions("item", ["fetchItems"]),
        ...mapActions("collection", ["fetchCollections"]),
        ...mapActions("institute", ["fetchInstitutes"]),
    },
});
</script>