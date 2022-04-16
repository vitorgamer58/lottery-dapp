<template>
  <div>
    <div class="home">
      <h1>Loteria do Vitor!</h1>
      <div class="lottery">
        <div v-if="isLoading">
          <p>Your transaction is being confirmed, please wait!</p>
        </div>
        <div v-if="isConfirmed" class="transaction">
          <p>Your bet has been placed successfully!</p>
          <a :href="`https://testnet.bscscan.com/tx/${transactionData.transactionHash}`" target="_blank"
            >Click here and check your transaction</a
          >
          <p>Hash: {{ transactionData.transactionHash }}</p>
        </div>
        <div class="prize-bet">
          <Prize />
          <Bet />
        </div>
      </div>
    </div>
    <footer>
      <div>
        &copy; Criado por Vitorgamer58 -
        <a href="https://github.com/vitorgamer58/lottery-dapp">Código fonte</a>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Prize from "../components/Prize.vue";
import Bet from "../components/Bet.vue";
export default {
  name: "Home",
  components: { Prize, Bet },
  data() {
    return {
      number: 0,
      balance: 0,
      account: "",
      players: [],
    };
  },
  mounted() {
    this.$store.dispatch("getPlayers");
    this.$store.dispatch("getBalance");
  },
  computed: {
    ...mapGetters([
      "getAccount",
      "isConnected",
      "isLoading",
      "transactionData",
      "isConfirmed",
      "getBalance",
      "getPlayers",
    ]),
  },
  methods: {
    bet() {
      this.$store.dispatch("bet");
    },
  },
};
</script>

<style>
footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #42b883;
  color: azure;
  text-align: center;
}

.players {
  margin-top: 50px;
}

.prize-bet {
  display: flex;
  justify-content: space-between;
}

@media screen and (max-width: 1400px) {
  .prize-bet {
    padding: 0 10px;
  }
}

@media screen and (max-width: 768px) {
  .home {
    padding: 0 20px;
    overflow: auto;
  }

  .players {
    font-size: 10px;
  }

  .prize-bet {
    padding: 0;
    flex-direction: column;
  }
}
</style>