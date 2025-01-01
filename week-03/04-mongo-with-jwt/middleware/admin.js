const jwt = require('jsonwebtoken');
const privateKey = '123456';
// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers['authorization'].split(' ')[1];
    console.log(token);
    let verified;
    try{
        verified = jwt.verify(token, privateKey);
    }
    catch(err){
        res.status(403).json({msg: 'invalid token'});
        return;
    }
    
    next();
    
}

module.exports = adminMiddleware;