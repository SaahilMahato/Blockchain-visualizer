/**
 * @module new_block
 */


import { blockChain } from "../transaction.js";
import { 
    graph,
    blockInfo,
} from "./dom_elements.js";

import { 
    resetBlockColor,
    showBlockDetails
} from "./block_details.js";


/**
 * Adds a new block to graph in visualization area.
 */
const addBlockToGraph = () => {
    const newBlock = blockChain.blocks[blockChain.blocks.length - 1]; // new block is always at the last of the blockChain

    // create new div for the block
    const newBlockGraph = document.createElement("div");

    // set custom attributes of the div element with properties of the block
    newBlockGraph.setAttribute("previousHash", newBlock.previousHash);
    newBlockGraph.setAttribute("id", newBlock.id);
    newBlockGraph.setAttribute("creationTime", newBlock.currentTime);
    newBlockGraph.setAttribute("sender", newBlock.sender);
    newBlockGraph.setAttribute("receiver", newBlock.receiver);
    newBlockGraph.setAttribute("amount", newBlock.amount + " SaahilCoins");
    newBlockGraph.setAttribute("hash", newBlock.hash);
    newBlockGraph.classList.add("block-graph");

    // set styling of the new block
    newBlockGraph.style.backgroundColor = "yellow";
    newBlockGraph.innerText = newBlock.amount + " SC";


    /**
     * View block details on click.
     */
    newBlockGraph.addEventListener("click", ()=> {
        resetBlockColor();

        // set color of clicked block to red
        newBlockGraph.style.backgroundColor = "red";

        //clear blockInfo content
        blockInfo.textContent = "";

        // create p elements to show each property
        const previousHashParagraph = document.createElement("p");
        const idParagraph = document.createElement("p");
        const creationTimeParagraph = document.createElement("p");
        const senderParagraph = document.createElement("p");
        const receiverParagraph = document.createElement("p");
        const amountParagraph = document.createElement("p");
        const hashParagraph = document.createElement("p");

        // set innerText of each p element
        previousHashParagraph.innerText = "Previous Hash: " + newBlockGraph.getAttribute("previousHash");
        idParagraph.innerText = "ID: " + newBlockGraph.getAttribute("id");
        creationTimeParagraph.innerText = "Created On: " + newBlockGraph.getAttribute("creationTime");
        senderParagraph.innerText = "Sender: " + newBlockGraph.getAttribute("sender");
        receiverParagraph.innerText = "Receiver: " + newBlockGraph.getAttribute("receiver");
        amountParagraph.innerText = "Transaction Amount: " + newBlockGraph.getAttribute("amount");
        hashParagraph.innerText = "Hash: " + newBlockGraph.getAttribute("hash");

        // append all elements to blockInfo
        blockInfo.append(
            previousHashParagraph,
            idParagraph,
            creationTimeParagraph,
            senderParagraph,
            receiverParagraph,
            amountParagraph,
            hashParagraph
        );

        // show the block details 
        showBlockDetails();
    });
    

    // if block is not genesis block add right arrow before it
    if (newBlock.id !== 0) {
        const rightArrowImage = new Image();
        rightArrowImage.src = './images/right-arrow.svg';
        graph.appendChild(rightArrowImage);
    }

    // append block to graph
    graph.appendChild(newBlockGraph);
}


// add genesis block to graph on start. use set timeout because creating genesis block takes time 
setTimeout(addBlockToGraph, 100);


export default addBlockToGraph;
