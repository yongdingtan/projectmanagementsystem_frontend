/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux'
import ProjectList from '../ProjectList/ProjectList'
import { useEffect } from 'react'
import { fetchProjects } from '../../redux/project/action'

const Home = () => {
  const dispatch = useDispatch()
  const {auth} = useSelector(store => store)

  useEffect(() => {
    dispatch(fetchProjects({}))
  },[auth.jwt])
  return (
    <div>
      <ProjectList></ProjectList>
    </div>
  )
}

export default Home
