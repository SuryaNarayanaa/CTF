const adminController = {
    getQuestions: (req, res) => {
        res.send("Admin: Get all questions");
    },
    createQuestion: (req, res) => {
        res.send("Admin: Create a new question");
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
    updateQuestion: (req, res) => {
        const questionId = req.params.id;
        res.send(`Admin: Update question with ID ${questionId}`);
    },
    deleteQuestion: (req, res) => {
        const questionId = req.params.id;
        res.send(`Admin: Delete question with ID ${questionId}`);
    },
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
