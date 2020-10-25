<template>
    <ion-item-group v-if="totalCollections">
        <ion-item-divider v-if="isInstituteCollectionsList || isCollectionsByLocationList">
            <ion-label>Coleções</ion-label>
            <ion-note slot="end">{{ totalCollections }}</ion-note>
        </ion-item-divider>

        <collection-list-item
                v-for="(collection, index) of collections"
                :key="index"
                :collection="collection" />

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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import {
    IonSkeletonText,
    IonLabel,
    IonItemGroup,
    IonItemDivider,
    IonNote,
    IonThumbnail,
    IonItem
} from "@ionic/vue";
import CollectionListItem from '@/components/list-items/CollectionListItem.vue'
import CollectionModel from '@/store/modules/collection/models';

export default defineComponent({
    name: 'CollectionsList',
    components: {
        IonSkeletonText,
        IonLabel,
        IonItemGroup,
        IonItemDivider,
        IonNote,
        IonThumbnail,
        IonItem,
        CollectionListItem
    },
    props: {
        isInstituteCollectionsList: Boolean,
        isCollectionsByLocationList: Boolean,
        isLoadingCollections: Boolean
    },
    computed: {
        collections(): Array<CollectionModel> {
            if (this.isInstituteCollectionsList)
                return this.getInstituteCollections();
            else if (this.isCollectionsByLocationList)
                return this.getCollectionsByLocation()
            else
                return this.getCollections();
        },
        totalCollections(): number {
            if (this.isInstituteCollectionsList)
                return this.getInstituteTotalCollections();
            else if (this.isCollectionsByLocationList)
                return this.getTotalCollectionsByLocation();
            else
                return this.getTotalCollections();
        }
    },
    methods: {
        ...mapGetters("collection", [
            "getCollections",
            "getTotalCollections",
            "getInstituteCollections",
            "getInstituteTotalCollections",
            "getCollectionsByLocation",
            "getTotalCollectionsByLocation"
        ])
    }
})
</script>