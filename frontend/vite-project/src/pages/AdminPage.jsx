import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ViewTeams from '../components/ViewTeams'; // Ensure correct paths
import CreateQuestion from '../components/CreateQuestion';
import ViewQuestions from '../components/ViewQuestions';

const AdminPage = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <nav className="w-1/4 bg-gray-800 h-full flex flex-col items-center p-4 space-y-4">
        <Link to="view-teams" className="hover:bg-cyan-600 w-full p-3 text-center rounded-md">
          View Teams
        </Link>
        <Link to="create-question" className="hover:bg-cyan-600 w-full p-3 text-center rounded-md">
          Create Question
        </Link>
        <Link to="view-questions" className="hover:bg-cyan-600 w-full p-3 text-center rounded-md">
          View Questions
        </Link>
      </nav>
      <div className="flex-grow p-6 overflow-y-auto">
        <Routes>
          <Route path="view-teams" element={<ViewTeams />} />
          <Route path="create-question" element={<CreateQuestion />} />
          <Route path="view-questions" element={<ViewQuestions />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPage;
