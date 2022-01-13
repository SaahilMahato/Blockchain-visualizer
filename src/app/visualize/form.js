/**
 * @module form
 */


import { 
    blockChain, 
    users, 
    miners, 
    transferMoney 
} from "../transaction.js";

import { 
    NormalUser,
    Miner
} from "../../entities/users.js";

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


/**
 * populates the select element of transaction form with all entities
 * @param {HTMLSelectElement} select - the select element of transaction form
 */

const populateSelectOptions = (select) => {
    
    /**
     * populate select with a certain group (miner or users)
     * @returns {undefined}
     */

    const populateGroup = (group) => {
        for (const user in group) {
            const newOption = document.createElement("option");
            newOption.value = user;
            newOption.innerText = group[user].name;
            select.appendChild(newOption);
        }
    }

    select.textContent = ''; // clear select before populating

    populateGroup(users); // populate with users
    populateGroup(miners); // populate with miners
}


/**
 * creates new transaction on submit
 * @returns {undefined} 
 */

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


/**
 * creates new entity on submit
 * @returns {undefined}
 */

entitiesForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get("name").trim();
    const type = data.get("type");
    const key = name.split(' ')[0].toLowerCase();

    // creates new entity based on type
    if (type === "users")
        users[key] = new NormalUser(blockChain, name);
    else if (type === "miners")
        miners[key] = new Miner(blockChain, name);
    else ;

    // populate select again after entity creation
    populateSelectOptions(senderSelect);
    populateSelectOptions(receiverSelect);

    addOutputToConsole(true, `New user added. Name: ${name}, Type: ${type}`);
});


/**
 * adjusts blockChain settings on submit
 * @returns {undefined}
 */

settingsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const difficulty = parseInt(data.get("difficulty"));
    const reward = parseFloat(data.get("reward"));
    const hash = data.get("hash");

    // update blockChain settings
    blockChain.updateDifficulty(difficulty);
    blockChain.updateReward(reward);
    blockChain.updateHash(hash);

    addOutputToConsole(true, `New BlockChain configuration. Difficulty Target: ${difficulty}, Mining reward: ${reward}, Hashing Algorithm: ${hash}`);
});

// populate select at the start of program
populateSelectOptions(senderSelect);
populateSelectOptions(receiverSelect);