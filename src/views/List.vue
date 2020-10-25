<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <SearchBar />

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
    IonContent,
    IonList
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
                    this.setIsLoadingSomeEntity(false);
                });
        }
    },
});
</script>