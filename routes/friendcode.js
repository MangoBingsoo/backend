const express = require('express');
const router = express.Router();
const Question = require('../schemas/Question');

router.post('/', (req,res,next) => {
    let fcode = Math.floor((new Date().getTime() + Math.random()) % 1000000)
    
})

module.exports = router;