const userModel = require("../models/userModel");
const validator = require("../utils/validator");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


//  Register user
const registerUser = async (req, res) => {
    try{
        const reqBody = req.body;

        // CHECK : request body is empty
        if(Object.keys(reqBody).length==0) return res.status(400).send({status:"failed", message: "Please enter data in request body..."});

        const {name, email, phone, password, cpassword, role} = reqBody 

        // CHECK : all required data fields are present and not null
        if(!validator.isEmptyOrMissing(name)) return res.status(400).send({status:"failed", message: "Please enter name..."});
        if(!validator.isEmptyOrMissing(email)) return res.status(400).send({status:"failed", message: "Please enter emailId..."});
        if(!validator.isEmptyOrMissing(phone)) return res.status(400).send({status:"failed", message: "Please enter phone number..."});
        if(!validator.isEmptyOrMissing(role)) return res.status(400).send({status:"failed", message: "Please enter role..."});
        if(!validator.isEmptyOrMissing(password)) return res.status(400).send({status:"failed", message: "Please enter pasword..."});
        if(!validator.isEmptyOrMissing(cpassword)) return res.status(400).send({status:"failed", message: "Please enter confirm password..."});

        // CHECK : email , phone , role is valid
        if(!validator.isValidEmail(email)) return res.status(400).send({status:"failed", message: "Please enter valid emailId..."});
        if(!validator.isValidPhone(phone)) return res.status(400).send({status:"failed", message: "Please enter valid phone number..."});
        if(!(role=="Admin" || role=="User")) return res.status(400).send({status:"failed", message: "Please enter valid role (user or admin)..."});

        // CHECK : password and confirm password is same
        if(password!=cpassword) return res.status(400).send({status:"failed", message: "Password and confirm password must be same..."});

        // CHECK : email and phone is unique
        const isUniqueEmail = await userModel.findOne({email: email})
        if(isUniqueEmail) return res.status(400).send({status:"failed", message: "This emailId is already in use, provide another one..."});
        
        const isUniquePhone = await userModel.findOne({phone: phone})
        if(isUniquePhone) return res.status(400).send({status:"failed", message: "This phone number is already in use, provide another one..."});

        // Encrypting Password
        let saltRounds = 10;
        let salt = await bcrypt.genSalt(saltRounds);
        let hash = await bcrypt.hash(password, salt);

        let user = {
            name, email,role , password: hash, phone 
        }

        user = await userModel.create(user);

        res.status(201).send({status:"failed", message:"User Registered Successfully",data: user})
    }
    catch(error) {
        console.log(error);
        return res.status(500).send({status:"failed", message: error.message});
    }
}

// Log-In User
const loginUser = async (req, res) => {
    try{
        const reqBody = req.body;

        // CHECK : request body is empty
        if(Object.keys(reqBody).length==0) return res.status(400).send({status:"failed", message: "Please enter data in request body..."});

        const {email, password} = reqBody 

        // CHECK : all required data fields are present and not null
        if(!validator.isEmptyOrMissing(email)) return res.status(400).send({status:"failed", message: "Please enter emailId..."});
        if(!validator.isEmptyOrMissing(password)) return res.status(400).send({status:"failed", message: "Please enter pasword..."});

        // CHECK : email is valid
        if(!validator.isValidEmail(email)) return res.status(400).send({status:"failed", message: "Please enter valid emailId..."});

        // CHECK : User Exist
        const user = await userModel.findOne({email: email})
        if(!user) return res.status(400).send({status:"failed", message: "No user exist with this emailId..."});

        // CHECK : entered Password is Correct
        let validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send({ status: false, message: "Wrong password ,please enter correct password..." });

        //  GENERATE : token  
        const token = jwt.sign({
            userId: user._id.toString(),
            role: user.role,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 120 * 60
        }, process.env.SECURITY_KEY);
        
        res.setHeader("Authorization", token);

        res.status(201).send({status:"failed", message:"User Loged-In Successfully",data: {user, token: token}})
    }
    catch(error) {
        console.log(error);
        return res.status(500).send({status:"failed", message: error.message});
    }
}


module.exports.loginUser = loginUser
module.exports.registerUser = registerUser