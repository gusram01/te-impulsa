<template>
  <ion-loading
    :is-open="isLoaderActive"
    cssClass="loader"
    message="Procesando..."
    :duration="timeout"
    @didDismiss="isLoaderActive = false"
  >
  </ion-loading>
  <ion-item-divider v-for="item in services" :key="item.order_code">
    <ion-item-sliding>
      <ion-item-options side="start">
        <ion-item-option
          color="secondary"
          @click="finishService(item.order_code)"
          v-if="canShowFinishButton"
        >
          <ion-icon :icon="checkmarkCircle" size="large"></ion-icon>
          <ion-label>
            Finish Service
          </ion-label>
        </ion-item-option>
      </ion-item-options>

      <ion-item lines="none" @click.self="goToDetail(item.order_code)">
        <ion-label position="stacked" class="data-name">
          {{ item.first_name }}
        </ion-label>

        <ion-text color="tertiary">
          {{ item.telephone }}
        </ion-text>

        <ion-note>
          <ion-text color="dark">
            {{ item.user_direction }},&nbsp;
            <small>
              {{ item.comuna }}
            </small>
          </ion-text>
          <p>
            <ion-text color="dark">
              <strong> Hora: {{ item.sched_hour }} hrs. </strong>
            </ion-text>
          </p>
        </ion-note>

        <div class="buttons-items-wrapper" slot="end">
          <ion-button
            shape="round"
            class="message"
            size="small"
            :disabled="!isValidPhoneNumber(item.telephone)"
            :href="`https://api.whatsapp.com/send?phone=+5619${item.telephone}`"
          >
            <ion-icon :icon="sendOutline" size="small"></ion-icon>
            &nbsp;Message
          </ion-button>
          <ion-button
            shape="round"
            size="small"
            :disabled="isLoading || !isValidPhoneNumber(item.telephone)"
            @click="presentAlertPrompt(item)"
          >
            <ion-icon :icon="logoUsd" size="small"></ion-icon>
          </ion-button>
        </div>
      </ion-item>

      <ion-item-options side="end">
        <ion-item-option color="danger" @click="deleteService(item.order_code)">
          <ion-icon :icon="trashOutline" size="large"></ion-icon>
          <ion-label>
            Eliminar
          </ion-label>
        </ion-item-option>
      </ion-item-options>
    </ion-item-sliding>
  </ion-item-divider>
</template>
<script>
import {
  IonLoading,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonIcon,
  IonLabel,
  IonText,
  IonNote,
  IonItemDivider,
  IonButton,
  IonItemSliding,
  alertController,
} from '@ionic/vue';
import {
  trashOutline,
  checkmarkCircle,
  sendOutline,
  logoUsd,
} from 'ionicons/icons';

import { getWebpayUrl } from '../services/api';

export default {
  components: {
    IonLoading,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemDivider,
    IonItemSliding,
    IonButton,
    IonIcon,
    IonLabel,
    IonText,
    IonNote,
  },

  props: {
    finishService: {
      type: Function,
      required: false,
    },
    deleteService: {
      type: Function,
      required: true,
    },
    services: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      sendOutline,
      checkmarkCircle,
      trashOutline,
      logoUsd,
      isLoaderActive: false,
      timeout: 1000,
      isLoading: false,
    };
  },
  computed: {
    canShowFinishButton() {
      return this.$route.meta.canShowFinishButton;
    },
  },
  methods: {
    goToDetail(id) {
      this.$router.push(`/service/${id}`);
    },
    isValidPhoneNumber(phone) {
      return phone && ('' + phone).length === 8;
    },
    setHrefWebpay(service, amount_order) {
      this.isLoading = true;
      getWebpayUrl(service.order_code, amount_order)
        .then((resp) => {
          if (resp.ok) {
            const anchor = document.createElement('a');
            anchor.href = `https://wa.me/5619${service.telephone}?text=https://teimpulsamos.cl/tokenpay/${resp.data.token}`;
            anchor.className = 'hidden';
            anchor.click();
            anchor.remove();
          }
        })
        .catch(() => {})
        .finally(() => {
          this.isLoading = false;
        });
    },

    async presentAlertPrompt(service) {
      const alert = await alertController.create({
        cssClass: 'alert',
        header: 'Ingresa el monto de la orden',
        backdropDismiss: false,
        animated: true,
        inputs: [
          {
            name: 'amount_order',
            id: 'amount_order',
            value: '',
            placeholder: 'Order amount',
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'button-grey',
          },
          {
            text: 'Send Message',
            role: 'submit',
            cssClass: 'button-primary',
            handler: () => (this.isLoaderActive = true),
          },
        ],
      });
      await alert.present();
      const resp = await alert.onDidDismiss();
      const amountOrder = resp.data.values.amount_order;
      if (resp.role === 'submit' && !isNaN(+amountOrder) && +amountOrder > 0) {
        this.setHrefWebpay(service, amountOrder).then(() => {
          this.isLoaderActive = false;
        });
      }
    },
  },
};
</script>

<style scoped>
ion-button.message {
  --padding-end: 1.3em;
  --padding-start: 1.3em;
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
<style scoped>
.hidden {
  display: none;
}
</style>
