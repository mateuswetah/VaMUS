<template>
    <ion-page>
        <ion-header>
            <ion-toolbar :style="{ position: institute['@files:header']?.url ? 'absolute' : '', backgroundColor: !institute['@files:header']?.url ? '#f2f2f2' : '' }">
                <ion-buttons slot="start">
                    <ion-back-button color="primary"></ion-back-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">

            <ion-img
                v-if="institute['@files:header']?.url"
                :src="institute['@files:header']?.url"
            />

            <div 
                    class="page-contents"
                    v-if="!isLoadingInstitute">

                <ion-text>
                    <h1>{{ institute.name ? institute.name : 'Instituição' }}</h1>
                </ion-text>

                <ion-segment :value="currentSegment" @ionChange="segmentChanged($event)">
                    <ion-segment-button value="about">
                        <ion-label>Sobre</ion-label>
                    </ion-segment-button>
                    <ion-segment-button value="collections">
                        <ion-label>Coleções</ion-label>
                    </ion-segment-button>
                    <ion-segment-button value="items">
                        <ion-label>Itens</ion-label>
                    </ion-segment-button>
                    <ion-segment-button value="events">
                        <ion-label>Eventos</ion-label>
                    </ion-segment-button>
                </ion-segment>

                <div v-if="currentSegment === 'about'">
                    <div class="ion-padding">
                        <div v-if="!isLoadingInstitute">
                            <ion-text color="dark">
                                <h5><b>Nome</b></h5>
                                {{institute.name}}
                            </ion-text>
                            <hr >
                            <ion-text color="dark">
                                <h5><b>Código</b></h5>
                                {{institute.mus_cod}}
                            </ion-text>
                            <hr >
                            <ion-text color="dark">
                                <h5><b>Nº SNIIC</b></h5>
                                {{institute.num_sniic}}
                            </ion-text>
                            <hr >
                            <ion-text color="dark">
                                <h5><b>Descrição</b></h5>
                                {{institute.shortDescription}}
                            </ion-text>
                            <hr >
                            <ion-text color="dark">
                                <h5><b>Esfera</b></h5>
                                {{institute.esfera}} / {{institute.esfera_tipo}}
                            </ion-text>
                            <hr >
                            <ion-text color="dark">
                                <h5><b>Instituição mantenedora</b></h5>
                                {{institute.mus_instituicaoMantenedora}}
                            </ion-text>
                            <hr >
                            <ion-text color="dark">
                                <h5><b>Tipo</b></h5>
                                {{institute.mus_tipo_tematica}}
                            </ion-text>
                            <hr >
                            <ion-text color="dark">
                                <h5><b>Logradouro</b></h5>
                                {{institute.En_Nome_Logradouro}}
                            </ion-text>
                            <hr >
                            <ion-text color="dark">
                                <h5><b>Bairro</b></h5>
                                {{institute.En_Bairro}}
                            </ion-text>
                            <hr >
                            <ion-text color="dark">
                                <h5><b>Município</b></h5>
                                {{institute.En_Municipio}}
                            </ion-text>
                            <hr >
                            <ion-text color="dark">
                                <h5><b>Estado</b></h5>
                                {{institute.En_Estado}}
                            </ion-text>
                            <hr >
                            <ion-text color="dark">
                                <h5><b>Endereço</b></h5>
                                {{institute.endereco}}
                            </ion-text>
                            <hr >
                            <ion-text color="dark">
                                <h5><b>Site</b></h5>
                                {{institute.site}}
                            </ion-text>
                            <hr >
                            <ion-text color="dark">
                                <h5><b>facebook</b></h5>
                                {{institute.facebook}}
                            </ion-text>
                            <hr >
                            <ion-text color="dark">
                                <h5><b>instagram</b></h5>
                                {{institute.instagram}}
                            </ion-text>
                        </div>
                    </div>
                    
                </div>
                <div v-if="currentSegment === 'events'">
                    <div v-if="!isLoadingEvents && institute.events">
                        <ion-card v-for="(event, index) of (institute.events||[])" :key="index">
                            <ion-card-content>
                                <p><b>{{event.name}}</b></p>
                                <p v-for="(eventText, indexI) of (event.readableOccurrences||[])" :key="indexI">
                                    {{ eventText }}
                                </p>
                            </ion-card-content>
                        </ion-card>
                        <p  
                                class="ion-padding"
                                v-if="!institute.events.length">
                            Não foram econtrados eventos aqui.
                        </p>
                    </div>
                </div>
                <div v-if="currentSegment === 'collections'">
                    <collections-list is-institute-collections-list :is-loading-collections="isLoadingCollections" />
                </div>
                <div v-if="currentSegment === 'items'">
                    <items-list is-institute-items-list :is-loading-items="isLoadingItems" />
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
    IonButtons,
    IonBackButton,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonText,
    IonCard,
    IonCardContent,
    IonImg, 
} from "@ionic/vue";
import ItemsList from '@/components/lists/ItemsList.vue'
import CollectionsList from '@/components/lists/CollectionsList.vue'

export default defineComponent({
    name: 'InstitutePage',
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonContent,
        IonButtons,
        IonBackButton,
        IonSegment,
        IonSegmentButton,
        IonLabel,
        CollectionsList,
        IonText,
        IonCard,
        IonCardContent,
        IonImg,
        ItemsList,
    },
    data() {
        return {
            isLoadingInstitute: false,
            isLoadingEvents: false,
            isLoadingCollections: false,
            isLoadingItems: false,
            instituteId: '',
            currentSegment: 'about'
        };
    },
    computed: {
        ...mapGetters("institute", {
            institute: "getInstitute",
        }),
    },
    mounted() {
        this.instituteId = '' + this.$route.params.instituteId;
        this.isLoadingInstitute = true;
        this.fetchInstituteAbout(this.instituteId)
            .then(() => {this.isLoadingInstitute = false})
            .catch(() => (this.isLoadingInstitute = false));
    },
    methods: {
        ...mapActions("institute", ["fetchInstituteAbout", "fetchInstituteEvents"]),
        ...mapActions("collection", ["fetchInstituteCollections"]),
        ...mapActions("item", ["fetchInstituteItems"]),
        segmentChanged(ev: CustomEvent) {
            this.currentSegment = ev.detail.value;
            
            if (this.currentSegment === 'events' && !this.institute.events) {
                
                // Load events
                this.isLoadingEvents = true;
                this.fetchInstituteEvents(this.instituteId)
                    .then(() => {
                        this.isLoadingEvents = false;
                        })
                    .catch(() => (this.isLoadingEvents = false));
            
            } else if (this.currentSegment === 'collections') {
                
                // Load collections
                this.isLoadingCollections = true;
                this.fetchInstituteCollections({ instituteId: this.instituteId })
                    .then(() => (this.isLoadingCollections = false))
                    .catch(() => (this.isLoadingCollections = false));
            } else if (this.currentSegment === 'items') {
                // Load collections
                this.isLoadingItems = true;
                this.fetchInstituteItems({ instituteId: this.instituteId })
                    .then(() => (this.isLoadingItems = false))
                    .catch(() => (this.isLoadingItems = false));
            }
        }
    },
});
</script>


<style scoped>
    ion-toolbar {
        --background: transparent;
        top: 0px;
    }
    .page-contents h1 {
        padding: 0 1rem;
    }
    ion-item-group {
        --ion-background-color: var(--background, #f2f2f2);
    }
</style>