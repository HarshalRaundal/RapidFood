const express = require('express');

const router = express.Router();

router.post('/getData' , (req,res) =>{
    try {
        res.send([global.FOOD_ITEMS,global.FOOD_CATEGORIES]);
    } catch (error) {
        console.error(error.message);
        res.send("Server Error");
    }
});

module.exports = router;