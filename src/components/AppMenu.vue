<template>
  <ion-menu
    backdrop
    side="start"
    menu-id="mainMenu"
    content-id="main"
    class="main-menu"
  >
    <ion-header>
      <ion-toolbar color="primary">
        <div class="image-header__container">
          <ion-img :src="bgImage" alt="background image menu"></ion-img>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content class="my-ion-content">
      <ion-list>
        <ion-menu-toggle>
          <ion-item router-link="/">
            <ion-avatar>
              <ion-icon :icon="home" size="large"></ion-icon>
            </ion-avatar>
            <ion-label>Home</ion-label>
          </ion-item>

          <ion-item router-link="/dates">
            <ion-avatar>
              <ion-icon :icon="calendar" size="large"></ion-icon>
            </ion-avatar>
            <ion-label>Calendar</ion-label>
          </ion-item>

          <ion-item router-link="/history">
            <ion-avatar>
              <ion-icon :icon="timerOutline" size="large"></ion-icon>
            </ion-avatar>
            <ion-label>History</ion-label>
          </ion-item>

          <ion-item>
            <ion-avatar>
              <ion-icon :icon="pulseOutline" size="large"></ion-icon>
            </ion-avatar>
            <ion-label>Activities</ion-label>
          </ion-item>
        </ion-menu-toggle>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script>
import {
  IonMenu,
  IonContent,
  IonList,
  IonMenuToggle,
  IonItem,
  IonLabel,
  IonAvatar,
  IonIcon,
  IonImg,
  IonHeader,
  IonToolbar,
} from '@ionic/vue';
import { pulseOutline, timerOutline, calendar, home } from 'ionicons/icons';
import bgImage from '@/assets/logo.png';

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
    IonMenuToggle,
  },

  data() {
    return {
      bgImage,
      pulseOutline,
      timerOutline,
      calendar,
      home,
    };
  },
};
</script>

<style scoped>
ion-icon {
  color: var(--ion-color-primary-shade);
}

.image-header__container {
  height: calc(var(--toolbar-height) * 1px);
}
ion-img {
  max-width: 160px;
}
</style>
