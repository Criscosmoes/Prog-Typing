const User = require("../../models/users")

const checkIfTaken = async (req, res, next) => {

    try {
        

        const { email } = req.body; 

        const [taken] = await User.find({ email })

        if(taken){
            console.log(taken); 
            return res.status(400).json("Email already taken")
        }
        else {
            next(); 
        }


    }catch(e){
        res.status(500).send(e.message); 
    }
}

module.exports = {
    checkIfTaken, 
}