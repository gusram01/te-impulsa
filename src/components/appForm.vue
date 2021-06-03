<template>
  <ion-content class="ion-padding">
    <v-form @submit="submit">
      <ion-list lines="none">
        <!--  First name: start  -->
        <ion-item>
          <ion-label>First name</ion-label>
          <v-field
            name="first-name"
            v-slot="{ field }"
            :rules="(val) => (val && val.length > 0) || 'Write your first name'"
          >
            <ion-input
              clear-input
              type="text"
              v-bind="field"
              name="first-name"
              placeholder="First Name"
              :disabled="isDisabled"
              :value="modelValue.name"
              @IonInput="updateValues($event, 'name')"
            ></ion-input>
          </v-field>
          <v-error-message
            class="input-error"
            name="first-name"
          ></v-error-message>
        </ion-item>
        <!--  First name: end  -->

        <!--  Last name: start  -->
        <ion-item>
          <ion-label>Last Name</ion-label>
          <v-field
            name="last-name"
            v-slot="{ field }"
            :rules="(val) => (val && val.length > 0) || 'Write your last name'"
          >
            <ion-input
              clear-input
              type="text"
              v-bind="field"
              name="last-name"
              placeholder="Last Name"
              :disabled="isDisabled"
              :value="modelValue.last_name"
              @IonInput="updateValues($event, 'last_name')"
            ></ion-input>
          </v-field>
          <v-error-message
            class="input-error"
            name="last-name"
          ></v-error-message>
        </ion-item>
        <!--  Last name: end  -->

        <!--  Telephone: start  -->
        <ion-item>
          <ion-label>Telephone</ion-label>
          <v-field
            name="telephone"
            v-slot="{ field }"
            :rules="
              (val) =>
                (val && val > 0 && ('' + val).length === 8) ||
                'Write your phone 8 digits'
            "
          >
            <ion-input
              clear-input
              type="number"
              v-bind="field"
              name="telephone"
              placeholder="Telephone"
              :disabled="isDisabled"
              :value="modelValue.phone"
              @IonInput="updateValues($event, 'phone')"
            ></ion-input>
          </v-field>
          <v-error-message
            class="input-error"
            name="telephone"
          ></v-error-message>
        </ion-item>
        <!--  Telephone: end  -->

        <!--  Date: start  -->
        <ion-item>
          <ion-label>Date</ion-label>
          <v-field
            name="date"
            v-slot="{ field }"
            :rules="(val) => (val && val.length > 0) || 'Pick a date'"
          >
            <ion-datetime
              name="date"
              v-bind="field"
              display-format="MM/DD/YYYY"
              :disabled="isDisabled"
              :value="modelValue.date_service"
              @IonChange="updateValues($event, 'date_service')"
            ></ion-datetime>
          </v-field>
          <v-error-message class="input-error" name="date"></v-error-message>
        </ion-item>
        <!--  Date: end  -->

        <!--  Address: start  -->
        <ion-item>
          <ion-label>Direction</ion-label>

          <v-field
            name="address"
            v-slot="{ field }"
            :rules="(val) => (val && val.length > 0) || 'Write a direction'"
          >
            <ion-input
              clear-input
              type="text"
              name="address"
              v-bind="field"
              placeholder="Direction"
              :disabled="isDisabled"
              :value="modelValue.address"
              @IonInput="updateValues($event, 'address')"
            ></ion-input>
          </v-field>
          <v-error-message class="input-error" name="address"></v-error-message>
        </ion-item>
        <!--  Address: end  -->

        <!--  Department: start  -->
        <ion-item>
          <ion-label>Department</ion-label>
          <v-field
            name="department"
            v-slot="{ field }"
            :rules="(val) => (val && val.length > 0) || 'Write your department'"
          >
            <ion-input
              clear-input
              type="text"
              v-bind="field"
              name="department"
              placeholder="Department"
              :disabled="isDisabled"
              :value="modelValue.department"
              @IonInput="updateValues($event, 'department')"
            ></ion-input>
          </v-field>
          <v-error-message
            class="input-error"
            name="department"
          ></v-error-message>
        </ion-item>
        <!--  Department: end  -->

        <!--  Comuna: start  -->
        <ion-item>
          <ion-label>Comuna</ion-label>
          <v-field
            name="comuna"
            v-slot="{ field }"
            :rules="(val) => (val && val > 0) || 'Pick a comuna'"
          >
            <ion-select
              name="comuna"
              v-bind="field"
              placeholder="Comuna"
              :disabled="isDisabled"
              :value="modelValue.comuna"
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
          </v-field>
          <v-error-message class="input-error" name="comuna"></v-error-message>
        </ion-item>
        <!--  Comuna: end  -->

        <ion-grid>
          <ion-row>
            <ion-col> </ion-col>
            <ion-col v-if="close">
              <ion-button type="button" @click="close" color="light">
                Cancel
              </ion-button>
            </ion-col>
            <ion-col v-if="!isDisabled">
              <ion-button type="submit" @click="submit" color="tertiary">
                Save
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-list>
    </v-form>
  </ion-content>
</template>

<script>
import {
  IonGrid,
  IonCol,
  IonRow,
  IonContent,
  IonButton,
  IonInput,
  IonLabel,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonText,
} from '@ionic/vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { getComunas } from '../services/api';

export default {
  components: {
    IonGrid,
    IonCol,
    IonRow,
    IonContent,
    IonButton,
    IonInput,
    IonLabel,
    IonItem,
    IonList,
    IonSelect,
    IonSelectOption,
    IonDatetime,
    IonText,
    VForm: Form,
    VField: Field,
    VErrorMessage: ErrorMessage,
  },
  props: {
    close: { type: Function, required: false },
    submit: { type: Function, required: true },
    modelValue: {
      type: Object,
      required: true,
    },
    isDisabled: { type: Boolean, default: false },
  },

  mounted() {
    getComunas().then((resp) => {
      this.comunas = resp;
    });
  },

  data() {
    return {
      comunas: [],
    };
  },

  methods: {
    updateValues(event, key) {
      this.$emit('update:modelValue', {
        key,
        value: event.target.value,
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
.input-error {
  max-width: 10ch;
  font-size: 0.75em;
  color: var(--ion-color-danger);
}
</style>
