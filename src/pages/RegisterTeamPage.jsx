import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router'
import RegisterTeamTemplate from '../components/templates/RegisterTeamTemplate'
import { BACKEND_URL } from '../utils/constants'
import { requestWithTokenRefresh } from '../utils/AuthService'

const ResigterTeam = () => {
  const navigate = useNavigate()
  const [teams, setTeams] = useState()

  const fetchTeams = useCallback(async () => {
    const resp = await requestWithTokenRefresh(BACKEND_URL + 'api/team/list/', {}, navigate)
      const data = await resp.json()
      setTeams(data)
  },[navigate])

  useEffect(() => {
    fetchTeams()
  }, [fetchTeams])

  return (
    <div className='relative top-16 flex justify-center h-[calc(100vh-4rem)]'>
        <RegisterTeamTemplate
          teams={teams}
          refreshData={fetchTeams}
        />
    </div>)
}

export default ResigterTeam