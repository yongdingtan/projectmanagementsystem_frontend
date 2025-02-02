/* eslint-disable no-constant-condition */
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

function App() {
  const dispatch = useDispatch()
  const {auth} = useSelector(store => store)

  useEffect(() => {
    dispatch(getUser()),
    dispatch(fetchProjects({}))
  },[auth.jwt])

  return (
    <>

     {
      auth.user?   <div>
      <Navbar/>
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/project/:projectId/issue/:issueId" element={<IssueDetail />} />
        <Route path="/upgrade_plan" element={<Subscription />} />
       </Routes>
       </div>:<Auth/>
     }
    </>
  )
}

export default App
