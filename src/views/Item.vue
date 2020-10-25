<template>
    <ion-page>
        <ion-header :transluscent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                    <ion-title v-if="!isLoadingItem" >{{ item.title ? item.title : 'Item' }}</ion-title>
                    <ion-skeleton-text v-else animated />
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <div>
                <ion-slides v-if="!isLoadingItem && !isLoadingItemAttachments" pager="true" :options="slideOpts">
                    <ion-slide  v-for="(attachment, index) of (item.attachments||[])" :key="index">
                        <ion-img :src="attachment.url" />
                    </ion-slide>
                </ion-slides>
            </div>

            <ion-card v-if="!isLoadingItem">
                <ion-card-header>
                    <ion-card-title>{{ item.title ? item.title : 'Item' }}</ion-card-title>
                </ion-card-header>

                <ion-card-content>
                    {{ item.description ? item.description : 'description' }}
                    <hr >
                    <div 
                        v-for="(meta, index) of (item.metadata||[])" :key="index">
                        <ion-text color="dark">
                            <h5><b>{{meta.label}}</b></h5>
                            {{meta.value}}
                        </ion-text>
                        <hr >
                    </div>
                </ion-card-content>
            </ion-card>
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
    IonImg,
    IonSlides,
    IonSlide,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonText,
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
        IonImg,
        IonSlides,
        IonSlide,
        IonCard,
        IonCardHeader,
        IonCardContent, 
        IonCardTitle,
        IonText,
    },
    setup() {
        // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
        const slideOpts = {
            initialSlide: 0,
            speed: 400
        };
        return { slideOpts }
    },
    data() {
        return {
            isLoadingItem: false,
            isLoadingItemMetadata: false,
            isLoadingItemAttachments: false,
            itemId: '',
        };
    },
    computed: {
        ...mapGetters("item", {
            item: "getItem",
        })
    },
    mounted() {
        this.itemId = '' + this.$route.params.itemId;

        // Load collections
        this.isLoadingItem = true;
        this.isLoadingItemMetadata = true;
        this.isLoadingItemAttachments = true;
        this.fetchItem(this.itemId)
            .then(() => (this.isLoadingItem = false))
            .catch(() => (this.isLoadingItem = false));
        this.fetchItemMetadata(this.itemId)
            .then(() => (this.isLoadingItemMetadata = false))
            .catch(() => (this.isLoadingItemMetadata = false));
        this.addItemAttachments(this.itemId)
            .then(() => (this.isLoadingItemAttachments = false))
            .catch(() => (this.isLoadingItemAttachments = false));
    },
    methods: {
        ...mapActions("item", ["fetchItem"]),
        ...mapActions("item", ["fetchItemMetadata"]),
        ...mapActions("item", ["addItemAttachments"]),
    },
});
</script>
