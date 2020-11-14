<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <SearchBar />

            <ion-list>
                
                <ion-segment v-model="currentSegment">
                    <ion-segment-button value="items">
                        <ion-label>Itens <span v-if="!isNaN(totalItems)">({{ totalItems }})</span></ion-label>
                    </ion-segment-button>
                    <ion-segment-button value="collections">
                        <ion-label>Coleções <span v-if="!isNaN(totalCollections)">({{ totalCollections }})</span></ion-label>
                    </ion-segment-button>
                    <ion-segment-button value="institutes">
                        <ion-label>Museus <span v-if="!isNaN(totalInstitutes)">({{ totalInstitutes }})</span></ion-label>
                    </ion-segment-button>
                </ion-segment>

                <items-list 
                        v-if="currentSegment === 'items'"
                        :is-loading-items="isLoadingItems" />

                <collections-list 
                        v-if="currentSegment === 'collections'"
                        :is-loading-collections="isLoadingCollections" />

                <institutes-list 
                        v-if="currentSegment === 'institutes'"
                        :is-loading-institutes="isLoadingInstitutes" />
            
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import {
    IonPage,
    IonContent,
    IonList,
    IonSegment,
    IonSegmentButton,
    IonLabel
} from "@ionic/vue"
import { mapActions, mapMutations, mapGetters } from "vuex"
import ItemsList from '@/components/lists/ItemsList.vue'
import CollectionsList from '@/components/lists/CollectionsList.vue'
import InstitutesList from '@/components/lists/InstitutesList.vue'
import SearchBar from '@/components/others/SearchBar.vue';

export default defineComponent({
    name: "List",
    components: {
        IonContent,
        IonPage,
        IonList,
        IonLabel,
        IonSegment,
        IonSegmentButton,
        ItemsList,
        CollectionsList,
        InstitutesList,
        SearchBar
    },
    data() {
        return {
            isLoadingCollections: false,
            isLoadingItems: false,
            isLoadingInstitutes: false,
            currentSegment: 'items'
        };
    },
    watch: {
        searchValue() {
            this.fetchContent();
        }
    },
    mounted() {
        this.fetchContent();
    },
    computed: {
        ...mapGetters("search", {
            searchValue: "getSearchValue",
        }),
        ...mapGetters("item", {
            totalItems: "getTotalItems",
        }),
        ...mapGetters("collection", {
            totalCollections: "getTotalCollections",
        }),
        ...mapGetters("institute", {
            totalInstitutes: "getTotalInstitutes",
        })
    },
    methods: {
        ...mapActions("item", ["fetchItems"]),
        ...mapActions("collection", ["fetchCollections"]),
        ...mapActions("institute", ["fetchInstitutes"]),
        ...mapMutations("search", ["setIsLoadingSomeEntity"]),
        fetchContent() {
            // Start loading everbody
            this.setIsLoadingSomeEntity(true);
            
            // Load items
            this.isLoadingItems = true;
            const itemsRequest = this.fetchItems({ perpage: 24, orderby: 'relevance', search: this.searchValue })
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
                    this.setIsLoadingSomeEntity(false);
                });
        }
    },
});
</script>

<style>
ion-list {
    --ion-item-background: #f5f5f5;
}
</style>