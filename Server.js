const express = require('express');
const ejs = require('ejs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const request=require("request");
const {_Web3, _getValidatedArticles, _getAllUsers, _getAllArticles, _getSubmittedArticles, _getMySubmittedArticles}=require('./public/js/smart-contract');

const {User} = require("./models/users.js");
const {Article} = require("./models/articles.js");

const args = process.argv.slice(2);
const port = args[0] || 3000;

const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));

let userLogined=false;
let USER;


app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://admin:1234@cluster0.ojoqpcq.mongodb.net/?retryWrites=true&w=majority")
var db=mongoose.connection;
db.once('open',()=>{
    console.log("Connected to Database");
})


app.get('/', async (req, res) => {
    var _articles=await _getValidatedArticles();
    var _users = await _getAllUsers();
    var _all_articles=await _getAllArticles();
    // console.log("users", _users);
    // console.log(_articles,"articles");
    // console.log(_all_articles, "all_articles");
    

    if(userLogined){
        console.log("user logined", USER);
        var _users = await _getAllUsers();
        console.log("all_users",_users);
        _users.forEach((u)=>{
            if(u.username==USER.username){
                res.render('./Pages/home', { title: 'Home Page', login: userLogined, user:u, articles: _articles });
            }
        })
    }
    else{
        res.render('./Pages/home', { title: 'Home Page', login: userLogined, articles: _articles });
    }
   
});

app.post("/ArticleForm", (req, res)=>{
    console.log(req.body);
    //add the article to users database

})

app.get("/Login", (req,res)=>{

    res.render("./Pages/Login");
})

app.get("/Signup", (req, res)=>{
    
    res.render("./Pages/Signup")
})

app.post("/LoginRequest", async(req,res)=>{
    
    var users= await User.find({username: req.body.username}).exec();
    var _articles  = await _getValidatedArticles();
    userLogined=true;
    USER=users[0];
    console.log("USER in login request", USER);
   
    var _users = await _getAllUsers();
    console.log("all_users",_users);
    _users.forEach((u)=>{
        if(u.username==USER.username){
            res.render('./Pages/home', { title: 'Home Page', login: userLogined, user:u, articles: _articles });
        }
    })
    
    
    
})
app.post("/writeArticle",(req,res)=>{
    console.log(req.body);
    res.render("./Pages/write");
})

app.post("/check-user", async(req,res)=>{
    
    var users= await User.find({username: req.body.username}).exec();
    if(users.length==0){
        console.log("true");
        res.json({value:true});
    }
    else{
        res.json({value:false});
    }

})

app.post("/user-login", async(req,res)=>{

    console.log(req.body.username);
    var users= await User.find({username: req.body.username, password:req.body.password}).exec();
    if(users.length!=0){
        res.json({value:true});
    }
    else{
        res.json({value:false});
    }


})
app.get("/ToValidate", async(req, res)=>{
    if(userLogined){
        var _users = await _getAllUsers();
        // console.log("all_users",_users);
        _users.forEach(async(u)=>{
            if(u.username==USER.username){
                var _articles= await _getSubmittedArticles();
                console.log(_articles);
                res.render("./Pages/home",{login: true, user:u, articles: _articles })
            }
        })
        
        
    }
})
app.post("/SignupRequest", async(req,res)=>{
    console.log(req.body,"signup");
    var _articles= await _getValidatedArticles();
    const user= new User({
        username:req.body.username,
        password:req.body.password,
        email:req.body.email
    });
    user.save();
    userLogined=true;
    USER=user;
    var _users = await _getAllUsers();
        // console.log("all_users",_users);
    _users.forEach(async(u)=>{
        if(u.username==USER.username){
            var _articles= await _getSubmittedArticles();
            res.render("./Pages/home",{login: true, user:u, articles: _articles })
        }
    })
    
})


app.get("/user-profile/:username", async(req,res)=>{
    console.log("came inside userprofile", req.params)
    var users= await User.find({username: req.params.username}).exec();
    user1=users[0];
    var found=0;
    var _users = await _getAllUsers();
        // console.log("all_users",_users);
    _users.forEach(async(u)=>{
        if(u.username==user1.username){
            found=1
            var _mysubarticles = await _getMySubmittedArticles();
            console.log(_mysubarticles);
            // , myarticles:_myarticles, pubarticles:_pubarticles
            res.render("./Pages/UserProfile", {user:u, mysubarticles:_mysubarticles});
        }
    })

    if(!found){
        res.send("No user Found with the username");
    }
    
})


app.listen(port, () => {
    console.log('Server started on port', port);
});
  

