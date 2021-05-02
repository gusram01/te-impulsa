<template>
  <app-layout>
    <template v-slot:toolbar>
      <ion-title size="large">
        History
      </ion-title>
    </template>
  </app-layout>
</template>

<script>
import { IonTitle } from '@ionic/vue';
import { getHistory } from '../services/api';

export default {
  components: {
    IonTitle,
  },

  created() {
    getHistory().then();
  },

  data() {
    return {};
  },
};
</script>
