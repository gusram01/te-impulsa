<template>
  <ion-header translucent>
    <ion-toolbar>
      <ion-title>{{ title }}</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="closeModal">
          <ion-icon :icon="closeOutline"></ion-icon>
          close
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-list lines="none">
      <ion-item>
        <ion-label>Full name</ion-label>
        <ion-input
          type="text"
          placeholder="Full name"
          clear-input
          @IonInput="fullName = $event.target.value"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Telephone</ion-label>
        <ion-input
          type="text"
          placeholder="Telephone"
          clear-input
          @IonInput="telephone = $event.target.value"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Date</ion-label>
        <ion-datetime display-format="MM/DD/YYYY"></ion-datetime>
      </ion-item>
      <ion-item>
        <ion-label>Direction</ion-label>
        <ion-input
          type="text"
          placeholder="Direction"
          clear-input
          @IonInput="direction = $event.target.value"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Department</ion-label>
        <ion-input
          type="text"
          placeholder="Department"
          clear-input
          @IonInput="department = $event.target.value"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Comuna</ion-label>
        <ion-input
          type="text"
          placeholder="Comuna"
          clear-input
          @IonInput="comuna = $event.target.value"
        ></ion-input>
      </ion-item>

      <ion-button type="cancel" @click="closeModal" color="light">
        Cancel
      </ion-button>
      <ion-button type="submit" @click="submitForm" color="tertiary">
        Save
      </ion-button>
    </ion-list>
  </ion-content>
</template>

<script>
import {
  // IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonInput,
  IonLabel,
  IonItem,
  IonList,
  IonDatetime,
} from '@ionic/vue';
import { closeOutline } from 'ionicons/icons';

export default {
  name: 'Modal',
  props: {
    title: { type: String, default: 'Super Modal' },
    close: { type: Function },
  },
  data() {
    return {
      closeOutline,
      content: 'Content',
      fullName: '',
      telephone: '',
      date: null,
      direction: '',
      department: '',
      comuna: '',
    };
  },
  methods: {
    closeModal() {
      this.close();
    },
    submitForm() {
      console.log('submit');
    },
  },
  watch: {
    fullName() {
      console.log(this.fullName);
    },
  },
  components: {
    // IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonInput,
    IonLabel,
    IonItem,
    IonList,
    IonDatetime,
  },
};
</script>
<style scoped>
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
  margin: 0.5em;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}
</style>
