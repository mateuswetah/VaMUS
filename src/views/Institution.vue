<template>
    <ion-page>
        <ion-header :transluscent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <span v-if="!isLoadingInstitution">
                    imagem capa: {{institution["@files:header"]?.url}}
                </span>
                <ion-title v-if="!isLoadingInstitution">
                    {{ institution.name ? institution.name : 'Instituição' }}
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
                    <ion-title v-if="!isLoadingInstitution" size="large">{{ 'Instituição' }}</ion-title>
                    <ion-skeleton-text v-else animated />
                </ion-toolbar>
            </ion-header>

            <div>
                <ion-segment :value="currentSegment" @ionChange="segmentChanged($event)">
                    <ion-segment-button value="about">
                        <ion-label>Sobre</ion-label>
                    </ion-segment-button>
                    <ion-segment-button value="events">
                        <ion-label>Eventos</ion-label>
                    </ion-segment-button>
                    <ion-segment-button value="collections">
                        <ion-label>Coleções</ion-label>
                    </ion-segment-button>
                    <ion-segment-button value="items">
                        <ion-label>Itens</ion-label>
                    </ion-segment-button>
                </ion-segment>

                <div v-if="currentSegment === 'about'">
                    <div v-if="!isLoadingInstitution">
                        <p>
                        {{institution.name}}
                        </p><p>
                        {{institution.mus_cod}}
                        </p><p>
                        {{institution.num_sniic}}
                        </p><p>
                        {{institution.shortDescription}}
                        </p><p>
                        {{institution.esfera}}
                        </p><p>
                        {{institution.esfera_tipo}}
                        </p><p>
                        {{institution.mus_instituicaoMantenedora}}
                        </p><p>
                        {{institution.En_Nome_Logradouro}}
                        </p><p>
                        {{institution.En_Bairro}}
                        </p><p>
                        {{institution.En_Municipio}}
                        </p><p>
                        {{institution.En_Estado}}
                        </p><p>
                        {{institution.endereco}}
                        </p><p>
                        {{institution.site}}
                        </p><p>
                        {{institution.mus_tipo_tematica}}
                        </p><p>
                        {{institution.facebook}}
                        </p><p>
                        {{institution.instagram}}
                         </p>
                    </div>
                </div>
                <div v-if="currentSegment === 'events'">
                    <div v-if="!isLoadingEvents && institution.events">
                        
                    </div>
                </div>
                <div v-if="currentSegment === 'collections'">
                    collections
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
    name: 'InstitutionPage',
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
            isLoadingInstitution: false,
            isLoadingEvents: false,
            institutionId: '',
            currentSegment: 'about'
        };
    },
    computed: {
        ...mapGetters("institution", {
            institution: "getInstitution",
        }),
    },
    mounted() {
        this.institutionId = '' + this.$route.params.institutionId;
        this.isLoadingInstitution = true;
        this.fetchInstitutionAbout(this.institutionId)
            .then(() => {this.isLoadingInstitution = false})
            .catch(() => (this.isLoadingInstitution = false));
    },
    methods: {
        ...mapActions("institution", ["fetchInstitutionAbout"]),
        ...mapActions("institution", ["fetchInstitutionEvents"]),
        // ...mapActions("item", ["fetchInstitutionItems"]),
        segmentChanged(ev: CustomEvent) {
            this.currentSegment = ev.detail.value;
            if (this.currentSegment === 'events' && !this.institution.events) {
                // Load events
                this.isLoadingEvents = true;
                this.fetchInstitutionEvents(this.institutionId)
                    .then(() => (this.isLoadingEvents = false))
                    .catch(() => (this.isLoadingEvents = false));
            }
        }
    },
});
</script>
