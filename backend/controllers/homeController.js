const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const { getLeaderboard } = require('../utils/leaderboardStore.js');


const getLeaderboardEndpoint = asyncHandler(async (req, res) => {
    const leaderboardData = getLeaderboard(); // Already sorted with ranks
    res.status(200).json(new ApiResponse(200, leaderboardData, "Leaderboard fetched"));
});

module.exports = { getLeaderboard: getLeaderboardEndpoint };