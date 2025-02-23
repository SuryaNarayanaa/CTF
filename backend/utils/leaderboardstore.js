let leaderboard = [];
let rankMapping = {};

// Binary search for insertion index in descending order
const binarySearchInsertIndex = (arr, score, flag) => {
    let low = 0, high = arr.length;
    while (low < high) {
        const mid = Math.floor((low + high) / 2);
        // Compare on score first then on flag
        if (arr[mid].score < score || (arr[mid].score === score && arr[mid].flag < flag)) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }
    return low;
};

// Update leaderboard for a given userId, score, team_name, and flag
const updateLeaderboard = (userId, score, team_name, flag) => {
    console.log("updateLeaderboard",userId, score, team_name, flag);
    // Remove previous record for this user if exists
    leaderboard = leaderboard.filter(entry => entry.userId !== userId);
    // Use the binary search with flag as parameter to find the correct insertion index
    const index = binarySearchInsertIndex(leaderboard, score, flag);
    leaderboard.splice(index, 0, { userId, score, team_name, flag });

    // Rebuild the rank mapping for modest leaderboard sizes:
    leaderboard.forEach((entry, idx) => {
        rankMapping[entry.userId] = idx + 1;
    });

    // Optionally, emit an io event here.
};

// Get the entire leaderboard with rank numbers (1-indexed)
const getLeaderboard = () => {
    return leaderboard.map((entry, index) => ({
        team_name: entry.team_name,
        score: entry.score,
        flag: entry.flag,
        rank: index + 1
    }));
};

// Get individual user's rank (O(1) lookup)
const getRankForUser = (userId) => {
    return rankMapping[userId] || 0;
};

module.exports = {
    updateLeaderboard,
    getLeaderboard,
    getRankForUser
};