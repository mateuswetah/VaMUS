<template>
    <ion-item-group>
        <ion-item-divider>
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
                    <ion-card :router-link="'/item/' + item.id">
                        <ion-img
                            v-if="
                                item.thumbnail &&
                                item.thumbnail.thumbnail &&
                                item.thumbnail.thumbnail[0]
                            "
                            :src="item.thumbnail.thumbnail[0]"
                        />
                        <ion-card-header>
                            <ion-card-title>{{ item.title }}</ion-card-title>
                        </ion-card-header>
                    </ion-card>
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
    IonNote,
    IonCard,
    IonCardHeader,
    IonCardTitle
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
        IonNote,
        IonCard,
        IonCardHeader,
        IonCardTitle
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