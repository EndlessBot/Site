const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();
const { catchAsync } = require('../utils');

router.get('/', catchAsync(async (req, res) => {
    if(req.cookies.token===undefined) throw new Error('NoCookies');

    const cookies = req.cookies;
    const response = await fetch('https://discordapp.com/api/users/@me',
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        });
    const json = await response.json();

    res.status(200).send(`<meta http-equiv="refresh" content="5; url=/"/>Welcome ${json.username}#${json.discriminator}, Redirecting you to the homepage...`);
}));

module.exports = router;