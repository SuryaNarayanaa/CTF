import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ViewTeams from '../components/ViewTeams';
import CreateQuestion from '../components/CreateQuestion';
import ViewQuestions from '../components/ViewQuestions';
import { Shield, Database, Eye } from 'lucide-react';

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Cyber-themed Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-cyan-400 mb-2 tracking-wider">
              SECURITY ADMIN PORTAL
            </h1>
            <div className="h-1 w-32 bg-cyan-400 mx-auto rounded-full animate-pulse"></div>
          </div>

          {/* Main Dashboard Container */}
          <div className="bg-gray-800 rounded-lg shadow-2xl border border-cyan-400/20 p-6 backdrop-blur-sm">
            {/* Navigation Grid */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <Link
                to="view-teams"
                className="flex flex-col items-center p-6 rounded-lg bg-gray-900 border border-cyan-400/30 hover:border-cyan-400 transition-all hover:shadow-lg hover:shadow-cyan-400/20 group"
              >
                <Shield className="w-12 h-12 text-cyan-400 mb-3 group-hover:animate-pulse" />
                <span className="text-cyan-400 font-semibold tracking-wide">View Teams</span>
              </Link>

              <Link
                to="create-question"
                className="flex flex-col items-center p-6 rounded-lg bg-gray-900 border border-cyan-400/30 hover:border-cyan-400 transition-all hover:shadow-lg hover:shadow-cyan-400/20 group"
              >
                <Database className="w-12 h-12 text-cyan-400 mb-3 group-hover:animate-pulse" />
                <span className="text-cyan-400 font-semibold tracking-wide">Create Question</span>
              </Link>

              <Link
                to="view-questions"
                className="flex flex-col items-center p-6 rounded-lg bg-gray-900 border border-cyan-400/30 hover:border-cyan-400 transition-all hover:shadow-lg hover:shadow-cyan-400/20 group"
              >
                <Eye className="w-12 h-12 text-cyan-400 mb-3 group-hover:animate-pulse" />
                <span className="text-cyan-400 font-semibold tracking-wide">View Questions</span>
              </Link>
            </div>

            {/* Content Area */}
            <div className="bg-gray-900 rounded-lg p-6 border border-cyan-400/20">
              <Routes>
                <Route path="view-teams" element={<ViewTeams />} />
                <Route path="create-question" element={<CreateQuestion />} />
                <Route path="view-questions" element={<ViewQuestions />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;