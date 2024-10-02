const { get } = require('mongoose');
const CtfQuestion = require('../models/ctfQuestion');
const { getTeamScoreById} = require('./ctfService');
const Team  = require('../models/Team');
const Participant = require('../models/participant');
const User = require('../models/User');
const CtfSubmission = require('../models/ctfSubmission');
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
        },


        


        getParticipants :  async () => {
            try {
                // Fetch all teams
                const teams = await Team.find();
    
                // Fetch all users
                const users = await User.find();
    
                // Loop through each team
                for (const team of teams) {
                    // Check if the participant already exists for this team
                    let existingParticipant = await Participant.findOne({ team: team._id });
    
                    // Prepare an array for CtfSubmissions (optional; adjust according to your logic)
                    const ctfSubmissionIds = await CtfSubmission.find({ team: team._id }).select('_id'); // Assuming submissions are tied to teams
    
                    // If participant exists, update the fields
                    if (existingParticipant) {
                        existingParticipant.score = await getTeamScoreById(team._id);
                        existingParticipant.ctfSubmissions = ctfSubmissionIds; // Update the submissions
                        await existingParticipant.save(); // Save the updated participant
                    } else {
                        // Create a new participant if it doesn't exist
                        const newParticipant = new Participant({
                            team: team._id,
                            user: users.map(user => user._id), // Assuming all users can be part of the team
                            ctfSubmissions: ctfSubmissionIds, // Add the CtfSubmission IDs
                            score: getTeamScoreById(team._id) // Default score
                        });
                        await newParticipant.save(); // Save the new participant
                    }
                }

                return await Participant.find(); // Return all participants
            } catch (error) {
                console.error('Error adding teams to participants:', error);
                throw new Error('Error adding teams to participants');
            }
        },

        

        getLeaderboard : async () =>
        {
            const teams = await Team.find();
            const leaderboard = [];
            for (const team of teams) {
                const submissions = await CtfSubmission.find({ team: team._id, isCorrect: true });
                leaderboard.push({ team: team.name, score: submissions.length });
            }
            leaderboard.sort((a, b) => b.score - a.score);
            return leaderboard;
        },




        getDashboard : async () =>
        {
            const questions = await CtfQuestion.find();
            const teams = await Team.find();
            const submissions = await CtfSubmission.find();
            const leaderboard = await ctfQuestionService.getLeaderboard();
            return {questions  :  questions,teams : teams,submissions:  submissions, leaderboard:  leaderboard };
        }

    }

module.exports = ctfQuestionService;