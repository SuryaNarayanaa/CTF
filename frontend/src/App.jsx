import {  Route, Navigate, createBrowserRouter, createRoutesFromElements, RouterProvider, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import LeaderboardPage from './pages/LeaderboardPage';
import QuestionPage from './pages/QuestionPage';
import MainLayout from './pages/MainLayout';
import ProtectedLayout from './pages/Protectedlayout';
import {loader as homeloader} from './pages/HomePage'
import {QueryClient,QueryClientProvider} from 'react-query'
import './index.css';


const queryClient = new QueryClient();


const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<MainLayout />}>
    <Route index element={<HomePage />} loader={homeloader(queryClient)} />
    <Route  path='' element={<ProtectedLayout />}>
      <Route path="admin" element={<AdminPage />} />
      <Route path="leaderboard" element={<LeaderboardPage />} />
      <Route path="challenges" element={<QuestionPage />} />
    </Route>
    <Route path='*' element={<Navigate to='/'/>}/>
  </Route>
));



const App = () => {
   return (
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
      </QueryClientProvider>
   )
};

export default App;
