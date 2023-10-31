// import { UseUserDetails } from "../context/UserContext";
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import HomeTestTemplate from '../components/templates/HomeTestTemplate';
import { requestWithTokenRefresh } from '../utils/AuthService'
import { EVALUATION_ENDPOINT } from '../utils/constants';


const HomeTest = () => {
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
    <div className='flex justify-center min-h-screen'>
      {assessments && (
        <HomeTestTemplate assessments={assessments}/>
      )}
    </div>
  )
}

export default HomeTest