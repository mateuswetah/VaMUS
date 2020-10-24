<template>
    <ion-page>
        <ion-header :transluscent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title v-if="!isLoadingCollection">{{ collection.name ? collection.name : 'Coleção' }}</ion-title>
                <ion-skeleton-text v-else animated />
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-back-button></ion-back-button>
                    </ion-buttons>
                    <ion-title v-if="!isLoadingCollection" size="large">{{ collection.name ? collection.name : 'Coleção' }}</ion-title>
                    <ion-skeleton-text v-else animated />
                </ion-toolbar>
            </ion-header>

            <ion-img
                v-if="
                    collection.thumbnail &&
                    collection.thumbnail['tainacan-medium'] &&
                    collection.thumbnail['tainacan-medium'][0]
                "
                :src="collection.thumbnail['tainacan-medium'][0]"
            />
            
            <div>
                <ion-segment :value="currentSegment" @ionChange="segmentChanged($event)">
                    <ion-segment-button value="info">
                        <ion-label>Info</ion-label>
                    </ion-segment-button>
                    <ion-segment-button value="items">
                        <ion-label>Itens</ion-label>
                    </ion-segment-button>
                </ion-segment>

                <div v-if="currentSegment === 'info'">
                    <p>{{ collection.description }}</p>
                </div>
                <div v-if="currentSegment === 'items'">
                    <ion-list>
                        <ion-item-group>
                            <ion-item-divider>
                                <ion-label>Itens</ion-label>
                                <ion-note slot="end">{{ totalItems }}</ion-note>
                            </ion-item-divider>
                            <ion-grid>
                                <ion-row v-if="!isLoadingItems">
                                    <ion-col
                                        size="4"
                                        v-for="(item, index) of items"
                                        :key="index"
                                    >
                                        <ion-img
                                            v-if="
                                                item.thumbnail &&
                                                item.thumbnail.thumbnail &&
                                                item.thumbnail.thumbnail[0]
                                            "
                                            :src="item.thumbnail.thumbnail[0]"
                                        />
                                        <ion-label>{{ item.title }}</ion-label>
                                    </ion-col>
                                </ion-row>
                                <ion-row v-else>
                                    <ion-col size="4" v-for="n in 12" :key="n">
                                        <ion-skeleton-text
                                            style="min-height: 31vw"
                                        ></ion-skeleton-text>
                                    </ion-col>
                                </ion-row>
                            </ion-grid>
                        </ion-item-group>
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
    IonTitle,
    IonContent,
    IonSkeletonText,
    IonButtons,
    IonBackButton,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonList,
    IonImg,
    IonItemGroup,
    IonItemDivider,
    IonGrid,
    IonCol,
    IonRow,
    IonNote
} from "@ionic/vue";

export default defineComponent({
    name: 'CollectionPage',
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonSkeletonText,
        IonButtons,
        IonBackButton,
        IonSegment,
        IonSegmentButton,
        IonLabel,
        IonList,
        IonImg,
        IonItemGroup,
        IonItemDivider,
        IonGrid,
        IonCol,
        IonRow,
        IonNote
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
        }),
        ...mapGetters("item", {
            items: "getCollectionItems",
            totalItems: "getCollectionTotalItems",
        }),
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

            if (this.currentSegment === 'items' && !this.items.lenght) {
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
