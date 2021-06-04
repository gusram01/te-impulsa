<template>
  <ion-page>
    <ion-list lines="none" class="content__wrapper">
      <ion-item-divider>
        <ion-item>
          <h4 slot="start">Order: {{ $route.params.id }}</h4>
          <ion-button
            :color="isDisabled ? 'tertiary' : 'dark'"
            size="default"
            @click="disableInputs"
          >
            {{ isDisabled ? 'Edit' : 'Cancel' }}
          </ion-button>
        </ion-item>
      </ion-item-divider>
    </ion-list>
    <AppForm
      :submit="submitForm"
      :modelValue="{
        name,
        last_name,
        phone,
        date_service,
        address,
        department,
        comuna,
      }"
      :isDisabled="isDisabled"
      @update:modelValue="updateInputs"
    />
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonButton,
  IonItem,
  IonItemDivider,
  IonList,
  toastController,
} from '@ionic/vue';
import { DateTime } from 'luxon';
import { getServiceById, updateService } from '../services/api';

import AppForm from './appForm.vue';

export default {
  components: {
    IonPage,
    IonButton,
    IonItem,
    IonItemDivider,
    IonList,
    AppForm,
  },

  updated() {
    this.updateCurrentService();
  },

  data() {
    return {
      toast: null,
      isDisabled: true,
      name: '',
      last_name: '',
      phone: '',
      date_service: '',
      address: '',
      department: '',
      comuna: '',
    };
  },

  computed: {
    isValidForm() {
      return (
        !!this.name &&
        !!this.last_name &&
        +this.phone >= 10000000 &&
        ('' + this.phone).length === 8 &&
        !!this.date_service &&
        !!this.address &&
        !!this.department &&
        this.comuna >= 0
      );
    },
  },

  methods: {
    disableInputs() {
      this.isDisabled = !this.isDisabled;
    },

    async showSuccessToast() {
      this.toast = await toastController.create({
        message: 'The service was updated',
        position: 'bottom',
        duration: 2000,
        color: 'success',
      });
      this.toast.present();
    },

    updateInputs(event) {
      this[event.key] = event.value;
    },

    updateCurrentService() {
      getServiceById(this.$route.params.id)
        .then(this.setInitialData)
        .catch(() => {
          this.name = '';
          this.last_name = '';
          this.phone = '';
          this.date_service = '';
          this.address = '';
          this.department = '';
          this.comuna = '';
        });
    },

    submitForm() {
      const service = {
        name: this.name,
        last_name: this.last_name,
        phone: this.phone,
        date_service: DateTime.fromISO(this.date_service).toFormat(
          'yyyy-LL-dd HH:mm:ss'
        ),
        address: this.address,
        department: this.department,
        comuna: this.comuna,
        token_business: '841f80d3-7f4c-11eb-b629-f603cfed5859',
      };

      if (this.isValidForm) {
        updateService(service).then(() => {
          this.showSuccessToast();
          this.updateCurrentService();
          this.isDisabled = true;
        });
      }
    },

    setInitialData(resp) {
      if (resp.error) {
        this.name = '';
        this.last_name = '';
        this.phone = '';
        this.date_service = '';
        this.address = '';
        this.department = '';
        this.comuna = '';
        return;
      }
      const {
        comuna,
        first_name,
        last_name,
        service_date,
        telephone,
        user_depto,
        user_direction,
      } = resp.data[0];

      this.name = first_name;
      this.last_name = last_name;
      this.phone = telephone;
      this.date_service = service_date;
      this.address = user_direction;
      this.department = user_depto;
      this.comuna = comuna;
    },
  },
};
</script>

<style lang="css" scoped>
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
</style>
