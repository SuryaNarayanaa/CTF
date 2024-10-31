import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ViewTeams from '../components/ViewTeams';
import CreateQuestion from '../components/CreateQuestion';
import ViewQuestions from '../components/ViewQuestions';
import { Shield, Database, Eye } from 'lucide-react';

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      {/* Cyber-themed Header */}
      <div className="bg-white/95 backdrop-blur-sm py-2 border-b border-emerald-400/20">
        <h1 className="text-4xl font-bold text-emerald-400 mb-2 tracking-wider font-['Press_Start_2P'] text-center">
          SECURITY ADMIN PORTAL
        </h1>
        <div className="h-1 w-32 bg-emerald-400 mx-auto rounded-full animate-pulse"></div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 py-2">
        <div className="max-w-7xl mx-auto px-8">
          {/* Navigation Grid - Wide Spacing */}
          <div className="grid grid-cols-3 gap-24 mb-4">
            <Link
              to="view-teams"
              className="flex flex-col items-center p-3 rounded-lg bg-gray-100 border border-emerald-400/30 hover:border-emerald-400 transition-all hover:shadow-lg hover:shadow-emerald-400/20 group"
            >
              <Shield className="w-8 h-8 text-emerald-400 mb-2 group-hover:animate-pulse" />
              <span className="text-emerald-400 font-semibold tracking-wide font-['Press_Start_2P'] text-sm">
                View Teams
              </span>
            </Link>

            <Link
              to="create-question"
              className="flex flex-col items-center p-3 rounded-lg bg-gray-100 border border-emerald-400/30 hover:border-emerald-400 transition-all hover:shadow-lg hover:shadow-emerald-400/20 group"
            >
              <Database className="w-8 h-8 text-emerald-400 mb-2 group-hover:animate-pulse" />
              <span className="text-emerald-400 font-semibold tracking-wide font-['Press_Start_2P'] text-sm">
                Create Question
              </span>
            </Link>

            <Link
              to="view-questions"
              className="flex flex-col items-center p-3 rounded-lg bg-gray-100 border border-emerald-400/30 hover:border-emerald-400 transition-all hover:shadow-lg hover:shadow-emerald-400/20 group"
            >
              <Eye className="w-8 h-8 text-emerald-400 mb-2 group-hover:animate-pulse" />
              <span className="text-emerald-400 font-semibold tracking-wide font-['Press_Start_2P'] text-sm">
                View Questions
              </span>
            </Link>
          </div>

          {/* Dashboard Content - Centered */}
          <div className="flex-1 bg-white/90 rounded-lg shadow-2xl border border-emerald-400/20 backdrop-blur-sm">
            <div className="bg-gray-100/95 rounded-lg p-6 border border-emerald-400/20 overflow-y-auto h-[calc(100vh-16rem)]">
              <div className="max-w-3xl mx-auto"> {/* Center container for form */}
                <Routes>
                  <Route path="view-teams" element={<ViewTeams />} />
                  <Route path="create-question" element={<CreateQuestion />} />
                  <Route path="view-questions" element={<ViewQuestions />} />
                </Routes>
              </div>
            </div>
          </div>

          {/* Compact Footer */}
          <div className="text-center text-emerald-400/60 py-2 mt-2">
            <p className="text-xs font-['Press_Start_2P']">Secure Administration Portal • Version 2.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;