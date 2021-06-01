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
      <ion-tabs class="">
        <ion-tab-bar slot="top">
          <ion-tab-button
            tab="detail"
            layout="icon-hide"
            :selected="!$route.path.includes('comments')"
            :href="`/service/${$route.params.id}`"
          >
            <ion-label>Details</ion-label>
          </ion-tab-button>

          <ion-tab-button
            tab="comments"
            layout="icon-hide"
            :selected="$route.path.includes('comments')"
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

ion-tab-button {
  --color: var(--ion-color-step-50);
  --color-focused: var(--ion-color-tertiary);
  --color-selected: var(--ion-color-tertiary);
  font-size: 1.2em;
}
</style>
