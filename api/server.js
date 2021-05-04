const express = require("express"); 
const helmet = require("helmet"); 
const cors = require("cors"); 


// gloabal middlwares
const { isAuthorized } = require("./middlewares/users/isAuthorized"); 

//import user routes
const UserRouter = require("./routes/user");
const ScoresRouter = require("./routes/scores") 
const TextsRouter = require("./routes/texts"); 

const server = express(); 


server.use((req, res, next) => {
   // Website you wish to allow to connect
   res.header('Access-Control-Allow-Origin', '*');

   // Request methods you wish to allow
   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

   // Request headers you wish to allow
   res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

   // Pass to next layer of middleware
   next();
})
server.use(cors()); 
server.use(helmet());  
server.use(express.json()); 



server.use("/api", TextsRouter)
server.use("/api", UserRouter)
server.use("/api", isAuthorized, ScoresRouter); 


module.exports = server;     