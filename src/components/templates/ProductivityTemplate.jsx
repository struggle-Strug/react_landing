import { useEffect, useState } from "react";
import { LineChart } from "../lineChart";
import Dropdown from "../dropdown";
const ProductivityTemplate = ({ productivities }) => {
  const [companyProductivity, setCompanyProductivity] = useState([])
  const [selectedCompany, setSelectedCompany] = useState('')

  const [company, setCompany] = useState([])
  const [teams, setTeams] = useState([])
  const [members, setMembers] = useState([])

  const [displayTeams, setDisplayTeams] = useState([])
  const [displayMembers, setDisplayMembers] = useState([])

  const [teamName, setTeamName] = useState({ value: 'all', label: 'すべてのチーム' })
  const [memberName, setMemberName] = useState({ value: 'all', label: 'すべてのメンバー' })

  useEffect(() => {
    if (selectedCompany && selectedCompany.value !== '') {
      setCompanyProductivity(productivities[selectedCompany.value]);
    }
  }, [selectedCompany]);

  useEffect(() => {
    if (companyProductivity) {
      setCompany(companyProductivity.map(c => ({ name: c.subscription_activation_date, value: c.productivity_company_snapshot })))
      const teamResult = {};
      const memberResult = {};
      for (const entry of companyProductivity) {
        const date = entry["subscription_activation_date"];

        const teamSnapshot = entry["productivity_team_snapshot"];
        const memberSnapshot = entry["productivity_member_snapshot"];


        for (const [team, value] of Object.entries(teamSnapshot)) {
          if (!teamResult[team]) {
            teamResult[team] = [];
          }

          teamResult[team].push({
            name: date,
            value: value
          });
        }
        setTeams(teamResult)

        for (const [member, value] of Object.entries(memberSnapshot)) {
          if (!memberResult[member]) {
            memberResult[member] = [];
          }

          memberResult[member].push({
            name: date,
            value: value
          });
        }
        setMembers(memberResult)
      }
    }
  }, [companyProductivity])

  useEffect(() => {
    setDisplayTeams(teams)
  }, [teams])

  useEffect(() => {
    setDisplayMembers(members)
  }, [members])

  useEffect(() => {
    if (!teamName || teamName === '') {
      return
    }
    if (teamName.value === 'all') {
      setDisplayTeams(teams);
    } else {
      setDisplayTeams({ [teamName.value]: teams[teamName.value] });
    }
  }, [teamName])

  useEffect(() => {
    if (!memberName || memberName === '') {
      return
    }
    if (memberName.value === 'all') {
      setDisplayMembers(teams);
    } else {
      setDisplayMembers({ [memberName.value]: teams[memberName.value] });
    }
  }, [memberName])

  return (
    <div className="w-full overflow-auto px-6">
      <div className="z-10 overflow-auto border-4 border-main sp:mt-10">
        <div className="bg-main text-center text-white font-HiraginoKakuGothicProNW3 font-semibold text-lg pt-2 pb-3">
          <h3 className="font-CenturyGothic">productivity score</h3>
          <h3 className="font-thin">会社/チーム/メンバーの生産性スコア</h3>
        </div>
        <div className="flex justify-center items-center flex-col w-10/12 m-auto gap-5 mt-10">
          <div className="flex gap-3 w-full justify-center">
            <p className="break-keep flex items-center"><span>●</span><span>会社を選択</span></p>
            <div className="w-[180px]">
              <Dropdown options={Object.keys(productivities).map((pro) => ({ value: pro, label: pro }))} selectedOption={selectedCompany} setSelectedOption={setSelectedCompany} />
            </div>
          </div>
          <div className="w-full">
            <p className="bg-main text-white text-center leading-loose py-1">会社全体の生産性スコア</p>
            <LineChart data={company} />
          </div>
        </div>
        <div className="flex justify-center items-center flex-col w-10/12 m-auto gap-5 mt-10">
          <div className="w-full">
            <p className="bg-main text-white text-center leading-loose py-1">チームの生産性スコア</p>
            <div className="flex gap-3 w-full justify-center py-5">
              <p className="break-keep flex items-center"><span>●</span><span>チームを選択</span></p>
              <div className="w-[180px]">
                <Dropdown options={[{ value: 'all', label: 'すべてのチーム' }, ...Object.keys(teams).map((t) => ({ value: t, label: t }))]} selectedOption={teamName} setSelectedOption={setTeamName} />
              </div>
            </div>
            {Object.keys(displayTeams).map((t) => (
              <div>
                <p className="max-w-[600px] m-auto text-main font-semibold font-HiraginoKakuGothicProNW3 text-lg leading-none">■{t}部</p>
                <LineChart data={displayTeams[t]} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center flex-col w-10/12 m-auto gap-5 mt-10">
          <div className="w-full">
            <p className="bg-main text-white text-center leading-loose py-1">メンバーの生産性スコア</p>
            <div className="flex gap-3 w-full justify-center py-5">
              <p className="break-keep flex items-center"><span>●</span><span>メンバーを選択</span></p>
              <div className="w-[180px]">
                <Dropdown options={[{ value: 'all', label: 'すべてのチーム' }, ...Object.keys(members).map((t) => ({ value: t, label: t }))]} selectedOption={memberName} setSelectedOption={setMemberName} />
              </div>
            </div>
            {Object.keys(displayMembers).map((m) => (
              <div>
                <p className="max-w-[600px] m-auto text-main font-semibold font-HiraginoKakuGothicProNW3 text-lg leading-none">■{m}</p>
                <LineChart data={displayMembers[m]} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductivityTemplate;
