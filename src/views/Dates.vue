<template>
  <app-layout pageTitle="My services by date">
    <template v-slot:toolbar>
      <ion-title size="large">
        Choose a date
      </ion-title>
    </template>

    <div class="content">
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-button @click="openDatepicker">
              <ion-icon :icon="calendar"></ion-icon>
            </ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            The choosen date was:
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-text color="secondary">
              {{ date }}
            </ion-text>
          </ion-col>
        </ion-row>
      </ion-grid>
    </div>
  </app-layout>
</template>

<script>
import { Plugins } from '@capacitor/core';
import {
  IonButton,
  IonIcon,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
} from '@ionic/vue';
import { calendar } from 'ionicons/icons';

const DatePicker = Plugins.DatePickerPlugin;

export default {
  components: {
    IonButton,
    IonIcon,
    IonTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
  },

  data() {
    return {
      selectedTheme: 'dark',
      calendar,
      DatePicker,
      date: '',
    };
  },

  mounted() {
    this.openDatepicker();
  },

  methods: {
    openDatepicker() {
      this.DatePicker.present({
        mode: 'date',
        locale: 'es_CL',
        format: 'dd/MM/yyyy',
        date: new Date().toLocaleString('es'),
        theme: this.selectedTheme,
      }).then((date) => {
        this.date = date.value;
      });
    },
  },
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  background-color: #e7e7e7;
  color: black;
}
</style>
