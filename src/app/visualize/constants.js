/**
 * @module constants
 */

// div DOM elements
const graph = document.querySelector(".graph");
const outputConsole = document.querySelector(".output-console");
const workspace = document.querySelector(".workspace");
const blockDetails = document.querySelector(".block-details");
const blockInfo = document.querySelector(".block-info");

// select DOM elements
const senderSelect = document.querySelector("#sender");
const receiverSelect = document.querySelector("#receiver");

// form DOM elements
const transactionForm = document.querySelector(".transaction-form");
const entitiesForm = document.querySelector(".entities-form");
const settingsForm = document.querySelector(".settings-form");

// Close button of block details
const closeButtonBlockDetails = document.querySelector("#close-button-block-details");


export {
    graph,
    outputConsole,
    workspace,
    blockDetails,
    blockInfo,
    senderSelect,
    receiverSelect,
    transactionForm,
    entitiesForm,
    settingsForm,
    closeButtonBlockDetails
};
