import Node from "./node.js";

class NormalUser extends Node {
    constructor(blockChainCopy, name) {
        super(blockChainCopy, name);
    }
}

class Miner extends Node {
    constructor(blockChainCopy, name) {
        super(blockChainCopy, name);
    }

    mine = async (data) => {
        const isMined = await this.localBlockChain.createBlock(data);
        if (isMined) {
            ++this.saahilCoin;
            return true;
        }
        return false;
    }
}

export { NormalUser, Miner };