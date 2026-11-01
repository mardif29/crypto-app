<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <!-- Tombol Refresh -->
      <div class="top">
        <ion-button class="refresh" :disabled="loading" @click="loadData">
          <ion-spinner v-if="loading" name="dots" />
          <span v-else>Refresh</span>
        </ion-button>
      </div>

      <!-- Pesan error -->
      <p v-if="error" class="error">{{ error }}</p>

      <!-- Daftar cryptocurrency -->
      <div class="list">
        <div v-for="coin in coins" :key="coin.id" class="row">
          <div class="cell rank">
            <span class="label">Rank</span>
            <span class="big">{{ coin.rank }}</span>
          </div>
          <div class="cell name">
            <span class="label">{{ coin.name }}</span>
            <span class="big">{{ coin.symbol }}</span>
          </div>
          <div class="cell price">
            <span class="label">USD</span>
            <span class="big">{{ coin.price_usd }}</span>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { IonPage, IonContent, IonButton, IonSpinner } from '@ionic/vue'

const API_URL = 'https://api.coinlore.net/api/tickers/'

const coins = ref([])
const loading = ref(false)
const error = ref('')

async function loadData() {
  loading.value = true
  error.value = ''
  try {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    // Ambil hanya field yang dibutuhkan
    coins.value = json.data.map(({ id, rank, name, symbol, price_usd }) => ({
      id, rank, name, symbol, price_usd
    }))
  } catch (e) {
    error.value = 'Gagal memuat data. Periksa koneksi lalu tekan Refresh.'
  } finally {
    loading.value = false
  }
}

onMounted(loadData)
</script>

<style scoped>
ion-content { --background: #fff; }

.top {
  display: flex;
  justify-content: center;
  padding: 14px 0 10px;
}
.refresh {
  --background: #0d4fd6;
  --color: #fff;
  --border-radius: 4px;
  min-width: 130px;
  font-size: 15px;
  text-transform: none;
}

.error {
  margin: 8px 16px;
  color: #c0392b;
  font-size: 14px;
  text-align: center;
}

.list {
  border-top: 1px solid #d9c27a;
  border-bottom: 1px solid #d9c27a;
}
.row {
  display: flex;
  align-items: flex-end;
  padding: 8px 14px 6px;
  background: #fff3cf;
  border-bottom: 2px solid #fff;
  box-shadow: inset 0 -1px 0 #e6d28d;
}
.cell {
  display: flex;
  flex-direction: column;
}
.rank  { width: 20%; align-items: center; }
.name  { width: 38%; }
.price { width: 42%; }

.label {
  font-size: 12px;
  color: #333;
  line-height: 1.3;
}
.big {
  font-size: 22px;
  color: #111;
  line-height: 1.2;
}
.rank .big { font-size: 22px; }
</style>
