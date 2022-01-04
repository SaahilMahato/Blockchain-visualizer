class Node {
    constructor(blockChainCopy, name) {
        this.name = name;
        this.saahilCoin = 100.0;
        this.localBlockChain = blockChainCopy;
    }

    receiveTransaction = (data) => this.saahilCoin += data.amount;

    sendTransaction = (data) => this.saahilCoin -= data.amount;
}

export default Node;