<template>
  <div>
    <div>
      <button v-if="!isConnected" @click="connect">Connect Wallet</button>
      <button v-else @click="disconnect">Disconnect wallet</button>
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
    };
  },
  mounted() {
    this.$nextTick(async () => {
      const web3modal = this.$refs.web3modal;
      this.$store.commit("setWeb3Modal", web3modal);
      if (web3modal.cachedProvider) {
        this.connect();
      }
    });
  },
  computed: {
    ...mapGetters(["getAccount", "isConnected"]),
  },
  methods: {
    connect() {
      this.$store.dispatch("connect");
    },
    disconnect() {
      this.$store.dispatch("resetApp");
    },
  },
};
</script>

<style>
</style>