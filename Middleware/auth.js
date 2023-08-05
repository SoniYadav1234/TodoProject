const jwt = require('jsonwebtoken')
const { secretKey } = require('../utils/Constant');

// function to verify token 
module.exports = async (req, res, next) => {
    try {
        let token = await req.headers.authorization.split(' ')[1];
        const decode = await jwt.verify(token, secretKey);
        req.userData = decode;
        next()
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: 'Unauthorized' });
    }
};
