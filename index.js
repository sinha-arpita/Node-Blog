// code away!

//place where server is defined

const server=require("./data/helpers/server.js");
const port= 8900;
server.listen (port,()=>{
    console.log(`*******************server is listening at the the port ${port}************************`);

})
