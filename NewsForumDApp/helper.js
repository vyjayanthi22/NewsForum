
const {ABI} = require("./ABI.js");

async function requestAccount() {

  await ethereum.request({ method: "eth_requestAccounts" });
   const accounts = await ethereum.request({ method: "eth_requestAccounts" });
   var account=accounts[0];
//    document.write(account);
console.log(account);
}

async function connectContract(){
    if (typeof ethereum !== "undefined") {
        await requestAccount();
    
        const Address = "0x1DCabB8360c16728f0ce5e41BF58ec5eA1a5bA45";
        window.web3 = await new Web3(window.ethereum);
        window.contract = await new web3.eth.Contract( ABI, Address); 

    }
}


async function populateArticles(){
    await connectContract();
}



async function _submitArticle(title, content){

    if (typeof ethereum !== "undefined") {
        await requestAccount();
    
        const Address = "0x1DCabB8360c16728f0ce5e41BF58ec5eA1a5bA45";
        web3 = await new Web3(ethereum);
        contract = await new web3.eth.Contract( ABI, Address); 
        await contract.methods.addArticle(title, content);
        console.log("waited");
    }
    
} 

async function _getArticles(){
    
    if (typeof ethereum !== "undefined") {
        await requestAccount();
    
        const Address = "0x1DCabB8360c16728f0ce5e41BF58ec5eA1a5bA45";
        web3 = await new Web3(ethereum);
        contract = await new web3.eth.Contract( ABI, Address); 
        const articles = await window.contract.methods.getArticles();
        console.log(articles);
        return articles;
    }
    

}

module.exports={_submitArticle, _getArticles}
