const CtfSubmission = require('../models/CtfSubmission');
const CtfService  = require('../service/ctfService');
const { ObjectId } = require('mongoose').Types;
const teamService =  require('../service/teamService')
const ctfController = {


    getQuestions: async  (req, res) => {
       res.send(await CtfService.getAllQuestions());
    },

    


    submitAnswer: async (req, res) => {
        console.log("Request body:", req.body);  // Log the request body
        const { teamName, title, answer } = req.body;
    
        if (!teamName || !title || !answer) {
            return res.status(400).json({ error: "teamName, title, and answer are required" });
        }
    
        try {
            const submission = await CtfService.submitAnswer(teamName, title, answer);
            
            if (!submission) {
                return res.status(400).json({ error: "Invalid team or question" });
            }
            
            res.json(submission);
        } catch (error) {
            console.error("Error processing answer submission:", error);
            res.status(500).json({ error: "Internal server error" });
        }
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
    },

    correct:async(req,res)=>{
        const {questionId,teamName}=req.body;
        const team = await teamService.findTeamByName(teamName);
        const submission = await CtfSubmission.find({
            question: questionId
        }).populate('team');
        
        const matchingSubmission = submission.find(sub => sub.team?.name == teamName);
        if(!matchingSubmission) res.json({ correct: false });
        else if (matchingSubmission) {
            res.json({ correct: matchingSubmission.isCorrect });
        }
        
    }
};

module.exports = ctfController;
