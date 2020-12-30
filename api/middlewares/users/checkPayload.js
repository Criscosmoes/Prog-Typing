const validator = require("validator"); 


const checkPayload = async (req, res, next) => {
    try {
        const {username, email, password} = req.body; 

        //validate email
        if(!validator.isEmail(email)) return res.status(400).json("Please provide a valid email"); 

        //validate user payload
        if(!email || !password) return res.status(400).json("Please provide a name, email, and password"); 

        next(); 
    }
    catch(e){
        res.status(500).send(e.message); 
    }
}

module.exports = {
    checkPayload
}