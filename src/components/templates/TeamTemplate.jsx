/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Dropdown from "../dropdown";
import SimpleRadarChart from "../radarChart/simpleChart";
import ComplexChart from "../radarChart/complexChart";
import Loader from "../loader";
import { requestWithTokenRefresh } from "../../utils/AuthService";
import { SCORE_ENDPOINT, USERANSWER_ENDPOINT, USERANSWER_OTHER_ENDPOINT } from "../../utils/constants";
import { useNavigate } from "react-router";

import SelfAnswerResultModal from "../modal/selfAnswerResultModal";
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
  const [gapCategory, setGapCategory] = useState({ label: '同業種平均', value: 'gap_industry' });
  const [gapData, setGapData] = useState();
  const [teamScoreData, setTeamScoreData] = useState();
  const [gapAvData, setAvGapData] = useState();
  const [selectedMember, setSelectedMember] = useState();
  const [userAnswers, setUserAnswers] = useState();
  const [otherAnswers, setOtherAnswers] = useState();
  const [categories, setCategories] = useState();
  const [teamList, setTeamList] = useState();
  const [team, setTeam] = useState();
  const [teamListOptions, setTeamListOptions] = useState();
  const [scoreData, setScoreData] = useState();
  const [showPersonAnswerModal, setShowPersonAnswerModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [categoryNameList, setCategoryNameList] = useState([]);

  const handleGetAnswer = async () => {
    if (!memberOptions || !selectedMemberOption) {
      return;
    }
    setIsLoading(true);
    const query = `subscription_id=${selectedSubscription.value}&user_id=${selectedMemberOption.value}`;
    const resp = await requestWithTokenRefresh(
      USERANSWER_ENDPOINT + `?${query}`,
      {},
      navigate
    );
    const data = await resp.json();
    if (resp.ok) {
      const res = await requestWithTokenRefresh(
        `${USERANSWER_OTHER_ENDPOINT}?${query}`,
        {},
        query
      )
      const otherAnswer = await res.json()
      setCategories([
        ...new Set(data.map((answer) => answer.quiz_category_name)),
      ]);
      setIsLoading(false);
      setUserAnswers(data);
      setOtherAnswers(otherAnswer[0]);
      setShowPersonAnswerModal(true);
    }
  };

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
      value: s.subscription_id_ss,
      label: s.subscription_activation_date_ss,
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
      (s) => s.subscription_id_ss === selectedSubscription.value
    )[0];
    const options = subscription.score_teams.map((t) => ({
      value: t.team_id_ss,
      label: t.team_name_ss,
    }));
    setTeamOptions(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSubscription]);

  useEffect(() => {
    if (!selectedTeam) {
      return;
    }
    const getMembers = async () => {
      setIsLoading(true)
      const query = `subscription_id=${selectedSubscription.value}&team_id=${selectedTeam.value}`;
      const resp = await requestWithTokenRefresh(
        SCORE_ENDPOINT + `members/new_list/?${query}`,
        {},
        navigate
      );
      const data = await resp.json();
      if (resp.ok) {
        setIsLoading(false)
        setTeamData(data);
        setCategoryNameList(data.quizcategory_name_ss_for_gap);
        const memberOptions = data.members_for_pulldown.map(
          (member) => ({
            value: member.user_id_ss,
            label: member.user_name_ss,
          })
        );
        setMemberOptions(memberOptions);
      }
    };
    getMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTeam]);

  useEffect(() => {
    if (teamData && gapCategory) {
      setGapData(teamData[`${gapCategory.value}_category`]);
      setAvGapData(teamData[gapCategory.value]);
    }
  }, [teamData, gapCategory]);

  useEffect(() => {
    if (!selectedMemberOption) {
      return;
    }
    const members = teamData.members_for_pulldown;
    const member = members.find(
      (m) =>
        m.user_id_ss === selectedMemberOption.value
    );
    setSelectedMember(member);
    const getTeams = async () => {
      const query = `subscription_id=${selectedSubscription.value}&user_id=${member.user_id_ss}`;
      const resp = await requestWithTokenRefresh(
        SCORE_ENDPOINT + `team_members/new_prep/?${query}`,
        {},
        navigate
      );
      const data = await resp.json();
      if (resp.ok) {
        setTeamScoreData(data.score_teams.filter((m) => m.team_id_ss !== 99999));
        setTeamList(data.score_teams.filter((m) => m.team_id_ss !== 99999));
        setScoreData({
          "1st": data.score_first.quizcategory_first_ss,
          "3rd": data.score_teams.filter((m) => m.team_id_ss !== 99999).map((me) => me.quiz_category_score),
          "engagement_member": data?.engagement_member_ss,
          "3rd_average": data?.score_teams.find((m) => m.team_id_ss === 99999)?.quiz_category_score,
          "industry": data?.score_sector?.quizcategory_sector_first_ss,
          "finder": data?.score_finder?.quizcategory_allcompany_first_ss,
        });
      }
    };
    getTeams();
  }, [selectedMemberOption]);

  useEffect(() => {
    if (!teamList) {
      return;
    }
    setTeamListOptions([
      { value: 99999, label: "全チーム" },
      ...teamList.map((t) => ({
        value: t.team_id_ss,
        label: t.team_name_ss,
      })),
    ]);
    setTeam({ value: 99999, label: "全チーム" });
  }, [teamList]);

  useEffect(() => {
    if (!team || team.value === 99999) {
      return;
    }
    setScoreData({
      ...scoreData,
      "3rd": teamScoreData.filter(m => m.team_id_ss === team.value).map(me => me.quiz_category_score)
    });

  }, [team]);

  return (
    <>
      <SelfAnswerResultModal
        open={showPersonAnswerModal}
        setOpenModal={setShowPersonAnswerModal}
        userAnswers={userAnswers}
        categories={categories}
        otherAnswers={otherAnswers}
        selectedMember={selectedMember}
      />
      <div className="max-w-[1280px] w-full overflow-auto">
        {!data || isLoading ? (
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
            <div className="flex flex-col gap-8 max-w-[512px] w-full mt-11 mx-auto px-5">
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
              <div className="lg:mx-6">
                <div className="my-8">
                  <div className="w-0 h-0 mx-auto border-main border-t-[20px] border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent"></div>
                  <p className="text-xl lg:text-2xl font-bold font-HiraginoKakuGothicProNW6 text-center mx-auto mt-5">
                    自己アセスメントのチーム平均値
                  </p>
                </div>
                <div className="flex flex-wrap flex-col">
                  <div className="flex flex-col flex-wrap sm:flex-row sm:justify-center bg-white w-full sm:w-full justify-between">
                    <div className="w-1/2 max-w-[600px] min-w-[390px] mx-auto">
                      <div className="m-auto mt-10 xl:mt-0 xl:w-60 w-52">
                        <div className="text-sm border border-black xl:pl-5 xl:pr-1 pl-2 py-2">
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
                          scores={teamData.team_scores_first}
                          labels={categoryNameList}
                          thirdScores={teamData.team_scores_third}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col justify-around">
                      <div className="flex gap-3 mx-auto">
                        <div className="flex flex-col max-w-md w-full bg-[#DFFAFD] font-bold justify-between">
                          <div className="h-14 flex justify-center items-center text-center text-xl lg:text-2xl bg-main text-white">
                            <span>ギャップ値</span>
                            <span className="w-4 h-4 ml-2 bg-white text-black text-xs rounded-full">
                              ?
                            </span>
                          </div>
                          <div className="flex justify-between items-center px-4 lg:px-7 py-2">
                            <div className="text-xl">全体平均</div>
                            <div className="text-3xl lg:text-5xl">{teamData.gap_team && teamData.gap_team.toFixed(2)}</div>
                          </div>
                          <div className="h-[3px] border-t border-b border-black mx-2"></div>
                          <div className="flex items-center px-4 lg:px-7 pt-4 flex-col">
                            <ul>
                              {categoryNameList.map((sub, i) => (
                                teamData.gap_team_category[i] !== undefined &&
                                <li className="flex justify-between items-center my-1" key={`score-${i}`}>
                                  <div className="text-sm break-keep">
                                    {sub}
                                  </div>
                                  <hr className="max-w-[200px] min-w-[10px] w-full h-1 border-t-2 mx-2 border-dotted border-black" />
                                  <div className="text-3xl">{teamData.gap_team_category[i].toFixed(1)}</div>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <span className="bg-main w-full text-white flex justify-center items-center text-center h-[75px] border-t-[12px] border-white">このチームの<br />Heart Beat スコア</span>
                        </div>
                        <div className="bg-[#DFFAFD] flex flex-col justify-between">
                          <div className="w-40 h-14 flex justify-center items-center bg-main px-2">
                            <Dropdown placeholder={"同業種平均"} options={[{ label: '同業種平均', value: 'gap_industry' }, { label: '全企業平均', value: 'gap_finder' }]} selectedOption={gapCategory} setSelectedOption={setGapCategory} />
                          </div>
                          <div>
                            <div className="flex justify-center items-center h-16 text-3xl font-bold">
                              {gapAvData && gapAvData.toFixed(2)}
                            </div>
                            <div className="h-[3px] border-t border-b border-black mx-2"></div>
                          </div>
                          <div className="flex flex-col justify-center text-2xl items-center mt-5 gap-3">
                            {gapData && gapData.map((gap, i) => (
                              <div key={`gap-${i}`}>{gap.toFixed(1)}</div>
                            ))}
                          </div>
                          <span className="w-full text-black bg-[#DFFAFD] flex justify-center items-center text-3xl font-bold h-[75px] border-t-[12px] border-white">{teamData?.engagement_team}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="max-w-[600px] w-full m-auto mt-24 mb-2 gap-5">
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
                <div className="text-center text-xl lg:text-2xl xl:text-3xl font-bold font-HiraginoKakuGothicProNW6">
                  自己評価とメンバーからの第三者評価（平均値）
                </div>
                <div className="flex justify-evenly items-center flex-wrap  md:mb-10 xl:mb-5">
                  {scoreData &&
                    scoreData["1st"] &&
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
                    <div className="flex m-auto xl:w-full w-64 my-8">
                      <p className="text-center bg-main text-white w-1/2 p-3">{selectedMember?.user_name_ss}さんの<br />Heart Beat スコア</p>
                      <span className="w-1/2 text-black bg-[#DFFAFD] flex justify-center items-center p-3 text-3xl font-bold">{scoreData?.engagement_member}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row mx-auto">
                      <Button
                        title={`${selectedMember?.user_name_ss}さんの回答結果を見る`}
                        className="text-white px-14 text-sm lg:text-lg py-5"
                        onClick={handleGetAnswer}
                      ></Button>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-center text-xl lg:text-2xl xl:text-3xl font-bold font-HiraginoKakuGothicProNW6">
                    メンバーからの第三者評価（個別の結果）
                  </div>
                  {scoreData &&
                    scoreData["1st"] &&
                    scoreData["3rd"] &&
                    scoreData["3rd_average"] && (
                      <div className="bg-white w-fit min-w-full flex items-center md:justify-center lg:justify-start mt-8 flex-wrap gap-x-2 gap-y-14">
                        {scoreData["3rd"].map((score, idx) => (
                          <div
                            className="w-[300px] lg:w-[49%] xl:w-[24%] flex flex-col items-center"
                            key={idx}
                          >
                            <div className="w-full text-sm px-5 text-center">
                              <div className="text-main text-sm border-b border-black pb-3">
                                {`匿名メンバー_${(idx + 10).toString(36).toUpperCase()}`}
                              </div>
                            </div>
                            <div className="h-full w-full flex justify-center items-center">
                              <div className="w-full h-full lg:col-span-2 aspect-square">
                                <SimpleRadarChart
                                  isFirst={false}
                                  scores={score}
                                  isThird={idx === 0 ? false : true}
                                  labels={categoryNameList}
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
