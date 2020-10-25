<template>
    <ion-item-group>
        <ion-item-divider>
            <ion-label>Museus</ion-label>
            <ion-note slot="end">{{ totalInstitutes}}</ion-note>
        </ion-item-divider>
        <ion-item
            button
            :router-link="'/institute/' + institute.id"
            v-for="(institute, index) of institutes"
            :key="index"
        >
            <ion-thumbnail slot="start">
                <ion-img
                    v-if="institute['@files:avatar']?.url"
                    :src="institute['@files:avatar']?.url"
                />
                <ion-skeleton-text v-else />
            </ion-thumbnail>
            <ion-label>
                <h3>
                    {{ institute.name }}
                </h3>
                <p>
                    {{ institute.description }}
                </p>
            </ion-label>
        </ion-item>
        <ion-item v-if="isLoadingInstitutes">
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

export default defineComponent({
    name: 'InstitutesList',
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
        isLoadingInstitutes: Boolean
    },
    computed: {
        ...mapGetters("institute", {
            institutes: "getInstitutes",
            totalInstitutes: "getTotalInstitutes",
        })
    },
    setup() {
      const router = useRouter();
      return { router };
    }
})
</script>