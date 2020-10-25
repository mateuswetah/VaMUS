<template>
    <ion-item
        button
        :router-link="'/collection/' + collection.id"
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from 'vue-router';
import {
    IonLabel,
    IonThumbnail,
    IonItem,
    IonImg,
    IonSkeletonText
} from "@ionic/vue";

export default defineComponent({
    name: 'CollectionListItem',
    components: {
        IonLabel,
        IonThumbnail,
        IonItem,
        IonImg,
        IonSkeletonText
    },
    props: {
        collection: Object
    },
    setup() {
      const router = useRouter();
      return { router };
    }
})
</script>
