const CtfQuestion = require('../models/ctfQuestion');
const Team  = require('../models/Team');
const ctfQuestionService = 
    {
        getAllQuestions : async ()=>
        {
            return await CtfQuestion.find();
        }, 
        

        getQuestionByName :  async (title) =>
        {
            return await CtfQuestion.findOne({title});
        },
        

        createQuestion : async (questionData) =>
        {
            const newQuestion  =  new CtfQuestion(questionData);
            return await newQuestion.save();
        },

        updateQuestion : async (questionData) =>
        {
            const { id, title, description, points, answer } = questionData;


            const updatedQuestion = await CtfQuestion.findByIdAndUpdate(
                id,
                { title, description, points, answer },
                { new: true }
            );

            return await updatedQuestion;
        },


        deleteQuestion : async (questionId) =>
        {
            return await CtfQuestion.findByIdAndDelete(questionId);
        }

    }

module.exports = ctfQuestionService;