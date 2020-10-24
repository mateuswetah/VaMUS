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

                <ion-item-group>
                    <ion-item-divider>
                        <ion-label>Coleções</ion-label>
                        <ion-note slot="end">{{ totalCollections }}</ion-note>
                    </ion-item-divider>
                    <ion-item
                        button
                        :router-link="'/collection/' + collection.id"
                        v-for="(collection, index) of collections"
                        :key="index"
                    >
                        <ion-thumbnail slot="start">
                            <ion-img
                                v-if="
                                    collection.thumbnail &&
                                    collection.thumbnail.thumbnail &&
                                    collection.thumbnail.thumbnail[0]
                                "
                                :src="collection.thumbnail.thumbnail[0]"
                            />
                            <ion-skeleton-text v-else />
                        </ion-thumbnail>
                        <ion-label>
                            <h3>
                                {{ collection.name }}
                            </h3>
                            <p>
                                {{ collection.description }}
                            </p>
                        </ion-label>
                    </ion-item>
                    <ion-item v-if="isLoadingCollections">
                        <ion-thumbnail slot="start">
                            <ion-skeleton-text></ion-skeleton-text>
                        </ion-thumbnail>
                        <ion-label>
                            <h3>
                                <ion-skeleton-text
                                    animated
                                    style="width: 80%"
                                ></ion-skeleton-text>
                            </h3>
                            <p>
                                <ion-skeleton-text
                                    animated
                                    style="width: 60%"
                                ></ion-skeleton-text>
                            </p>
                            <p>
                                <ion-skeleton-text
                                    animated
                                    style="width: 30%"
                                ></ion-skeleton-text>
                            </p>
                        </ion-label>
                    </ion-item>
                </ion-item-group>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonImg,
    IonThumbnail,
    IonItemDivider,
    IonSkeletonText,
    IonItemGroup,
    IonNote
} from "@ionic/vue";
import { mapActions, mapGetters } from "vuex";
import { useRouter } from 'vue-router';
import ItemsList from '@/components/items-list.vue'

export default defineComponent({
    name: "List",
    components: {
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonPage,
        IonList,
        IonItem,
        IonLabel,
        IonImg,
        IonItemGroup,
        IonItemDivider,
        IonThumbnail,
        IonSkeletonText,
        IonNote,
        ItemsList
    },
    setup() {
      const router = useRouter();
      return { router };
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