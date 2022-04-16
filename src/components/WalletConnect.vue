<template>
  <div>
    <div class="button-wallet">
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
.button-wallet button {
  padding: 0 16px;
  height: 36px;
  border-radius: 16px;
  border: none;
  background-color: rgb(31, 199, 212);
  color: white;
  font-weight: bold;
  opacity: 1;
  font-size: 16px;
  transition: background-color 0.2s ease 0s, opacity 0.2s ease 0s;
  cursor: pointer;
}
</style>