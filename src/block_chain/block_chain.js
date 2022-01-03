import Block from './block.js';

class BlockChain {
    constructor() {
        this.blocks = [];
        this.initialize();
    }

    initialize = async () => {
        const data = {
            sender: 'genesis',
            receiver: 'genesis',
            senderKey: 'genesis',
            receiverKey: 'genesis',
            amount: 0
        }
        const previousHash = '0';
        const currentTime = Date.now();
        const genesisBlockHash = await this.hashData(JSON.stringify(data) + currentTime + previousHash);
        const genesisBlock = new Block(data, currentTime, 0, genesisBlockHash, previousHash);
        this.blocks.push(genesisBlock);
    }

    createBlock = async (data) => {
        const previousHash = this.blocks[this.blocks.length - 1].hash;
        const currentTime = Date.now();
        let newBlockHash = await this.proofOfWork(data, currentTime, previousHash);
        const newBlock = new Block(data, currentTime, this.blocks.length, newBlockHash, previousHash);
        this.blocks.push(newBlock);
    }

    proofOfWork = async (data, currentTime, previousHash) => {
        let nounce = 0;
        let newBlockHash;
        // simple proof of work that requires new hash to start from 4 0s
        while(true) {
            newBlockHash = await this.hashData(JSON.stringify(data) + currentTime + previousHash + nounce);
            if (newBlockHash.startsWith('00'))
                break;
            nounce += 1;
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

const blockChain = new BlockChain();
console.log(blockChain.blocks);
let data = {
    sender: 'Saahil',
    receiver: 'Anakin',
    senderKey: '1234',
    receiverKey: '5678',
    amount: 1000
}

let data2 = {
    sender: 'Geralt',
    receiver: 'Yennefer',
    senderKey: '123456',
    receiverKey: '56781234',
    amount: 1000
}

setTimeout( () => {
    blockChain.createBlock(data);
    console.log(blockChain.blocks);
}, 1000);

setTimeout( () => {
    blockChain.createBlock(data2);
    console.log(blockChain.blocks);
}, 2000);
