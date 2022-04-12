import web3ModalStore from "./web3Modal";
import { LotteryContract } from "../../utils/contract";

const lotteryStore = {
  state: {
    contract: LotteryContract().contract,
    transaction: "",
    confirmed: false,
    loading: false,
    receipt: "",
    players: [],
    winner: "",
    balance: 0,
    oneTimeFunction: false,
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
    setBalance(state, balance) {
      state.balance = balance;
    },
    addPlayer(state, player) {
      state.players = [...state.players, player];
    },
    setBetToFalse(state) {
      state.oneTimeFunction = false;
    },
  },
  actions: {
    async bet({ state, commit }) {
      commit("setBetToFalse");
      await state.contract.methods
        .enter()
        .send(
          {
            from: web3ModalStore.state.account,
            value: "100000000000000000",
          },
          function (err, transactionHash) {
            if (err) {
              console.log(err, transactionHash);
              state.loading = false;
            }
            state.loading = true;
          }
        )
        .on("confirmation", function (confirmationNumber, receipt) {
          if (confirmationNumber > 1 && state.oneTimeFunction == false) {
            state.oneTimeFunction = true; // This function must be executed only once.
            state.loading = false;
            state.confirmed = true;
            state.receipt = receipt;
            commit("addPlayer", receipt.from);
            const balance = (Number(state.balance) + 0.1).toFixed(1);
            commit("setBalance", balance);
          }
        });
    },
    async getPlayers({ state }) {
      const players = await state.contract.methods.getPlayers().call();
      state.players = players;
      return players;
    },
    async getBalance({ state, commit }) {
      const contractBalance = await LotteryContract().web3.eth.getBalance(
        state.contract.options.address
      );
      const balance = LotteryContract().web3.utils.fromWei(
        contractBalance,
        "ether"
      );
      commit("setBalance", balance);
    },
    async pickWinner({ state, commit }) {
      commit("setBetToFalse");
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
          if (confirmationNumber > 0 && state.oneTimeFunction == false) {
            commit("setWinner", receipt);

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
    getBalance: (state) => state.balance,
  },
};

export default lotteryStore;
