<template>
    <ion-page>
        <ion-header :transluscent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <span v-if="!isLoadingInstitute">
                    imagem capa: {{institute["@files:header"]?.url}}
                </span>
                <ion-title v-if="!isLoadingInstitute">
                    {{ institute.name ? institute.name : 'Instituição' }}
                </ion-title>
                <ion-skeleton-text v-else animated />
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-back-button></ion-back-button>
                    </ion-buttons>
                    <ion-title v-if="!isLoadingInstitute" size="large">{{ 'Instituição' }}</ion-title>
                    <ion-skeleton-text v-else animated />
                </ion-toolbar>
            </ion-header>

            <div>
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
                    <div v-if="!isLoadingInstitute">
                        <p>
                        {{institute.name}}
                        </p><p>
                        {{institute.mus_cod}}
                        </p><p>
                        {{institute.num_sniic}}
                        </p><p>
                        {{institute.shortDescription}}
                        </p><p>
                        {{institute.esfera}}
                        </p><p>
                        {{institute.esfera_tipo}}
                        </p><p>
                        {{institute.mus_instituicaoMantenedora}}
                        </p><p>
                        {{institute.En_Nome_Logradouro}}
                        </p><p>
                        {{institute.En_Bairro}}
                        </p><p>
                        {{institute.En_Municipio}}
                        </p><p>
                        {{institute.En_Estado}}
                        </p><p>
                        {{institute.endereco}}
                        </p><p>
                        {{institute.site}}
                        </p><p>
                        {{institute.mus_tipo_tematica}}
                        </p><p>
                        {{institute.facebook}}
                        </p><p>
                        {{institute.instagram}}
                         </p>
                    </div>
                </div>
                <div v-if="currentSegment === 'events'">
                    <div v-if="!isLoadingEvents && institute.events">
                        
                    </div>
                </div>
                <div v-if="currentSegment === 'collections'">
                    <collections-list is-institute-collections-list :is-loading-collections="isLoadingCollections" />
                </div>
                <div v-if="currentSegment === 'items'">
                    items
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
    IonTitle,
    IonContent,
    IonSkeletonText,
    IonButtons,
    IonBackButton,
    IonSegment,
    IonSegmentButton,
    IonLabel,
} from "@ionic/vue";

export default defineComponent({
    name: 'InstitutePage',
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonSkeletonText,
        IonButtons,
        IonBackButton,
        IonSegment,
        IonSegmentButton,
        IonLabel,
    },
    data() {
        return {
            isLoadingInstitute: false,
            isLoadingEvents: false,
            isLoadingCollections: false,
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
        // ...mapActions("item", ["fetchInstituteItems"]),
        segmentChanged(ev: CustomEvent) {
            this.currentSegment = ev.detail.value;
            
            if (this.currentSegment === 'events' && !this.institute.events) {
                
                // Load events
                this.isLoadingEvents = true;
                this.fetchInstituteEvents(this.instituteId)
                    .then(() => (this.isLoadingEvents = false))
                    .catch(() => (this.isLoadingEvents = false));
            
            } else if (this.currentSegment === 'collections') {
                
                // Load collections
                this.isLoadingCollections = true;
                this.fetchInstituteCollections({ instituteId: this.instituteId })
                    .then(() => (this.isLoadingCollections = false))
                    .catch(() => (this.isLoadingCollections = false));
            }
        }
    },
});
</script>
