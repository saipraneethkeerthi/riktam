const expressJwt = require('express-jwt');
const config = require('./config.json');

module.exports = jwt;

function jwt() {
    const { secret } = config;
    return expressJwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/login','/signup'
        ]
    });
}


const createUserToken = async(user, code, req, res) => {
    const token = signToken(user._id);
    //set expiry to 1 month
    let d = new Date();
    d.setDate(d.getDate() + 30);
  
     //first-party cookie settings
    res.cookie('jwt', token, {
       expires: d,
       httpOnly: true,
       secure: req.secure || req.headers['x-forwarded-proto'] ===   'https',
       sameSite: 'none'
    });
    //remove user password from output for security
    user.password = undefined;
    res.status(code).json({
       status: 'success',
       token,
       data: {
          user
        }
      });
    };