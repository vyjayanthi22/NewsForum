$(document).ready(()=>{

  $("#content").on("input", function() {
      let words = $("#content").val().split(" ");
      console.log(words.length)
      if (words.length > 200) {
        words.splice(200);
        $("#content").val(words.join(" "));
      }
  });

  $("#articleSubmit").on("click",async()=>{
    await addArticle();
    $("#ArticleForm").submit();
  });

  $("#SignupButton").on("click", ()=>{

    var username= $("#username").val();
    var password = $("#password").val();
    

    console.log(username, password);

    $.ajax({
      url: "/check-user",
      method:"POST",
      data:{
        username: username 
      }, 
      success: async function(res){
        console.log(res.value);
        if(res.value==true){
          await createUser(username);
          $("#SignupForm").submit();
        }
        else{
          alert("Signup failed !! username exists");
        }
      }

    })
  })

$("#LoginButton").on("click", ()=>{
  var username= $("#username").val();
  var password= $("#password").val()
  ;
  console.log(username, password, "login")
  $.ajax({
    url: "/user-login",
    method:"POST",
    data:{
      username: username,
      password: password
    }, 
    success: function(res){
      console.log(res.value);
      if(res.value==true){
        $("#LoginForm").submit();
      }
      else{
        alert("Login failed !!");
      }
    }

  })

})






});


/////////// blockchain /////////


let account;
const connectMetamask = async () => {
    if(window.ethereum !== "undefined"){
        const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
        account = accounts[0];
        console.log(account);
    }

}


const connectContract = async () => {
  await connectMetamask();
  console.log(ABI);
  const Address = "0xF4Ba63F73CF9Cf76Ce59D71AFF39cB26b470d548";
  window.web3 = await new Web3(window.ethereum);
  window.contract = await new window.web3.eth.Contract(ABI, Address);

}


const addArticle = async()=>{

    if(window.contract==undefined){
      console.log(window.contract);
      await connectContract();
    }

    var title=$("#title").val();
    var content=$("#content").val();

    console.log(title, content);
    await window.contract.methods.submitArticle(title, content).send({from:account});

    var articles = await window.contract.methods.getAllArticles().call();
    console.log(articles); 
}

async function createUser(username){
  await connectContract();
  await window.contract.methods.createNewUser(username, account).send({from:account});

}

async function _validateArticle(id){
  
  console.log(id);
  await connectContract();
  await window.contract.methods.validateArticle(id).send({from:account});
  
}


async function _upvoteArticle(id){
  
  console.log(id);
  await connectContract();
  await window.contract.methods.upvoteArticle(id).send({from:account});
  
}

async function _downvoteArticle(id){
  
  console.log(id);
  await connectContract();
  await window.contract.methods.downvoteArticle(id).send({from:account});
  
}





