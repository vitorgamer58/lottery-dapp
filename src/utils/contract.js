import Web3 from "web3";
import lotteryABI from "../config/abi/Lottery.json";

const CONTRACT_ADDRESS = "0xE155d696756ce133b592793bB5d5A4264337AB39";

export const LotteryContract = () => {
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(lotteryABI.abi, CONTRACT_ADDRESS);

  return { contract, web3 };
};
