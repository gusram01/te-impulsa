<template>
  <ion-header translucent>
    <ion-toolbar>
      <ion-title>{{ title }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-list lines="none">
      <ion-item>
        <ion-label>First name</ion-label>
        <ion-input
          type="text"
          placeholder="First Name"
          clear-input
          @IonInput="updateValues($event, 'name')"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Last Name</ion-label>
        <ion-input
          type="text"
          placeholder="Last Name"
          clear-input
          @IonInput="updateValues($event, 'lastName')"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Telephone</ion-label>
        <ion-input
          type="number"
          placeholder="Telephone"
          clear-input
          @IonInput="updateValues($event, 'phone')"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Date</ion-label>
        <ion-datetime
          display-format="MM/DD/YYYY"
          @IonChange="updateValues($event, 'date_service')"
        ></ion-datetime>
      </ion-item>
      <ion-item>
        <ion-label>Direction</ion-label>
        <ion-input
          type="text"
          placeholder="Direction"
          clear-input
          @IonInput="updateValues($event, 'address')"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Department</ion-label>
        <ion-input
          type="text"
          placeholder="Department"
          clear-input
          @IonInput="updateValues($event, 'department')"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Comuna</ion-label>
        <ion-select
          placeholder="Comuna"
          :interface-options="{ cssClass: 'my-custom-interface' }"
          @IonChange="updateValues($event, 'comuna')"
        >
          <ion-select-option
            class="comuna-option"
            style="color: red"
            v-for="val in comunas"
            :key="val.id_comuna"
            :value="val.id_comuna"
          >
            <ion-text color="danger">
              {{ val.comuna_name }}
            </ion-text>
          </ion-select-option>
        </ion-select>
      </ion-item>

      <ion-grid>
        <ion-row>
          <ion-col> </ion-col>
          <ion-col>
            <ion-button type="cancel" @click="close" color="light">
              Cancel
            </ion-button>
          </ion-col>
          <ion-col>
            <ion-button type="submit" @click="submit" color="tertiary">
              Save
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-list>
  </ion-content>
</template>

<script>
import {
  IonGrid,
  IonCol,
  IonRow,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonLabel,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonText,
  toastController,
} from '@ionic/vue';
import { closeOutline } from 'ionicons/icons';
import { getComunas } from '../services/api';

export default {
  components: {
    IonGrid,
    IonCol,
    IonRow,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonInput,
    IonLabel,
    IonItem,
    IonList,
    IonSelect,
    IonSelectOption,
    IonDatetime,
    IonText,
  },
  props: {
    close: { type: Function, required: true },
    submit: { type: Function, required: true },
    form: {
      type: Object,
      default: () => ({
        name: '',
        lastName: '',
        phone: '',
        date_service: null,
        address: '',
        department: '',
        comuna: '',
      }),
    },
  },

  mounted() {
    getComunas().then((resp) => {
      this.comunas = resp;
    });
    if (!this.form.name.length) {
      this.errorInput.name.value = 'First name is required';
    }

    if (!this.form.lastName.length) {
      this.errorInput.lastName.value = 'Last name is required';
    }

    if (+this.form.phone <= 0 || isNaN(+this.form.phone)) {
      this.errorInput.phone.value = '9 characters Phone is required';
    }

    if (!this.form.date_service?.length) {
      this.errorInput.date_service.value = 'Please pick a date';
    }

    if (!this.form.address.length) {
      this.errorInput.address.value = 'Address is required';
    }

    if (!this.form.department.length) {
      this.errorInput.department.value = 'Department is required';
    }

    if (+this.form.comuna <= 0 || isNaN(+this.form.comuna)) {
      this.errorInput.comuna.value = 'Comuna is required';
    }
  },

  data() {
    return {
      closeOutline,
      toast: null,

      comunas: [],

      errorInput: {
        name: {},
        lastName: {},
        phone: {},
        date_service: {},
        address: {},
        department: {},
        comuna: {},
      },
    };
  },

  watch: {
    form: {
      deep: true,
      handler: function(val) {
        if (!val.name) {
          this.errorInput.name.value = 'First name is required';
          if (!this.errorInput.name.touched) {
            this.errorInput.name.touched = true;
          }
        } else {
          delete this.errorInput.name.value;
        }

        if (!val.lastName) {
          this.errorInput.lastName.value = 'Last name is required';
          if (!this.errorInput.lastName.touched) {
            this.errorInput.lastName.touched = true;
          }
        } else {
          delete this.errorInput.lastName.value;
        }

        if (!val.phone || isNaN(+val.phone) || (val.phone + '').length !== 8) {
          this.errorInput.phone.value = '8 characters Phone is required';
          if (!this.errorInput.phone.touched) {
            this.errorInput.phone.touched = true;
          }
        } else {
          delete this.errorInput.phone.value;
        }

        if (!val.date_service) {
          this.errorInput.date_service.value = 'Please pick a date';
          if (!this.errorInput.date_service.touched) {
            this.errorInput.date_service.touched = true;
          }
        } else {
          delete this.errorInput.date_service.value;
        }

        if (!val.address) {
          this.errorInput.address.value = 'Address is required';
          if (!this.errorInput.address.touched) {
            this.errorInput.address.touched = true;
          }
        } else {
          delete this.errorInput.address.value;
        }

        if (!val.department) {
          this.errorInput.department.value = 'Department is required';
          if (!this.errorInput.department.touched) {
            this.errorInput.department.touched = true;
          }
        } else {
          delete this.errorInput.department.value;
        }

        if (!val.comuna || isNaN(+val.comuna)) {
          this.errorInput.comuna.value = 'Comuna is required';
          if (!this.errorInput.comuna.touched) {
            this.errorInput.comuna.touched = true;
          }
        } else {
          delete this.errorInput.comuna.value;
        }
      },
    },
  },

  methods: {
    updateValues(event, key) {
      this.$emit('update:modelValue', {
        key,
        value: event,
      });
    },

    hasErrorForm() {
      return !!Object.values(this.errorInput)
        .map((val) => val.value)
        .join('')
        .trim().length;
    },

    getErrorMessages() {
      return Object.values(this.errorInput)
        .map((val) => val.value)
        .join(', ');
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
</style>
