const CtfQuestion = require('../models/ctfQuestion');
const CtfSubmission = require('../models/ctfSubmission'); 
const {getQuestionByName} = require('./adminService');
const {findTeamByName} = require('./teamService');




const CtfService = 
{
    getAllQuestions: async () => 
    {
        return await CtfQuestion.find();
    },


    submitAnswer : async (teamName, questionTitle, submittedAnswer) =>
    {
        const question = await getQuestionByName(questionTitle);
        const team = await findTeamByName(teamName);
        const isCorrect =  submittedAnswer === question.answer;

        if(!team || !question)
        {
            return null;
        }

        let submission = await CtfSubmission.findOne({team: team._id, question: question._id});
        if(!submission)
        {
            submission = new CtfSubmission({team: team._id, question: question._id,answer : submittedAnswer,isCorrect  : isCorrect});
            await submission.save();

        }
        else
        {
            submission.answer = submittedAnswer;
            submission.isCorrect = isCorrect;
            await submission.save();
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
    }




}


module.exports = CtfService;