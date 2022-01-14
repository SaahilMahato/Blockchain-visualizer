/**
 * @module BlockChain
 * contains BlockChain class
 */


import Block from "./block.js";


// BlockChain class
class BlockChain {

    // constructor of the class
    constructor() {
        this.blocks = []; // array that stores the blocks
        this.difficultyTarget = 4; // hash of the block needs to start with number of 0s equal to the difficulty target
        this.reward = 1; // amount of SaahilCoins that the miner receives after mining a block
        this.hashAlgorithm = "SHA-256"; // the hashing algorithm used to hash blocks
        this.initialize(); // method that creates the genesis block
    }

    /**
     * Initializes the blockChain by creating new block.
     */
    initialize = async () => {

        // a dummy data that has genesis as sender and receiver and 0 transaction amount
        const data = {
            sender: 'Genesis',
            receiver: 'Genesis',
            amount: 0
        }
        const previousHash = '0'; // previous hash of the block is always 0
        const currentTime = new Date(); // time when genesis block was created
        const genesisBlockHash = await this.hashData(JSON.stringify(data) + currentTime + previousHash); // hash the data
        const genesisBlock = new Block(data, currentTime, 0, genesisBlockHash, previousHash); // create the block
        this.blocks.push(genesisBlock); // add genesis block to the chain
    }

    /**
     * Adds block to the chain.
     * 
     * @param {Block} block - A block object.
     */
    addBlock = block => this.blocks.push(block);

    /**
     * Updates difficulty target of the blockchain.
     * 
     * @param {number} newDifficulty - difficulty target of the proof of work.
     */
    updateDifficulty = newDifficulty => this.difficultyTarget = newDifficulty;

    /**
     * Updates the reward.
     * 
     * @param {number} newReward - reward miner should receive after mining a block.
     */
    updateReward = newReward => this.reward = newReward;

    /**
     * Updates the hash algorithm.
     * 
     * @param {string} newHash - hash Algorithm. can be one of SHA-1, SHA-256, SHA-384, SHA-512.
     */
    updateHash = newHash => this.hashAlgorithm = newHash;

    /**
     * Creates a new block.
     * 
     * @param {object} data - the transaction data that the block will store.
     * @param {number} nounce - the number that is appended to the data to be hashed to create variety during proof of work.
     * 
     * @returns {Block} - Newly created block
     */
    createBlock = async (data, nounce) => {
        const previousHash = this.blocks[this.blocks.length - 1].hash; // the previous hash will always be the hash of the last block in the chain
        const currentTime = new Date();
        const newBlockHash = await this.performProofOfWork(data, currentTime, previousHash, nounce);
        const newBlock = new Block(data, currentTime, this.blocks.length, newBlockHash, previousHash);
        return newBlock;
    }

    /**
     * Performs proof of work on the block.
     * 
     * @param {object} data - the transaction data that the block will store.
     * @param {string} currentTime - the time that proof of work started.
     * @param {string} previousHash - the hash of the previous block.
     * @param {number} nounce - append to data to be hashed hash.
     * 
     * @returns {string} - hash of the new block.
     */
    performProofOfWork = async (data, currentTime, previousHash, nounce) => {
        let newBlockHash;
        
        // keep iterating till valid hash is found
        while(true) {
            newBlockHash = await this.hashData(JSON.stringify(data) + currentTime + previousHash + nounce);

            // if difficulty target is met break loop
            if (newBlockHash.startsWith('0'.repeat(this.difficultyTarget)))
                break;

            nounce++; // increase nounce by one so it results in a new hash in the next iteration
        }

        return newBlockHash;
    }

    /**
     * Hashes the data.
     * 
     * @param {string} dataToHash - data + currentTime + previousHash + nounce.
     * 
     * @returns {string} - The hash of the data in hexadecimal format.
     */
    hashData = async (dataToHash) => {
        const digest = await this.digestData(dataToHash);
        return this.digestToHex(digest);
    }

    /**
     * Sends data to API and receives hash as Array buffer.
     * 
     * @param {string} dataToHash - data + currentTime + previousHash + nounce.
     * 
     * @returns {ArrayBuffer} - array buffer of hash of the data.
     */
    digestData = async (dataToHash) => {
        const dataEncoded = new TextEncoder().encode(dataToHash); // encode as utf-8 
        const hashBuffer = await crypto.subtle.digest(this.hashAlgorithm, dataEncoded); // hash the message using API 
        return hashBuffer;
    }

    /**
     * Converts array buffer to hexadecimal.
     * 
     * @param {ArrayBuffer} hashBuffer - the array buffer received from API.
     * 
     * @returns {string} - hex string of the hash.
     */
    digestToHex = (hashBuffer) => {
        const hashArray = Array.from (new Uint8Array(hashBuffer)); // convert buffer to byte array
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert byte array to hex string
        return hashHex;
    }
}


export default BlockChain;
