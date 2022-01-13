/**
 * @module Users
 */


import Node from "./node.js";


//Normal user class
class NormalUser extends Node {

    /**
     * constructor of the class
     * @param {BlockChain} blockChain - block chain of the network
     * @param {*} name - Name of the node
     */

    constructor(blockChain, name) {
        super(blockChain, name);
    }
}


// Miner class
class Miner extends Node {

    /**
     * constructor of the class
     * @param {BlockChain} blockChain - block chain of the network
     * @param {*} name - Name of the node
     */

    constructor(blockChain, name) {
        super(blockChain, name);
    }

    /**
     * updates (increases) the SaahilCoins of the Miner
     * @param {number} reward - amount of SaahilCoins rewarded to the Miner 
     * @returns {undefined}
     */

    receiveReward = reward => this.saahilCoin += reward;

    /**
     * mines a transaction 
     * @param {string} data - transaction data + currentTime + previousHash + nounce. string version of block's data
     * @returns {Array} - array that contains [mine status, miner, created block]
     */

    mine = async (data, blockChain) => {

        /**
         * generates a random value between 2 numbers
         * @param {number} min - minumber number
         * @param {number} max - maximum number
         * @returns {number} - the generated number
         */

        const getRandomInt = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min);
        }

        const nounce = getRandomInt(0, 100); // select a starting nounce between 0 and 100 inclusive
        const block = await blockChain.createBlock(data, nounce);
        
        // if block is created return true status 
        if (block)
            return [true, this, block];

        return [false, this, undefined];
    }
}


export { NormalUser, Miner };
