/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import Dropdown from '../dropdown'
import SimpleRadarChart from '../radarChart/simpleChart'
import ComplexChart from '../radarChart/complexChart'
import Loader from '../loader'
import { requestWithTokenRefresh } from '../../utils/AuthService'
import { SCORE_ENDPOINT, USERANSWER_ENDPOINT } from '../../utils/constants'
import { useNavigate } from 'react-router'


export default function TeamTemplate({ data }) {
  const navigate = useNavigate()
  // const companyOptions = data ? data.company.map(c => ({value: c.id, label:c.company_name})) : null
  const [companyOptions, setCompanyOptions] = useState()
  const [subscriptionOptions, setSubscriptionOption] = useState()
  const [teamOptions, setTeamOptions] = useState()
  const [memberOptions, setMemberOptions] = useState()
  const [selectedCompany, setSelectedCompany] = useState()
  const [selectedSubscription, setSelectedSubscription] = useState()
  const [selectedTeam, setSelectedTeam] = useState()
  const [selectedMemberOption, setSelectedMemberOption] = useState()
  const [teamData, setTeamData] = useState()
  const [selectedMember, setSelectedMember] = useState()
  const [userAnswers, setUserAnswers] = useState()
  const [categories, setCategories] = useState()

  const handleGetAnswer = async () => {
    if (!memberOptions || !selectedMemberOption) { return }
    const query = `subscription_id=${selectedSubscription.value}&user_id=${selectedMemberOption.value}`
    const resp = await requestWithTokenRefresh(USERANSWER_ENDPOINT + `?${query}`, {}, navigate)
    const data = await resp.json()
    if (resp.ok) {
      setUserAnswers(data)
    }
  }

  useEffect(() => {
    if (userAnswers) {
      setCategories([...new Set(userAnswers.map((answer) => answer.quiz_category_name))])
    }
  }, [userAnswers])

  console.log(categories)

  useEffect(() => {
    if (!data) { return }
    const options = data.company.map(c => ({ value: c.id, label: c.company_name }))
    setCompanyOptions(options)
    setSelectedCompany(options[0])
  }, [data])

  useEffect(() => {
    if (!selectedCompany) { return }
    const company = data.company.filter(c => c.id === selectedCompany.value)[0]
    const options = company.subscription.map(s => ({ value: s.id, label: s.subscription_activation_date }))
    setSubscriptionOption(options)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompany])

  useEffect(() => {
    if (!selectedSubscription) { return }
    const company = data.company.filter(c => c.id === selectedCompany.value)[0]
    const subscription = company.subscription.filter(s => s.id === selectedSubscription.value)[0]
    const options = subscription.score_teams.map(t => ({ value: t.teamid_snapshot, label: t.team_name_snapshot }))
    setTeamOptions(options)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSubscription])

  useEffect(() => {
    if (!selectedTeam) { return }
    const getMembers = async () => {
      const query = `subscription_id=${selectedSubscription.value}&team_id=${selectedTeam.value}`
      const resp = await requestWithTokenRefresh(SCORE_ENDPOINT + `members/list/?${query}`, {}, navigate)
      const data = await resp.json()
      if (resp.ok) {
        setTeamData(data)
        const memberOptions = Object.entries(data.members).map(([idx, member]) => ({ value: member.received_evaluations_id_snapshot, label: member.received_evaluations_snapshot }))
        setMemberOptions(memberOptions)
      }
    }
    getMembers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTeam])

  useEffect(() => {
    if (!selectedMemberOption) {
      return
    }
    const members = Object.entries(teamData.members).map(([idx, member]) => member)
    const member = members.filter((member) => member.received_evaluations_id_snapshot === selectedMemberOption.value)[0]
    setSelectedMember(member)
    console.log("selectedMemberOption")
  }, [selectedMemberOption])

  useEffect(() => {
    console.log("memeber selected change")
  }, [selectedMember])


  return (
    <div className='w-full bg-slate-100 overflow-auto'>
      {!data
        ? <Loader />
        : (
          <div className='mx-4'>
            <div className='mt-4 ml-6'>
              <div className='w-64 mt-4'>
                <div className='mb-2'>会社を選択</div>
                <Dropdown
                  options={companyOptions}
                  selectedOption={selectedCompany}
                  setSelectedOption={setSelectedCompany}
                />
              </div>
              <div className='w-64 mt-4'>
                <div className='mb-2'>サブスクを選択</div>
                <Dropdown
                  options={subscriptionOptions}
                  selectedOption={selectedSubscription}
                  setSelectedOption={setSelectedSubscription}
                />
              </div>
              <div className='w-64 mt-4'>
                <div className='mb-2'>チームを選択</div>
                <Dropdown
                  options={teamOptions}
                  selectedOption={selectedTeam}
                  setSelectedOption={setSelectedTeam}
                />
              </div>
            </div>
            {teamData && (
              <div className='mt-8 mx-6'>
                <div className='mb-2'>メンバーを選択</div>
                <div className='flex flex-wrap'>
                  <div className='w-64 mb-2 mr-4'>
                    <div className='w-64'>
                      <Dropdown
                        options={memberOptions}
                        selectedOption={selectedMemberOption}
                        setSelectedOption={setSelectedMemberOption}
                      />
                    </div>
                  </div>
                  <div className='flex w-96'>
                    <div className='bg-white w-1/2 h-44'>
                      <div className='mt-2 text-center text-sm'>チーム平均</div>
                      <SimpleRadarChart
                        isFirst={true}
                        scores={teamData.team_scores}
                      />
                      <div></div>
                    </div>
                    <div className='bg-white w-1/2 h-44'>
                      <div className='mt-2 text-center text-sm'>ギャップ値</div>
                      <div className="mt-12 text-3xl flex justify-center items-center">{teamData.gap}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {selectedTeam && selectedMember && (
              <div className='mt-8 mx-6'>
                <div className='flex flex-col sm:flex-row'>
                  <div className='mb-2'>{selectedMember.received_evaluations_snapshot} のアセスメント結果</div>
                  <button className='bg-slate-500 text-white ml-5 px-3 mb-2' onClick={handleGetAnswer}>回答を表示する</button>
                </div>
                <div className=' bg-white w-full h-64 flex items-center justify-start overflow-x-scroll'>
                  <div>
                    <div className='h-44 w-72 flex flex-col items-center'>
                      <div className=' text-red-600 text-sm mb-2'>自己評価 & 第三者からの評価（平均）</div>
                      <ComplexChart
                        showThirdPerson={true}
                        scores={selectedMember}
                      />
                    </div>
                  </div>
                  {selectedMember && Object.entries(selectedMember["3rd"]).map(([key, scores]) => (
                    <div key={key} >
                      <div className='h-44 w-72 flex flex-col items-center mb-2'>
                        <div className=' text-red-600 text-sm'>第三者からの評価（匿名）</div>
                        <SimpleRadarChart
                          isFirst={false}
                          scores={scores}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  {userAnswers !== undefined && (
                    <div className="mt-10 flow-root overflow-y-auto bg-white py-10 px-5">
                      <table className='w-full'>
                        <thead>
                          <tr className='text-left'>
                            <th className='w-[5%]'></th>
                            <th>設問</th>
                            <th>回答</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan={3}>全く思わない、思わない、思う、強く思うの4段階から回答</td>
                          </tr>
                          {categories &&
                            categories.map((category, idx) => {
                              const categoryAnswers = userAnswers.filter(
                                (answers) => answers.quiz_category_name === category
                              );
                              return (
                                <>
                                  <tr className='bg-slate-100 p-1 mt-5' key={idx}>
                                    <td colSpan={3}>{category}</td>
                                  </tr>
                                  {categoryAnswers.map((answer, idx) => (
                                    <tr key={idx}>
                                      <td>{idx + 1}</td>
                                      <td>{answer.quiz}</td>
                                      <td>
                                        {answer.answer === 1 && "全く思わない"}
                                        {answer.answer === 2 && "思わない"}
                                        {answer.answer === 3 && "思う"}
                                        {answer.answer === 4 && "強く思う"}
                                      </td>
                                    </tr>
                                  ))}
                                </>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

        )
      }

    </div>
  )
}