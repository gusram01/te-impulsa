<template>
  <app-layout>
    <template v-slot:toolbar>
      <ion-title size="large">
        Welcome Rafy
      </ion-title>
      <div class="subtitle">
        mar 27, 2021
      </div>
      <ion-button
        color="dark"
        size="small"
        class="add-service"
        @click="openModal"
      >
        Create service
      </ion-button>
    </template>

    <ion-refresher slot="fixed" @ionRefresh="refreshServices($event)">
      <ion-refresher-content
        :pulling-icon="chevronDownCircleOutline"
        pulling-text="Pull to refresh"
        refreshing-spinner="circles"
      >
      </ion-refresher-content>
    </ion-refresher>

    <div class="content__wrapper">
      <ion-list lines="none" :inset="false">
        <ion-item-group v-for="(services, index) in datedServices" :key="index">
          <ion-datetime :readonly="true" :value="services[0].service_date" />
          <app-services
            :services="services"
            :deleteService="deleteService"
            :finishService="finishService"
          >
          </app-services>
        </ion-item-group>
      </ion-list>
    </div>
  </app-layout>
</template>

<script>
import {
  IonList,
  IonDatetime,
  IonItemGroup,
  IonButton,
  IonTitle,
  IonRefresher,
  IonRefresherContent,
  modalController,
} from '@ionic/vue';
import { add, chevronDownCircleOutline } from 'ionicons/icons';

import { getInfo, finishServiceById, deleteServiceById } from '../services/api';

import ModalForm from '../components/ModalForm.vue';
import AppServices from '../components/ItemService.vue';

export default {
  components: {
    IonList,
    IonDatetime,
    IonItemGroup,
    IonButton,
    IonTitle,
    IonRefresher,
    IonRefresherContent,
    AppServices,
  },
  data() {
    return {
      add,
      chevronDownCircleOutline,
      datedServices: {},
      modal: null,
    };
  },

  created() {
    getInfo()
      .then(this.convertServices)
      .catch(() => {});
  },

  methods: {
    finishService(orderCode) {
      finishServiceById(orderCode)
        .then(this.canRefreshServices)
        .then(this.convertServices)
        .catch((err) => {
          console.error(err);
        });
    },

    deleteService(orderCode) {
      deleteServiceById(orderCode)
        .then(this.canRefreshServices)
        .then(this.convertServices)
        .catch((err) => {
          console.error(err);
        });
    },

    canRefreshServices(response) {
      if (response.orderCode) {
        this.datedServices = {};
        return getInfo(response.orderCode);
      }
    },

    convertServices(items) {
      items.forEach((item) => {
        const dateToProcess = item.service_date.split('T')[0];

        if (!this.datedServices[dateToProcess]) {
          this.datedServices[dateToProcess] = [item];
        } else {
          this.datedServices[dateToProcess].push(item);
        }
      });
    },

    async openModal() {
      this.modal = await modalController.create({
        component: ModalForm,
        cssClass: 'modal',
        componentProps: {
          title: 'Create Service',
          close: () => this.closeModal(),
        },
        backdropDismiss: true,
        showBackdrop: true,
      });
      this.modal.present();
    },

    closeModal() {
      this.modal.dismiss();
    },

    refreshServices(event) {
      this.datedServices = {};

      getInfo()
        .then(this.convertServices)
        .catch(() => {})
        .finally(() => {
          event.target.complete();
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

ion-list {
  padding-top: 0;
  background: var(--ion-color-step-900);
}

ion-item {
  --padding-top: 0.5em;
  --padding-bottom: 0.5em;
  --border-radius: 10px;
}
ion-item-group:not(:first-child) {
  margin-top: 5%;
}
ion-item-group > ion-datetime {
  color: var(--ion-color-tertiary);
  opacity: 1;
}

.add-service,
.subtitle {
  margin-left: 5vw;
}

.content__wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: var(--ion-color-step-900);
}

.add__wrapper {
  display: flex;
  width: 100%;
  min-height: 84px;
  align-items: center;
  justify-content: flex-end;
  padding-right: 5%;
  margin-bottom: 5%;
}
.date-wrapper {
  text-align: center;
}
</style>
