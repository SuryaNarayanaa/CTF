import {createBrowserRouter,createRoutesFromElements,Route,Navigate,RouterProvider} from 'react-router-dom'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import {Provider} from 'react-redux'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import QuestionPage from './pages/QuestionPage'
import LeaderBoardPage from './pages/LeaderBoardPage'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import ProtectedAdminRoute from './components/ProtectedAdminRoute.jsx'
import CreateQuestion from './components/admin/CreateQuestion.jsx'
import ViewQuestions from './components/admin/ViewQuestions.jsx'
import {loader as homeloader} from './pages/HomePage.jsx'
import React  from 'react'


import store, { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';


const queryclient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      refetchOnReconnect:true,
      staleTime: 300000,
      cacheTime: 600000,
    },
  },
});


const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' >
      <Route index element={<HomePage/>} loader={homeloader(queryclient)}/>
      <Route element={<ProtectedRoute/>}>
        <Route path='challenges' element={<QuestionPage/>}/>
        <Route path='leaderboard' element={<LeaderBoardPage/>}/>
      </Route>
      <Route element={<ProtectedAdminRoute/>}>
        <Route path='admin' element={<AdminPage/>}>
          <Route path="create-question" element={<CreateQuestion />} />
          <Route path="view-questions" element={<ViewQuestions />} />
        </Route>
      </Route>
      <Route path='*' element={<Navigate to='/' replace/>}/>
  </Route>
))



function App() {
  return (
    <QueryClientProvider client={queryclient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={router}/>
          </PersistGate>
        </Provider>
        {/*<ReactQueryDevtools initialIsOpen={false}/>*/}
    </QueryClientProvider>
  )
}

export default App
