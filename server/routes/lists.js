var mongoose = require( 'mongoose' );
var express = require('express');
var router = express.Router();
var List = require('../models/lists');

function savelist(req, res, next){
    console.log("new list entered");
    var newList = new List({
        title    : req.body.title,
        description : req.body.description
    });
    
    newList.save(function(err, list){
            if(err){ 
                console.log("error saving list");
                res.status(400).json({ 
                    success: false, 
                    message:'Error processing request '+ err});
        }
        else{
            console.log("list inserted");
            res.status(201).json({
                success: true,
		        message: 'client created successfully.',
                data: list
        });
    }
    });
};

function getlists(req, res, next){
    console.log("finding all lists");
     List.find({}, function(err, lists){
         if (err) return next(err);
         res.json(lists);
     });
 };

 function getlist(req, res, next){
    console.log("finding one list");
     List.findById({_id: req.params.id}, function(err, list){
         if (err) return next(err);
         console.log(list);
         res.json(list);
     });
 };
 
 function deletelist(req, res, next){
     List.remove({_id: req.params.id}, function(err){
         if(err)
            { res.status(400).json({ success: false, message: 'Error processing request '+ err }); }
         res.status(201).json({
         success: true,
         message: 'List removed successfully'
     });
     });
 }
 
 function updateList(req, res, next){
     console.log("updating client");
     List.findById({_id: req.params.id}, function(err, list){
         if(err){ res.status(400).json({ success: false, message: 'client not found '+ err }); }
                 
             if(list) {
 //                res.json("client found----"+client);
                list.title = req.body.title;
                list.description = req.body.description;
             }
             list.save(function(err) {
                 if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err }); }
                 res.status(201).json({
                     success: true,
                     message: 'client updated successfully'
                 });
              });
             
         });
 }

module.exports = { router, savelist, getlists, getlist, deletelist, updateList };