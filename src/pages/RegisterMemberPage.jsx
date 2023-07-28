import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router'
import RegisterMemberTemplate from '../components/templates/RegisterMemberTemplate'
import { requestWithTokenRefresh } from '../utils/AuthService'
import { MEMBER_ENDPOINT } from '../utils/constants'


const ResigterMember = () => {
  const navigate = useNavigate()
  const [members, setMembers] = useState()
  const [companyTeams, setCompanyTeams] = useState()

  const fetchMembers = useCallback(async () => {
    const resp = await requestWithTokenRefresh(MEMBER_ENDPOINT + 'list/', {}, navigate)
    const data = await resp.json()
    const users = await data.users
    const teams = await data.teams
    const teamsFromResponse = teams.map(t => ({ value: t.id, label: t.team_name }))
    let userTeamArray = [];
    users.forEach(user => {
      let teamArray = [];
      teams.forEach(team => {
        if (user.team_relation.some(userTeam => userTeam.id === team.id)) {
          teamArray.push(1);
        } else {
          teamArray.push("");
        }
      });
      userTeamArray.push(teamArray);
    });
    const memberWithTeamArray = data.users.map((user, index) => ({ ...user, teamArray: userTeamArray[index] }))
    setMembers(memberWithTeamArray)
    setCompanyTeams([{ value: 0, label: "全チーム" }, ...teamsFromResponse])
  }, [navigate])

  console.log(members)
  useEffect(() => {
    fetchMembers()
  }, [fetchMembers])

  return (
    <div className='relative top-16 flex justify-center h-[calc(100vh-4rem)]'>
      {members && companyTeams && (
        <RegisterMemberTemplate
          members={members}
          teams={companyTeams}
          refreshData={fetchMembers}
        />
      )}
    </div>)
}

export default ResigterMember