const userModel = require('../models/userModel');
const jwt = require("jsonwebtoken");
const validator = require('../utils/validator');



const auth = async (req, res, next) => {
    try{
        let token = req.headers["authorization"]
        token = token && token.split(" ")[1] 
        if (!token) return res.send({ status: false, message: "Authentication token must be present"});

        const userId = req.params.userId
        if (Object.keys(userId) == 0) return res.status(400).send({ status: false, message: "Please enter userId..."});
        if(!validator.isValidID(userId)) return res.status(400).send({ status: false, message: "Please enter valid userId"});

        // Check: user exist
        const user = await userModel.findOne({_id: userId});
        if(!user) return res.status(400).send({ status: false, message: "User Doesn't Exist.."});
            
        let decodedtoken = jwt.verify(token, process.env.SECURITY_KEY , { ignoreExpiration: true });
            
        let time = Math.floor(Date.now() / 1000)
        if (decodedtoken.exp < time) {
            return res.status(401).send({ status: false, message: "Token expired, please login again"});
        }

        //  CHECK : authorization
        if (decodedtoken.userId != userId) return res.status(403).send({ status: false, message: "You haven't right to perform this task" })

        next();
    }
    catch(error) {
        console.log(error);
        return res.status(500).send({status:"failed",message: error.message});
    }
}


module.exports = { auth }