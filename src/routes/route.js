const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const questionControlller = require('../controllers/questionController');
const quizController = require("../controllers/quizController");
const {auth} = require('../middlewares/auth')

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

router.post('/addquestion/:userId', auth, questionControlller.addQuestion);

router.get('/getquestion/:userId', auth, quizController.getQuestion);
router.post('/checkquestion/:userId', auth, quizController.checkQuestion);


module.exports = router;