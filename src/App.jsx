import './App.css'
import Home from "./pages/Home/Home"
import Navbar from './pages/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import ProjectDetail from './pages/ProjectDetail/ProjectDetail'
import IssueDetail from './pages/IssueDetail/IssueDetail'
import Subscription from './pages/Subscription/Subscription'

function App() {

  return (
    <>
    <Navbar/>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project/:id" element={<ProjectDetail />} />
      <Route path="/project/:projectId/issue/:issueId" element={<IssueDetail />} />
      <Route path="/upgrade_plan" element={<Subscription />} />
     </Routes>
    </>
  )
}

export default App
