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
button.alert-button.button-grey {
  color: var(--ion-color-step-300);
}
button.alert-button.button-primary {
  color: var(--ion-color-step-100);
  background: var(--ion-color-primary);
}
</style>
