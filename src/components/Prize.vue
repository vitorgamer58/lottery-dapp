<template>
  <div class="prize-div">
    <p style="font-size: 24px; margin-bottom: 5px">Prize: {{ getBalance }} BNB</p>
    <p>Number of Players: {{ getPlayers.length }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "prize",
  computed: {
    ...mapGetters(["getPlayers", "getBalance"]),
  },
};
</script>

<style>
.prize-div {
  height: 100px;
  width: 400px;
  background-color: yellow;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  font-size: 18px;
}

@media screen and (max-width: 768px) {
  .prize-div {
    width: 100%;
  }
}
</style>