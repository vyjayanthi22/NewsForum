

// const ABI = require("./ABI.js");

function checkLogin(){
    
}

var loginmsg=$("#loginmssg").val();
if(loginmsg){
    alert(loginmsg);
    $("#loginmssg").val("");
}


// loginval= $("#Login").val();
// console.log($("#Login").val());

$("#content").on("input", function() {
    let words = $("#content").val().split(" ");
    console.log(words.length)
    if (words.length > 200) {
      words.splice(200);
      $("#content").val(words.join(" "));
    }
});


  //0xa7203224d624d2552216ecb34e8ed1578d07ffdf


//populateArticles();