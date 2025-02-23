let leaderboard = [];
let rankMapping = {};

// Binary search for insertion index in descending order
const binarySearchInsertIndex = (arr, score) => {
    let low = 0, high = arr.length;
    while (low < high) {
        const mid = Math.floor((low + high) / 2);
        if (arr[mid].score < score || (arr[mid].score === score && arr[mid].flag < flag)) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }
    return low;
};

// Update leaderboard for a given userId and score
const updateLeaderboard = (userId, score, team_name, flag) => {
    // Remove previous record for this user if exists
    leaderboard = leaderboard.filter(entry => entry.userId !== userId);
    // Find the correct insertion index and insert
    const index = binarySearchInsertIndex(leaderboard, score);
    leaderboard.splice(index, 0, { userId, score, team_name, flag });

    // Rebuild the rank mapping for affected entries (or whole array)
    // For modest leaderboard sizes, re-calc every entry:
    leaderboard.forEach((entry, idx) => {
        rankMapping[entry.userId] = idx + 1;
    });

    //emit an io event - 
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