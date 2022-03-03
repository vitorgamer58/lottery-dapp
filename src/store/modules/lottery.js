import web3ModalStore from "./web3Modal";
import { getLotteryContract } from "../../utils/contract";

const lotteryStore = {
  state: {
    contract: getLotteryContract(),
    transaction: "",
    confirmed: false,
    loading: false,
    receipt: "",
  },
  mutations: {
    setContract(state, contract) {
      state.contract = contract;
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
          }
        });
    },
    async getPlayers({ state }) {
      const players = await state.contract.methods.getPlayers().call();
      console.log(players);
      return players;
    },
  },
  getters: {
    isLoading: (state) => state.loading,
    transactionData: (state) => state.receipt,
    isConfirmed: (state) => state.confirmed,
  },
};

export default lotteryStore;
