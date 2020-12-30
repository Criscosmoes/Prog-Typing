const User = require("../../models/users")


const checkIfUserExists = async (req, res, next) => {
    try {

        const { email } = req.body; 

        const [exists] = await User.find({email}); 

        if(exists){
            req.user = exists; 
            return next(); 
        }

        return res.status(400).json("invalid credentials"); 




    }catch(e){
        res.status(500).send(e.message); 
    }
}

module.exports = {
    checkIfUserExists, 
}