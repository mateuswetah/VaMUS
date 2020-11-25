<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">

            <ion-img
                v-if="
                    collection.thumbnail &&
                    collection.thumbnail['tainacan-medium'] &&
                    collection.thumbnail['tainacan-medium'][0]
                "
                :src="collection.thumbnail['tainacan-medium'][0]"
            />
            
            
            <div class="page-contents" v-if="!isLoadingCollection">
                <ion-text>
                    <h1>{{ collection.name ? collection.name : 'Coleção' }}</h1>
                </ion-text>
                <ion-text>
                    <p class="page-contents__institute">Instituto:&nbsp;<router-link :to="'/institute/' + collection.vamus_institute_identifier_collection "><strong>{{ collection.vamus_institute_name_collection ? collection.vamus_institute_name_collection : '' }}</strong></router-link></p>
                </ion-text>

                <ion-segment :value="currentSegment" @ionChange="segmentChanged($event)">
                    <ion-segment-button value="info">
                        <ion-label>Info</ion-label>
                    </ion-segment-button>
                    <ion-segment-button value="items">
                        <ion-label>Itens</ion-label>
                    </ion-segment-button>
                </ion-segment>

                <div class="ion-padding" v-if="currentSegment === 'info'">
                    <p>{{ collection.description }}</p>
                </div>
                <div v-if="currentSegment === 'items'">
                    <ion-list>
                        <items-list 
                                is-collection-items-list
                                :is-loading-items="isLoadingItems" />
                    </ion-list>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
    IonButtons,
    IonBackButton,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonList,
    IonText,
    IonImg
} from "@ionic/vue";
import ItemsList from '@/components/lists/ItemsList.vue'

export default defineComponent({
    name: 'CollectionPage',
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonContent,
        IonButtons,
        IonBackButton,
        IonSegment,
        IonSegmentButton,
        IonLabel,
        IonList,
        IonText,
        IonImg,
        ItemsList
    },
    data() {
        return {
            isLoadingCollection: false,
            isLoadingItems: false,
            collectionId: '',
            currentSegment: 'info'
        };
    },
    computed: {
        ...mapGetters("collection", {
            collection: "getCollection",
        })
    },
    mounted() {
        this.collectionId = '' + this.$route.params.collectionId;

        // Load collections
        this.isLoadingCollection = true;
        this.fetchCollection(this.collectionId)
            .then(() => (this.isLoadingCollection = false))
            .catch(() => (this.isLoadingCollection = false));
    },
    methods: {
        ...mapActions("collection", ["fetchCollection"]),
        ...mapActions("item", ["fetchCollectionItems"]),
        segmentChanged(ev: CustomEvent) {
            this.currentSegment = ev.detail.value;

            if (this.currentSegment === 'items') {
                // Load items
                this.isLoadingItems = true;
                this.fetchCollectionItems({ collectionId: this.collectionId, params: { orderby: 'relevance' }})
                    .then(() => (this.isLoadingItems = false))
                    .catch(() => (this.isLoadingItems = false));
            }
        }
    },
});
</script>

<style scoped>
    ion-toolbar {
        position: absolute;
        --background: transparent;
    }
    .page-contents h1 {
        padding: 0 1rem;
    }
    ion-list,
    ion-item-group {
        --ion-background-color: var(--background, #f2f2f2);
    }
    .page-contents__institute {
        padding: 0 1rem;
        font-size: 0.875rem;
        color: var(--ion-color-dark-tint, #383a3e);
    }
</style>
