<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <div class="wrapper">
          <ion-buttons slot="start">
            <ion-back-button default-href="/"></ion-back-button>
          </ion-buttons>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-tabs>
        <ion-tab-bar slot="top">
          <ion-tab-button tab="detail" :href="`/service/${$route.params.id}`">
            <ion-label>Details</ion-label>
          </ion-tab-button>

          <ion-tab-button
            tab="comments"
            :href="`/service/${$route.params.id}/comments`"
          >
            <ion-label>Comments</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonBackButton,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonContent,
  IonLabel,
} from '@ionic/vue';

export default {
  components: {
    IonPage,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonBackButton,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonContent,
    IonLabel,
  },

  created() {},

  data() {
    return {};
  },

  methods: {},
};
</script>
<style scoped>
ion-header {
  background: #e7e7e7;
}
ion-toolbar {
  border-radius: 0 0 20px 20px;
}
ion-label {
  min-width: 6em;
}
ion-input,
ion-datetime {
  --background: white;
  --padding-top: 0.8em;
  --padding-bottom: 0.8em;
  --padding-start: 1.5em;
  --padding-end: 1.5em;
  width: 100%;
  margin: 0.5em;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.35);
  border-radius: 10px;
}

.disabled {
  color: var(--ion-color-step-50);
  box-shadow: none;
}
.wrapper {
  --toolbar-height: 60;
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
ion-content {
  --background: var(--ion-color-step-900);
}

.content__wrapper {
  background: var(--ion-color-step-900);
}
</style>
