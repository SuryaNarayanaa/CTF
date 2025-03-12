const mongoose = require('mongoose');
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
    
    // Start a Mongoose session and transaction.
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        let boardDoc = await Leaderboard.findOne().session(session);
        if (!boardDoc) {
            boardDoc = new Leaderboard({ entries: [] });
        }
        const entries = boardDoc.entries;
        
        // Remove any existing entry for the user.
        const existingIndex = entries.findIndex(entry => entry.userId.toString() === userId);
        if (existingIndex !== -1) {
            entries.splice(existingIndex, 1);
        }
        
        // Find the proper index for insertion based on score and flag.
        const insertIndex = binarySearchInsertIndex(entries, score, flag);
        entries.splice(insertIndex, 0, { userId, team_name, score, flag, rank: insertIndex + 1 });
        
        // Recalculate ranks for updated entries.
        for (let i = 0; i < entries.length; i++) {
           entries[i].rank = i + 1;
        }
        boardDoc.entries = entries;
        
        // Save the document inside the transaction
        await boardDoc.save({ session });
        
        // Commit transaction
        await session.commitTransaction();
        session.endSession();
        
        // Emit leaderboard update
        if (global.io) {
            const rankedLeaderboard = entries.map((entry, idx) => ({
                userId: entry.userId,
                team_name: entry.team_name,
                score: entry.score,
                flag: entry.flag,
                rank: entry.rank
            }));
            global.io.emit('leaderboardUpdated', rankedLeaderboard);
            if (socketId) {
                global.io.to(socketId).emit("Userrank", rankedLeaderboard[insertIndex]);
            } else {
                global.io.emit("Userrank", rankedLeaderboard[insertIndex]);
            }
        } else {
            console.error("Socket.io not initialized, cannot emit leaderboard update");
        }
    } catch (error) {
        // Abort transaction on error
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

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

const getRankForUser = async (userId) => {
    const leaderboardDoc = await Leaderboard.findOne();
    if (!leaderboardDoc) return 0;
    const { entries } = leaderboardDoc;
    const index = entries.findIndex(entry => entry.userId.toString() === userId);
    return index === -1 ? null : entries[index];
};

module.exports = {
    updateLeaderboard,
    getLeaderboard,
    getRankForUser
};