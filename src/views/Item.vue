<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button color="primary"></ion-back-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        
        <ion-content :fullscreen="true">
            <ion-slides v-if="!isLoadingItem && !isLoadingItemAttachments" pager="true" :options="slideOpts">
                <ion-slide  v-for="(attachment, index) of (item.attachments||[])" :key="index">
                    <ion-img :src="attachment.url" />
                </ion-slide>
            </ion-slides>

            <div class="page-contents" v-if="!isLoadingItem">
                <ion-text>
                    <h1>{{ item.title ? item.title : '' }}</h1>
                </ion-text>
                <ion-text v-if="!isLoadingCollectionBasics">
                    <p class="page-contents__collection">Coleção:&nbsp;<router-link :to="'/collection/' + item.collection_id "><strong>{{ collection.name ? collection.name : '' }}</strong></router-link></p>
                </ion-text>
                <ion-skeleton-text v-else animated></ion-skeleton-text>
                <ion-text>
                    <p class="page-contents__description">{{ item.description ? item.description : '' }}</p>
                </ion-text>
                <br>
                <hr>
                <ion-button 
                        fill="clear"
                        size="small"
                        @click="isMetadataCollapsed = !isMetadataCollapsed">
                   <ion-icon color="primary" :icon="!isMetadataCollapsed ? chevronDownOutline : chevronUpOutline"></ion-icon>&nbsp;Exibir a ficha do item
                </ion-button>
                <div 
                        class="page-contents__metadata"
                        v-show="!isMetadataCollapsed">
                    <ion-text
                            v-for="(meta, index) of (item.metadata||[])"
                            :key="index"
                            color="dark">
                        <h2>{{ meta.label }}</h2>
                        <p>{{ meta.value }}</p>
                    </ion-text>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import { chevronDownOutline, chevronUpOutline } from 'ionicons/icons';

import {
    IonPage,
    IonHeader,
    IonSkeletonText,
    IonToolbar,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonBackButton,
    IonImg,
    IonSlides,
    IonSlide,
    IonText
} from "@ionic/vue";

export default defineComponent({
    name: 'CollectionPage',
    components: {
        IonPage,
        IonHeader,
        IonSkeletonText,
        IonToolbar,
        IonContent,
        IonButtons,
        IonButton,
        IonIcon,
        IonBackButton,
        IonImg,
        IonSlides,
        IonSlide,
        IonText
    },
    setup() {
        // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
        const slideOpts = {
            initialSlide: 0,
            speed: 400
        };
        return { 
            slideOpts,
            chevronDownOutline,
            chevronUpOutline
        }
    },
    data() {
        return {
            isLoadingItem: false,
            isLoadingItemMetadata: false,
            isLoadingItemAttachments: false,
            isLoadingCollectionBasics: false,
            itemId: '',
            isMetadataCollapsed: false
        };
    },
    computed: {
        ...mapGetters("item", {
            item: "getItem",
        }),
        ...mapGetters("collection", {
            collection: "getCollectionBasics",
        })
    },
    mounted() {
        this.itemId = '' + this.$route.params.itemId;

        // Load collections
        this.isLoadingItem = true;
        this.isLoadingItemMetadata = true;
        this.isLoadingItemAttachments = true;
        this.isLoadingCollectionBasics = true;

        this.fetchItem(this.itemId)
            .then(() => {
                this.isLoadingItem = false;
                this.addItemAttachments(this.itemId)
                    .then(() => (this.isLoadingItemAttachments = false))
                    .catch(() => (this.isLoadingItemAttachments = false));

                this.fetchCollectionBasics(this.item.collection_id)
                    .then(() => (this.isLoadingCollectionBasics = false))
                    .catch(() => (this.isLoadingCollectionBasics = false));
            })
            .catch(() => (this.isLoadingItem = false));

        this.fetchItemMetadata(this.itemId)
            .then(() => (this.isLoadingItemMetadata = false))
            .catch(() => (this.isLoadingItemMetadata = false));
    },
    methods: {
        ...mapActions("item", [
            "fetchItem",
            "fetchItemMetadata",
            "addItemAttachments"
        ]),
        ...mapActions("collection", ["fetchCollectionBasics"]),
    }
});
</script>

<style scoped>
    ion-toolbar {
        position: absolute;
        --background: transparent;
    }
    .page-contents hr {
        background: var(--ion-color-medium, #92949c);
    }
    .page-contents {
        padding: 1rem;
    }
    .page-contents h1 {
        margin-top: 0;
    }
    .page-contents ion-button {
        margin: 0 auto;
        display: block;
    }
    .page-contents__metadata,
    .page-contents__collection,
    .page-contents__description {
        font-size: 0.875rem;
    }
    .page-contents__metadata h2 {
        font-size: 0.75rem;
        font-weight: normal;
        color: var(--ion-color-dark-tint, #383a3e);
    }
    .page-contents__collection {
        color: var(--ion-color-dark-tint, #383a3e);
    }
</style>
