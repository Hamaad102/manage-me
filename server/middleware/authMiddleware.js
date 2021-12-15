const jwt = require('jsonwebtoken');

const checkUser = (req, res, next) => {

    const token = req.cookie.jwt;

    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                next();
            } else {
                res.send(decodedToken.id);
                next();
            }
        })
    }
    else {
        next();
    }
}

module.exports = { checkUser };