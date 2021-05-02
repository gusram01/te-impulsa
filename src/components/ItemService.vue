<template>
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
            {{ item.user_direction }}
            <small>
              {{ item.comuna }}
            </small>
          </ion-text>
          <p>
            <ion-text color="dark">
              <strong>
                <em> Hora: {{ item.sched_hour }} hrs. </em>
              </strong>
            </ion-text>
          </p>
        </ion-note>

        <div class="buttons-items-wrapper" slot="end">
          <ion-button
            shape="round"
            class="message"
            size="small"
            :disabled="!isValidPhoneNumber(item.telephone)"
            :href="`https://api.whatsapp.com/send?phone=+5215${item.telephone}`"
          >
            <ion-icon :icon="sendOutline" size="small"></ion-icon>
            &nbsp;Message
          </ion-button>
          <ion-button
            shape="round"
            size="small"
            :disabled="!isValidPhoneNumber(item.telephone)"
            :href="
              `https://wa.me/5215${item.telephone}?text=https://teimpulsamos.cl/api/v1/payment/payService`
            "
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
} from '@ionic/vue';
import {
  trashOutline,
  checkmarkCircle,
  sendOutline,
  logoUsd,
} from 'ionicons/icons';

export default {
  components: {
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
      return phone && ('' + phone).length === 9;
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
