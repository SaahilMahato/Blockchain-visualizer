import { 
    workspace,
    blockDetails 
} from "./constants.js";


const hideBlockDetails = () => {
    workspace.style.width = "80%";
    blockDetails.style.display = "none";
}

const showBlockDetails = () => {
    workspace.style.width = "60%";
    blockDetails.style.display = "flex";
}

const resetBlockColor = () => {
    const blockGraphs = document.getElementsByClassName("block-graph");
    for (let i=0; i<blockGraphs.length; i++)
        blockGraphs[i].style.backgroundColor = "yellow";
}

const closeButtonBlockDetails = document.querySelector("#close-button-block-details");
closeButtonBlockDetails.addEventListener("click", () => {
    resetBlockColor();
    hideBlockDetails();
});

export {
    hideBlockDetails,
    showBlockDetails,
    resetBlockColor
}