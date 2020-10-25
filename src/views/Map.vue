<template>
    <ion-page>
        <ion-header :transluscent="true">
            <ion-toolbar>
                <ion-title>VaMUS</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">VaMUS</ion-title>
                </ion-toolbar>
            </ion-header>

            <div id="mapId" style="width: 100%; height: 100%" />
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
} from "@ionic/vue";
import * as L from "leaflet";

export default defineComponent({
    name: "Map",
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
    data(): {
        map: L.Map | undefined;
        searchKey: string;
        points: {id: number; lat: number; long: number; markerType: string}[];
    } {
        return {
            map: undefined,
            searchKey: '',
            points: [ ],
        };
    },
    computed: {
        ...mapGetters("institute", {
            institutes: "getInstitutes",
        }),
        ...mapGetters("collection", {
            collections: "getCollections",
        }),
        ...mapGetters("item", {
            items: "getItems",
        }),
    },
    methods: {
        getIconUrlMarker(type: string) {
            switch (type) {
                case '001': return 'assets/icon/marker-icon-1.png';
                case '010': return 'assets/icon/marker-icon-2.png';
                case '100': return 'assets/icon/marker-icon-3.png';
                case '101': return 'assets/icon/marker-icon-4.png';
                case '011': return 'assets/icon/marker-icon-5.png';
                case '110': return 'assets/icon/marker-icon-8.png';
                case '111': return 'assets/icon/marker-icon-7.png';
                default: return 'assets/icon/marker-icon-1.png';
            }
        },
        populatePoints() {
            this.points = [];
            for (let index = 0; index < (this.institutes||[]).length; index++) {
                const element = this.institutes[index];
                const {id, location: {latitude, longitude}} = element;
                this.points.push({id, lat:latitude, long:longitude, markerType: '001'})
            }

            for (let index = 0; index < (this.collections||[]).length; index++) {
                const element = this.collections[index];
                const id = element.vamus_institute_identifier_collection;
                const latitude  = element.vamus_institute_lat_collection;
                const longitude = element.vamus_institute_long_collection;
                const current = this.points.find(x => x.id == id);
                if (current){
                    current.markerType = current.markerType.substring(0,1) + '1' + current.markerType.substring(2);
                } else {
                    this.points.push({id, lat:latitude, long:longitude, markerType: '010'})
                }
            }

            for (let index = 0; index < (this.items||[]).length; index++) { 
                const element = this.items[index];
                const id = element.vamus_institute_identifier_collection;
                const latitude  = element.vamus_institute_lat_collection;
                const longitude = element.vamus_institute_long_collection;
                const current = this.points.find(x => x.id == id);
                if (current){
                    current.markerType = '1' + current.markerType.substring(1);
                } else {
                    this.points.push({id, lat:latitude, long:longitude, markerType: '100'})
                }
            }
        },
        ionViewDidEnter() {
            this.populatePoints();
            this.map = L.map("mapId").setView([-15.809365, -49.521065], 5);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "Instituições culturais",
            }).addTo(this.map);

            for (let i = 0; i < this.points.length; i++) {
                const defaultIcon = L.icon({
                    iconUrl: this.getIconUrlMarker(this.points[i].markerType),
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                    iconSize: [14, 26],
                    iconAnchor: [8, 26],
                    popupAnchor: [-3, -38],
                    shadowSize: [14, 26],
                    shadowAnchor: [4, 26]
                });

                L.marker([this.points[i].lat, this.points[i].long], {icon:defaultIcon})
                .addTo(this.map)
                .bindPopup("PopUp")
            }
        },
        ionViewWillLeave() {
            if (this.map) this.map.remove();
        },
    },
}); 
</script>
