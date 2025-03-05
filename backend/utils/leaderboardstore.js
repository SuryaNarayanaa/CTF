const Leaderboard = require('../models/Leaderboard');


const binarySearchInsertIndex = (arr, score, flag) => {
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

const updateLeaderboard = async (userId, score, team_name, flag) => {
    console.log("updateLeaderboard", userId, score, team_name, flag);
    let boardDoc = await Leaderboard.findOne({userId,team_name});
    if (!boardDoc) {
        boardDoc = new Leaderboard({ entries: [] });
    }
    const entries = boardDoc.entries;
    
    const existingIndex = entries.findIndex(entry => entry.userId.toString() === userId);
    if (existingIndex !== -1) {
        entries.splice(existingIndex, 1);
    }
    
    const insertIndex = binarySearchInsertIndex(entries, score, flag);
    entries.splice(insertIndex, 0, { userId, team_name, score, flag });
    

    await boardDoc.save();
    

    const rankedLeaderboard = entries.map((entry, idx) => ({
        userId: entry.userId,
        team_name: entry.team_name,
        score: entry.score,
        flag: entry.flag,
        rank: idx + 1
    }));
    console.log("Updated Leaderboard:", rankedLeaderboard);

    if (global.io) {
        global.io.emit('leaderboardUpdated', rankedLeaderboard);
    } else {
        console.error("Socket.io not initialized, cannot emit leaderboard update");
    }
};

// Return the sorted leaderboard array (with rank computed)
const getLeaderboard = async () => {
    const boardDoc = await Leaderboard.findOne();
    if (!boardDoc) return [];
    return boardDoc.entries.map((entry, idx) => ({
        userId: entry.userId,
        team_name: entry.team_name,
        score: entry.score,
        flag: entry.flag,
        rank: idx + 1
    }));
};

module.exports = {
    updateLeaderboard,
    getLeaderboard
};