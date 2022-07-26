const questionModel = require("../models/questionModel");
const userModel = require("../models/userModel");
const validator = require("../utils/validator");

// Add new Question in DB 
const addnewques = async (req, res) => {
    try{
        reqBody = req.body 
        if(Object.keys(reqBody).length==0) return res.status(400).send({status:"failed",message: "Please enter data..."});

        let { question, option1, option2, option3, option4, rightOption, difficulty} = reqBody

        // CHECK : User Exist 
        const userId = req.params.userId;
        const user = await userModel.findOne({_id: userId});

        // CHECK : loged-in user is Admin so that he/she can add new question
        if(user.role != "Admin")  return res.status(403).send({ status: false, message: "You haven't right to perform this task" })

        //  CHECK : all data field is present 
        if(!validator.isEmpty(question)) return res.status(400).send({status:"failed",message: "Please enter question..."});
        if(!validator.isEmpty(option1)) return res.status(400).send({status:"failed",message: "Please enter option1..."});
        if(!validator.isEmpty(option2)) return res.status(400).send({status:"failed",message: "Please enter option2..."});
        if(!validator.isEmpty(option3)) return res.status(400).send({status:"failed",message: "Please enter option3..."});
        if(!validator.isEmpty(option4)) return res.status(400).send({status:"failed",message: "Please enter option4..."});
        if (typeof (rightOption) === "object") {
            rightOption = rightOption.filter(x => x.trim())
            if (rightOption.length == 0) return res.status(400).send({status:"failed",message: "Please enter right option..."});
        }
        if(!validator.isEmpty(difficulty)) return res.status(400).send({status:"failed",message: "Please enter difficulty level"});
        if(difficulty>10 || difficulty<1) return res.status(400).send({status:"failed",message: "Please enter difficulty level among 1-10"});

        // Check : length of Options 
        if(rightOption.length >4) return res.status(400).send({status:"failed",message: "Right Options Can't be more than 4..."});

        //  CHECK: options should be different 
        let resOpt = validator.filterDuplcates([option1, option2, option3, option4])
        if(resOpt.length!=4) return res.status(400).send({status:"failed",message: "Please enter four different options..."});
 
        // CHECK: Right Option should be in options 
        let options = [option1, option2, option3, option4] 
        if(!validator.isRightOptions(rightOption, options)) return res.status(400).send({status:"failed",message: "Right Options must be present in given options..."});

        // if Any right option occures multiple time
        reqBody.rightOption = validator.filterDuplcates(rightOption)

        // CHECK : entered question is unique
        const isUniqueQuestion = await questionModel.findOne({question: question});
        if(isUniqueQuestion) return res.status(400).send({status:"failed",message: "Question already added..."});

        const addedQuestion = await questionModel.create(reqBody);
        return res.status(201).send({status:"success", message:"Question Added", data:addedQuestion})
    }
    catch(error) {
        console.log(error);
        return res.status(500).send({status:"failed", message: error.message});
    }
}



module.exports.addnewques = addnewques