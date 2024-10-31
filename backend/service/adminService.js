const { get } = require('mongoose');
const CtfQuestion = require('../models/CtfQuestion');
const Team = require('../models/Team');
const Participant = require('../models/Participant');
const User = require('../models/User');
const CtfSubmission = require('../models/CtfSubmission');

const ctfQuestionService = {
    // Helper function to calculate the score for a team
    getTeamScoreById: async (teamId) => {
        // Count only the correct submissions associated with the team
        const correctSubmissions = await CtfSubmission.find({
            team: teamId,
            isCorrect: true
        });

        let score = 0;
        for (const submission of correctSubmissions) {
            const question = await CtfQuestion.findById(submission.question);
            score += question.points;
        }
        return { correctSubmissions: correctSubmissions.length, score };
    },
    

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
        const teams = await Team.find();
        const leaderboard = [];
        for (const team of teams) {
            const scores_and_flags = await ctfQuestionService.getTeamScoreById(team._id);
            leaderboard.push({ team: team.name, flags :scores_and_flags.correctSubmissions, score:  scores_and_flags.score});
        }
        leaderboard.sort((a, b) => b.score - a.score);
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
