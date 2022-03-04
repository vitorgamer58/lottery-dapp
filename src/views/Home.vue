<template>
  <div class="home">
    <h1>Loteria do Vitor!</h1>
    <WalletConnect />
  </div>
</template>

<script>
import WalletConnect from "../components/WalletConnect.vue";
export default {
  name: "Home",
  components: {
    WalletConnect,
  },
};
</script>
