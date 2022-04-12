<template>
  <div>
    <p v-if="isConnected">{{ getAccount }}</p>
    <div>
      <button v-if="!isConnected" @click="connect">Connect Wallet</button>
      <button v-else @click="disconnect">Disconnect wallet</button>
    </div>
    <div v-if="isConnected">
      <button @click="bet">Bet !</button>
    </div>
    <div v-if="isLoading">
      <p>Your transaction is being confirmed, please wait!</p>
    </div>
    <div v-if="isConfirmed" class="transaction">
      <p>Your bet has been placed successfully!</p>
      <a
        :href="`https://testnet.bscscan.com/tx/${transactionData.transactionHash}`"
        target="_blank"
        >Click here and check your transaction</a
      >
      <p>Hash: {{ transactionData.transactionHash }}</p>
    </div>

    <div v-if="players" class="players">
      Players who have already bet!
      <div v-for="player in getPlayers" :key="player">
        <p>{{ player }}</p>
      </div>
      <div>
        <p>Prize: {{ getBalance }}</p>
      </div>
    </div>

    <web3-modal-vue
      ref="web3modal"
      :theme="theme"
      :provider-options="providerOptions"
      cache-provider
    />
  </div>
</template>

<script>
import Web3ModalVue from "web3modal-vue";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { mapGetters } from "vuex";
export default {
  name: "WalletConnect",
  components: {
    Web3ModalVue,
  },
  data() {
    return {
      theme: "light",
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: "-",
          },
        },
      },
      number: 0,
      balance: 0,
      account: "",
      players: [],
    };
  },
  mounted() {
    this.$nextTick(async () => {
      const web3modal = this.$refs.web3modal;
      this.$store.commit("setWeb3Modal", web3modal);
      if (web3modal.cachedProvider) {
        this.connect();
      }
      this.players = await this.$store.dispatch("getPlayers");
      await this.$store.dispatch("getBalance");
    });
  },
  computed: {
    ...mapGetters([
      "getAccount",
      "isConnected",
      "isLoading",
      "transactionData",
      "isConfirmed",
      "getBalance",
      "getPlayers"
    ]),
  },
  methods: {
    connect() {
      this.$store.dispatch("connect");
    },
    disconnect() {
      this.$store.dispatch("resetApp");
    },
    bet() {
      this.$store.dispatch("bet");
    },
  },
};
</script>

<style>
.players {
  margin-top: 50px;
}
</style>