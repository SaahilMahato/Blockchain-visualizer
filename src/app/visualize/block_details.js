/**
 * @module block_details
 */


import { 
    workspace,
    blockDetails,
    closeButtonBlockDetails
} from "./dom_elements.js";


/**
 * hides block details when close button is clicked
 * @returns {undefined}
 */

const hideBlockDetails = () => {
    workspace.style.width = "80%";
    blockDetails.style.display = "none";
}


/**
 * shows block details when block is clicked
 * @returns {undefined}
 */

const showBlockDetails = () => {
    workspace.style.width = "60%";
    blockDetails.style.display = "flex";
}


/**
 * resets colors of block to yellow when new block or close button is clicked
 * @returns {undefined}
 */

const resetBlockColor = () => {
    const blockGraphs = document.getElementsByClassName("block-graph");
    for (let i=0; i<blockGraphs.length; i++)
        blockGraphs[i].style.backgroundColor = "yellow";
}

// DOM element close button


/**
 * event listener that resets block color and closes block details when close is clicked
 * @returns {undefined}
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
