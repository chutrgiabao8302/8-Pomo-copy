const express = require('express');
const router = express.Router();

router.get('/register', (req, res, next) => {
    return res.render('register', {
        layout: 'account'
    });
})

module.exports = router;
