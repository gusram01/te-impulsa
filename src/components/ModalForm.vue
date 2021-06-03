<template>
  <ion-header translucent>
    <ion-toolbar>
      <ion-title>{{ title }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <AppForm
      :submit="submitForm"
      :close="close"
      :modelValue="{
        name,
        last_name,
        phone,
        date_service,
        address,
        department,
        comuna,
      }"
      :isDisabled="false"
      @update:modelValue="updateInputs"
    />
  </ion-content>
</template>

<script>
import { DateTime } from 'luxon';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  toastController,
} from '@ionic/vue';
import { closeOutline } from 'ionicons/icons';
import { newService } from '../services/api';

import AppForm from './appForm.vue';

export default {
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    AppForm,
  },
  props: {
    title: { type: String, default: 'Create Service' },
    close: { type: Function },
  },

  data() {
    return {
      closeOutline,
      toast: null,
      content: 'Content',
      name: '',
      last_name: '',
      phone: '',
      date_service: null,
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
        +this.phone > 10000000 &&
        ('' + this.phone).length === 8 &&
        !!this.date_service &&
        !!this.address &&
        !!this.department &&
        this.comuna >= 0
      );
    },
  },

  methods: {
    async showSuccessToast() {
      this.toast = await toastController.create({
        message: 'The service was saved',
        position: 'bottom',
        duration: 2000,
        color: 'success',
      });
      this.toast.present();
    },

    updateInputs(event) {
      this[event.key] = event.value;
    },

    clearForm() {
      this.name = '';
      this.last_name = '';
      this.phone = '';
      this.date_service = null;
      this.address = '';
      this.department = '';
      this.comuna = '';
    },

    submitForm(e) {
      e.preventDefault();
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
        newService(service).then(() => {
          this.clearForm();
          this.showSuccessToast();
          this.close();
        });
      }
    },
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
  width: 100%;
  margin: 0.5em;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.35);
  border-radius: 10px;
}
ion-select {
  --placeholder-color: var(--ion-color-tertiary);
  --placeholder-opacity: 1;
}
/* 
.select-interface-option.comuna-option
  > .alert-button-inner
  > .alert-radio-label {
  --color: #971e49 !important;
  opacity: 1;
} */
</style>
