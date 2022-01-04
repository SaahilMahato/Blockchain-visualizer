import { blockChain, users, miners, transferMoney } from "./app.js";

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

    newBlockGraph.style.width = "100px";
    newBlockGraph.style.height = "100px";
    newBlockGraph.style.backgroundColor = newBlock.id !== 0? "red": "yellow";
    newBlockGraph.style.fontSize = "48px";
    newBlockGraph.style.margin = "10px";
    newBlockGraph.style.cursor = 'pointer';
    newBlockGraph.style.padding = '1% 0';
    newBlockGraph.style.textAlign = 'center';
    newBlockGraph.innerText = newBlock.id;

    newBlockGraph.addEventListener("click", ()=> {
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

    graph.appendChild(newBlockGraph);
}

setTimeout(() => {
    addBlockToGraph();
}, 0);


const populateSelectOptions = (select) => {
    for (const user in users) {
        const newOption = document.createElement("option");
        newOption.value = user;
        newOption.innerText = user.charAt(0).toUpperCase() + user.slice(1);
        select.appendChild(newOption);
    }

    for (const miner in miners) {
        const newOption = document.createElement("option");
        newOption.value = miner;
        newOption.innerText = miner.charAt(0).toUpperCase() + miner.slice(1);
        select.appendChild(newOption);
    }
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
    const [isTransfered, message] = await transferMoney(sender, receiver, amount);
    addOutputToConsole(isTransfered, message);
    if (isTransfered) addBlockToGraph();
});

