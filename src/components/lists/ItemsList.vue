<template>
    <ion-item-group v-if="totalItems">
        <ion-item-divider v-if="isCollectionItemsList || isItemsByLocationList">
            <ion-label>Itens</ion-label>
            <ion-note slot="end">{{ totalItems }}</ion-note>
        </ion-item-divider>
        <ion-grid>
            <ion-row v-if="!isLoadingItems">
                <ion-col
                    size-xs="4"
                    size-sm="4"
                    size-md="3"
                    size-lg="2"
                    v-for="(item, index) of items"
                    :key="index"
                >
                    <item-list-item :item="item" />
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
    IonItemGroup,
    IonItemDivider,
    IonGrid,
    IonCol,
    IonRow,
    IonNote
} from "@ionic/vue";
import ItemListItem from '@/components/list-items/ItemListItem.vue';
import ItemModel from '@/store/modules/item/models';

export default defineComponent({
    name: 'ItemsList',
    components: {
        IonSkeletonText,
        IonLabel,
        IonItemGroup,
        IonItemDivider,
        IonGrid,
        IonCol,
        IonRow,
        IonNote,
        ItemListItem
    },
    props: {
        isCollectionItemsList: Boolean,
        isItemsByLocationList: Boolean,
        isLoadingItems: Boolean
    },
    computed: {
        items(): Array<ItemModel> {
            if (this.isCollectionItemsList)
                return this.getCollectionItems();
            else if (this.isItemsByLocationList)
                return this.getItemsByLocation();
            else
                return this.getItems();
        },
        totalItems(): number {
            if (this.isCollectionItemsList)
                return this.getCollectionTotalItems();
            else if (this.isItemsByLocationList)
                return this.getTotalItemsByLocation();
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
            "getItemsByLocation",
            "getTotalItemsByLocation"
        ])
    }
});
</script>

<style scoped>
    ion-card {
        margin: 0px;
    }
    ion-card-header {
        padding: 10px;
    }
    ion-card-title {
        font-size: 12px;
        font-weight: normal;
    }
</style>