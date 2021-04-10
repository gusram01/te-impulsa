<template>
  <app-layout>
    <template v-slot:toolbar>
      <ion-title size="large">
        Welcome Rafy
      </ion-title>
      <div class="subtitle">
        mar 27, 2021
      </div>
      <ion-button color="dark" size="small" class="add-service">
        Create service
      </ion-button>
    </template>

    <div class="content__wrapper">
      <ion-list lines="none" :inset="false">
        <ion-item-group v-for="(date, index) in datedServices" :key="index">
          <ion-datetime :readonly="true" :value="date[0].service_date" />
          <ion-item-divider v-for="item in date" :key="item.order_code">
            <ion-item-sliding>
              <ion-item-options side="start">
                <ion-item-option color="danger">
                  <ion-icon :icon="trashOutline" size="large"></ion-icon>
                  <ion-label>
                    Eliminar
                  </ion-label>
                </ion-item-option>
              </ion-item-options>

              <ion-item lines="none">
                <ion-label position="stacked" class="data-name">
                  {{ item.first_name }}
                </ion-label>

                <ion-text color="tertiary">
                  {{ item.telephone }}
                </ion-text>

                <ion-note>
                  {{ item.user_direction }}
                  <small>
                    {{ item.comuna }}
                  </small>
                  <p>
                    <strong>
                      <em> Hora: {{ item.sched_hour }} hrs. </em>
                    </strong>
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
                <ion-item-option color="secondary">
                  <ion-icon :icon="createOutline" size="large"></ion-icon>
                  <ion-label>
                    Editar
                  </ion-label>
                </ion-item-option>
              </ion-item-options>
            </ion-item-sliding>
          </ion-item-divider>
        </ion-item-group>
      </ion-list>
    </div>
  </app-layout>
</template>

<script>
import {
  IonList,
  IonDatetime,
  IonItem,
  IonItemGroup,
  IonItemOption,
  IonItemOptions,
  IonIcon,
  IonLabel,
  IonText,
  IonNote,
  IonItemDivider,
  IonButton,
  IonItemSliding,
  IonTitle,
} from '@ionic/vue';
import {
  people,
  add,
  trashOutline,
  createOutline,
  sendOutline,
  calendar,
  logoUsd,
} from 'ionicons/icons';
import { getInfo } from '../services/api';

export default {
  components: {
    IonList,
    IonDatetime,
    IonItem,
    IonItemGroup,
    IonItemOption,
    IonItemOptions,
    IonIcon,
    IonLabel,
    IonText,
    IonNote,
    IonItemDivider,
    IonButton,
    IonItemSliding,
    IonTitle,
  },
  data() {
    return {
      sendOutline,
      people,
      add,
      createOutline,
      trashOutline,
      calendar,
      logoUsd,
      datedServices: {},
      calendarData: {},
    };
  },

  created() {
    getInfo()
      .then(this.convertServices)
      .catch(() => {});
  },

  methods: {
    convertServices(items) {
      console.log(items);
      items.forEach((item) => {
        const dateToProcess = item.service_date.split('T')[0];

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
ion-button.add {
  --padding-bottom: 50%;
  --padding-top: 50%;
  --border-radius: 50%;
  /* --box-shadow: 0 0 4px rgba(0, 0, 0, 0.15); */
}

ion-button.message {
  --padding-end: 1.3em;
  --padding-start: 1.3em;
}
ion-list {
  padding-top: 0;
  background: #e7e7e7;
}
ion-item-divider {
  --padding-start: 0.8em;
  --padding-end: 0.8em;
  --padding-top: 0.4em;
  --padding-bottom: 0.4em;
  --background: #e7e7e7;
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
  color: var(--ion-color-dark);
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
  background: #e7e7e7;
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
.buttons-items-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.buttons-items-wrapper > ion-button {
  margin-top: 12%;
  margin-bottom: auto;
  font-size: 0.6em;
}

ion-label.data-name {
  font-size: 1.5em;
  margin-bottom: 0.5em;
}
</style>
