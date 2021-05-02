<template>
  <app-layout>
    <template v-slot:toolbar>
      <ion-title size="large">
        Choose a date
      </ion-title>
    </template>

    <template v-slot:default>
      <div class="content__wrapper">
        <ion-grid>
          <ion-row>
            <ion-col class="ion-alignment-self-start">
              <ion-button @click="openDatepicker">
                <ion-icon :icon="calendar"></ion-icon>
              </ion-button>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col class="col-12">
              <ion-list lines="none" :inset="false">
                <ion-item-group>
                  Services for: {{ date }}
                  <app-services
                    :services="datedServices"
                    :deleteService="deleteService"
                  ></app-services>
                </ion-item-group>
              </ion-list>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </template>
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
  IonList,
  IonItemGroup,
} from '@ionic/vue';
import {
  calendar,
  checkmarkCircle,
  sendOutline,
  logoUsd,
  trashOutline,
} from 'ionicons/icons';
import { getPendingByDate, deleteServiceById } from '../services/api';
import AppServices from '../components/ItemService.vue';

const DatePicker = Plugins.DatePickerPlugin;

export default {
  components: {
    IonButton,
    IonIcon,
    IonTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonItemGroup,
    AppServices,
  },

  data() {
    return {
      selectedTheme: 'dark',
      calendar,
      checkmarkCircle,
      sendOutline,
      logoUsd,
      trashOutline,
      date: '',
      datedServices: [],
      isLoadingDatePicker: false,
    };
  },

  updated() {
    if (this.$route.path === '/dates') {
      this.date = '';
      this.datedServices = [];
      if (!this.isLoadingDatePicker) {
        this.openDatepicker();
      }
    }
  },

  watch: {
    date(val) {
      if (!val || !val.length) {
        return;
      }
      const arrDate = val.split('/');

      getPendingByDate(arrDate[0], arrDate[1], arrDate[2]).then((resp) => {
        this.datedServices = resp;
      });
    },
  },

  methods: {
    async openDatepicker() {
      if ((await Plugins.Device.getInfo()).platform === 'android') {
        this.isLoadingDatePicker = true;
        DatePicker.present({
          mode: 'date',
          locale: 'es_CL',
          format: 'dd/MM/yyyy',
          date: new Date().toLocaleString('es'),
          theme: this.selectedTheme,
        })
          .then((date) => {
            this.date = date.value;
            this.isLoadingDatePicker = false;
          })
          .catch(() => {
            this.isLoadingDatePicker = false;
          })
          .finally(() => {
            this.isLoadingDatePicker = false;
          });
      }
    },

    deleteService(orderCode) {
      deleteServiceById(orderCode)
        .then((response) => {
          if (response) {
            this.datedServices = [];
            const arrDate = this.date.split('/');

            return getPendingByDate(arrDate[0], arrDate[1], arrDate[2]);
          }
        })
        .then((resp) => {
          this.datedServices = resp;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style scoped>
ion-button.add {
  --padding-bottom: 50%;
  --padding-top: 50%;
  --border-radius: 50%;
}

ion-button.message {
  --padding-end: 1.3em;
  --padding-start: 1.3em;
}
ion-list {
  padding-top: 0;
  background: var(--ion-color-step-900);
}
ion-item-divider {
  --padding-start: 0.8em;
  --padding-end: 0.8em;
  --padding-top: 0.4em;
  --padding-bottom: 0.4em;
  --background: var(--ion-color-step-900);
}
ion-item {
  --padding-top: 0.5em;
  --padding-bottom: 0.5em;
  --border-radius: 10px;
}
ion-item-group:not(:first-child) {
  margin-top: 5%;
}

ion-item-group:not(:first-child) {
  margin-top: 5%;
}
ion-item-group > ion-datetime {
  color: var(--ion-color-tertiary);
  opacity: 1;
}

.content__wrapper {
  display: flex;

  width: 100%;
  height: 100%;
  background: var(--ion-color-step-900);
}
.buttons-items-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.buttons-items-wrapper > ion-button {
  margin-top: 5%;
  margin-bottom: auto;
  font-size: 0.6em;
  --padding-top: 2em;
  --padding-bottom: 2em;
}

ion-label.data-name {
  font-size: 1.5em;
  margin-bottom: 0.5em;
}
ion-text,
ion-label,
ion-note {
  pointer-events: none;
}
</style>
