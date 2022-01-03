import BlockChain from "./block_chain/block_chain.js";
import { NormalUser, Miner } from "./nodes/users.js";

const blockChain = new BlockChain();
const users = {
    "saahil": new NormalUser(blockChain, "Saahil"),
    "anakin": new NormalUser(blockChain, "Anakin"),
    "miner": new Miner(blockChain)
};

const transferMoney = async (from, to, amount) => {
    const newData = {
        sender: from.name,
        receiver: to.name,
        amount: amount
    }

    const isValid = from.validateTransaction(newData) && to.validateTransaction(newData);

    if (isValid) {
        const isMined = await users["miner"].mine(newData);

        if (isMined) {
            from.sendTransaction(newData);
            to.receiveTransaction(newData);
            return true;
        }
    }
    return false;
}

export { blockChain, users, transferMoney };