var express = require('express');
var router = express.Router();

router.get("/Login", async(req,res)=>{
    res.render("../views/Pages/Login")
})


