import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Shield, Award, User } from 'lucide-react';

const ViewTeams = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('/Admin/teams');
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
    fetchTeams();
  }, []);

  const handleSelectTeam = (team) => {
    setSelectedTeam(team);
    setShowDetails(true);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center mb-6">
        <Shield className="w-8 h-8 text-cyan-500 mr-2" />
        <h2 className="text-2xl font-bold text-cyan-500 font-['Press_Start_2P']">Team Database</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((team) => (
          <div
            key={team._id}
            className="p-4 bg-gray-100 rounded-lg border border-cyan-500/30 hover:border-cyan-500 
                     transition-all duration-300 cursor-pointer group"
            onClick={() => handleSelectTeam(team)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-cyan-500 group-hover:text-cyan-400 font-['Press_Start_2P']">
                {team.name}
              </h3>
              <span className="text-sm text-cyan-500/70 font-['Press_Start_2P']">
                {team.totalUsers} Users
              </span>
            </div>
            <div className="flex items-center text-cyan-500/70 mt-2 font-['Press_Start_2P']">
              <Award className="w-5 h-5 mr-2" />
              <span>Score: {team.score}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedTeam && (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex justify-center items-center">
          <div className="w-full max-w-2xl p-6 bg-gray-100 rounded-lg border border-cyan-500/30 
                        shadow-xl shadow-cyan-500/20">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <Shield className="w-6 h-6 text-cyan-500 mr-2" />
                <h2 className="text-2xl font-bold text-cyan-500 font-['Press_Start_2P']">
                  {selectedTeam.name}
                </h2>
              </div>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center text-cyan-500">
                  <Award className="w-5 h-5 mr-2" />
                  <span className="font-semibold font-['Press_Start_2P']">Score: {selectedTeam.score}</span>
                </div>
                <div className="flex items-center text-cyan-500">
                  <User className="w-5 h-5 mr-2" />
                  <span className="font-semibold font-['Press_Start_2P']">
                    {selectedTeam.totalUsers} Users
                  </span>
                </div>
              </div>

              <div className="bg-gray-200 p-4 rounded-lg border border-cyan-500/20">
                <p className="text-gray-600 font-['Press_Start_2P']">{selectedTeam.description}</p>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {selectedTeam.user.map((user, index) => (
                  <div
                    key={user._id || index}
                    className="bg-gray-200 p-2 rounded-lg border border-cyan-500/20 flex justify-between items-center"
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

            <button
              onClick={() => setShowDetails(false)}
              className="mt-6 w-full py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-md 
                       transition-all duration-300 flex items-center justify-center space-x-2 font-['Press_Start_2P']"
            >
              <X className="w-4 h-4" />
              <span>Close</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTeams;