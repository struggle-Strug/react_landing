/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Dropdown from "../dropdown";
import SimpleRadarChart from "../radarChart/simpleChart";
import ComplexChart from "../radarChart/complexChart";
import Loader from "../loader";
import { requestWithTokenRefresh } from "../../utils/AuthService";
import { SCORE_ENDPOINT, USERANSWER_ENDPOINT } from "../../utils/constants";
import { subjects } from "../radarChart/simpleChart";
import { useNavigate } from "react-router";

import PersonAnswerResultModal from "../modal/personAnswerResultModal";

import Button from "../button";

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
  const [showPersonAnswerModal, setShowPersonAnswerModal] = useState(false);

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
      setShowPersonAnswerModal(true);
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
    <>
      <PersonAnswerResultModal
        open={showPersonAnswerModal}
        setOpenModal={setShowPersonAnswerModal}
        userAnswers={userAnswers}
        categories={categories}
        selectedMember={selectedMember}
      />
      <div className="max-w-[1280px] w-full overflow-auto">
        {!data ? (
          <Loader />
        ) : (
          <div className="mx-4 mt-12 pb-10 mb-28 border-[7px] border-main">
            <div className="w-full text-white sp:h-[66px] flex flex-col justify-center items-center lg:gap-3 gap-2 sp:gap-1 font-CenturyGothic lg:pt-4 pt-3 sp:pt-2 lg:pb-7 pb-4 sp:pb-3 bg-main">
              <p className="lg:text-4xl text-3xl sp:text-lg font-bold font-CenturyGothic">
                Result
              </p>
              <p className="lg:text-3xl text-2xl sp:text-base font-HiraginoKakuGothicProNW3">
                チーム/メンバーのアセスメント結果
              </p>
            </div>
            <div className="flex flex-col gap-8 max-w-[600px] w-full mt-11 mx-auto px-5">
              <div className="w-full flex justify-between items-center gap-5">
                <div className="lg:text-xl text-base">●会社を選択</div>
                <Dropdown
                  options={companyOptions}
                  selectedOption={selectedCompany}
                  setSelectedOption={setSelectedCompany}
                />
              </div>
              <div className="w-full flex justify-between items-center gap-5">
                <div className="lg:text-xl text-base">●実施日を選択</div>
                <Dropdown
                  options={subscriptionOptions}
                  selectedOption={selectedSubscription}
                  setSelectedOption={setSelectedSubscription}
                />
              </div>
              <div className="w-full flex justify-between items-center gap-5">
                <div className="lg:text-xl text-base">●所属チームを選択</div>
                <Dropdown
                  options={teamOptions}
                  selectedOption={selectedTeam}
                  setSelectedOption={setSelectedTeam}
                />
              </div>
            </div>
            {teamData && (
              <div className="mt-8 mx-6">
                <div className="my-16">
                  <div className="w-0 h-0 mx-auto mt-8 border-main border-t-[20px] border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent"></div>
                  <p className="text-xl text-center mx-auto">
                    自己アセスメントのチーム平均値
                  </p>
                </div>
                <div className="flex flex-wrap flex-col">
                  <div className="flex flex-col flex-wrap sm:flex-row bg-white w-full sm:w-full justify-between">
                    <div className="w-1/2 max-w-[600px] min-w-[390px] mx-auto">
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
                      {/* <div className="mt-2 text-center text-sm">チーム平均</div> */}
                      <div className="lg:col-span-2 aspect-square">
                        <SimpleRadarChart
                          isFirst={true}
                          scores={teamData.team_scores}
                        />
                        {console.log(teamData.team_scores[0])}
                      </div>
                    </div>
                    <div className="flex gap-3 mx-auto">
                      <div className="flex flex-col max-w-md w-full bg-[#DFFAFD] font-bold">
                        <div className="h-14 flex justify-center items-center text-center text-xl bg-main text-white">
                          <span>ギャップ値</span>
                          <span className="w-4 h-4 ml-2 bg-white text-black text-xs rounded-full">
                            ?
                          </span>
                        </div>
                        <div className="flex justify-between items-center px-7 py-2">
                          <div className="text-xl">全体平均</div>
                          <div className="text-5xl">{teamData.gap}</div>
                        </div>
                        <div className="h-[3px] border-t border-b border-black mx-2"></div>
                        <div className=" flex items-center px-7 pt-4 pb-8">
                          <ul>
                            {subjects.map((sub, i) => (
                              <li className="flex justify-between items-center my-1" key={`score-${i}`}>
                                <div className="text-sm break-keep">
                                  {sub}
                                </div>
                                <hr className="max-w-[200px] min-w-[10px] w-full h-1 border-t-2 mx-2 border-dotted border-black" />
                                <div className="text-3xl">{teamData.team_scores[i].toFixed(1)}</div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="bg-[#DFFAFD]">
                        <div className="w-40 h-14 flex justify-center items-center bg-main px-2">
                          <Dropdown placeholder={"同業種平均"} />
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
                <div className="max-w-[600px] w-full m-auto mt-48 mb-2 gap-5">
                  <div className="w-0 h-0 mx-auto mt-8 border-main border-t-[20px] border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent mb-5"></div>
                  <div className="flex justify-between items-center">
                    <div className="lg:text-xl text-base">●メンバーを選択</div>
                    <div className="w-96">
                      <Dropdown
                        options={memberOptions}
                        selectedOption={selectedMemberOption}
                        setSelectedOption={setSelectedMemberOption}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {teamList && (
              <div className="mt-8 mx-6">
                <div className="w-full flex justify-center py-4 bg-main text-white"></div>
                <div className="max-w-[600px] flex items-center w-full m-auto mt-7 mb-2 gap-5">
                  <div className="mb-2">
                    ●アセスメントを実施したチームを選択{" "}
                  </div>
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
              </div>
            )}
            {selectedTeam && selectedMember && (
              <div className="mt-8 mx-6">
                <div className="text-center text-3xl">
                  自己評価とメンバーからの第三者評価（平均値）
                </div>
                <div className="flex justify-evenly items-center flex-wrap mb-5">
                  {scoreData &&
                    scoreData["1st"] &&
                    scoreData["3rd"] &&
                    scoreData["3rd_average"] && (
                      <div className="w-1/2 max-w-[600px] min-w-[390px] flex flex-col items-center">
                        {/* <div className=" text-main text-sm">
                          自己評価 & 第三者からの評価（平均）
                        </div> */}
                        <div className="h-full w-full flex lg:col-span-2 aspect-square justify-center items-center">
                          <div className="w-full h-full ">
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
                    )}

                  <div className="h-full flex flex-col justify-between">
                    <div className="m-auto mt-10 xl:mt-0 xl:w-full w-64">
                      <div className="text-sm border border-black xl:p-5 pl-2 py-1">
                        <div className="text-red-500 flex items-center xl:mb-3 mb-1">
                          <hr className="w-14 h-1 bg-[#FF0000] mr-2" />
                          <p className="text-[#FF0000] font-HiraginoKakuGothicProNW3">
                            自己アセスメントの結果
                          </p>
                        </div>
                        <div className="flex items-center">
                          <hr className="w-14 h-1 bg-[#0303FF] mr-2" />
                          <p className="text-[#0303FF] font-HiraginoKakuGothicProNW3">
                            選択したチームからのアセスメント結果（平均値）
                          </p>
                        </div>
                        <div className="flex items-center">
                          <hr className="w-14 h-1 bg-[#12E600] mr-2" />
                          <p className="text-[#12E600] font-HiraginoKakuGothicProNW3">
                            同業種の自己アセスメント結果（平均値）
                          </p>
                        </div>
                        <div className="flex items-center">
                          <hr className="w-14 h-1 bg-[#ECFF03] mr-2" />
                          <p className="font-HiraginoKakuGothicProNW3">
                            全企業の自己アセスメント結果（平均値）
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row mx-auto mt-16">
                      {/* <div className="mb-2">
                    {selectedMember.received_evaluations_snapshot}{" "}
                    のアセスメント結果
                  </div> */}
                      <Button
                        title={`${selectedMember.received_evaluations_snapshot}さんの回答結果を見る`}
                        className="text-white px-3"
                        onClick={handleGetAnswer}
                      ></Button>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-center text-3xl">
                    メンバーからの第三者評価（個別の結果）
                  </div>
                  {scoreData &&
                    scoreData["1st"] &&
                    scoreData["3rd"] &&
                    scoreData["3rd_average"] && (
                      <div className="bg-white w-fit min-w-full flex items-center justify-start mt-8 flex-wrap">
                        {scoreData["3rd"].map((score, idx) => (
                          <div
                            className="w-[300px] flex flex-col items-center mx-auto"
                            key={idx}
                          >
                            <div className="w-full text-sm px-5 text-center">
                              <div className="text-main text-sm border-b border-black ">
                                匿名メンバー_A
                              </div>
                            </div>
                            <div className="h-full w-full flex justify-center items-center">
                              <div className="w-full h-full lg:col-span-2 aspect-square">
                                <SimpleRadarChart
                                  isFirst={false}
                                  scores={score}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
