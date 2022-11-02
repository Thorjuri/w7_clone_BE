
module.exports = (err, req, res, next) => {
    console.log(err)
    return res.status(400).json({     
        type: err.name,
        error: err.message        
     });
};
