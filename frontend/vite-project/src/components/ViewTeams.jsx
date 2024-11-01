import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Shield, Award, User, Flag, AlertCircle } from 'lucide-react';

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

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-center mb-8">
        <Shield className="w-6 h-6 text-emerald-500" />
        <h2 className="ml-2 text-xl font-['Press_Start_2P'] text-emerald-600">
          Teams Database
        </h2>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {participants.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
            <AlertCircle className="w-12 h-12 mb-4 text-emerald-400" />
            <p className="text-lg font-medium">No teams available</p>
          </div>
        ) : (
          participants.map((participant) => (
            <div
              key={participant._id}
              onClick={() => handleSelectParticipant(participant)}
              className="bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200 
                       hover:border-emerald-400 transition-all duration-200 cursor-pointer"
            >
              <div className="p-4">
                {/* Team Header */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-900">
                    Team {participant.team}
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs 
                                 font-medium bg-emerald-100 text-emerald-800">
                    {participant.user.length} Members
                  </span>
                </div>

                {/* Team Stats */}
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Award className="w-4 h-4 mr-2" />
                    <span className="text-sm">Score: {participant.score}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Flag className="w-4 h-4 mr-2" />
                    <span className="text-sm">Flags: {participant.flags}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Team Details Modal */}
      {showDetails && selectedParticipant && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-emerald-500" />
                  <h3 className="ml-2 text-lg font-medium text-gray-900">
                    Team {selectedParticipant.team}
                  </h3>
                </div>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Team Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-emerald-50 rounded-lg p-4">
                  <div className="flex items-center text-emerald-700">
                    <Award className="w-5 h-5 mr-2" />
                    <span className="font-medium">Score</span>
                  </div>
                  <p className="mt-1 text-2xl font-semibold text-emerald-900">
                    {selectedParticipant.score}
                  </p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4">
                  <div className="flex items-center text-emerald-700">
                    <Flag className="w-5 h-5 mr-2" />
                    <span className="font-medium">Flags</span>
                  </div>
                  <p className="mt-1 text-2xl font-semibold text-emerald-900">
                    {selectedParticipant.flags}
                  </p>
                </div>
              </div>

              {/* Team Members */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-3">Team Members</h4>
                <div className="space-y-2">
                  {selectedParticipant.user.map((user, index) => (
                    <div
                      key={user._id || index}
                      className="flex items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <User className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {typeof user === 'object' ? user.name || 'Name not available' : `User ${index + 1}`}
                        </p>
                        {user.email && (
                          <p className="text-sm text-gray-500">{user.email}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Close Button */}
              <div className="mt-6">
                <button
                  onClick={() => setShowDetails(false)}
                  className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 
                           transition-colors duration-200 font-medium focus:outline-none focus:ring-2 
                           focus:ring-emerald-500 focus:ring-offset-2"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTeams;