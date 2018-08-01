let errorHandler = (err,req,res,next) =>{
    console.log("application level error handler called")
    console.log(err)
    res.send('some error has occured at global level')
}

let notFoundError = (req,res,rext) =>{
    console.log('Global not found handler called')
    res.status(404).send('Route Not Found in the Application')
}

module.exports = {
    globalErrorHandler : errorHandler,
    globalNotFoundHandler : notFoundError
}
