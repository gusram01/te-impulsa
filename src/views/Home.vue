<template>
  <app-layout pageTitle="Welcome Rafy">
    <!-- <ion-button expand="full" fill="outline">Outline + Full</ion-button> -->
    <div class="content__wrapper">
      <div class="add__wrapper">
        <ion-button color="light" shape="round" size="large" class="add">
          <ion-icon :icon="add"></ion-icon>
        </ion-button>
      </div>

      <ion-list lines="none" :inset="false">
        <ion-item-group v-for="(date, index) in datedServices" :key="index">
          <ion-datetime disabled :value="date[0].service_date" />
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
                </ion-note>

                <ion-button
                  slot="end"
                  shape="round"
                  class="message"
                  size="small"
                >
                  <ion-icon :icon="sendOutline" size="small"></ion-icon>
                  &nbsp;Message
                </ion-button>
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
} from '@ionic/vue';
import {
  people,
  add,
  trashOutline,
  createOutline,
  sendOutline,
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
  },
  data() {
    return {
      sendOutline,
      people,
      add,
      createOutline,
      trashOutline,
      datedServices: {},
    };
  },

  created() {
    getInfo()
      .then(this.convertServices)
      .catch(() => {});
  },

  methods: {
    convertServices(items) {
      items.forEach((item) => {
        if (!this.datedServices[item.service_date]) {
          this.datedServices[item.service_date] = [item];
        } else {
          this.datedServices[item.service_date].push(item);
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
ion-item > ion-button.message {
  --padding-end: 1.3em;
  --padding-start: 1.3em;
  font-size: 0.5em;
  margin: auto 0;
}
ion-list {
  background: #f5f5f5;
}
ion-item-divider {
  --padding-start: 0.8em;
  --padding-end: 0.8em;
  --padding-top: 0.4em;
  --padding-bottom: 0.4em;
  --background: #f5f5f5;
}
ion-item {
  --padding-top: 1em;
  --padding-bottom: 1em;
  --border-radius: 10px;
}
.content__wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
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
ion-label.data-name {
  font-size: 1.5em;
  margin-bottom: 0.5em;
}
</style>
