<template>
  <div class="about">
    <h1>Pagina de Administração!</h1>
    <div>
      <p v-if="getPlayers.length > 0">Prêmio: {{ 0.01 * getPlayers.length }} BNB</p>
      <p>Jogadores: {{ getPlayers.length || 0 }}</p>
    </div>
    <div>
      <button @click="pickWinner">Realizar sorteio</button>
      <a v-if="getWinner" :href="`https://testnet.bscscan.com/tx/${getWinner.transactionHash}`">Clique aqui</a> e verifique o sagnhador
      <p v-if="getWinner">O ganhador é {{ getWinner.to }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Admin",
  data() {
    return {
      players: [],
      prize: 0,
    };
  },
  computed: {
    ...mapGetters(["getPlayers", "getWinner"]),
  },
  methods: {
    async pickWinner() {
      await this.$store.dispatch("pickWinner");
    },
  },
  async created() {
    if (this.players.length === 0)
      this.players = this.$store.dispatch("getPlayers");
  },
};
</script>
