// Reward routes
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Reward = require('../models/rewards_model.js');

//get all rewards
router.get("/",function(req,res){
    // use mongoose to get all rewards in the database
    if(err){
        res.send(err);
    }//end if
    else{
        Reward.find(function(err,rewards){
            if (err){
                res.send(err);
            }//end if
            else{
                res.json([rewards]);
            }//end else
        });//end find
    }//end else
});

//create a new reward and send it back to task list after creation
router.post('/',function(req,res){
    // create a reward, information comes from AJAX request from Angular
    Reward.create({
        text: req.body.text,
        cost: req.body.cost
    }, function(err, reward){
        if(err){
            res.send(err);
        }//end if
        else{
        // get and return all the rewards after you create another
            Reward.find(function(err, rewards){
                if (err){
                    res.send(err);
                }//end if
                else{
                    res.json([rewards]);
                }//end else
            });//end find
        }//end else
    });//end create
});

//delete a task
router.delete('/:reward_id',function(req,res){
    Reward.remove({
        _id : req.params.reward_id
    }, function(err, reward){
        if (err){
            res.send(err);
        }//end if
        else{
            // get and return all the rewards after you delete one
            Reward.find(function(err, rewards){
                if(err){
                    res.send(err);
                }//end if
                else{
                    res.json([rewards]);
                }//end else
            });//end find 
        }//end else
    });//end remove
});

module.exports = router;
