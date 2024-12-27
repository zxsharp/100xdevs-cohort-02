// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username = req.headers['username'];
    const password = req.headers['password'];

    const match = await Admin.findOne({
        username: username,
        password: password
    })

    if(!match){
        res.status(403);
    }
    else next();
}

module.exports = adminMiddleware;