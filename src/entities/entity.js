/**
 * @module Entity
 */


// Node class
class Entity {

    /**
     * Constructor of the class.
     * 
     * @param {BlockChain} blockChain - block chain of the network
     * @param {string} name - name of the node
     */
    constructor(blockChain, name) {
        this.name = name;
        this.saahilCoin = 100.0; // each node has 100 SaahilCoins by default
        // dont create reference but create new instance of the object
        this.localBlockChain = [...blockChain.blocks];
    }

    /**
     * Increases SaahilCoin on receive.
     * 
     * @param {object} data - transaction data
     */
    receiveTransaction = data => this.saahilCoin += data.amount;

    /**
     * Decreases SaahilCoin on send.
     * 
     * @param {object} data - transaction data 
     */
    sendTransaction = data => this.saahilCoin -= data.amount;

    /**
     * Updates local block chain.
     * 
     * @param {BlockChain} newBlockChain - block chain of the network
     */
    updateBlockChain = newBlockChain => this.localBlockChain = [...newBlockChain.blocks];
}


export default Entity;
