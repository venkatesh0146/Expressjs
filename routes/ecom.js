const express = require('express')
const ecomController = require('./../controllers/ecom')
const ecomConfig = require('./../config/ecomConfig')

let setRouter = (app) =>{

    let baseUrl = ecomConfig.apiVersion+'/ecom'
    console.log(baseUrl)
    app.get(baseUrl+'/all',ecomController.getAllItems);
    //app.get(baseUrl+'/view/:itemId',ecomController.viewByItemId)
    /**let getAllItems = (req,res) => {
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
    }**/
    app.post(baseUrl+'/create',ecomController.createItem)
    /**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

    /**let createItem = (req,res) => {
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
} */

    app.post(baseUrl+'/:itemId/delete',ecomController.deleteItem)

    /**let deleteItem = (req,res) => {
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
} */

    app.get(baseUrl+'/:itemId',ecomController.getItem)

    /**let getItem = (req,res) =>{
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
} */

    app.post(baseUrl+'/:itemId/edit',ecomController.editItem)

    /**let editItem = (req, res) =>{
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
} */

    app.put(baseUrl+'/:itemId/addToCart',ecomController.addToCart);
    /**let addToCart = (req, res) =>{
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
} */
    app.get('/hello-world',ecomController.helloWorld)
    app.get('/test/route/:param1/:param2',ecomController.testRoute);
    app.get('/test/query',ecomController.testQuery);
    app.post('/test/body',ecomController.testBody)
}

module.exports = {
    setRouter : setRouter
}