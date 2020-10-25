<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <ion-header translucent>
                <ion-toolbar>
                    <ion-searchbar
                            :value="searchValue"
                            @ionChange="onSearch"
                            debounce="500" 
                            animated 
                            show-cancel-button="focus"
                            placeholder="Procure por Museus, Coleções ou Itens..."></ion-searchbar>
                    <ion-progress-bar 
                            v-if="isLoadingSomeEntity"
                            type="indeterminate" />
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
    IonSearchbar,
    IonContent,
    IonList,
    IonProgressBar
} from "@ionic/vue"
import { mapActions } from "vuex"
import ItemsList from '@/components/lists/ItemsList.vue'
import CollectionsList from '@/components/lists/CollectionsList.vue'
import InstitutesList from '@/components/lists/InstitutesList.vue'

export default defineComponent({
    name: "List",
    components: {
        IonHeader,
        IonToolbar,
        IonSearchbar,
        IonContent,
        IonPage,
        IonList,
        IonProgressBar,
        ItemsList,
        CollectionsList,
        InstitutesList
    },
    data() {
        return {
            isLoadingCollections: false,
            isLoadingItems: false,
            isLoadingInstitutes: false,
            isLoadingSomeEntity: false,
            searchValue: ''
        };
    },
    mounted() {
        this.fetchContent();
    },
    methods: {
        ...mapActions("item", ["fetchItems"]),
        ...mapActions("collection", ["fetchCollections"]),
        ...mapActions("institute", ["fetchInstitutes"]),
        onSearch(ev: CustomEvent) {
            this.searchValue = ev.detail.value;
            this.fetchContent();
        },
        fetchContent() {
            // Start loading everbody
            this.isLoadingSomeEntity = true;
            
            // Load items
            this.isLoadingItems = true;
            const itemsRequest = this.fetchItems({ perpage: 6, orderby: 'relevance', search: this.searchValue })
                .then(() => (this.isLoadingItems = false))
                .catch(() => (this.isLoadingItems = false));

            // Load collections
            this.isLoadingCollections = true;
            const collectionsRequest = this.fetchCollections({ search: this.searchValue })
                .then(() => (this.isLoadingCollections = false))
                .catch(() => (this.isLoadingCollections = false));

            // Load institutes
            this.isLoadingInstitutes = true;
            const institutesRequest = this.fetchInstitutes({ search: this.searchValue })
                .then(() => (this.isLoadingInstitutes = false))
                .catch(() => (this.isLoadingInstitutes = false));

            Promise.all([ itemsRequest, collectionsRequest, institutesRequest])
                .then(() => {
                    this.isLoadingSomeEntity = false;
                });
        }
    },
});
</script>