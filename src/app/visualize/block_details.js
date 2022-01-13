/**
 * @module block_details
 */


import { 
    workspace,
    blockDetails,
    closeButtonBlockDetails
} from "./dom_elements.js";


/**
 * Hides block details when close button is clicked.
 */
const hideBlockDetails = () => {
    workspace.style.width = "80%";
    blockDetails.style.display = "none";
}


/**
 * Shows block details when block is clicked.
 */
const showBlockDetails = () => {
    workspace.style.width = "60%";
    blockDetails.style.display = "flex";
}


/**
 * Resets colors of block to yellow when new block or close button is clicked.
 */
const resetBlockColor = () => {
    const blockGraphs = document.getElementsByClassName("block-graph");
    for (let i=0; i<blockGraphs.length; i++)
        blockGraphs[i].style.backgroundColor = "yellow";
}

/**
 * Event listener that resets block color and closes block details when close is clicked.
 */
closeButtonBlockDetails.addEventListener("click", () => {
    resetBlockColor();
    hideBlockDetails();
});


export {
    hideBlockDetails,
    showBlockDetails,
    resetBlockColor
}
