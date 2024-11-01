import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Shield, Award, User, Flag } from 'lucide-react';

const ViewTeams = () => {
  const [participants, setParticipants] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get('/Admin/participants');
        setParticipants(response.data);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };
    fetchParticipants();
  }, []);

  const handleSelectParticipant = (participant) => {
    setSelectedParticipant(participant);
    setShowDetails(true);
  };

  const handleCloseModal = () => {
    setShowDetails(false);
    setSelectedParticipant(null); // Reset selected participant
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center mb-6">
        <Shield className="w-8 h-8 text-green-500 mr-2" />
        <h2 className="text-2xl font-bold text-green-500 font-['Press_Start_2P']">Participants Database</h2>
      </div>

      {/* Grid of Participants */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {participants.map((participant) => (
          <div
            key={participant._id}
            className="p-4 bg-gray-100 rounded-lg border border-green-500/30 hover:border-green-500 
                     transition-all duration-300 cursor-pointer group"
            onClick={() => handleSelectParticipant(participant)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-green-500 group-hover:text-green-400 font-['Press_Start_2P']">
                Team ID: {participant.team}
              </h3>
              <span className="text-sm text-green-500/70 font-['Press_Start_2P']">
                {participant.user.length} Users
              </span>
            </div>
            <div className="flex items-center text-green-500/70 mt-2 font-['Press_Start_2P']">
              <Award className="w-5 h-5 mr-2" />
              <span>Score: {participant.score}</span>
            </div>
            <div className="flex items-center text-green-500/70 mt-2 font-['Press_Start_2P']">
              <Flag className="w-5 h-5 mr-2" />
              <span>Flags: {participant.flags}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {showDetails && selectedParticipant && (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex justify-center items-center">
          <div className="w-full max-w-2xl p-6 bg-gray-100 rounded-lg border border-green-500/30 
                        shadow-xl shadow-green-500/20">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <Shield className="w-6 h-6 text-green-500 mr-2" />
                <h2 className="text-2xl font-bold text-green-500 font-['Press_Start_2P']">
                  Team ID: {selectedParticipant.team}
                </h2>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center text-green-500">
                  <Award className="w-5 h-5 mr-2" />
                  <span className="font-semibold font-['Press_Start_2P']">Score: {selectedParticipant.score}</span>
                </div>
                <div className="flex items-center text-green-500">
                  <Flag className="w-5 h-5 mr-2" />
                  <span className="font-semibold font-['Press_Start_2P']">Flags: {selectedParticipant.flags}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {selectedParticipant.user.map((user, index) => (
                  <div
                    key={user._id || index}
                    className="bg-gray-200 p-2 rounded-lg border border-green-500/20 flex justify-between items-center"
                  >
                    <div className="text-sm text-gray-600 font-['Press_Start_2P']">
                      {typeof user === 'object' ? (
                        <>
                          <span className="font-medium">{user.name || 'Name not available'}</span>
                          {user.email && <span className="ml-2">{user.email}</span>}
                        </>
                      ) : (
                        `User ID: ${user}`
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="mt-6 w-full py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md 
                       transition-all duration-300 flex items-center justify-center space-x-2 font-['Press_Start_2P']"
            >
              <span>Close</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTeams;
