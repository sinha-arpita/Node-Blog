// code away!

//place where server is defined
require('dotenv').config();
const server=require("./data/helpers/server.js");
const PORT= process.env.PORT || 8900;
server.listen (PORT,()=>{
    console.log(`*******************server is listening at the the port ${PORT}************************`);

})
