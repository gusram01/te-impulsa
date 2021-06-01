<template>
  <ion-page>
    <ion-loading
      cssClass="loader"
      message="Procesando..."
      :duration="timeout"
      :is-open="isLoaderActive"
      @didDismiss="isLoaderActive = false"
    >
    </ion-loading>
    <ion-list lines="none" v-if="comments.length > 0">
      <ion-item v-for="comment in comments" :key="comment.id_comments">
        <ion-icon :icon="readerOutline" slot="start"></ion-icon>
        <ion-label>{{ comment.comment }}</ion-label>
      </ion-item>
    </ion-list>

    <ion-grid v-else>
      <ion-row
        class="ion-justify-content-center ion-padding-top ion-padding-bottom"
      >
        <ion-col class="ion-text-center">
          <h3>
            <ion-text color="tertiary">There is no comments yet</ion-text>
          </h3>
        </ion-col>
      </ion-row>
      <ion-row class="ion-justify-content-center">
        <ion-col size="8">
          <ion-img :src="emptyImage"></ion-img>
        </ion-col>
      </ion-row>
    </ion-grid>

    <ion-fab vertical="bottom" horizontal="end">
      <ion-fab-button @click="presentAlertPrompt">
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonList,
  IonItem,
  IonFab,
  IonFabButton,
  IonIcon,
  IonLabel,
  IonLoading,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonImg,
  alertController,
} from '@ionic/vue';
import { add, readerOutline } from 'ionicons/icons';

import { getCommentsById, newComment } from '../services/api';
import emptyImage from '../assets/145.png';

export default {
  components: {
    IonPage,
    IonList,
    IonItem,
    IonFab,
    IonFabButton,
    IonIcon,
    IonLabel,
    IonLoading,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonImg,
  },
  data() {
    return {
      add,
      readerOutline,
      emptyImage,
      comments: [],
      timeout: 1000,
      isLoaderActive: false,
    };
  },

  created() {
    this.getComments();
  },

  methods: {
    getComments() {
      getCommentsById(this.$route.params.id).then((response) => {
        this.comments = response;
      });
    },

    async presentAlertPrompt() {
      const alert = await alertController.create({
        cssClass: 'alert',
        header: 'Ingresa un comentario',
        backdropDismiss: false,
        inputs: [
          {
            name: 'new_comment',
            id: 'new_comment',
            value: '',
            type: 'textarea',
            placeholder: 'Write your comment',
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
          },
          {
            text: 'Send comment',
            role: 'submit',
            handler: () => (this.isLoaderActive = true),
          },
        ],
      });
      await alert.present();
      const resp = await alert.onDidDismiss();
      const comment = resp.data.values.new_comment;
      if (resp.role === 'submit' && comment.length > 0) {
        newComment(this.$route.params.id, comment)
          .then(() => this.getComments())
          .finally(() => {
            this.isLoaderActive = true;
          });
      }
    },
  },
};
</script>
