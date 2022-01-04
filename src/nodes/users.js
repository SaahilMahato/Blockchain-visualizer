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

        const getRandomInt = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min);
        }

        const nounce = getRandomInt(0, 100);
        const [isMined, block] = await this.localBlockChain.createBlock(data, nounce);
        
        if (isMined) {
            ++this.saahilCoin;
            return [true, this.name, block];
        }
        return false;
    }
}

export { NormalUser, Miner };