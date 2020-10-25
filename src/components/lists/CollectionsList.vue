<template>
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from 'vue-router';
import { mapGetters } from "vuex";
import {
    IonSkeletonText,
    IonLabel,
    IonItemGroup,
    IonItemDivider,
    IonNote,
    IonThumbnail,
    IonItem,
    IonImg
} from "@ionic/vue";
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
        IonImg
    },
    props: {
        isInstituteCollectionsList: Boolean,
        isLoadingCollections: Boolean
    },
    computed: {
        collections(): Array<CollectionModel> {
            if (this.isInstituteCollectionsList)
                return this.getInstituteCollections();
            else
                return this.getCollections();
        },
        totalCollections(): number {
            if (this.isInstituteCollectionsList)
                return this.getInstituteTotalCollections();
            else
                return this.getTotalCollections();
        }
    },
    setup() {
      const router = useRouter();
      return { router };
    },
    methods: {
        ...mapGetters("collection", [
            "getCollections",
            "getTotalCollections",
            "getInstituteCollections",
            "getInstituteTotalCollections",
        ])
    }
})
</script>