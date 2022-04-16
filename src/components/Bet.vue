<template>
  <div class="bet">
    <div v-if="isConnected">
      <p>Bet Amount: 0.1 BNB</p>
      <button @click="bet" class="bet-button">Bet !</button>
    </div>
    <div v-else>
      <div class="bet-error">
        <span>You need to connect your wallet</span>
      </div>
      <p>Bet Amount: 0.1 BNB</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Bet",
  methods: {
    bet() {
      this.$store.dispatch("bet");
    },
  },
  computed: {
    ...mapGetters(["isConnected"]),
  },
};
</script>

<style>
.bet {
  height: 100px;
  width: 400px;
  background: #eff4ff;
  border-radius: 25px;
  font-size: 18px;
}

.bet-error {
  background: linear-gradient(317deg, #ff4d4d, #ff1e7c 96.35%);
  width: 100%;
}

.bet-error {
  font-weight: 400;
  font-size: 18px;
  color: #fff;
  padding-left: 0px;
  width: 100%;
  border-radius: 18px 18px 0 0;
}

.bet-button {
  cursor: pointer;
  border-radius: 16px;
  font-size: 16px;
  font-weight: bold;
  opacity: 1;
  background-color: transparent;
  border: 2px solid rgb(31, 199, 212);
  box-shadow: none;
  color: rgb(31, 199, 212);
  padding: 0 21px;
}

@media screen and (max-width: 768px) {
  .bet {
    width: 100%;
    margin-top: 25px;
  }
}
</style>