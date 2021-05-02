<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <div class="wrapper">
          <ion-button fill="clear" :strong="true">
            <ion-menu-button auto-hide="false" color="dark"></ion-menu-button>
          </ion-button>
          <slot name="toolbar"></slot>
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
  IonButton,
  IonMenuButton,
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
} from '@ionic/vue';

export default {
  components: {
    IonPage,
    IonButton,
    IonMenuButton,
    IonHeader,
    IonToolbar,
    IonContent,
    // eslint-disable-next-line vue/no-unused-components
    IonTitle,
  },
};
</script>
<style scoped>
ion-header {
  background: #e7e7e7;
}
ion-toolbar {
  border-radius: 0 0 20px 20px;
}

.wrapper {
  position: relative;
  width: 100%;
  height: calc((var(--toolbar-height) * 1px));
  padding: 0 0 1em 0;
  background-color: var(--ion-color-primary);
  border-radius: 0 0 20px 20px;
}
.wrapper::before {
  content: '';
  position: absolute;
  top: -37%;
  right: -7.5%;
  width: 45%;
  height: 100%;
  border-radius: 45% 0 45% 50%;
  background: rgba(0, 0, 0, 0.13);
}
ion-button:not(.add) {
  --padding-end: 0.2em;
  --padding-start: 0.2em;
}
</style>
