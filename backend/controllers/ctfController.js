const CtfService  = require('../service/ctfService');

const ctfController = {


    getQuestions: async  (req, res) => {
       res.send(await CtfService.getAllQuestions());
    },




    submitAnswer: async (req, res) => {
        const teamName = req.body.teamName;
        const questionTitle  =  req.body.title;
        const submittedAnswer = req.body.answer || "";

        const submission  = await CtfService.submitAnswer(teamName, questionTitle, submittedAnswer);
        if(!submission)
        {
            res.status(400).send("Invalid team or question");
            return;
        }
        res.send(submission);
    },



    getCurrentScore: async (req, res) => {
        const teamName = req.body.teamName;

        if (!teamName) {
            res.status(400).send("Team name is required");
            return;
        }

        const score = await CtfService.getTeamScore(teamName);
        if (score === null) {
            res.status(404).send("Team not found");
            return;
        }

        res.send({ teamName, score });
    },



    getQuestionById: async (req, res) => {
        const questionId = req.params.id;
        const question = await CtfService.getQuestionById(questionId);

        if (!question) {
            res.status(404).send("Question not found");
            return;
        }

        res.send(question);
    }
    
};

module.exports = ctfController;
