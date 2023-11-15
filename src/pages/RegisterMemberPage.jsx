import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import RegisterMemberTemplate from "../components/templates/RegisterMemberTemplate";
import { requestWithTokenRefresh } from "../utils/AuthService";
import { MEMBER_ENDPOINT } from "../utils/constants";

const ResigterMember = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState();
  const [companyTeams, setCompanyTeams] = useState();
  const [firstAssessment, setFirstAssessment] = useState();
  const [thirdAssessment, setThirdAssessment] = useState();
  const [companyProductivity, setcompanyProductivity] = useState()

  const fetchMembers = useCallback(async () => {
    const resp = await requestWithTokenRefresh(
      MEMBER_ENDPOINT + "list/",
      {},
      navigate
    );
    const data = await resp.json();
    const users = await data.users;
    const teams = await data.teams;
    const status = await data.assessment_status;
    setcompanyProductivity(await data.company.productivity_company)
    const teamsFromResponse = teams.map((t) => ({
      value: t.id,
      label: t.team_name,
    }));
    let userTeamArray = [];
    users.forEach((user) => {
      let teamArray = [];
      teams.forEach((team) => {
        if (user.team_relation.some((userTeam) => userTeam.id === team.id)) {
          teamArray.push(1);
        } else {
          teamArray.push("");
        }
      });
      userTeamArray.push(teamArray);
    });
    const memberWithTeamArray = data.users.map((user, index) => ({
      ...user,
      teamArray: userTeamArray[index],
      first: status.first
        ? status.first.find((s) => s.user_id === user.id)
        : { status_check: "" },
      third: status.third
        ? status.third.find((s) => s.user_id === user.id)
        : { status_check: "" },
    }));
    setMembers(memberWithTeamArray);
    setCompanyTeams([{ value: 0, label: "全チーム" }, ...teamsFromResponse]);
  }, [navigate]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);


  return (
    <div className="relative top-20 flex justify-center min-h-screen">
      {members && companyTeams && (
        <RegisterMemberTemplate
          members={members}
          teams={companyTeams}
          refreshData={fetchMembers}
          companyProductivity={companyProductivity}
        />
      )}
    </div>
  );
};

export default ResigterMember;
