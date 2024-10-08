const express = require("express");
const router =express.Router();
const Post = require('../models/Post')

// route to render form view GET
router.get("/createPost", (req, res) => {
    // render the ejs file
})

// route to process form info POST
router.post("/", (req, res) => {
    // save post in database and redirect to index page
})

module.exports = router;