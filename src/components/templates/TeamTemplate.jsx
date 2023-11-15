/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Dropdown from "../dropdown";
import SimpleRadarChart from "../radarChart/simpleChart";
import ComplexChart from "../radarChart/complexChart";
import Loader from "../loader";
import { requestWithTokenRefresh } from "../../utils/AuthService";
import { SCORE_ENDPOINT, USERANSWER_ENDPOINT } from "../../utils/constants";
import { useNavigate } from "react-router";

export default function TeamTemplate({ data }) {
  const navigate = useNavigate();
  // const companyOptions = data ? data.company.map(c => ({value: c.id, label:c.company_name})) : null
  const [companyOptions, setCompanyOptions] = useState();
  const [subscriptionOptions, setSubscriptionOption] = useState();
  const [teamOptions, setTeamOptions] = useState();
  const [memberOptions, setMemberOptions] = useState();
  const [selectedCompany, setSelectedCompany] = useState();
  const [selectedSubscription, setSelectedSubscription] = useState();
  const [selectedTeam, setSelectedTeam] = useState();
  const [selectedMemberOption, setSelectedMemberOption] = useState();
  const [teamData, setTeamData] = useState();
  const [selectedMember, setSelectedMember] = useState();
  const [userAnswers, setUserAnswers] = useState();
  const [categories, setCategories] = useState();
  const [teamList, setTeamList] = useState();
  const [team, setTeam] = useState();
  const [teamListOptions, setTeamListOptions] = useState();
  const [scoreData, setScoreData] = useState();

  const handleGetAnswer = async () => {
    if (!memberOptions || !selectedMemberOption) {
      return;
    }
    const query = `subscription_id=${selectedSubscription.value}&user_id=${selectedMemberOption.value}`;
    const resp = await requestWithTokenRefresh(
      USERANSWER_ENDPOINT + `?${query}`,
      {},
      navigate
    );
    const data = await resp.json();
    if (resp.ok) {
      setUserAnswers(data);
    }
  };

  useEffect(() => {
    if (userAnswers) {
      setCategories([
        ...new Set(userAnswers.map((answer) => answer.quiz_category_name)),
      ]);
    }
  }, [userAnswers]);

  useEffect(() => {
    if (!data) {
      return;
    }
    const options = data.company.map((c) => ({
      value: c.id,
      label: c.company_name,
    }));
    setCompanyOptions(options);
    setSelectedCompany(options[0]);
  }, [data]);

  useEffect(() => {
    if (!selectedCompany) {
      return;
    }
    const company = data.company.filter(
      (c) => c.id === selectedCompany.value
    )[0];
    const options = company.subscription.map((s) => ({
      value: s.id,
      label: s.subscription_activation_date,
    }));
    setSubscriptionOption(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompany]);

  useEffect(() => {
    if (!selectedSubscription) {
      return;
    }
    const company = data.company.filter(
      (c) => c.id === selectedCompany.value
    )[0];
    const subscription = company.subscription.filter(
      (s) => s.id === selectedSubscription.value
    )[0];
    const options = subscription.score_teams.map((t) => ({
      value: t.teamid_snapshot,
      label: t.team_name_snapshot,
    }));
    setTeamOptions(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSubscription]);

  useEffect(() => {
    if (!selectedTeam) {
      return;
    }
    const getMembers = async () => {
      const query = `subscription_id=${selectedSubscription.value}&team_id=${selectedTeam.value}`;
      const resp = await requestWithTokenRefresh(
        SCORE_ENDPOINT + `members/list/?${query}`,
        {},
        navigate
      );
      const data = await resp.json();
      if (resp.ok) {
        setTeamData(data);
        const memberOptions = Object.entries(data.members).map(
          ([idx, member]) => ({
            value: member.received_evaluations_id_snapshot,
            label: member.received_evaluations_snapshot,
          })
        );
        setMemberOptions(memberOptions);
      }
    };
    getMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTeam]);

  useEffect(() => {
    if (!selectedMemberOption) {
      return;
    }
    const members = Object.entries(teamData.members).map(
      ([idx, member]) => member
    );
    const member = members.filter(
      (member) =>
        member.received_evaluations_id_snapshot === selectedMemberOption.value
    )[0];
    setSelectedMember(member);
    const getTeams = async () => {
      const query = `subscription_id=${selectedSubscription.value}&user_id=${member.received_evaluations_id_snapshot}`;
      const resp = await requestWithTokenRefresh(
        SCORE_ENDPOINT + `given/team/list/?${query}`,
        {},
        navigate
      );
      const data = await resp.json();
      if (resp.ok) {
        setTeamList(data.team_list);
        setScoreData({ "1st": [...member["1st"]] });
      }
    };
    getTeams();
  }, [selectedMemberOption]);

  useEffect(() => {
    if (!teamList) {
      return;
    }
    const getDefaultScoreData = async () => {
      const query = `subscription_id=${selectedSubscription.value}&user_id=${
        selectedMember.received_evaluations_id_snapshot
      }&team_id=${99999}`;
      const resp = await requestWithTokenRefresh(
        SCORE_ENDPOINT + `get_score_team_given/?${query}`,
        {},
        navigate
      );
      const data = await resp.json();
      if (resp.ok) {
        setScoreData({
          ...scoreData,
          "3rd": data.given_third_score.map((d) => d.average_score),
          "3rd_average": data.given_average_score,
        });
      }
    };
    setTeamListOptions([
      { value: 99999, label: "全チーム" },
      ...teamList.map((t) => ({
        value: t.teamid_given_snapshot,
        label: t.team_name_given_snapshot,
      })),
    ]);
    setTeam({ value: 99999, label: "全チーム" });
    getDefaultScoreData();
  }, [teamList]);

  useEffect(() => {
    if (!team) {
      return;
    }
    const getTeamScore = async () => {
      const query = `subscription_id=${selectedSubscription.value}&user_id=${selectedMember.received_evaluations_id_snapshot}&team_id=${team.value}`;
      const resp = await requestWithTokenRefresh(
        SCORE_ENDPOINT + `get_score_team_given/?${query}`,
        {},
        navigate
      );
      const data = await resp.json();
      if (resp.ok) {
        setScoreData({
          ...scoreData,
          "3rd": data.given_third_score.map((d) => d.average_score),
          "3rd_average": data.given_average_score,
        });
      }
    };
    getTeamScore();
  }, [team]);

  return (
    <div className="max-w-[1280px] w-full overflow-auto">
      {!data ? (
        <Loader />
      ) : (
        <div className="mx-4 mt-12 pb-40 border-[7px] border-main">
          <div className="w-full flex flex-col justify-center items-center gap-1 py-4 bg-main text-white">
            <p className="text-4xl font-bold font-CenturyGothic">Result</p>
            <p className="text-2xl font-HiraginoKakuGothicProNW3">
              チーム/メンバーのアセスメント結果
            </p>
          </div>
          <div className="max-w-[512px] w-full mx-auto px-5">
            <div className="w-full mt-4 flex justify-between items-center gap-5">
              <div className="mb-2">●会社を選択</div>
              <Dropdown
                options={companyOptions}
                selectedOption={selectedCompany}
                setSelectedOption={setSelectedCompany}
              />
            </div>
            <div className="w-full mt-4 flex justify-between items-center gap-5">
              <div className="mb-2">●実施日を選択</div>
              <Dropdown
                options={subscriptionOptions}
                selectedOption={selectedSubscription}
                setSelectedOption={setSelectedSubscription}
              />
            </div>
            <div className="w-full mt-4 flex justify-between items-center gap-5">
              <div className="mb-2">●所属チームを選択</div>
              <Dropdown
                options={teamOptions}
                selectedOption={selectedTeam}
                setSelectedOption={setSelectedTeam}
              />
            </div>
          </div>
          <div className="w-0 h-0 mx-auto mt-8 border-main border-t-[20px] border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent"></div>
          <p className="text-xl text-center mx-auto">
            自己アセスメントのチーム平均値
          </p>
          {teamData && (
            <div className="mt-8 mx-6">
              {/* <div className="mb-2">メンバーを選択</div> */}
              <div className="flex flex-wrap flex-col">
                {/* <div className="w-64 mb-2 mr-4">
                  <div className="w-64">
                    <Dropdown
                      options={memberOptions}
                      selectedOption={selectedMemberOption}
                      setSelectedOption={setSelectedMemberOption}
                    />
                  </div>
                </div> */}
                <div className="flex flex-col sm:flex-row bg-white w-full sm:w-full justify-between items-start">
                  <div className="h-52 max-w-md">
                    <div className="m-auto mt-10 xl:mt-0 xl:w-60 w-52">
                      <div className="text-sm border border-black xl:pl-5 xl:pr-1 pl-2 py-1">
                        <div className="text-red-500 flex items-center xl:mb-3 mb-1">
                          <hr className="w-10 h-1 bg-[#FF0000] mr-2" />
                          <p className="text-[#FF0000] text-xs font-HiraginoKakuGothicProNW3">
                            チーム平均値
                          </p>
                        </div>
                        <div className="flex items-center">
                          <hr className="w-10 h-1 bg-[#0303FF] mr-2" />
                          <p className="text-[#0303FF] text-xs font-HiraginoKakuGothicProNW3">
                            第三者アセスメント平均値
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-center text-sm">チーム平均</div>
                    <div className="h-[90%] w-[340px]">
                      <SimpleRadarChart
                        isFirst={true}
                        scores={teamData.team_scores}
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-col max-w-md bg-[#DFFAFD] font-bold">
                      <div className="h-14 flex justify-center items-center text-center text-xl bg-main text-white">
                        <span>ギャップ値</span>
                        <span className="w-4 h-4 ml-2 bg-white text-black text-xs rounded-full">?</span>
                      </div>
                      <div className="flex justify-between items-center px-7 py-2">
                        <div className="text-xl">全体平均</div>
                        <div className="text-5xl">{teamData.gap}</div>
                      </div>
                      <div className="h-[3px] border-t border-b border-black mx-2"></div>
                      <div className=" flex items-center px-7 pt-4 pb-8">
                        <ul>
                          <li className="flex justify-between items-center my-1">
                            <div className="text-sm break-keep">
                              心理的安全度
                            </div>
                            <hr className="max-w-[200px] min-w-[10px] w-full h-1 border-t-2 mx-2 border-dotted border-black" />
                            <div className="text-3xl">2.29</div>
                          </li>
                          <li className="text-xs flex justify-between items-center my-2">
                            <div className="text-sm break-keep">
                              個人ビジョン明確度
                            </div>
                            <hr className="max-w-[200px] min-w-[10px] w-full h-1 border-t-2 mx-2 border-dotted border-black" />
                            <div className="text-3xl">2.29</div>
                          </li>
                          <li className="text-xs flex justify-between items-center my-2">
                            <div className="text-sm break-keep">
                              会社ビジョン共感度
                            </div>
                            <hr className="max-w-[200px] min-w-[10px] w-full h-1 border-t-2 mx-2 border-dotted border-black" />
                            <div className="text-3xl">2.29</div>
                          </li>
                          <li className="text-xs flex justify-between items-center my-2">
                            <div className="text-sm break-keep">
                              会社と個人の統合度
                            </div>
                            <hr className="max-w-[200px] min-w-[10px] w-full h-1 border-t-2 mx-2 border-dotted border-black" />
                            <div className="text-3xl">2.29</div>
                          </li>
                          <li className="text-xs flex justify-between items-center my-2">
                            <div className="text-sm break-keep">意欲度</div>
                            <hr className="max-w-[200px] min-w-[10px] w-full h-1 border-t-2 mx-2 border-dotted border-black" />
                            <div className="text-3xl">2.29</div>
                          </li>
                          <li className="text-xs flex justify-between items-center my-2">
                            <div className="text-sm break-keep">影響力</div>
                            <hr className="max-w-[200px] min-w-[10px] w-full h-1 border-t-2 mx-2 border-dotted border-black" />
                            <div className="text-3xl">2.29</div>
                          </li>

                          {/* <li className="text-xs">A - 心理的安全度</li>
                        <li className="text-xs">B - 個人ビジョン明確度</li>
                        <li className="text-xs">C - 会社ビジョン共感度</li>
                        <li className="text-xs">D - 会社と個人の統合度</li>
                        <li className="text-xs">E - 意欲度</li>
                        <li className="text-xs">F - 影響力</li> */}
                        </ul>
                        {/* <div className="bg-white h-full sm:h-52 flex flex-col items-center justify-center sm:justify-start border">
                        <div className="mt-2 text-center text-sm">
                          ギャップ値
                        </div>
                        <div className="sm:mt-12 text-3xl flex justify-center items-center">
                          {teamData.gap}
                        </div>
                      </div> */}
                      </div>
                    </div>
                    <div className="bg-[#DFFAFD]">
                      <div className="w-40 h-14 flex justify-center items-center bg-main px-2">
                        <Dropdown placeholder={'同業種平均'} />
                      </div>
                      <div>
                        <div className="flex justify-center items-center h-16 text-3xl font-bold">
                          2.29
                        </div>
                        <div className="h-[3px] border-t border-b border-black mx-2"></div>
                      </div>
                      <div className="flex flex-col justify-center text-2xl items-center mt-5 gap-3">
                        <div>2.29</div>
                        <div>2.29</div>
                        <div>2.29</div>
                        <div>2.29</div>
                        <div>2.29</div>
                        <div>2.29</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {teamList && (
            <div className="mt-8 mx-6">
              <div className="mb-2">チーム毎のアセスメント結果を表示 </div>
              <div className="flex flex-wrap">
                <div className="w-64 mb-2 mr-4">
                  <div className="w-64">
                    <Dropdown
                      options={teamListOptions}
                      selectedOption={team}
                      setSelectedOption={setTeam}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {selectedTeam && selectedMember && (
            <div className="mt-8 mx-6">
              <div className="flex flex-col sm:flex-row">
                <div className="mb-2">
                  {selectedMember.received_evaluations_snapshot}{" "}
                  のアセスメント結果
                </div>
                <button
                  className="bg-slate-500 text-white ml-5 px-3 mb-2"
                  onClick={handleGetAnswer}
                >
                  回答を表示する
                </button>
              </div>
              <div className="overflow-x-auto">
                {scoreData &&
                  scoreData["1st"] &&
                  scoreData["3rd"] &&
                  scoreData["3rd_average"] && (
                    <div className="bg-white w-fit min-w-full h-64 flex items-center justify-start">
                      <div className="h-44 w-80 flex flex-col items-center">
                        <div className=" text-red-600 text-sm">
                          自己評価 & 第三者からの評価（平均）
                        </div>
                        <div className="h-full w-full flex justify-center items-center">
                          <div className="w-1/2 h-full">
                            <ComplexChart
                              showThirdPerson={true}
                              scores={scoreData}
                            />
                          </div>
                          {/* <ul className='w-1/2'>
                            <li className='text-xs'>A - 心理的安全度</li>
                            <li className='text-xs'>B - 個人ビジョン明確度</li>
                            <li className='text-xs'>C - 会社ビジョン共感度</li>
                            <li className='text-xs'>D - 会社と個人の統合度</li>
                            <li className='text-xs'>E - 意欲度</li>
                            <li className='text-xs'>F - 影響力</li>
                          </ul> */}
                        </div>
                      </div>
                      {scoreData["3rd"].map((score, idx) => (
                        <div
                          className="h-44 w-80 flex flex-col items-center mb-2"
                          key={idx}
                        >
                          <div className=" text-red-600 text-sm">
                            第三者からの評価（匿名）
                          </div>
                          <div className="h-full w-full flex justify-center items-center">
                            <div className="w-1/2 h-full">
                              <SimpleRadarChart
                                isFirst={false}
                                scores={score}
                              />
                            </div>
                            {/* <ul className='w-1/2'>
                              <li className='text-xs'>A - 心理的安全度</li>
                              <li className='text-xs'>B - 個人ビジョン明確度</li>
                              <li className='text-xs'>C - 会社ビジョン共感度</li>
                              <li className='text-xs'>D - 会社と個人の統合度</li>
                              <li className='text-xs'>E - 意欲度</li>
                              <li className='text-xs'>F - 影響力</li>
                            </ul> */}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
              <div>
                {userAnswers !== undefined && (
                  <div className="mt-10 flow-root overflow-y-auto bg-white py-10 px-5">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left">
                          <th className="w-[5%]"></th>
                          <th>設問</th>
                          <th className="break-keep">回答</th>
                          <th className="break-keep">会社平均</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories &&
                          categories.map((category, idx) => {
                            const categoryAnswers = userAnswers.filter(
                              (answers) =>
                                answers.quiz_category_name === category
                            );
                            return (
                              <>
                                <tr className="bg-slate-100 p-1 mt-5" key={idx}>
                                  <td colSpan={4}>{category}</td>
                                </tr>
                                {categoryAnswers.map((answer, idx) => (
                                  <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{answer.quiz}</td>
                                    <td>{answer.answer}</td>
                                    <td className="text-center">
                                      {answer.company_answer_avg.toFixed(1)}
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
      )}
    </div>
  );
}
