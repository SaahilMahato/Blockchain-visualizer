/**
 * @module Users
 */


import Entity from "./entity.js";


//Normal user class
class NormalUser extends Entity {

    /**
     * Constructor of the class.
     * 
     * @param {BlockChain} blockChain - block chain of the network
     * @param {*} name - Name of the entity
     */
    constructor(blockChain, name) {
        super(blockChain, name);
    }
}


// Miner class
class Miner extends Entity {

    /**
     * Constructor of the class.
     * 
     * @param {BlockChain} blockChain - block chain of the network
     * @param {*} name - Name of the entity
     */
    constructor(blockChain, name) {
        super(blockChain, name);
    }

    /**
     * Updates (increases) the SaahilCoins of the Miner.
     * 
     * @param {number} reward - amount of SaahilCoins rewarded to the Miner 
     */
    receiveReward = reward => this.saahilCoin += reward;

    /**
     * Mines a transaction.
     *  
     * @param {string} data - transaction data + currentTime + previousHash + nounce. string version of block's data
     * @param {BlockChain} blockChain - blockChain object
     * 
     * @returns {Array<[boolean, Miner, Block]>} - array that contains [mine status, miner, created block]
     */
    mine = async (data, blockChain) => {

        /**
         * Generates a random value between 2 numbers.
         * 
         * @param {number} min - minumber number
         * @param {number} max - maximum number
         * 
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


export { 
    NormalUser, 
    Miner 
};
