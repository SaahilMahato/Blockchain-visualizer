import { blockChain, users, miners, config, transferMoney } from "./app.js";
import { Miner, NormalUser } from "./nodes/users.js";

const graph = document.querySelector(".graph");
const senderSelect = document.querySelector("#sender");
const receiverSelect = document.querySelector("#receiver");
const outputConsole = document.querySelector(".output-console");
const blockInfo = document.querySelector(".block-info");

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
        showBlockDetails();
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
    });
    
    if (newBlock.id !== 0) {
        const rightArrowImage = new Image();
        rightArrowImage.src = './images/right-arrow.svg';
        graph.appendChild(rightArrowImage);
    }
    graph.appendChild(newBlockGraph);
}

setTimeout(() => {
    addBlockToGraph();
}, 0);


const populateSelectOptions = (select) => {
    
    const populateGroup = (group) => {
        for (const user in group) {
            const newOption = document.createElement("option");
            newOption.value = user;
            newOption.innerText = group[user].name;
            select.appendChild(newOption);
        }
    }

    select.textContent = '';

    populateGroup(users);
    populateGroup(miners);
}

populateSelectOptions(senderSelect);
populateSelectOptions(receiverSelect);


const addOutputToConsole = (isTransfered, message) => {
    const newOutupt = document.createElement("p");
    const currentTime = new Date().toLocaleString();
    newOutupt.innerText =  "[" + currentTime + "] " + message;
    const textColor = isTransfered? "green": "red";
    newOutupt.style.color = textColor;
    outputConsole.appendChild(newOutupt);
}

const transactionForm = document.querySelector(".transaction-form");
transactionForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const sender = users[data.get("sender")] || miners[data.get("sender")];
    const receiver = users[data.get("receiver")] || miners[data.get("receiver")];
    const amount = parseFloat(data.get("amount"));

    const miningMessage = document.createElement('p');
    miningMessage.innerText = "Miners are mining ...";
    miningMessage.style.color = "blue";
    outputConsole.appendChild(miningMessage);
    const [isTransfered, message] = await transferMoney(sender, receiver, amount, config["reward"]);
    outputConsole.removeChild(miningMessage);

    addOutputToConsole(isTransfered, message);
    if (isTransfered) 
        setTimeout(addBlockToGraph, 100);
});

const entitiesForm = document.querySelector(".entities-form");
entitiesForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get("name");
    const type = data.get("type");
    const key = name.split(' ')[0].toLowerCase();

    if (type === "users")
        users[key] = new NormalUser(blockChain, name);
    else if (type === "miners")
        miners[key] = new Miner(blockChain, name);
    else ;

    populateSelectOptions(senderSelect);
    populateSelectOptions(receiverSelect);
});

const settingsForm = document.querySelector(".settings-form");
settingsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    blockChain.difficultyTarget = parseInt(data.get("difficulty"));
    config["reward"] = parseInt(data.get("reward"));
});

// block details view

const workspace = document.querySelector(".workspace");
const blockDetails = document.querySelector(".block-details");

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