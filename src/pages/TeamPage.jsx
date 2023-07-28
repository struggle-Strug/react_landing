import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router'
import TeamTemplate from '../components/templates/TeamTemplate'
import { requestWithTokenRefresh } from '../utils/AuthService'
import { TEAM_ENDPOINT } from '../utils/constants'


const Team = () => {
  const navigate = useNavigate()
  const [teamResults, setTeamResults] = useState()
  const fetchResults = useCallback(async () => {
    const resp = await requestWithTokenRefresh(TEAM_ENDPOINT, {}, navigate)
    const data = await resp.json()
    setTeamResults(data)
  }, [navigate])

  useEffect(() => {
    fetchResults()
  }, [fetchResults])
  return (
    <div className='relative top-16 flex justify-center h-[calc(100vh-4rem)] pb-12'>
      <TeamTemplate data={teamResults}/>
    </div>)
}

export default Team