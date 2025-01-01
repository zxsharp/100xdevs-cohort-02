const jwt = require('jsonwebtoken');
const privateKey = '123456';
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers['authorization'].split(' ')[1];
        let verified;
        try{
            verified = jwt.verify(token, privateKey);
        }
        catch(err){
            res.status(403).json({msg: 'invalid token'});
            return;
        }

        req.username = verified.username;
        next();
}

module.exports = userMiddleware;