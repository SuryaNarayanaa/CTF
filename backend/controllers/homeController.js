const asyncHandler = require('../utils/asyncHandler');
const redis = require('redis');
const redisClient = redis.createClient();
redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.connect().catch(console.error);
const ApiResponse = require('../utils/ApiResponse');

// Implements the leaderboard fetching endpoint that returns top 10 records.
const getLeaderboard = asyncHandler(async (req, res) => {
    // Retrieve top 10 entries (highest scores first)
    // zRange with REV: true and WITHSCORES: true returns an array in the form [member1, score1, member2, score2, ...]
    const leaderboardEntries = await redisClient.zRange('leaderboard', 0, 9, { REV: true, WITHSCORES: true });
    const leaderboard = [];
    // Process the flat array into objects with rank, userId, and score
    for (let i = 0; i < leaderboardEntries.length; i += 2) {
        leaderboard.push({
            userId: leaderboardEntries[i],
            score: parseFloat(leaderboardEntries[i + 1]),
            rank: i / 2 + 1
        });
    }
    res.status(200).json(new ApiResponse(200, leaderboard, "Leaderboard fetched"));
});

module.exports = { getLeaderboard };