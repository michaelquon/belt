const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const bp = require('body-parser');
app.use(bp.json());

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/belt');
app.use(express.static(path.join(__dirname + '/belt-app/dist')));

const EatsSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: [true, "This name is already taken."], minlength: 3},
    cuisine: {type: String, required: true, minlength: 3},
    reviews: [{
        customer: {type: String, required: true, minlength: 3},
        stars: {type: Number, required: true},
        review: {type: String, required: true, minlength: 3}
    }]
});
    mongoose.model('Eats', EatsSchema);
    var Eats = mongoose.model('Eats')

    app.get('/eats', (req, res)=>{
        console.log("Getting all Eats from Server")
        Eats.find({},null, {sort: {name: 1}}, (err, eats)=>{
            if(err){
                console.log(err);
                res.json({message: "Error", error: err})
            }
            else{
                res.json({message: "Success", data: eats})
            }
        })
    
    });
    
    app.get('/eats/:id', (req,res)=>{
        console.log("Getting one eat from Server")
        Eats.findOne({_id: req.params.id},  (err, eat)=>{
            if(err){
                console.log(err)
                res.json({message: "Error", error: err})
            }
            else{
                res.json({message: "Error", data: eat})
            }
        })
    });
    
    app.post('/eats', (req,res)=>{
        console.log("Confirmation form posted to server")
        var newEats = new Eats({name: req.body.name, cuisine: req.body.cuisine})
        newEats.save((err)=>{
            if(err){
                console.log(newEats.errors)
                res.json({message: "Error", error: err});
            }
            else{
                res.json({message: "Success"})
            }
        })
    });
    
    app.put('/eats/:id', (req,res)=>{
        var eat = Eats.update({_id: req.params.id}, {name: req.body.name, cuisine: req.body.cuisine},
                                                    {runValidators: true}, (err)=>{
            if(err){
                console.log(err)
                res.json({message: "Error", error: err})
            }
            else{
                res.json({message: "Successful Update"})
            }
        })
    });
    
    app.delete('/eats/:id', (req,res)=>{
        Eats.remove({_id: req.params.id}, (err)=>{
            if(err){
                console.log(err);
                res.json({message: "Error", error: err})
            }
            else{
                res.json({message: "Successful Removal"})
            }
        })
    });
    
    app.put('/eats/reviews/:id', (req,res)=>{
        Eats.findOne({_id: req.params.id}, (err,review)=>{
            if(err){
                console.log(err);
                res.json({message: "Error", error: err})
            }
            else{
                review.reviews.push({customer: req.body.customer, stars: req.body.stars, review: req.body.review})
                review.save((err)=>{
                    if(err){
                        for(let i in err['errors']){
                            var mainError = err['errors']
                        }
                        res.json({message: 'Error', error: mainError})
                    }
                    else{
                        res.json({message: "Successful Update"})
                    }
                })
            }
        })
    
    })
  

app.all('*', (req,res,next)=>{
    res.sendFile(path.resolve("./belt-app/dist/index.html"))
});

app.listen(port,()=>{
    console.log(`We on port ${port}`);
});