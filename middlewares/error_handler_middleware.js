
module.exports = (err, req, res, next) => {
    // fetch('/likes/:postId').catch(console.log('fetcherr'))
    res.status(err.statusCode).json({
        type: err.name,
        redirect: err.redirected,
        errorMessage: err.message,
        url: err.url,
    });
};
