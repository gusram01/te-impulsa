<template>
  <app-layout pageTitle="Welcome Rafy">
    <!-- <ion-button expand="full" fill="outline">Outline + Full</ion-button> -->

    <ion-button color="light">
      <ion-icon slot="icon-only" :icon="add"></ion-icon>
    </ion-button>
    <ion-list>
      <ion-item-sliding v-for="item in services" :key="item.order_code">
        <ion-item-options side="start">
          <ion-item-option>Eliminar</ion-item-option>
        </ion-item-options>

        <ion-item>
          <ion-avatar>
            <ion-icon :icon="people" size="large"></ion-icon>
          </ion-avatar>
          <ion-card>
            <ion-card-header>
              <ion-card-title>{{ item.order_code }}</ion-card-title>
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
        </ion-item>

        <ion-item-options side="end">
          <ion-item-option>Editar</ion-item-option>
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
  // IonLabel,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItemSliding,
} from '@ionic/vue';
import { people, add } from 'ionicons/icons';
import { getInfo } from '../services/api';

export default {
  components: {
    IonList,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonAvatar,
    IonIcon,
    // IonLabel,
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
      people,
      add,
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
