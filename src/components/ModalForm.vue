<template>
  <ion-header translucent>
    <ion-toolbar>
      <ion-title>{{ title }}</ion-title>
      <!-- <ion-buttons slot="end">
        <ion-button @click="closeModal">
          <ion-icon :icon="closeOutline"></ion-icon>
          close
        </ion-button>
      </ion-buttons> -->
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

      <ion-grid>
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
  IonDatetime,
  toastController,
} from '@ionic/vue';
import { closeOutline } from 'ionicons/icons';
import { newService } from '../services/api';

export default {
  name: 'Modal',
  props: {
    title: { type: String, default: 'Super Modal' },
    close: { type: Function },
  },

  mounted() {
    if (!this.name.length) {
      this.errorInput.name = 'name';
    }

    if (!this.lastName.length) {
      this.errorInput.lastName = 'lastName';
    }

    if (this.phone <= 0 || isNaN(+this.phone)) {
      this.errorInput.phone = 'phone';
    }

    if (!this.date_service?.length) {
      this.errorInput.date_service = 'date_service';
    }

    if (!this.address.length) {
      this.errorInput.address = 'address';
    }

    if (this.department <= 0 || isNaN(+this.department)) {
      this.errorInput.department = 'department';
    }

    if (this.comuna <= 0 || isNaN(+this.comuna)) {
      this.errorInput.comuna = 'comuna';
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
      errorInput: {},
    };
  },

  watch: {
    name(val) {
      if (!val) {
        this.errorInput.name = 'name';
      } else {
        delete this.errorInput.name;
      }
    },
    lastName(val) {
      if (!val) {
        this.errorInput.lastName = 'lastName';
      } else {
        delete this.errorInput.lastName;
      }
    },
    phone(val) {
      if (!val || isNaN(+val)) {
        this.errorInput.phone = 'phone';
      } else {
        delete this.errorInput.phone;
      }
    },
    date_service(val) {
      if (!val) {
        this.errorInput.date_service = 'date_service';
      } else {
        delete this.errorInput.date_service;
      }
    },
    address(val) {
      if (!val) {
        this.errorInput.address = 'address';
      } else {
        delete this.errorInput.address;
      }
    },
    department(val) {
      if (!val || isNaN(+val)) {
        this.errorInput.department = 'department';
      } else {
        delete this.errorInput.department;
      }
    },
    comuna(val) {
      if (!val || isNaN(+val)) {
        this.errorInput.comuna = 'comuna';
      } else {
        delete this.errorInput.comuna;
      }
    },
  },

  methods: {
    closeModal() {
      this.close();
    },

    async openToast() {
      if (!Object.keys(this.errorInput).length) {
        this.submitForm();
        return;
      }
      this.toast = await toastController.create({
        message: `Please verify ${Object.values(this.errorInput).join(', ')}`,
        position: 'bottom',
        duration: 2000,
        color: 'warning',
      });
      this.toast.present();
    },

    submitForm() {
      const service = {
        name: this.name,
        lastName: this.lastName,
        phone: this.phone,
        date_service: this.date_service,
        address: this.address,
        department: this.department,
        comuna: this.comuna,
        token_business: '841f80d3-7f4c-11eb-b629-f603cfed5859',
      };

      newService(service);
    },
  },
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
    IonDatetime,
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
</style>
