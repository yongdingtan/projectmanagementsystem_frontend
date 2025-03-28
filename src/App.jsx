/* eslint-disable react-hooks/exhaustive-deps */
import './App.css'
import Home from "./pages/Home/Home"
import Navbar from './pages/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import ProjectDetail from './pages/ProjectDetail/ProjectDetail'
import IssueDetail from './pages/IssueDetail/IssueDetail'
import Subscription from './pages/Subscription/Subscription'
import Auth from './pages/Auth/Auth'
import { useEffect } from 'react'
import { getUser } from './redux/auth/action'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects } from './redux/project/action'
import UpgradeResult from './pages/Subscription/UpgradeResult'
import AcceptInvitation from './pages/Invitation/AcceptInvitation'

function App() {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!auth.user) {
      dispatch(getUser());
    }
    dispatch(fetchProjects({}));
  }, [auth.jwt]);
  

  return (
    <>
      {
        auth.user ? (
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/project/:projectId/issue/:issueId" element={<IssueDetail />} />
              <Route path="/upgrade_plan" element={<Subscription />} />
              <Route path="/upgrade_plan/success" element={<UpgradeResult />} />
              <Route path="/api/project/accept_invitation" element={<AcceptInvitation />} />
              <Route path="/invitation-failed" element={<p>Invitation Failed</p>} />
              <Route path="/invitation-error" element={<p>Invalid Invitation</p>} />
              {/* Add a catch-all route for unknown paths */}
              <Route path="*" element={<p>Not Found</p> } />
            </Routes>
          </div>
        ) : <Auth />
      }
    </>
  )
}

export default App
