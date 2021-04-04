<template>
  <ion-menu side="start" menu-id="mainMenu" content-id="main">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-img :src="bgImage" alt="background image menu"></ion-img>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item>
          <ion-avatar>
            <ion-icon :icon="pulseOutline" size="large"></ion-icon>
          </ion-avatar>
          <ion-label>Activities</ion-label>
        </ion-item>
        <ion-item>
          <ion-avatar>
            <ion-icon :icon="calendarOutline" size="large"></ion-icon>
          </ion-avatar>
          <ion-label>Calendar</ion-label>
        </ion-item>
        <ion-item>
          <ion-avatar>
            <ion-icon :icon="timerOutline" size="large"></ion-icon>
          </ion-avatar>
          <ion-label>History</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script>
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonImg,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonAvatar,
} from '@ionic/vue';
import { pulseOutline, calendarOutline, timerOutline } from 'ionicons/icons';
import bgImage from '@/assets/teimpulsamos.png';

export default {
  components: {
    IonMenu,
    IonHeader,
    IonToolbar,
    IonImg,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonAvatar,
  },

  data() {
    return {
      bgImage,
      pulseOutline,
      calendarOutline,
      timerOutline,
    };
  },
};
</script>

<style scoped>
ion-icon {
  color: var(--ion-color-primary-shade);
}
</style>
