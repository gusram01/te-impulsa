<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-button>
            <ion-menu-button auto-hide="false"></ion-menu-button>
          </ion-button>
        </ion-buttons>
        <ion-title>
          <div class="container">
            <h1>{{ pageTitle }}</h1>
            <h2>{{ today }}</h2>
          </div>
        </ion-title>
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
  IonButtons,
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
    IonButtons,
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
