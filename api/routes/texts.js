const router = require("express").Router(); 
const Text = require("../models/texts"); 

// add a text to the db; 

router.post("/texts", async (req, res) => {

    try {

        const { language, text } = req.body; 

        if(!language || !text) return res.status(400).json("Please provide a language and a text"); 

        const newText = new Text({
            language, text
        })

        await newText.save(); 

        res.status(201).json("Text saved successfully"); 



    }catch(e){
        res.status(500).send(e.message); 
    }

})

module.exports = router; 