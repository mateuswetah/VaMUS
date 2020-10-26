<template>
    <ion-header translucent>
        <ion-toolbar>
            <img 
                    class="vamus-logo"
                    alt="VaMUS" 
                    src="/assets/img/VaMUS_logo.png"/>
        </ion-toolbar>
        <ion-toolbar>
            <ion-searchbar
                    :value="searchValue"
                    @ionChange="onSearch"
                    debounce="500" 
                    animated 
                    show-cancel-button="focus"
                    placeholder="Procure por Museus, Coleções ou Itens..."></ion-searchbar>
            <ion-progress-bar 
                    v-if="isLoadingSomeEntity"
                    type="indeterminate" />
        </ion-toolbar>
    </ion-header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapMutations } from "vuex";
import {
    IonHeader,
    IonToolbar,
    IonSearchbar,
    IonProgressBar
} from "@ionic/vue";

export default defineComponent({
    name: 'SearchBar',
    components: { IonHeader, IonToolbar, IonSearchbar, IonProgressBar },
    computed: {
        ...mapGetters("search", {
            searchValue: "getSearchValue",
            isLoadingSomeEntity: "getIsLoadingSomeEntity"
        }),
    },
    methods: {
        ...mapMutations("search", ["setSearchValue"]),
        onSearch(ev: CustomEvent) {
            this.setSearchValue(ev.detail.value);
        },
    }
})
</script>

<style scoped>
ion-toolbar {
    text-align: center;
}
.vamus-logo {
    width: 80px;
    margin: 12px auto;
}
</style>