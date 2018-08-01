
const express = require('express')
const mongoose = require('mongoose')
const shortId = require('shortid')

const EcomModel = mongoose.model('Ecom')

let getAllItems = (req,res) => {
    EcomModel.find()
        .select('-__v -_id  -quantity')
        .lean()
        .exec((err,result)=>{
            if(err){
                console.log(err)
                res.send(err)
            }
            else if(result == undefined || result == null || result == ''){
                console.log('no Items Found')
                res.send('No Items Found')
            }
            else{
                res.send(result)
            }
        })
}

let getItem = (req,res) =>{
    EcomModel.findOne({'productId':req.params.itemId},(err,result)=>{
        if(err){
            console.log(err)
            res.send(err)
        }
        else if(result == undefined|| result == null || result == ''){
            console.log('No Items Found!!')
            res.send('No Items Found')

        }
        else{
            res.send(result)
        }   

    
})
}

let createItem = (req,res) => {
    var today = Date.now()
    let itemId = shortId.generate()
    let newItem = new EcomModel({
        productId : itemId,
        productName : req.body.productName,
        description : req.body.description,
        quantity : req.body.quantity,
        category : req.body.category,
        isInCart : req.body.isInCart,
        created : today,
        sellerName : req.body.sellerName
    })
    newItem.save((err,result) => {
        if(err){
            console.log(err)
            res.send(err)
        }
        else{
            res.send(result)
        }

    })
}
let addToCart = (req, res) =>{
    let options = req.body
    EcomModel.findOne({'productId': req.params.itemId}, (err,result)=>{
        if(err){
            console.log(err)
            res.send(err)
        }
        else if(result == undefined|| result == null || result==''){
            console.log('No Items Found')
            res.send('NO Items Found')
        }
        else{
            result.isInCart=true
            result.save(function (err,result){
                if(err){
                    console.log(err)
                    res.send(err)
                }
                else{
                    res.send(result) 
                }
            })
            
        }
    })
}

let editItem = (req, res) =>{
    let options = req.body
    EcomModel.update({'productId': req.params.itemId}, options,{multi:true}),exec((err,result)=>{
        if(err){
            console.log(err)
            res.send(err)
        }
        else if(result == undefined|| result == null || result==''){
            console.log('No Items Found')
            res.send('NO Items Found')
        }
        else{
            res.send(result)
            }
            
        }
    )
}

let deleteItem = (req,res) => {
    EcomModel.remove({'productId': req.params.itemId},(err,result)=>{
        if(err){
            console.log(err)
            res.send(err)
        }
        else if(result == undefined|| result == null || result==''){
            console.log('No Items Found')
            res.send('NO Items Found')
        }
        else{
            res.send(result)
        }

    })
}


let testRoute = (req, res) => {
    console.log(req.params)
    res.send(req.params)
}

let testQuery = (req, res) =>{
    console.log(req.query)
    res.send(req.query)
}

let testBody = (req, res) =>{
    console.log(req.body)
    res.send(req.body)
}




let helloWorldFunction = (req,res) => res.send('hello World')

module.exports = {
    helloWorld : helloWorldFunction,
    testQuery : testQuery,
    testRoute : testRoute,
    testBody : testBody,
    getAllItems : getAllItems,
    createItem : createItem,
    addToCart : addToCart,
    getItem : getItem,
    editItem : editItem,
    deleteItem : deleteItem
}