<template>
  <ion-fab vertical="bottom" horizontal="center" slot="fixed">
    <ion-fab-button color="dark" @click="presentAlertPrompt">
      <ion-icon :icon="sendOutline"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script>
import { IonFab, IonFabButton, IonIcon, alertController } from '@ionic/vue';
import { sendOutline } from 'ionicons/icons';

export default {
  components: {
    IonFab,
    IonFabButton,
    IonIcon,
  },

  data() {
    return {
      sendOutline,
    };
  },

  methods: {
    async presentAlertPrompt() {
      const alert = await alertController.create({
        cssClass: 'alert',
        header: 'Write phone number',
        backdropDismiss: false,
        inputs: [
          {
            name: 'phone',
            id: 'phone',
            value: '',
            placeholder: 'Teléfono',
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
          },
          {
            text: 'Send Message',
            role: 'submit',
          },
        ],
      });
      await alert.present();
      const resp = await alert.onDidDismiss();
      const phone = resp.data.values.phone;
      if (
        resp.role === 'submit' &&
        !isNaN(+phone) &&
        +phone > 0 &&
        phone.length === 8
      ) {
        const anchor = document.createElement('a');
        anchor.href = `https://wa.me/5619${phone}?text=https://teimpulsamos.cl/creaServicio/841f80d3-7f4c-11eb-b629-f603cfed5859`;

        anchor.className = 'hidden';
        anchor.click();
        anchor.remove();
      }
    },
  },
};
</script>
