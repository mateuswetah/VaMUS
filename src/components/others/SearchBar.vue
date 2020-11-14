<template>
    <ion-header translucent>
        <ion-toolbar id="main-toolbar">
            <div class="toolbar-background">
                <img 
                        class="vamus-logo"
                        alt="VaMUS" 
                        src="/assets/img/VaMUS_logo.png"/>
            </div>
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

<style>
.header-md::after {
    background-image: none;
}
ion-toolbar {
    text-align: center;
    --background: #f5f5f5;
}
.sc-ion-searchbar-md-h {
    --box-shadow: 0 2px 12px -6px #4834d4;
    --border-radius: 24px;
}
ion-toolbar#main-toolbar .toolbar-background {
    background: radial-gradient(#4834d4, #22a6b3) no-repeat border-box, #f5f5f5;
    background-size: 100% 64px, 100% 64px;
    background-position: 0 0, 0 64px;
    background-origin: padding-box, padding-box;
}
.vamus-logo {
    width: 80px;
    margin: 12px auto;
}
</style>