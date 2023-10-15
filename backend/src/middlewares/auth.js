
//USER AUTHENTICATION
const auth = async (req, res, next) => {
    console.log(req.headers) 
    try {
        if(req.headers.authorization.includes('JWT')){
             next();
        }
        else res.status(401).send({ error: "please authenticate!" });
        
       
    } catch (e) {
        res.status(401).send({ error: "please authenticate!" });
    }
};

module.exports = auth;
