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
    res.render('dash',{check:''})
})

router.post('/test',function(req,res){

    let checkbox = req.body.toggle

    if (!checkbox){
        checkbox = 'off';
    }
    console.log(checkbox)

    setting.findOne({server_name:'test3'}).then(d=>{
        if(!d){
            console.log(d)
            const settings = new setting({
                server_name:'test4',
                test1:checkbox,
        });
        return settings.save();
        }
        console.log(d)
        return d
    })

    res.redirect('/dashboard')
})

module.exports = router;