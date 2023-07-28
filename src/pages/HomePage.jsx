// import { UseUserDetails } from "../context/UserContext";
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import HomeTemplate from '../components/templates/HomeTemplate';
import { requestWithTokenRefresh } from '../utils/AuthService'
import { EVALUATION_ENDPOINT } from '../utils/constants';


const Home = () => {
  const [assessments, setAssessments] = useState()
  const navigate = useNavigate()
  const fetchAssessments = useCallback(async () => {
    const resp = await requestWithTokenRefresh(EVALUATION_ENDPOINT + 'list/', {}, navigate)
    const data = await resp.json()
    setAssessments(data)
  }, [navigate])

  useEffect(() => {
    fetchAssessments()
  }, [fetchAssessments])

  return (
    <div className='relative top-16 flex justify-center h-[calc(100vh-4rem)]'>
      {assessments && (
        <HomeTemplate assessments={assessments}/>
      )}
    </div>
  )
}

export default Home