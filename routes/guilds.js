const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const setting = require('./models/server_settings')


main().catch(err => console.log(err));

async function main() {	
    await mongoose.connect(process.env.mongourl);
}
let _check;
router.get('/', function(req,res){
    setting.findOne({server_name:'test5'}).then(d=>{
        try{
            if(d.test1=='on'){
                console.log(d.server_name)
                _check = 'checked';}
            else{
                console.log(d.test1)
                _check = '';
            }
        }catch(e){
            console.log('nul')}
    })
    res.render('guild',{check:_check})
})

router.post('/test',function(req,res){

    let checkbox = req.body.command1

    if (!req.body.command1){
        checkbox = 'off';
    }
    console.log(checkbox)

    setting.findOne({server_name:'test3'}).then(d=>{
        if(!d){
            console.log(d)
            const settings = new setting({
                server_name:'test5',
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