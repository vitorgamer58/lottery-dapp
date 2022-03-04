import web3ModalStore from "./web3Modal";
import { getLotteryContract } from "../../utils/contract";

const lotteryStore = {
  state: {
    contract: getLotteryContract(),
    transaction: "",
    confirmed: false,
    loading: false,
    receipt: "",
    players: [],
    winner: "",
  },
  mutations: {
    setContract(state, contract) {
      state.contract = contract;
    },
    setWinner(state, winner) {
      state.winner = winner;
    },
    resetLottery(state) {
      state.confirmed = false;
      state.loading = false;
      state.receipt = "";
      state.transaction = "";
    },
  },
  actions: {
    async bet({ state }) {
      await state.contract.methods
        .enter()
        .send(
          {
            from: web3ModalStore.state.account,
            value: "100000000000000000",
          },
          function (err, transactionHash) {
            if (err) console.log(err, transactionHash);
            state.loading = true;
          }
        )
        .on("confirmation", function (confirmationNumber, receipt) {
          if (confirmationNumber > 0) {
            state.loading = false;
            state.confirmed = true;
            state.receipt = receipt;
            let players = state.players;
            players.push(receipt.from);
            state.players = players;
          }
        });
    },
    async getPlayers({ state }) {
      const players = await state.contract.methods.getPlayers().call();
      state.players = players;
      return players;
    },
    async getBalance({ state }) {
      const balance = await state.contract.methods
        .balanceOf(state.contract._address)
        .call();

      return balance;
    },
    async pickWinner({ state }) {
      await state.contract.methods
        .pickWinner()
        .send(
          {
            from: web3ModalStore.state.account,
          },
          function (err, transactionHash) {
            if (err) console.log(err, transactionHash);
          }
        )
        .on("confirmation", function (confirmationNumber, receipt) {
          console.log(receipt);
          if (confirmationNumber > 0) {
            state.winner = receipt;
          }
        });
    },
  },
  getters: {
    isLoading: (state) => state.loading,
    transactionData: (state) => state.receipt,
    isConfirmed: (state) => state.confirmed,
    getPlayers: (state) => state.players,
    getWinner: (state) => state.winner,
  },
};

export default lotteryStore;
