const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const setting = require('./models/server_settings')


main().catch(err => console.log(err));

async function main() {	
    await mongoose.connect(process.env.mongourl);
}

router.get('/', function(req,res){
    setting.findOne({server_name:'test3'}).then(d=>{
        try{
            if(d.test1){
                console.log(d.server_name)}
            else{
                console.log('aaa')
            }
        }catch(e){
            console.log('nul')}
    })
    res.render('index',{check:''})
})


module.exports = router;