import { outputConsole } from "./constants.js";

const addOutputToConsole = (isTransfered, message) => {
    const newOutupt = document.createElement("p");
    const currentTime = new Date().toLocaleString();
    newOutupt.innerText =  "[" + currentTime + "] " + message;
    const textColor = isTransfered? "green": "red";
    newOutupt.style.color = textColor;
    outputConsole.appendChild(newOutupt);
}

export default addOutputToConsole;