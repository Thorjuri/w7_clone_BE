
module.exports = (err, req, res, next) => {

    return res.status(400).json({ type: err.name, error: err.message });
};
