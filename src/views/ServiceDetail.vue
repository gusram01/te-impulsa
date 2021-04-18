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
      <ion-list lines="none">
        <ion-item-divider>
          <ion-item>
            <h4>Order: {{ $route.params.id }}</h4>
          </ion-item>
        </ion-item-divider>
        <ion-item>
          <ion-label>First name</ion-label>
          <ion-input
            type="text"
            placeholder="First Name"
            clear-input
            @IonInput="name = $event.target.value"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Last Name</ion-label>
          <ion-input
            type="text"
            placeholder="Last Name"
            clear-input
            @IonInput="lastName = $event.target.value"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Telephone</ion-label>
          <ion-input
            type="number"
            placeholder="Telephone"
            clear-input
            @IonInput="phone = $event.target.value"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Date</ion-label>
          <ion-datetime
            display-format="MM/DD/YYYY"
            @IonChange="date_service = $event.target.value"
          ></ion-datetime>
        </ion-item>
        <ion-item>
          <ion-label>Direction</ion-label>
          <ion-input
            type="text"
            placeholder="Direction"
            clear-input
            @IonInput="address = $event.target.value"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Department</ion-label>
          <ion-input
            type="number"
            placeholder="Department"
            clear-input
            @IonInput="department = $event.target.value"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Comuna</ion-label>
          <ion-input
            type="number"
            placeholder="Comuna"
            clear-input
            @IonInput="comuna = $event.target.value"
          ></ion-input>
        </ion-item>

        <!-- <ion-grid>
          <ion-row>
            <ion-col> </ion-col>
            <ion-col>
              <ion-button type="cancel" @click="closeModal" color="light">
                Cancel
              </ion-button>
            </ion-col>
            <ion-col>
              <ion-button type="submit" @click="openToast" color="tertiary">
                Save
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-grid> -->
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonBackButton,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonContent,
  IonInput,
  IonItem,
  IonItemDivider,
  IonList,
  IonLabel,
  IonDatetime,
} from '@ionic/vue';
import { getServiceById } from '../services/api';

export default {
  components: {
    IonPage,
    IonBackButton,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonContent,
    IonInput,
    IonItem,
    IonItemDivider,
    IonList,
    IonLabel,
    IonDatetime,
  },

  created() {
    getServiceById(this.$route.params.id);
  },

  data() {
    return {
      content: 'Content',
      name: '',
      lastName: '',
      phone: '',
      date_service: null,
      address: '',
      department: '',
      comuna: '',
      errorInput: {},
    };
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
ion-button:not(.add) {
  --padding-end: 0.2em;
  --padding-start: 0.2em;
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
</style>
