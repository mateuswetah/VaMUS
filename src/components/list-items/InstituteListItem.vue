<template>
    <ion-item
        button
        :router-link="'/institute/' + institute.id"
    >
        <ion-thumbnail slot="start">
            <ion-img
                v-if="institute['@files:avatar']?.url"
                :src="institute['@files:avatar']?.url"
            />
            <ion-skeleton-text v-else />
        </ion-thumbnail>
        <ion-label>
            <h2>
                {{ institute.name }}
            </h2>
            <p>
                {{ institute.endereco }}
            </p>
        </ion-label>
    </ion-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from 'vue-router';
import {
    IonSkeletonText,
    IonLabel,
    IonThumbnail,
    IonItem,
    IonImg
} from "@ionic/vue";

export default defineComponent({
    name: 'InstituteListItem',
    components: {
        IonSkeletonText,
        IonLabel,
        IonThumbnail,
        IonItem,
        IonImg
    },
    props: {
        institute: Object
    },
    setup() {
      const router = useRouter();
      return { router };
    }
})
</script>