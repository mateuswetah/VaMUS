<template>
    <ion-item-group>
        <ion-item-divider>
            <ion-label>Itens</ion-label>
            <ion-note slot="end">{{ totalItems }}</ion-note>
        </ion-item-divider>
        <ion-grid>
            <ion-row v-if="!isLoadingItems">
                <ion-col
                    size="4"
                    v-for="(item, index) of items"
                    :key="index"
                >
                    <ion-img
                        v-if="
                            item.thumbnail &&
                            item.thumbnail.thumbnail &&
                            item.thumbnail.thumbnail[0]
                        "
                        :src="item.thumbnail.thumbnail[0]"
                    />
                    <ion-label>{{ item.title }}</ion-label>
                </ion-col>
            </ion-row>
            <ion-row v-else>
                <ion-col size="4" v-for="n in 12" :key="n">
                    <ion-skeleton-text
                        style="min-height: 31vw"
                    ></ion-skeleton-text>
                </ion-col>
            </ion-row>
        </ion-grid>
    </ion-item-group>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import {
    IonSkeletonText,
    IonLabel,
    IonImg,
    IonItemGroup,
    IonItemDivider,
    IonGrid,
    IonCol,
    IonRow,
    IonNote
} from "@ionic/vue";
import ItemModel from '@/store/modules/item/models';

export default defineComponent({
    name: 'ItemsList',
    components: {
        IonSkeletonText,
        IonLabel,
        IonImg,
        IonItemGroup,
        IonItemDivider,
        IonGrid,
        IonCol,
        IonRow,
        IonNote
    },
    props: {
        isCollectionItemsList: Boolean,
        isLoadingItems: Boolean
    },
    computed: {
        items(): Array<ItemModel> {
            if (this.isCollectionItemsList)
                return this.getCollectionItems();
            else
                return this.getItems();
        },
        totalItems(): number {
            if (this.isCollectionItemsList)
                return this.getCollectionTotalItems();
            else
                return this.getTotalItems();
        }
    },
    methods: {
        ...mapGetters("item", [
            "getItems",
            "getTotalItems",
            "getCollectionItems",
            "getCollectionTotalItems",
        ])
    }
});
</script>