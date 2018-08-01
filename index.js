const express = require('express')
const mongoose = require ('mongoose')
const ecomConfig = require('./config/ecomConfig')
const app = express()
const fs = require('fs')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const globalErrorMiddleware = require('./middleware/appErrorHandler')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())
app.use(globalErrorMiddleware.globalErrorHandler)

let modelsPath = "./models"

fs.readdirSync(modelsPath).forEach(function(file){
    if(-file.indexOf('.js')){
        console.log("including the following models")
        console.log(modelsPath + '/' + file)
        require(modelsPath + '/'+file )
    }
})


let routesPath = "./routes"
fs.readdirSync(routesPath).forEach(function (file) {
    if (-file.indexOf('.js')){
        console.log("including the following file")
        console.log(routesPath + '/' + file)
        let route = require(routesPath + '/' + file)
        route.setRouter(app)
    }
})

app.use(globalErrorMiddleware.globalNotFoundHandler)

app.listen(ecomConfig.port,()=> {
    console.log('app is listening at port ');
    let db = mongoose.connect(ecomConfig.db.uri,{ useNewUrlParser: true })

})

mongoose.connection.on('error',function(err){
    console.log("database connection error")
    console.log(err);
})

mongoose.connection.on('open',function(err){
    if(err){
        console.log('database error');
        console.log(err)
    }
    else{
        console.log("database opened");
    }
})

