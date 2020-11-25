<template>
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
    IonImg,
    IonCard,
    IonCardHeader,
    IonCardTitle
} from "@ionic/vue";

export default defineComponent({
    name: 'ItemsList',
    components: {
        IonImg,
        IonCard,
        IonCardHeader,
        IonCardTitle
    },
    props: {
        item: Object
    }
});
</script>

<style scoped>
    ion-card {
        margin: 0px;
        border-radius: 14px;
        box-shadow: none;
        background: white;
        height: 100%;
    }
    ion-card-header {
        padding: 10px;
    }
    ion-card-title {
        font-size: 12px;
    }
</style>