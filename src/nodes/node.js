class Node {
    constructor(blockChainCopy, name) {
        this.name = name;
        this.saahilCoin = 100;
        this.localBlockChain = blockChainCopy;
    }

    receiveTransaction = (data) => this.saahilCoin += data.amount;

    sendTransaction = (data) => this.saahilCoin -= data.amount;

    validateTransaction = (data) => {
        if (this.name === data.sender && this.saahilCoin < data.amount)
            return false;
        return true;
    }
}

export default Node;