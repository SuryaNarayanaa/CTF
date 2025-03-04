const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const { getLeaderboard } = require('../utils/leaderboardstore.js');


const getLeaderboardEndpoint = asyncHandler(async (req, res) => {
    const leaderboardData = await getLeaderboard(); // Already sorted with ranks
    console.log(leaderboardData);
    res.status(200).json(new ApiResponse(200, leaderboardData, "Leaderboard fetched"));
});

module.exports = { getLeaderboard: getLeaderboardEndpoint };