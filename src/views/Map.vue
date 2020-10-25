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
import { mapGetters } from "vuex";
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
        points: {
            id: number;
            lat: number;
            long: number;
            markerType: string;
            objects: {
                institutes: any[];
                collections: any[];
                items: any[];
            };
        }[];
    } {
        return {
            map: undefined,
            searchValue: '',
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
                this.points.push({id, lat:latitude, long:longitude, markerType: '001', objects: {items:[], collections:[], institutes:[element]}})
            }

            for (let index = 0; index < (this.collections||[]).length; index++) {
                const element = this.collections[index];
                const id = element.vamus_institute_identifier_collection;
                const latitude  = element.vamus_institute_lat_collection;
                const longitude = element.vamus_institute_long_collection;
                const current = this.points.find(x => x.id == id);
                if (current){
                    current.markerType = current.markerType.substring(0,1) + '1' + current.markerType.substring(2);
                    current.objects.collections.push(element);
                } else {
                    this.points.push({id, lat:latitude, long:longitude, markerType: '010', objects: {items:[], collections:[element],institutes:[]}})
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
                    current.objects.items.push(element);
                } else {
                    this.points.push({id, lat:latitude, long:longitude, markerType: '100', objects: {items:[element],collections:[],institutes:[]}})
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

                const objects = this.points[i].objects;
                

                L.marker([this.points[i].lat, this.points[i].long], {icon:defaultIcon})
                .addTo(this.map)
                .bindPopup(`
                    instituição: ${(objects.institutes[0]).name} <br >
                    Total coleções: ${(objects.collections||[]).length} <br >
                    Total itens: ${(objects.items||[]).length}
                `)
            }
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
