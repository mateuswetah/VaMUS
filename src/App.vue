<template>
  <ion-app v-if="!isLoadingInstitutesFromCollections">
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { SplashScreen } from '@ionic-native/splash-screen/'
import { defineComponent } from 'vue';
import { mapActions } from "vuex"

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  data() {
    return {
      isLoadingInstitutesFromCollections: true,
      splashScreen: SplashScreen
    }
  },
  created() {
    this.splashScreen.show();

    this.isLoadingInstitutesFromCollections = true;
    this.fetchInstitutesFromCollections()
      .then(() => {
        this.isLoadingInstitutesFromCollections = false;
        this.splashScreen.hide();
      })
      .catch(() => {
        this.isLoadingInstitutesFromCollections = false;
      });
  },
  methods: {
    ...mapActions("collection", ["fetchInstitutesFromCollections"]),
  }
});
</script>