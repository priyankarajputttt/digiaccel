const questionModel = require("../models/questionModel");
const quizModel = require("../models/quizModel");
const validator = require("../utils/validator");



const getQuestion = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Check : quiz data exist for user
        const quizExist = await quizModel.findOne({ userId: userId });
        if (!quizExist) {
            // Creating Quiz for user
            let quizInfoForUser = {
                userId: userId, score: 0, quesNum: 0, difficulty: 5
            }
            let quizData = await quizModel.create(quizInfoForUser);
            var question = await questionModel.findOne({ difficulty: quizData.difficulty }).select({ _id: 0, difficulty: 1, question: 1, option1: 1, option2: 1, option3: 1, option4: 1 });
        }
        if (quizExist) {
            // CHECK : if quiz is over
            if (quizExist.difficulty > 10 || quizExist.difficulty < 1 || quizExist.quesNum > 10) {
                const score = quizExist.score
                await quizModel.deleteOne({ userId: userId })
                return res.status(200).send({ status: "success", message: "Quiz Over", data: { "Total Score": quizExist.score } });
            }
            // Sending question details
            var question = await questionModel.findOne({ difficulty: quizExist.difficulty }).select({ _id: 0, difficulty: 1, question: 1, option1: 1, option2: 1, option3: 1, option4: 1 });
        }
        return res.status(200).send({ status: "success", message: "Question Details", data: question });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ status: "failed", message: error.message });
    }
}


const checkQuestion = async (req, res) => {
    try {
        const reqBody = req.body;
        if (Object.keys(reqBody).length == 0) return res.status(400).send({ status: "failed", message: "Please enter data" });

        let { question, selectedOption } = reqBody;
        const userId = req.params.userId;

        // CHECK: question and selectedOption is provided
        if (!validator.isEmptyOrMissing(question)) return res.status(400).send({ status: "failed", message: "Please enter question..." });
        if (typeof (selectedOption) !== "object") return res.status(400).send({ status: "failed", message: "Please enter selected option in Array..." });
        else {
            selectedOption = selectedOption.filter(x => x.trim())
            if (selectedOption.length == 0) return res.status(400).send({ status: "failed", message: "Please enter selected option in Array..." });
        }

        // Fetching question details from DB
        const questionDetails = await questionModel.findOne({ question: question });

        // Checking Answer
        const isRightAnswer = validator.checkAnswer(selectedOption, questionDetails.rightOption);

        // Fetch User's Quiz info 
        const quizInfo = await quizModel.findOne({ userId: userId });
        if(!quizInfo) return res.status(400).send({status:"failed", message: "Quiz Doesn't Exist For User..."})
        if (quizInfo.difficulty > 10 || quizInfo.difficulty < 1 || quizInfo.quesNum > 10) {
            const score = { "Total Score": quizInfo.score }
            await quizModel.deleteOne({ userId: userId })
            return res.status(200).send({ status: "success", message: "Quiz Over", data: score });
        }

        // Update Quiz info if selected option is right
        if (isRightAnswer == true) {
            const updatedUserQuizInfo = await quizModel.updateOne({ userId: userId }, { $inc: { quesNum: +1, difficulty: +1, score: +5 } }, { new: true });
            const currentscore = { currentScore: updatedUserQuizInfo.score }
            return res.status(200).send({ status: "success", message: "Your Answer Is Right", data: currentscore });
        }
        // Update Quiz info if selected option is wrong
        else {
            const updatedUserQuizInfo = await quizModel.updateOne({ userId: userId }, { $inc: { quesNum: +1, difficulty: -1, score: -2 } });
            const currentscore = { currentScore: updatedUserQuizInfo.score }
            return res.status(200).send({ status: "failed", message: "Your Answer Is Wrong", data: currentscore });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ status: "failed", message: error.message });
    }
}


module.exports.getQuestion = getQuestion
module.exports.checkQuestion = checkQuestion