import { blockChain, users, transferMoney } from "./app.js";

const transactionForm = document.querySelector(".transaction-form");
transactionForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const sender = users[data.get("sender")];
    const receiver = users[data.get("receiver")];
    const amount = parseInt(data.get("amount"));
    const isTransfered = await transferMoney(sender, receiver, amount);

    console.log(blockChain);
    console.log(sender.saahilCoin);
    console.log(receiver.saahilCoin);
    console.log(users["miner"].saahilCoin);
});