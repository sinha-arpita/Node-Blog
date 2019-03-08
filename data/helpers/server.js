const express= require("express");
const server=express();


const UserRouter=require("./UserRouter.js");
const PostRouter=require("./PostRouter.js")

server.use(express.json())


server.use ("/api/users",mm,UserRouter)




server.use("/api/posts",PostRouter)

function mm(req,res,next){
               
    console.log("##########",  req.body.name, "############")
         
    
    if (req.body.name) {
        req.body.name = req.body.name.toUpperCase();
    }
    next()
    
}




module.exports = server;


