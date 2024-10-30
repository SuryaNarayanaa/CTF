import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ViewTeams from '../components/ViewTeams';
import CreateQuestion from '../components/CreateQuestion';
import ViewQuestions from '../components/ViewQuestions';
import { Shield, Database, Eye } from 'lucide-react';

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Cyber-themed Header */}
          <div className="text-center mb-8 sticky top-0 bg-white/95 backdrop-blur-sm py-4 z-10">
            <h1 className="text-4xl font-bold text-cyan-500 mb-2 tracking-wider font-['Press_Start_2P']">
              SECURITY ADMIN PORTAL
            </h1>
            <div className="h-1 w-32 bg-cyan-500 mx-auto rounded-full animate-pulse"></div>
          </div>

          {/* Main Dashboard Container */}
          <div className="bg-white/90 rounded-lg shadow-2xl border border-cyan-500/20 p-6 backdrop-blur-sm mb-8">
            {/* Navigation Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Link
                to="view-teams"
                className="flex flex-col items-center p-6 rounded-lg bg-gray-100 border border-cyan-500/30 hover:border-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-500/20 group"
              >
                <Shield className="w-12 h-12 text-cyan-500 mb-3 group-hover:animate-pulse" />
                <span className="text-cyan-500 font-semibold tracking-wide font-['Press_Start_2P']">
                  View Teams
                </span>
              </Link>

              <Link
                to="create-question"
                className="flex flex-col items-center p-6 rounded-lg bg-gray-100 border border-cyan-500/30 hover:border-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-500/20 group"
              >
                <Database className="w-12 h-12 text-cyan-500 mb-3 group-hover:animate-pulse" />
                <span className="text-cyan-500 font-semibold tracking-wide font-['Press_Start_2P']">
                  Create Question
                </span>
              </Link>

              <Link
                to="view-questions"
                className="flex flex-col items-center p-6 rounded-lg bg-gray-100 border border-cyan-500/30 hover:border-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-500/20 group"
              >
                <Eye className="w-12 h-12 text-cyan-500 mb-3 group-hover:animate-pulse" />
                <span className="text-cyan-500 font-semibold tracking-wide font-['Press_Start_2P']">
                  View Questions
                </span>
              </Link>
            </div>

            {/* Content Area */}
            <div className="bg-gray-100/95 rounded-lg p-6 border border-cyan-500/20 min-h-[60vh]">
              <Routes>
                <Route path="view-teams" element={<ViewTeams />} />
                <Route path="create-question" element={<CreateQuestion />} />
                <Route path="view-questions" element={<ViewQuestions />} />
              </Routes>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-cyan-500/60 py-4">
            <p className="text-sm font-['Press_Start_2P']">Secure Administration Portal • Version 2.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;