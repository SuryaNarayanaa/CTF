const CtfQuestion = require('../models/CtfQuestion');
const CtfSubmission = require('../models/CtfSubmission'); 
const {getQuestionByName} = require('./adminService');
const {findTeamByName} = require('./teamService');




const CtfService = 
{
    getAllQuestions: async () => 
    {
        return await CtfQuestion.find();
    },


    submitAnswer: async (teamName, questionTitle, submittedAnswer) => {
        const question = await getQuestionByName(questionTitle);
        const team = await findTeamByName(teamName);
    
        if (!question || !team) return null;
    
        const isCorrect = submittedAnswer === question.answer;
    
        let submission = await CtfSubmission.findOne({ team: team._id, question: question._id });
        if (!submission) {
            // New submission
            submission = new CtfSubmission({
                team: team._id,
                question: question._id,
                answer: submittedAnswer,
                isCorrect: isCorrect
            });
            await submission.save();
        } else {
            // Update existing submission
            submission.answer = submittedAnswer;
            submission.isCorrect = isCorrect;
            await submission.save();
        }
    
        // Update team score immediately if answer is correct
        if (isCorrect) {
            team.score += question.points;
            team.flag+=1;
            await team.save();
        }
    
        return submission;
    },
     




    getTeamScore: async (teamName) => {
        const team = await findTeamByName(teamName);
        if (!team) {
            return null;
        }

        const submissions = await CtfSubmission.find({ team: team._id, isCorrect: true });
        return submissions.length;
    }, 
    getTeamScoreById : async (teamId) =>
        {
            const submissions = await CtfSubmission.find({ team : teamId, isCorrect: true });
            return submissions.length;
        },



    getQuestionById: async (questionId) => 
    {
        return await CtfQuestion.findById(questionId);
    },

    getSubid:async (teamId,questionID ) => 
        {
            return await CtfSubmission.findOne({team:teamId,question:questionID});
        }
    


}


module.exports = CtfService;