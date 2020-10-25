<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <ion-header translucent>
                <ion-toolbar>
                    <ion-searchbar
                            :value="searchValue"
                            @ionChange="onSearch"
                            debounce="500" 
                            animated 
                            show-cancel-button="focus"
                            placeholder="Procure por Museus, Coleções ou Itens..."></ion-searchbar>
                </ion-toolbar>
            </ion-header>

            <div id="mapId" style="width: 100%; height: 100%" />
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonSearchbar,
    IonContent,
} from "@ionic/vue";
import * as L from "leaflet";

export default defineComponent({
    name: "Map",
    components: { IonHeader, IonToolbar, IonSearchbar, IonContent, IonPage },
    data(): {
        map: L.Map | undefined;
        searchValue: string;
    } {
        return {
            map: undefined,
            searchValue: ''
        };
    },
    methods: {
        ionViewDidEnter() {
            this.map = L.map("mapId").setView([-15.809365, -49.521065], 5);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "edupala.com © Angular LeafLet",
            }).addTo(this.map);

            L.marker([-15.8, -49.52])
                .addTo(this.map)
                .bindPopup("Algum museu")
                .openPopup();
        },
        ionViewWillLeave() {
            if (this.map) this.map.remove();
        },
        onSearch(ev: CustomEvent) {
            this.searchValue = ev.detail.value;
        }
    },
}); 
</script>
