/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import ProjectList from '../ProjectList/ProjectList';
import { useEffect } from 'react';
import { fetchProjects } from '../../redux/project/action';

const Home = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth); // ✅ Select only the 'auth' slice

  useEffect(() => {
    dispatch(fetchProjects({}));
  }, [auth.jwt]); // This should be used cautiously to avoid unnecessary API calls

  return (
    <div>
      <ProjectList />
    </div>
  );
};

export default Home;
