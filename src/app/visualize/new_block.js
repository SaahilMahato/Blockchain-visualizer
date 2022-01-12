import { blockChain } from "../transaction.js";
import { 
    graph,
    blockInfo,
} from "./constants.js";

import { 
    resetBlockColor,
    showBlockDetails
} from "./block_details.js";

const addBlockToGraph = () => {
    const newBlock = blockChain.blocks[blockChain.blocks.length - 1];

    const newBlockGraph = document.createElement("div");
    newBlockGraph.setAttribute("previousHash", newBlock.previousHash);
    newBlockGraph.setAttribute("id", newBlock.id);
    newBlockGraph.setAttribute("creationTime", newBlock.currentTime);
    newBlockGraph.setAttribute("sender", newBlock.sender);
    newBlockGraph.setAttribute("receiver", newBlock.receiver);
    newBlockGraph.setAttribute("amount", newBlock.amount + " SaahilCoins");
    newBlockGraph.setAttribute("hash", newBlock.hash);
    newBlockGraph.classList.add("block-graph");

    newBlockGraph.style.backgroundColor = "yellow";
    newBlockGraph.innerText = newBlock.amount + " SC";

    newBlockGraph.addEventListener("click", ()=> {
        resetBlockColor();
        newBlockGraph.style.backgroundColor = "red";
        blockInfo.textContent = "";
        const previousHashParagraph = document.createElement("p");
        const idParagraph = document.createElement("p");
        const creationTimeParagraph = document.createElement("p");
        const senderParagraph = document.createElement("p");
        const receiverParagraph = document.createElement("p");
        const amountParagraph = document.createElement("p");
        const hashParagraph = document.createElement("p");

        previousHashParagraph.innerText = "Previous Hash: " + newBlockGraph.getAttribute("previousHash");
        idParagraph.innerText = "ID: " + newBlockGraph.getAttribute("id");
        creationTimeParagraph.innerText = "Created On: " + newBlockGraph.getAttribute("creationTime");
        senderParagraph.innerText = "Sender: " + newBlockGraph.getAttribute("sender");
        receiverParagraph.innerText = "Receiver: " + newBlockGraph.getAttribute("receiver");
        amountParagraph.innerText = "Transaction Amount: " + newBlockGraph.getAttribute("amount");
        hashParagraph.innerText = "Hash: " + newBlockGraph.getAttribute("hash");

        blockInfo.append(
            previousHashParagraph,
            idParagraph,
            creationTimeParagraph,
            senderParagraph,
            receiverParagraph,
            amountParagraph,
            hashParagraph
        );
        showBlockDetails();
    });
    
    if (newBlock.id !== 0) {
        const rightArrowImage = new Image();
        rightArrowImage.src = './images/right-arrow.svg';
        graph.appendChild(rightArrowImage);
    }
    graph.appendChild(newBlockGraph);
}

setTimeout(addBlockToGraph, 100);

export default addBlockToGraph;