import BlockChain from "./block_chain/block_chain.js";
import { NormalUser, Miner } from "./nodes/users.js";

const blockChain = new BlockChain();
const users = {
    "saahil": new NormalUser(blockChain, "Saahil Mahato"),
    "anakin": new NormalUser(blockChain, "Anakin Skywalker"),
    "yoda": new NormalUser(blockChain, "Yoda"),
    "hansolo": new NormalUser(blockChain, "Han Solo"),
    "obiwan": new NormalUser(blockChain, "Obi-wan Kenobi"),
    "quigon": new NormalUser(blockChain, "Qui-Gon Ginn"),
};

const miners = {
    "geralt": new Miner(blockChain, "Geralt"),
    "yennefer": new Miner(blockChain, "Yennefer"),
    "vesimir": new Miner(blockChain, "Vesimir")
}

const validateTransaction = (from, to, amount) => {

    if (!amount)
        return [false, "Transaction does not involve SaahilCoin."]

    if (from.name === to.name)
        return [false, "Invalid transaction entities."];

    if (from.saahilCoin < amount)
        return [false, "Sender doesn't have enough SaahilCoins."];

    return [true, "Valid transaction. New Block added to chain."];
}

const transferMoney = async (from, to, amount) => {
    const newData = {
        sender: from.name,
        receiver: to.name,
        amount: amount
    }

    const [isValid, message] = validateTransaction(from, to, amount);

    if (isValid) {

        const promiseArray = [];

        for (const miner in miners) {
            const promise = new Promise(async (resolve, reject) => {
                const [status, minerName, block] = await miners[miner].mine(newData);
                if (status)
                    resolve([status, minerName, block]);
                else
                    resolve([status, minerName, block]);
            });
            promiseArray.push(promise);
        }
        
        const [isMined, minerName, block] = await Promise.race(promiseArray);

        if (isMined) {
            blockChain.blocks.push(block);
            from.sendTransaction(newData);
            to.receiveTransaction(newData);
            const minerMessage = message + " Mined by " + minerName + ".";
            return [true, minerMessage];
        }
    }
    return [isValid, message];
}

export { blockChain, users, miners, transferMoney };