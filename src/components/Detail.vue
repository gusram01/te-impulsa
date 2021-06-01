<template>
  <ion-page>
    <ion-list lines="none" class="content__wrapper">
      <ion-item-divider>
        <ion-item>
          <h4 slot="start">Order: {{ $route.params.id }}</h4>
          <ion-button
            :color="isDisabled ? 'tertiary' : 'dark'"
            size="default"
            @click="isDisabled = !isDisabled"
          >
            {{ isDisabled ? 'Edit' : 'Save' }}
          </ion-button>
        </ion-item>
      </ion-item-divider>

      <ion-item>
        <ion-label>First name</ion-label>
        <ion-input
          type="text"
          placeholder="First Name"
          clear-input
          :disabled="isDisabled"
          :class="{ disabled: isDisabled }"
          :value="name"
          @IonInput="name = $event.target.value"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Last Name</ion-label>
        <ion-input
          type="text"
          placeholder="Last Name"
          clear-input
          :disabled="isDisabled"
          :class="{ disabled: isDisabled }"
          :value="lastName"
          @IonInput="lastName = $event.target.value"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Telephone</ion-label>
        <ion-input
          type="number"
          placeholder="Telephone"
          clear-input
          :disabled="isDisabled"
          :class="{ disabled: isDisabled }"
          :value="phone"
          @IonInput="phone = $event.target.value"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Date</ion-label>
        <ion-datetime
          display-format="MM/DD/YYYY"
          :disabled="isDisabled"
          :class="{ disabled: isDisabled }"
          value="04/23/2021"
          @IonChange="date_service = $event.target.value"
        ></ion-datetime>
      </ion-item>
      <ion-item>
        <ion-label>Direction</ion-label>
        <ion-input
          type="text"
          placeholder="Direction"
          clear-input
          :disabled="isDisabled"
          :class="{ disabled: isDisabled }"
          :value="address"
          @IonInput="address = $event.target.value"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Department</ion-label>
        <ion-input
          type="text"
          placeholder="Department"
          clear-input
          :disabled="isDisabled"
          :class="{ disabled: isDisabled }"
          :value="department"
          @IonInput="department = $event.target.value"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Comuna</ion-label>
        <ion-input
          type="number"
          placeholder="Comuna"
          clear-input
          :disabled="isDisabled"
          :class="{ disabled: isDisabled }"
          :value="comuna"
          @IonInput="comuna = $event.target.value"
        ></ion-input>
      </ion-item>
    </ion-list>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonButton,
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
    IonButton,
    IonInput,
    IonItem,
    IonItemDivider,
    IonList,
    IonLabel,
    IonDatetime,
  },

  created() {
    getServiceById(this.$route.params.id)
      .then(this.setInitialData)
      .catch(() => {
        this.name = '';
        this.lastName = '';
        this.phone = '';
        this.date_service = '';
        this.address = '';
        this.department = '';
        this.comuna = '';
      });
  },

  data() {
    return {
      toast: null,
      isDisabled: true,
      content: '',
      name: '',
      lastName: '',
      phone: '',
      date_service: '',
      address: '',
      department: '',
      comuna: '',
      errorInput: {},
    };
  },

  methods: {
    setInitialData(resp) {
      if (!resp.error) {
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
        this.lastName = last_name;
        this.phone = telephone;
        this.date_service = service_date;
        this.address = user_direction;
        this.department = user_depto;
        this.comuna = comuna;
        return;
      }
      this.name = '';
      this.lastName = '';
      this.phone = '';
      this.date_service = '';
      this.address = '';
      this.department = '';
      this.comuna = '';
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
