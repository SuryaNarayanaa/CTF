const { get } = require('mongoose');
const CtfQuestion = require('../models/CtfQuestion');
const Team = require('../models/Team');
const Participant = require('../models/Participant');
const User = require('../models/User');
const CtfSubmission = require('../models/CtfSubmission');


const ctfQuestionService = {
    

    getAllQuestions: async () => {
        return await CtfQuestion.find();
    },

    getQuestionByName: async (title) => {
        return await CtfQuestion.findOne({ title });
    },

    createQuestion: async (questionData) => {
        const newQuestion = new CtfQuestion(questionData);
        return await newQuestion.save();
    },

    updateQuestion: async (questionData) => {
        const { id, title, description, points, answer } = questionData;
        const updatedQuestion = await CtfQuestion.findByIdAndUpdate(
            id,
            { title, description, points, answer },
            { new: true }
        );
        return updatedQuestion;
    },

    deleteQuestion: async (questionId) => {
        return await CtfQuestion.findByIdAndDelete(questionId);
    },

    getParticipants: async () => {
        try {
            const teams = await Team.find();
            const users = await User.find();

            for (const team of teams) {
                let existingParticipant = await Participant.findOne({ team: team._id });
                const ctfSubmissionIds = await CtfSubmission.find({ team: team._id }).select('_id');
                score_and_flags = await ctfQuestionService.getTeamScoreById(team._id);

                if (existingParticipant) {
                    existingParticipant.score = score_and_flags.score;
                    existingParticipant.flags = score_and_flags.correctSubmissions;
                    existingParticipant.ctfSubmissions = ctfSubmissionIds;
                    await existingParticipant.save();
                } else {
                    const newParticipant = new Participant({
                        team: team._id,
                        user: users.map(user => user._id),
                        ctfSubmissions: ctfSubmissionIds,
                        score: score_and_flags.score,
                        flags: score_and_flags.correctSubmissions
                    });
                    await newParticipant.save();
                }
            }

            return await Participant.find();
        } catch (error) {
            console.error('Error adding teams to participants:', error);
            throw new Error('Error adding teams to participants');
        }
    },

    getLeaderboard: async () => {
        const teams = await Team.find().sort({ score: -1 });
        const leaderboard = teams.map(team => ({
            team: team.name,
            flags: team.flag,
            score: team.score
        }));
        
        return leaderboard;
    },

    getDashboard: async () => {
        const questions = await CtfQuestion.find();
        const teams = await Team.find();
        const submissions = await CtfSubmission.find();
        const leaderboard = await ctfQuestionService.getLeaderboard();
        return { questions, teams, submissions, leaderboard };
    }
};

module.exports = ctfQuestionService;
