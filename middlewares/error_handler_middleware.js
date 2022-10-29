
module.exports = (err, req, res, next) => {
    console.log(err)
    return res.status(400).json({
        method:err.method,         
        type: err.name,
        status:err.status,
        error: err.message        
     });
};
