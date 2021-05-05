<template>
  <app-layout>
    <template v-slot:toolbar>
      <ion-title size="large">
        History
      </ion-title>
    </template>

    <template v-slot:default>
      <div class="content__wrapper">
        <ion-list lines="none" :inset="false">
          <ion-item-group v-for="services in datedServices" :key="services">
            <ion-datetime :readonly="true" :value="services[0].last_update" />
            <app-services :services="services" :deleteService="deleteService">
            </app-services>
          </ion-item-group>
        </ion-list>
      </div>
    </template>
  </app-layout>
</template>

<script>
import {
  IonTitle,
  IonList,
  IonItemGroup,
  IonDatetime,
  toastController,
} from '@ionic/vue';
import { getHistory, deleteServiceById } from '../services/api';

import AppServices from '../components/ItemService.vue';

export default {
  components: {
    IonTitle,
    IonList,
    IonItemGroup,
    IonDatetime,
    AppServices,
  },

  data() {
    return {
      datedServices: {},
      toast: null,
    };
  },

  created() {
    getHistory().then(this.convertServices);
  },

  updated() {
    if (this.$route.path === '/history') {
      this.datedServices = {};

      getHistory().then(this.convertServices);
    }
  },

  methods: {
    deleteService(orderCode) {
      deleteServiceById(orderCode)
        .then((resp) => {
          if (resp.error) {
            this.showToast(
              'Something went wrong, please try again later',
              'danger'
            );
          }
          this.showToast('Service deleted');
          return this.canRefreshServices(resp);
        })
        .then(this.convertServices)
        .catch((err) => {
          console.error(err);
        });
    },

    async showToast(msg, type = 'success') {
      this.toast = await toastController.create({
        message: msg,
        animated: true,
        position: 'bottom',
        duration: 2000,
        color: type,
      });
      this.toast.present();
    },

    canRefreshServices(response) {
      if (response.orderCode) {
        this.datedServices = {};
        return getHistory(response.orderCode);
      }
    },

    convertServices(resp) {
      resp.data.forEach((item) => {
        const dateToProcess = item.last_update.split('T')[0];

        if (!this.datedServices[dateToProcess]) {
          this.datedServices[dateToProcess] = [item];
        } else {
          this.datedServices[dateToProcess].push(item);
        }
      });
    },
  },
};
</script>

<style scoped>
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
