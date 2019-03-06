const express=require("express");
const PostRouter=express.Router();
const postDb=require("./postDb");
const userDb =require("./userDb");

PostRouter.get("/",async(req,res)=>{
         try{
             console.log(req.body.id)
             let posts = null;
             if (req.body.id){
                 console.log("Query",userDb.getUserPosts(req.body.id).toSQL().sql);
                posts = await(userDb.getUserPosts(req.body.id))
             } else {
                console.log("Query for all",req.query); 
                posts= await(postDb.get(req.query));
             }
             //console.log("Posts" , posts)
             res.status(200).json(posts);

         }
         catch(error){
           res.status(500).json({message:"error retreiving posts"})
           console.log(error);


         }

})

PostRouter.get("/:id",async(req,res)=>{
         
    try{
       const post=req.params.id;
       if(post){
        const result=await postDb.getById(post);
        res.status(200).json(result);

       }else{
         res.status(404).json({message: "The post with the specified ID does not exist."})

       }
    }

    catch{
     res.status(500).json({error: "The post information could not be retrieved." })

  }
    
  
})
PostRouter.delete("/:id",async(req,res)=>{
    
    try{
          const id=req.params.id;
          console.log(req.params.id)
          console.log("ID is",id)
          if(id){
            const result=await postDb.remove((id));
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


  PostRouter.put("/:id",async(req,res)=>{
    try{
        const id =req.params.id;
       
       const post=req.body;
       if(id && post.text && post.user_id){
         const result= await postDb.update(id,post)
         res.status(201).json(result)
       } if(!id){
        res.status(404).json({message: "The post with the specified ID does not exist." })
       }
       else{
        res.status(400).json({errorMessage: "Please provide title and contents for the post." })  
       }

    }
    catch(error){
      console.log(error)
       res.status(500).json({ error: "The post information could not be modified." })
    }

})

   


module.exports=PostRouter;