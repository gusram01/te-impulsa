<template>
  <app-layout pageTitle="Welcome Rafy">
    <!-- <ion-button expand="full" fill="outline">Outline + Full</ion-button> -->

    <ion-fab vertical="top" horizontal="end" slot="fixed">
      <ion-fab-button color="light">
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>

    <ion-list>
      <ion-item-sliding v-for="item in services" :key="item.order_code">
        <ion-item-options side="start">
          <ion-item-option color="danger">
            <ion-icon :icon="trashOutline" size="large"></ion-icon>
            <ion-label>
              Eliminar
            </ion-label>
          </ion-item-option>
        </ion-item-options>

        <ion-item>
          <ion-avatar>
            <ion-icon :icon="people" size="large"></ion-icon>
          </ion-avatar>
          <ion-card>
            <ion-card-header>
              <ion-card-title>{{ item.first_name }}</ion-card-title>
              <ion-card-subtitle>{{ item.telephone }}</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <span>
                {{ item.user_direction }}
                <small>
                  {{ item.comuna }}
                </small>
              </span>
            </ion-card-content>
          </ion-card>

          <ion-button shape="round" class="message" expand="block">
            <ion-icon :icon="sendOutline"></ion-icon>
            &nbsp; &nbsp;
            <ion-label>Message</ion-label>
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
    </ion-list>
  </app-layout>
</template>

<script>
import {
  IonList,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonAvatar,
  IonIcon,
  IonLabel,
  IonFabButton,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
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
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonAvatar,
    IonIcon,
    IonLabel,
    IonFabButton,
    IonButton,

    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonItemSliding,
  },
  data() {
    return {
      sendOutline,
      people,
      add,
      createOutline,
      trashOutline,
      services: [],
    };
  },

  created() {
    getInfo()
      .then((items) => {
        console.log(items);
        this.services = items;
      })
      .catch(() => {});
  },

  methods: {},
};
</script>
