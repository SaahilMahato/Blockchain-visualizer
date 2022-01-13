import { 
    blockChain, 
    users, 
    miners, 
    transferMoney 
} from "../transaction.js";

import { 
    NormalUser,
    Miner
} from "../../nodes/users.js";

import { 
    transactionForm, 
    entitiesForm, 
    settingsForm, 
    senderSelect, 
    receiverSelect,
    outputConsole
} from "./constants.js";

import addOutputToConsole from "./output_console.js";
import addBlockToGraph from "./new_block.js";

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
    const [isTransfered, message] = await transferMoney(sender, receiver, amount, blockChain.reward);
    outputConsole.removeChild(miningMessage);

    addOutputToConsole(isTransfered, message);
    if (isTransfered) addBlockToGraph();
});

entitiesForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get("name").trim();
    const type = data.get("type");
    const key = name.split(' ')[0].toLowerCase();

    if (type === "users")
        users[key] = new NormalUser(blockChain, name);
    else if (type === "miners")
        miners[key] = new Miner(blockChain, name);
    else ;

    populateSelectOptions(senderSelect);
    populateSelectOptions(receiverSelect);

    addOutputToConsole(true, `New user added. Name: ${name}, Type: ${type}`);
});


settingsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const difficulty = parseInt(data.get("difficulty"));
    const reward = parseFloat(data.get("reward"));
    const hash = data.get("hash");

    blockChain.updateDifficulty(difficulty);
    blockChain.updateReward(reward);
    blockChain.updateHash(hash);

    addOutputToConsole(true, `New BlockChain configuration. Difficulty Target: ${difficulty}, Mining reward: ${reward}, Hashing Algorithm: ${hash}`);
});


populateSelectOptions(senderSelect);
populateSelectOptions(receiverSelect);