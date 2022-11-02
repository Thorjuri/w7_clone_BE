module.exports = (err, req, res, next) => {
    console.log(err)
    if (err.statusCode === undefined) {
        // 명시하지 않은 에러에 대한 처리.
        res.json({
            name: err.name,
            status: 500,
            errorMessage: err.message,
            errorStack: err.stack,
        })
    } else {
        // 명시해놓은 에러에 대한 처리.
        res.json({
            type: err.name,
            status: err.statusCode,
            error: err.message,
        })
    }
};
