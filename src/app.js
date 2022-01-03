import BlockChain from "./block_chain/block_chain.js";
import { NormalUser, Miner } from "./nodes/users.js";

const blockChain = new BlockChain();
const saahil = new NormalUser(blockChain, "Saahil");
const anakin = new NormalUser(blockChain, "Anakin");
const miner = new Miner(blockChain);

const transferMoney = async (from, to, amount) => {
    const newData = {
        sender: from.name,
        receiver: to.name,
        amount: amount
    }

    const isValid = from.validateTransaction(newData) && to.validateTransaction(newData);

    if (isValid) {
        const isMined = await miner.mine(newData);

        if (isMined) {
            from.sendTransaction(newData);
            to.receiveTransaction(newData);
            return true;
        }
    }
    return false;
}

setInterval(async ()=> {
    let done = await transferMoney(saahil, anakin, 20);
    console.log(blockChain);
    console.log(saahil.saahilCoin);
    console.log(anakin.saahilCoin);
    console.log(miner.saahilCoin);
}, 1000);