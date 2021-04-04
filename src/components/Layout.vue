<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <div class="wrapper">
          <ion-button fill="clear">
            <ion-menu-button auto-hide="false" color="dark"></ion-menu-button>
          </ion-button>

          <ion-title size="large">
            {{ pageTitle }}
          </ion-title>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <slot></slot>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  // IonButtons,
  IonButton,
  IonMenuButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/vue';
import { menuOutline } from 'ionicons/icons';

export default {
  components: {
    IonPage,
    // IonButtons,
    IonButton,
    IonMenuButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  },
  props: ['pageTitle'],

  data() {
    return {
      menuOutline,
      today: new Date().toLocaleString(),
    };
  },
};
</script>
<style>
.wrapper {
  width: 100%;
  height: 100%;
  background: transparent;
  padding: 1em 0;
  border-radius: 0 0 20px 20px;
  background-color: var(--ion-color-primary);
}
.wrapper::after {
  content: '';
  width: 100%;
  height: 15%;
}
</style>
