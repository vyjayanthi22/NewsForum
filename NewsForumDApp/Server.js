const express = require('express');
const ejs = require('ejs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const request=require("request");




const {User} = require("./models/users.js");
const {Article} = require("./models/articles.js");
const {_submitArticle,_getArticles}= require("./helper.js");

console.log(_submitArticle);

const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://admin:1234@cluster0.ojoqpcq.mongodb.net/?retryWrites=true&w=majority")
var db=mongoose.connection;
db.once('open',()=>{
    console.log("Connected to Database");
})

app.get('/', (req, res) => {
    res.render('./Pages/home', { title: 'Home Page', login: false });
});

app.post("/ArticleForm", (req, res)=>{
    console.log(req.body);
    _submitArticle(req.body.title, req.body.content).then(()=>{
        var articles = _getArticles().then((result)=>{
            console.log(result);
        })
       
    });
})

app.get("/Login", (req,res)=>{
    res.render("./Pages/Login", {msg:""});
})

app.get("/Signup", (req, res)=>{
    
    res.render("./Pages/Signup")
})

app.post("/LoginRequest", async(req,res)=>{

    // var username = req.query.username;
    console.log(req.query,"came inside ");
    var password = req.body.password;
    var type = req.body.type;

    if(type=="login"){
        
        //if username in database
        var users= await User.find({username: req.body.username}).exec();
        
        console.log(users);

        res.render("./Pages/home",  { title: req.body.username, login: true, user:users[0] });
        //else

    }
    else if (type=="Signup"){
        res.render("./Pages/Signup" );
    }

    
})
app.post("/writeArticle",(req,res)=>{
    console.log(req.body);
    res.render("./Pages/write", {userId: req.body._id});
})
app.post("/SignupRequest", (req,res)=>{
    console.log(req.body);
    const user= new User({
        username:req.body.username,
        password:req.body.password
    });
    user.save();
    res.render("./Pages/home",{ title: req.body.username, login: true, user:user })
})


app.get("/UserProfile/:id", (req,res)=>{
    console.log(req.query);
})
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
  
  