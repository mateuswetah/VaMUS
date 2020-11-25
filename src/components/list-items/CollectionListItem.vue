<template>
    <ion-item
        lines="none"
        button
        :router-link="'/collection/' + collection.id"
        class="collection-card"
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
            <h2>
                {{ collection.name }}
            </h2>
            <p>
                {{ collection.vamus_institute_name_collection }}
            </p>
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

<style scoped>
    ion-item {
        --background: white;
        margin: 12px;
        border-radius: 14px;
    }
    ion-thumbnail {
        margin: -34px 54px 0px -16px;
    }
    ion-img {
        height: 96px;
        width: 96px;
    }
    .collection-card ion-label h2 {
        font-size: 0.875rem;
        font-weight: bold;
    }
    .collection-card ion-label p {
        font-size: 0.875rem;
    }
    .collection-card ion-label p:last-of-type {
        color: var(--ion-color-dark-tint, #383a3e);
    }
</style>