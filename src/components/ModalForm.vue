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
          type="text"
          placeholder="Department"
          clear-input
          @IonInput="department = $event.target.value"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Comuna</ion-label>
        <ion-select
          placeholder="Comuna"
          :interface-options="{ cssClass: 'my-custom-interface' }"
          @IonChange="comuna = $event.target.value"
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
            <ion-button type="submit" @click="validationForm" color="tertiary">
              Save
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-list>
  </ion-content>
</template>

<script>
import { DateTime } from 'luxon';
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
import { newService, getComunas } from '../services/api';

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
    title: { type: String, default: 'Super Modal' },
    close: { type: Function },
  },

  mounted() {
    getComunas().then((resp) => {
      this.comunas = resp;
    });
    if (!this.name.length) {
      this.errorInput.name.value = 'First name is required';
    }

    if (!this.lastName.length) {
      this.errorInput.lastName.value = 'Last name is required';
    }

    if (+this.phone <= 0 || isNaN(+this.phone)) {
      this.errorInput.phone.value = '9 characters Phone is required';
    }

    if (!this.date_service?.length) {
      this.errorInput.date_service.value = 'Please pick a date';
    }

    if (!this.address.length) {
      this.errorInput.address.value = 'Address is required';
    }

    if (!this.department.length) {
      this.errorInput.department.value = 'Department is required';
    }

    if (+this.comuna <= 0 || isNaN(+this.comuna)) {
      this.errorInput.comuna.value = 'Comuna is required';
    }
  },

  data() {
    return {
      closeOutline,
      toast: null,
      content: 'Content',
      name: '',
      lastName: '',
      phone: '',
      date_service: null,
      address: '',
      department: '',
      comuna: '',
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
    name(val) {
      if (!val) {
        this.errorInput.name.value = 'First name is required';
        if (!this.errorInput.name.touched) {
          this.errorInput.name.touched = true;
        }
      } else {
        delete this.errorInput.name.value;
      }
    },
    lastName(val) {
      if (!val) {
        this.errorInput.lastName.value = 'Last name is required';
        if (!this.errorInput.lastName.touched) {
          this.errorInput.lastName.touched = true;
        }
      } else {
        delete this.errorInput.lastName.value;
      }
    },
    phone(val) {
      if (!val || isNaN(+val) || (val + '').length !== 8) {
        this.errorInput.phone.value = '8 characters Phone is required';
        if (!this.errorInput.phone.touched) {
          this.errorInput.phone.touched = true;
        }
      } else {
        delete this.errorInput.phone.value;
      }
    },
    date_service(val) {
      if (!val) {
        this.errorInput.date_service.value = 'Please pick a date';
        if (!this.errorInput.date_service.touched) {
          this.errorInput.date_service.touched = true;
        }
      } else {
        delete this.errorInput.date_service.value;
      }
    },
    address(val) {
      if (!val) {
        this.errorInput.address.value = 'Address is required';
        if (!this.errorInput.address.touched) {
          this.errorInput.address.touched = true;
        }
      } else {
        delete this.errorInput.address.value;
      }
    },
    department(val) {
      if (!val) {
        this.errorInput.department.value = 'Department is required';
        if (!this.errorInput.department.touched) {
          this.errorInput.department.touched = true;
        }
      } else {
        delete this.errorInput.department.value;
      }
    },
    comuna(val) {
      if (!val || isNaN(+val)) {
        this.errorInput.comuna.value = 'Comuna is required';
        if (!this.errorInput.comuna.touched) {
          this.errorInput.comuna.touched = true;
        }
      } else {
        delete this.errorInput.comuna.value;
      }
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

    async validationForm() {
      if (!this.hasErrorForm()) {
        this.submitForm();
        return;
      }
      this.toast = await toastController.create({
        message: `Please verify:
        ${this.getErrorMessages()}`,
        animated: true,
        position: 'bottom',
        duration: 7000,
        color: 'danger',
        keyboardClose: true,
        buttons: [
          {
            side: 'end',
            icon: 'close',
            text: 'Close',
            handler: () => {},
          },
        ],
      });
      this.toast.present();
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

    clearForm() {
      this.name = '';
      this.last_name = '';
      this.phone = null;
      this.date_service = null;
      this.address = '';
      this.department = '';
      this.comuna = null;
      this.errorInput = {
        name: {},
        lastName: {},
        phone: {},
        date_service: {},
        address: {},
        department: {},
        comuna: {},
      };
    },
    submitForm() {
      const service = {
        name: this.name,
        last_name: this.lastName,
        phone: this.phone,
        date_service: DateTime.fromISO(this.date_service).toFormat(
          'yyyy-LL-dd HH:mm:ss'
        ),
        address: this.address,
        department: this.department,
        comuna: this.comuna,
        token_business: '841f80d3-7f4c-11eb-b629-f603cfed5859',
      };

      newService(service).then(() => {
        this.clearForm();
        this.showSuccessToast();
        this.close();
      });
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
