const express = require("express");
const router =express.Router();
const Post = require('../models/Post')

router.get('/', (req,res)=> {
    const locals = {
        title: "Holla @ Us Hollywood",
        description: "Simple Blog of Hollywood Haiti's P.O.V on Current Events"
    }
    res.render('index.ejs',{locals});
});

router.get('/about', (req,res)=> {
    res.render('about.ejs');
});

router.get('/whatsHot', (req,res)=> {
    res.render('whatsHot.ejs');
 });

module.exports = router;