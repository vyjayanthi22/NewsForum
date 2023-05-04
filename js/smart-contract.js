const Web3 = require('web3');
const web3= new Web3('HTTP://127.0.0.1:7545');
let {ABI} = require("./ABI");
const Address = "0xF4Ba63F73CF9Cf76Ce59D71AFF39cB26b470d548";

           
const ArticleContract = new web3.eth.Contract(ABI, Address);

async function _getValidatedArticles(){
    const a= await ArticleContract.methods.getAllPublishedArticles().call();
	return a;
}
async function _getSubmittedArticles(){
    return await ArticleContract.methods.getAllSubmittedArticles().call();
}

async function _getAllUsers(){
    return await ArticleContract.methods.getAllUsers().call();
}

async function _getAllArticles(){
    return await ArticleContract.methods.getAllArticles().call();
}


async function _getMySubmittedArticles(){
    const b= await ArticleContract.methods.getMySubmittedArticles().call();
    console.log("art", b);
    return b;
}

module.exports={Web3, _getValidatedArticles, _getAllUsers, _getAllArticles, _getSubmittedArticles, _getMySubmittedArticles };