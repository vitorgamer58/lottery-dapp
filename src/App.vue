<template>
  <div id="app">
    <div id="nav">
      <div class="nav-itens">
        <div class="title">
          <h1>Lottery dApp</h1>
          <span>TESTNET</span>
        </div>

        <div>
          <WalletConnect />
        </div>
      </div>
    </div>
    <div style="max-width: 1200px; margin: 0 auto"><router-view /></div>
  </div>
</template>

<script>
import WalletConnect from "../src/components/WalletConnect.vue";
export default {
  components: {
    WalletConnect,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
}

body {
  margin: 0;
  height: 100vh;
  background-color: rgba(205, 205, 240, 0.402);
}

#nav {
  background-color: white;
}

.nav-itens {
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  font-size: 26px;
  margin: 0;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.title {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title span {
  background-color: red;
  color: white;
  font-weight: bold;
  border-radius: 10px;
  width: 90px;
}

@media screen and (max-width: 768px) {
  .nav-itens {
    padding: 5px 20px;
  }
}
</style>
