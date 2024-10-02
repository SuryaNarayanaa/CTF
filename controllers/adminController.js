const adminService = require("../service/adminService");








const adminController = {




    getQuestions: async(req, res) => {
        const allQuestions = await  adminService.getAllQuestions();
        res.send(allQuestions);
    },







    createQuestion:async (req, res) => {
        const { title, description, points , answer } = req.body;
        if (!title || !description || !points || !answer) {
            return res.status(400).send("All fields are required");
        }
        const newQuestion =await  adminService.createQuestion({title, description, points, answer});
        res.status(201).send(newQuestion);
    },



    updateQuestion: async (req, res) => {
        const { title, description, points, answer } = req.body;

    try {
        const question = await adminService.getQuestionByName(title);

        if (!question) {
            return res.status(404).send("Question not found");
        }

        const id = question._id; 
      

        const updatedQuestion = await adminService.updateQuestion({
            id,
            title,
            description,
            points,
            answer
        });

        res.send(updatedQuestion);
    } catch (error) {
        console.error('Error updating question:', error);
        res.status(500).send("Error updating question");
    }
    },




    deleteQuestion: async (req, res) => {
        const questionId = req.params.id;
        if (!questionId) {
            return res.status(400).send("Question ID is required");
        }
        try {
            const deletedQuestion = await adminService.deleteQuestion(questionId);
            if (!deletedQuestion) {
                return res.status(404).send("Question not found");
            }
            res.send(deletedQuestion);
        } catch (error) {
            console.error('Error deleting question:', error);
            res.status(500).send("Error deleting question");
        }

    },




    getParticipants: (req, res) => {
        res.send("Admin: Get all participants");
    },




    getLeaderboard: (req, res) => {
        res.send("Admin: Get leaderboard");
    },




    getDashboard: (req, res) => {
        res.send("Admin: Get dashboard");
    },




    // New methods for updating and deleting questions
    
    // New methods for getting and deleting participants
    getParticipantById: (req, res) => {
        const participantId = req.params.id;
        res.send(`Admin: Get participant with ID ${participantId}`);
    },




    deleteParticipant: (req, res) => {
        const participantId = req.params.id;
        res.send(`Admin: Delete participant with ID ${participantId}`);
    }
};

module.exports = adminController;
