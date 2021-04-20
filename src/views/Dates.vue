<template>
  <app-layout pageTitle="My services by date">
    <template v-slot:toolbar>
      <ion-title size="large">
        Choose a date
      </ion-title>
    </template>

    <div class="content">
      <ion-grid>
        <ion-row>
          <ion-col class="ion-alignment-self-start">
            <ion-button @click="openDatepicker">
              <ion-icon :icon="calendar"></ion-icon>
            </ion-button>
          </ion-col>
        </ion-row>
        <!-- <ion-row v-for="(serv, index) in datedServices" :key="index">
          <ion-col>{{ serv }}</ion-col>
        </ion-row> -->
        <ion-row>
          <div class="content__wrapper col-12">
            <ion-list lines="none" :inset="false">
              <ion-item-group>
                Services for: {{ date }}
                <ion-item-divider
                  v-for="(datedService, index) in datedServices"
                  :key="index"
                >
                  <ion-item-sliding>
                    <ion-item-options side="start">
                      <ion-item-option color="secondary">
                        <ion-icon
                          :icon="checkmarkCircle"
                          size="large"
                        ></ion-icon>
                        <ion-label>
                          Finish Service
                        </ion-label>
                      </ion-item-option>
                    </ion-item-options>

                    <ion-item
                      lines="none"
                      @click.self="goToDetail(datedService.order_code)"
                    >
                      <ion-label position="stacked" class="data-name">
                        {{ datedService.first_name }}
                      </ion-label>

                      <ion-text color="tertiary">
                        {{ datedService.telephone }}
                      </ion-text>

                      <ion-note>
                        <ion-text color="dark">
                          {{ datedService.user_direction }}
                          <small>
                            {{ datedService.comuna }}
                          </small>
                        </ion-text>
                        <p>
                          <ion-text color="dark">
                            <strong>
                              <em>
                                Hora: {{ datedService.sched_hour }} hrs.
                              </em>
                            </strong>
                          </ion-text>
                        </p>
                      </ion-note>

                      <div class="buttons-items-wrapper" slot="end">
                        <ion-button shape="round" class="message" size="small">
                          <ion-icon :icon="sendOutline" size="small"></ion-icon>
                          &nbsp;Message
                        </ion-button>
                        <ion-button shape="round" class="" size="small">
                          <ion-icon :icon="logoUsd" size="small"></ion-icon>
                        </ion-button>
                      </div>
                    </ion-item>

                    <ion-item-options side="end">
                      <ion-item-option color="danger">
                        <ion-icon :icon="trashOutline" size="large"></ion-icon>
                        <ion-label>
                          Eliminar
                        </ion-label>
                      </ion-item-option>
                    </ion-item-options>
                  </ion-item-sliding>
                </ion-item-divider>
              </ion-item-group>
            </ion-list>
          </div>
        </ion-row>
      </ion-grid>
    </div>
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
  // IonText,
  IonList,
  IonItem,
  IonItemGroup,
  IonItemOption,
  IonItemOptions,
  IonLabel,
  IonText,
  IonNote,
  IonItemDivider,
  IonItemSliding,
} from '@ionic/vue';
import {
  calendar,
  checkmarkCircle,
  sendOutline,
  logoUsd,
  trashOutline,
} from 'ionicons/icons';
import { getPendingByDate } from '../services/api';

const DatePicker = Plugins.DatePickerPlugin;

export default {
  components: {
    IonButton,
    IonIcon,
    IonTitle,
    IonGrid,
    IonRow,
    IonCol,
    // IonText,
    IonList,
    IonItem,
    IonItemGroup,
    IonItemOption,
    IonItemOptions,
    IonLabel,
    IonText,
    IonNote,
    IonItemDivider,
    IonItemSliding,
  },

  data() {
    return {
      selectedTheme: 'dark',
      calendar,
      checkmarkCircle,
      sendOutline,
      logoUsd,
      trashOutline,
      DatePicker,
      date: '',
      datedServices: [],
    };
  },

  mounted() {
    this.openDatepicker();
  },

  watch: {
    date(val) {
      const arrDate = val.split('/');

      getPendingByDate(arrDate[0], arrDate[1], arrDate[2]).then((resp) => {
        this.datedServices = resp;
      });
    },
  },

  methods: {
    openDatepicker() {
      this.DatePicker.present({
        mode: 'date',
        locale: 'es_CL',
        format: 'dd/MM/yyyy',
        date: new Date().toLocaleString('es'),
        theme: this.selectedTheme,
      }).then((date) => {
        this.date = date.value;
      });
    },

    goToDetail(id) {
      this.$router.push(`/service/${id}`);
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

.content__wrapper {
  display: flex;
  flex-direction: column;
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
