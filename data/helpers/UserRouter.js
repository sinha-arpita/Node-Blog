const express= require("express");
const UserRouter=express.Router();
const userDb =require("./userDb");
UserRouter.get("/",async(req,res)=>{
       try{
           const users=await userDb.get(req.query);
           res.status(200).json(users);
       } catch(error){
          console.log(error);
          res.status(500).json({message:"error retreiving users"});

       }
})

UserRouter.get("/:id",async(req,res)=>{
         
       try{
          const user=req.params.id;
          if(user){
           const result=await userDb.getById(user);
           res.status(200).json(result);

          }else{
            res.status(404).json({message: "The post with the specified ID does not exist."})
  
          }
       }

       catch{
        res.status(500).json({error: "The post information could not be retrieved." })

     }
       
     
   })
   




//Write custom middleware to ensure that the user's name is upper-cased before the request reaches the POST or PUT route handlers.

UserRouter.post("/",async(req,res)=>{
        try{
            const newUser=req.body;
            console.log("New user " , newUser)
            if(newUser.id && newUser.name){
                const result = await userDb.insert(newUser);
                res.status(201).json(result)

            } else{
                res.status(400).json({errorMessage: "problem in id or name." })
            }        
        } catch(error){
           res.status(500).json ({error: error})
           console.log(error);
        }
})

UserRouter.delete("/:id",async(req,res)=>{
    
        try{
              const id=req.params.id;
              console.log(req.params.id)
              console.log("ID is",id)
              if(id){
                const result=await userDb.remove((id));
                res.status(201).json(result); 
                 
                 
              }else{
                res.status(404).json({message: "The user with the specified ID does not exist." })
              }
        }     
        catch(error){
              console.log(error);
              res.status(500).json({error: "The user could not be removed"})
             
        }
      })

      UserRouter.put('/:id',async(req,res)=>{
        try{
           const id =req.params.id;
           const user=req.body;
           if(id &&  user.name){
             const result= await userDb.update(id,user)
             res.status(201).json(result)
           } if(!id){
            res.status(404).json({message: "The post with the specified ID does not exist." })
           }
           else{
            res.status(400).json({errorMessage: "Please provide name of the ." })  
           }
    
        }
        catch(error){
          console.log(error)
           res.status(500).json({ error: "The post information could not be modified." })
        }
    
    })
    



module.exports=UserRouter;





