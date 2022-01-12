import Block from "./block.js";

class BlockChain {
    constructor() {
        this.blocks = [];
        this.initialize();
        this.difficultyTarget = 4;
        this.reward = 1;
    }

    initialize = async () => {
        const data = {
            sender: 'Genesis',
            receiver: 'Genesis',
            amount: 0.0
        }
        const previousHash = '0';
        const currentTime = new Date();
        const genesisBlockHash = await this.hashData(JSON.stringify(data) + currentTime + previousHash);
        const genesisBlock = new Block(data, currentTime, 0, genesisBlockHash, previousHash);
        this.blocks.push(genesisBlock);
    }

    addBlock = block => this.blocks.push(block);

    updateDifficulty = newValue => this.difficultyTarget = newValue;

    updateReward = newValue => this.reward = newValue;

    createBlock = async (data, nounce) => {
        const previousHash = this.blocks[this.blocks.length - 1].hash;
        const currentTime = new Date();
        const newBlockHash = await this.proofOfWork(data, currentTime, previousHash, nounce);
        const newBlock = new Block(data, currentTime, this.blocks.length, newBlockHash, previousHash);
        return [true, newBlock];
    }

    proofOfWork = async (data, currentTime, previousHash, nounce) => {
        let newBlockHash;
        
        while(true) {
            newBlockHash = await this.hashData(JSON.stringify(data) + currentTime + previousHash + nounce);
            if (newBlockHash.startsWith('0'.repeat(this.difficultyTarget)))
                break;
            ++nounce;
        }
        return newBlockHash;
    }

    hashData = async (data) => {
        const digest = await this.digestData(data);
        return this.digestToHex(digest);
    }

    digestData = async (data) => {
        const dataEncoded = new TextEncoder().encode(data); // encode as utf-8 
        const hashBuffer = await crypto.subtle.digest('SHA-256', dataEncoded); // hash the message
        return hashBuffer;
    }

    digestToHex = (hashBuffer) => {
        const hashArray = Array.from (new Uint8Array(hashBuffer)); // convert buffer to byte array
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // conver bytes to hex string
        return hashHex;
    }
}

export default BlockChain;
