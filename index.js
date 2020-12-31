const server = require("./api/server"); 
const dotenv = require("dotenv"); 
const mongoose = require("mongoose");

const cors = require("cors"); 

dotenv.config(); 

server.use(cors()); 
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); 
    next(); 
})

server.get('/api/test', (req, res) => {
    request(
      { url: 'http://prog-typing.herokuapp.com/api/register' },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: err.message });
        }
  
        res.json(JSON.parse(body));
      }
    )
  });



//Connect to DB
mongoose.connect(process.env.MONGO_URI, { 
    useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, () => console.log("Connected to DB"))



const PORT = process.env.PORT || 4000; 


server.listen(PORT, () => console.log(`Listening on port ${PORT}`))