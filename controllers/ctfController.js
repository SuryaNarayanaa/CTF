const ctfController = {
    getQuestions: (req, res) => {
        res.send("CTF: Get all questions");
    },
    submitAnswer: (req, res) => {
        res.send("CTF: Submit an answer");
    },
    getScore: (req, res) => {
        res.send("CTF: Get score");
    }
};

module.exports = ctfController;
