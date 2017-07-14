const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Activity = require('./models/activity');




// app.use('/api',router);


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/',function(req,res) {
  res.json({message:"Марік мути апку,СУКА"});

});

 app.listen(9000);
 console.log('starting application. Good job');
