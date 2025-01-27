/* eslint-disable no-constant-condition */
import './App.css'
import Home from "./pages/Home/Home"
import Navbar from './pages/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import ProjectDetail from './pages/ProjectDetail/ProjectDetail'
import IssueDetail from './pages/IssueDetail/IssueDetail'
import Subscription from './pages/Subscription/Subscription'
import Auth from './pages/Auth/Auth'

function App() {

  return (
    <>

     {
      false ?   <div>
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
