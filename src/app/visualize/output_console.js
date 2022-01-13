/**
 * @module output_console
 */


import { outputConsole } from "./constants.js";


/**
 * 
 * @param {boolean} isTransfered - the status of the output
 * @param {string} message - The output message 
 */

const addOutputToConsole = (isTransfered, message) => {
    const newOutupt = document.createElement("p");
    const currentTime = new Date().toLocaleString();
    newOutupt.innerText =  "[" + currentTime + "] " + message;
    const textColor = isTransfered? "green": "red";
    newOutupt.style.color = textColor;
    outputConsole.appendChild(newOutupt);
}


export default addOutputToConsole;
