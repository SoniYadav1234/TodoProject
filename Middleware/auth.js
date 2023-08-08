const jwt = require('jsonwebtoken')
const { secretKey } = require('../utils/Constant');

// function to verify token 
module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).send({ message: 'Authorization header missing' });
        }
        let token = await authHeader.split(' ')[1];
        const decode = await jwt.verify(token, secretKey);
        req.userData = decode;
        next()
    } catch (err) {
        console.log(err);
        res.status(403).send({ message: 'Unauthorized' });
    }
};
