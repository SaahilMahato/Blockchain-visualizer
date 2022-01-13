/**
 * @module Block 
 * Block class that is used to create block objects and inserted into blockchain 
 */


// Block class
class Block {

    /**
     * 
     * @param {object} data - object that contains transaction information: sender, receiver, amount
     * @param {string} currentTime - the time when the block was started to be mined
     * @param {number} id - the unique id of the block
     * @param {string} hash - the hash of all data contained in the block
     * @param {string} previousHash - the hash of the previous block in the chain
     */

    constructor (data, currentTime, id, hash, previousHash) {
        this.sender = data.sender;
        this.receiver = data.receiver;
        this.amount = data.amount;
        this.currentTime = currentTime;
        this.id = id;
        this.hash = hash;
        this.previousHash = previousHash;
    }
}


export default Block;
