<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <SearchBar />
            <div id="mapId" style="width: 100%; height: 100%" />
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import {
    IonPage,
    IonContent,
    popoverController
} from "@ionic/vue";
import SearchBar from '@/components/others/SearchBar.vue';
import MapMarkerPopover from '@/components/others/MapMarkerPopover.vue';
import * as L from "leaflet";

export default defineComponent({
    name: "Map",
    components: { IonContent, IonPage, SearchBar },
    data(): {
        map: L.Map | undefined;
        markersLayer: L.FeatureGroup | undefined;
        isLoadingCollections: boolean;
        isLoadingItems: boolean;
        isLoadingInstitutes: boolean;
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
            markersLayer: undefined,
            isLoadingCollections: false,
            isLoadingItems: false,
            isLoadingInstitutes: false,
            points: [ ],
        };
    },
    watch: {
        searchValue() {
            console.log(this.searchValue)
            this.fetchContent();
        }
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
        ...mapGetters("search", {
            searchValue: "getSearchValue",
        })
    },
    methods: {
        ...mapActions("item", ["fetchItems"]),
        ...mapActions("collection", ["fetchCollections"]),
        ...mapActions("institute", ["fetchInstitutes"]),
        ...mapMutations("item", ["setItemsByLocation", "setTotalItemsByLocation"]),
        ...mapMutations("collection", ["setCollectionsByLocation", "setTotalCollectionsByLocation"]),
        ...mapMutations("institute", ["setInstitutesByLocation", "setTotalInstitutesByLocation"]),
        ...mapMutations("search", ["setIsLoadingSomeEntity"]),
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
        addMakers() {
            if (this.map != undefined) {

                // First we clear all markers
                if (this.markersLayer != undefined)
                    this.markersLayer.clearLayers();
            
                // Then insert markers based on the points array
                const newMarkers = [];
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

                    newMarkers.push(L.marker([this.points[i].lat, this.points[i].long], { icon:defaultIcon })
                        .on('click', (event) => this.openPopover(event, this.points[i].objects))
                    );
                }
                
                // Adds them to feature group layer so we can zoom and clear them easily
                this.markersLayer = L.featureGroup(newMarkers)
                    .addTo(this.map);

                this.map.flyToBounds(this.markersLayer.getBounds());
            }
        },
        ionViewDidEnter() {
            if (this.map == undefined || !this.map.getContainer()) {
                this.map = L.map("mapId").setView([-15.809365, -49.521065], 5);

                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution: "Instituições culturais",
                }).addTo(this.map);
            }

            this.fetchContent();
        },
        ionViewWillLeave() {
            if (this.map) this.map.remove();
            this.map = undefined;
        },
        fetchContent() {
            // Start loading everbody
            this.setIsLoadingSomeEntity(true);
            
            // Load items
            this.isLoadingItems = true;
            const itemsRequest = this.fetchItems({ perpage: 24, orderby: 'relevance', search: this.searchValue })
                .then(() => (this.isLoadingItems = false))
                .catch(() => (this.isLoadingItems = false));

            // Load collections
            this.isLoadingCollections = true;
            const collectionsRequest = this.fetchCollections({ search: this.searchValue })
                .then(() => (this.isLoadingCollections = false))
                .catch(() => (this.isLoadingCollections = false));

            // Load institutes
            this.isLoadingInstitutes = true;
            const institutesRequest = this.fetchInstitutes({ search: this.searchValue })
                .then(() => (this.isLoadingInstitutes = false))
                .catch(() => (this.isLoadingInstitutes = false));

            Promise.all([ itemsRequest, collectionsRequest, institutesRequest])
                .then(() => {
                    this.setIsLoadingSomeEntity(false);
                    this.populatePoints();
                    this.addMakers();
                });
        },
        async openPopover(ev: any, entities: { items: any[]; collections: any[]; institutes: any[] }) {
            this.setItemsByLocation(entities.items);
            this.setCollectionsByLocation(entities.collections);
            this.setInstitutesByLocation(entities.institutes);
            this.setTotalItemsByLocation(entities.items.length);
            this.setTotalCollectionsByLocation(entities.collections.length);
            this.setTotalInstitutesByLocation(entities.institutes.length);

            const popover = await popoverController
                .create({
                    component: MapMarkerPopover,
                    componentProps:{
                        onDismissPopover: () => {
                            popover.dismiss();
                        }
                    },
                    cssClass: 'map-marker-popover',
                    event: ev.originalEvent,
                    translucent: true,
                    showBackdrop: false
                })
            return popover.present();
        }
    },
}); 
</script>
