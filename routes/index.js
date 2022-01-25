const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const setting = require('./models/server_settings')


main().catch(err => console.log(err));

async function main() {	
    await mongoose.connect(process.env.mongourl);
}

async function oauth(res,req,code){
    try {
        const oauthResult = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            body: new URLSearchParams({
                client_id: '846989313291452437',
                client_secret: '',
                code,
                grant_type: 'authorization_code',
                redirect_uri: `http://localhost:3000/`,
                scope: 'identify',
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const oauthData = await oauthResult.json();
        const userResult = await fetch('https://discord.com/api/users/@me', {
            headers: {
                authorization: `${oauthData.token_type} ${oauthData.access_token}`,
            },
        });
        const userData=await userResult.json();
        console.log(userData)
    } catch (error) {
        // NOTE: An unauthorized token will not throw an error;
        // it will return a 401 Unauthorized response in the try block above
        console.error(error);
    }

}

async function refresh(){
    try {
        refreshResult = await fetch('https://discord.com/api/oauth2/token', {

        method: 'POST',
        body: new URLSearchParams({
            client_id: '846989313291452437',
            client_secret: '',
            grant_type: 'refresh_token',
            refresh_token: `${req.cookies.refreshtoken}`,
        }),
        headers: {
            'Content-Type':'application/x-www-form-urlencoded',
        },
    });
        userResult = await fetch('https://discord.com/api/users/@me', {
            headers: {
                authorization: `Bearer ${refreshData.access_token}`,
            },
        });
    
        userData=await userResult.json();
    
    } catch (error) {

        console.error(error);
}}
    

router.get('/', async(req, res) => {
	const { code } = req.query;
    if (code) {
    switch (req.cookies.refreshtoken){
        case 'undefined':
            let oauthfunc=oauth(req,res,code);
            console.log(oauthfunc)
            res.json(oauthfunc)
            break;
    }
    }else{
        res.render('index',{login:'login'})
    }
    
})

module.exports = router;