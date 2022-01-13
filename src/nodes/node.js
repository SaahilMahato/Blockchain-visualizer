/**
 * @module Node
 */

// Node class
class Node {

    /**
     * constructor of the class
     * @param {BlockChain} blockChain - block chain of the network
     * @param {string} name - name of the node
     */

    constructor(blockChain, name) {
        this.name = name;
        this.saahilCoin = 100.0; // each node has 100 SaahilCoins by default
        // dont create reference but create new instance of the object
        this.localBlockChain = Object.assign(Object.create(Object.getPrototypeOf(blockChain)), blockChain) 
    }

    /**
     * increases SaahilCoin on receiving
     * @param {object} data - transaction data 
     * @returns {undefined}
     */

    receiveTransaction = data => this.saahilCoin += data.amount;

    /**
     * decreases SaahilCoin on send
     * @param {object} data - transaction data 
     * @returns {undefined}
     */

    sendTransaction = data => this.saahilCoin -= data.amount;

    /**
     * updates local block chain
     * @param {BlockChain} newBlockChain - blockChain of the network
     * @returns {undefined}
     */

    updateBlockChain = newBlockChain => this.localBlockChain = Object.assign(Object.create(Object.getPrototypeOf(newBlockChain)), newBlockChain);
}


export default Node;
