
module.exports = (err, req, res, next) => {
    return res.status(err.statusCode).json({
        type: err.name,
        redirect: err.redirected,
        errorMessage: err.message,
        url: err.url,
    });
};
