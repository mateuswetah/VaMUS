<template>
    <ion-item-group>
        <ion-item-divider>
            <ion-label>Museus</ion-label>
            <ion-note slot="end">{{ totalInstitutes}}</ion-note>
        </ion-item-divider>

        <institute-list-item
                v-for="(institute, index) of institutes"
                :key="index"
                :institute="institute" />
           
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
import { mapGetters } from "vuex";
import {
    IonSkeletonText,
    IonLabel,
    IonItemGroup,
    IonItemDivider,
    IonNote,
    IonThumbnail,
    IonItem,
} from "@ionic/vue";
import InstituteListItem from '@/components/list-items/InstituteListItem.vue';

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
        InstituteListItem
    },
    props: {
        isLoadingInstitutes: Boolean
    },
    computed: {
        ...mapGetters("institute", {
            institutes: "getInstitutes",
            totalInstitutes: "getTotalInstitutes",
        })
    }
})
</script>