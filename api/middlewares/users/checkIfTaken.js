const User = require("../../models/users")

const checkIfTaken = async (req, res, next) => {

    try {
        

        const { email, username } = req.body; 

        /* const [taken] = await User.find({ email })
        const [userTaken] = await User.find({ username }); 

        if(userTaken){
            console.log(taken); 
            return res.status(400).json("Username already taken")
        }
      
        if(taken){
            return res.status(400).json("Email already taken"); 
        } */

        next(); 

    }catch(e){
        res.status(500).send(e.message); 
    }
}

module.exports = {
    checkIfTaken, 
}