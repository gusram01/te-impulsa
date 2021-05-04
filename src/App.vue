<template>
  <ion-app>
    <app-menu />
    <ion-router-outlet id="main" />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import AppMenu from './components/AppMenu.vue';

export default {
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    AppMenu,
  },
};
</script>

<style>
.alert-radio-label.sc-ion-alert-md {
  color: black;
}
[aria-checked='true'].sc-ion-alert-md .alert-radio-label.sc-ion-alert-md {
  color: black;
}
</style>
