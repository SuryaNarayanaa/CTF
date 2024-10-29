const adminService = require("../service/adminService");








const adminController = {




    getQuestions: async(req, res) => {
        const allQuestions = await  adminService.getAllQuestions();
        res.send(allQuestions);
    },







    createQuestion: async (req, res) => {
        const { title, description, points, answer } = req.body;
        if (!title || !description || !points || !answer) {
           return res.status(400).send("All fields are required");
        }
        try {
           const newQuestion = await adminService.createQuestion({ title, description, points, answer });
           res.status(201).send(newQuestion);
        } catch (error) {
           console.error("Error creating question:", error);
           res.status(500).send("Error creating question");
        }
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




    getParticipants:async  (req, res) => {
        res.send(await adminService.getParticipants())
    },



    getLeaderboard: async (req, res) => {
        try {
            const leaderboard = await adminService.getLeaderboard();
            res.send(leaderboard);
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            res.status(500).send("Error fetching leaderboard");
        }
    
    },




    




   
    getParticipantById: (req, res) => {
        const participantId = req.params.id;
        res.send(`Admin: Get participant with ID ${participantId}`);
    },




    


    getDashboard: async (req, res) => {
        try {
            const statistics = await adminService.getDashboard();
            res.send(statistics);
        } catch (error) {
            console.error('Error fetching portal statistics:', error);
            res.status(500).send("Error fetching portal statistics");
        }
    }
};

module.exports = adminController;
