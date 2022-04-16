<template>
  <div id="app">
    <div id="nav">
      <div class="nav-itens">
        <h1>Lottery dApp</h1>
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
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

@media screen and (max-width: 768px) {
  #nav {
    padding: 5px 20px;
  }
}
</style>
