import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ViewTeams from '../components/ViewTeams';
import CreateQuestion from '../components/CreateQuestion';
import ViewQuestions from '../components/ViewQuestions';
import { Shield, Database, Eye } from 'lucide-react';

const AdminPage = () => {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-y-auto">
      {/* Enhanced Cyberpunk Header */}
      <header className="bg-black/40 border-b border-emerald-500/30 px-4 py-6 md:px-6 md:py-8 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-400 tracking-wider font-['Press_Start_2P'] text-center mb-4 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">
            ADMIN PORTAL
          </h1>
          <div className="flex justify-center space-x-2">
            <div className="h-1 w-8 md:w-12 bg-emerald-500 rounded-full animate-pulse"></div>
            <div className="h-1 w-8 md:w-12 bg-emerald-400 rounded-full animate-pulse delay-75"></div>
            <div className="h-1 w-8 md:w-12 bg-emerald-300 rounded-full animate-pulse delay-150"></div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto px-4 py-6 md:px-4 md:py-8">
        {/* Navigation Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8 max-w-7xl mx-auto">
          <Link
            to="view-teams"
            className="group relative overflow-hidden rounded-xl bg-gray-800/50 hover:bg-gray-800/70
                       border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300
                       p-4 md:p-6 backdrop-blur-sm shadow-lg hover:shadow-emerald-500/10"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-transparent opacity-0
                           group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center">
              <Shield className="w-6 h-6 md:w-8 md:h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
              <span className="ml-2 md:ml-4 font-['Press_Start_2P'] text-xs md:text-sm text-emerald-300 group-hover:text-emerald-200">
                View Teams
              </span>
            </div>
          </Link>

          <Link
            to="create-question"
            className="group relative overflow-hidden rounded-xl bg-gray-800/50 hover:bg-gray-800/70
                       border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300
                       p-4 md:p-6 backdrop-blur-sm shadow-lg hover:shadow-emerald-500/10"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-transparent opacity-0
                           group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center">
              <Database className="w-6 h-6 md:w-8 md:h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
              <span className="ml-2 md:ml-4 font-['Press_Start_2P'] text-xs md:text-sm text-emerald-300 group-hover:text-emerald-200">
                Create Question
              </span>
            </div>
          </Link>

          <Link
            to="view-questions"
            className="group relative overflow-hidden rounded-xl bg-gray-800/50 hover:bg-gray-800/70
                       border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300
                       p-4 md:p-6 backdrop-blur-sm shadow-lg hover:shadow-emerald-500/10"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-transparent opacity-0
                           group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center">
              <Eye className="w-6 h-6 md:w-8 md:h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
              <span className="ml-2 md:ml-4 font-['Press_Start_2P'] text-xs md:text-sm text-emerald-300 group-hover:text-emerald-200">
                View Questions
              </span>
            </div>
          </Link>
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto bg-gray-800/50 rounded-xl shadow-xl border border-emerald-500/20
                       backdrop-blur-sm overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="relative">
              <Routes>
                <Route path="view-teams" element={<ViewTeams />} />
                <Route path="create-question" element={<CreateQuestion />} />
                <Route path="view-questions" element={<ViewQuestions />} />
              </Routes>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
