const dotenv = require('dotenv');
dotenv.config(`${process.env.SECRET_KEY}`);

const jwt = require('jsonwebtoken');
const { Users } = require('../models');

module.exports = async (req, res, next) => {
    const { authorization } = req.headers;

    const [authType, authToken] = (authorization || '').split(' ');

    if (!authToken || authType !== 'Bearer') {
        res.locals.user = ''
        next();
    } else {
        const { userId } = jwt.verify(authToken, `${process.env.SECRET_KEY}`);

        Users.findOne({ where: { userId } }).then((user) => {
            res.locals.user = user;
            next();
        });
    }       
};
