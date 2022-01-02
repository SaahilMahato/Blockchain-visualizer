class Block {
    constructor (data, id, hash, previousHash) {
        this.sender = data.sender;
        this.receiver = data.receiver;
        this.senderKey = data.senderKey;
        this.receiverKey = data.receiverKey;
        this.amount = data.amount;
        this.currentTime = Date.now();
        this.id = id;

        this.hash = hash;
        this.previousHash = previousHash;
    }
}

export default Block;