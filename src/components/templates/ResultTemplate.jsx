/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import RadarChart from "../radarChart";
import Toggle from "../toggle";
import Dropdown from "../dropdown";
import Button from "../button";

import { USERANSWER_ENDPOINT } from "../../utils/constants";
import { requestWithTokenRefresh } from "../../utils/AuthService";
import PersonAnswerResultModal from "../modal/personAnswerResultModal";

export default function ResultTemplate({ results }) {
  const navigate = useNavigate()
  const [scores, setScores] = useState();
  const [dates, setDates] = useState();
  const [selectedDate, setSelectedDate] = useState();

  const [showPersonAnswerModal, setShowPersonAnswerModal] = useState(false);
  const [categories, setCategories] = useState();
  const [answers, setAnswers] = useState();

  useEffect(() => {
    if (!results) {
      return;
    }
    const keys = Object.keys(results);
    const dateOptions = keys.map((key) => ({ value: key, label: key.substring(0, 7) }));
    setDates(dateOptions);
    setSelectedDate(dateOptions[0]);
  }, [results]);

  useEffect(() => {
    if (!selectedDate) {
      return;
    }
    const score = results[selectedDate.value];
    setScores(score);
  }, [results, selectedDate]);

  const handleChange = (value) => {
    setSelectedDate(value);
  };
  const [showThirdPersonAssessment, setShowThirdPersonAssessment] = useState(true);
  const handleGetAnswer = async () => {
    if (!scores) {
      return;
    }
    const query = `subscription_id=${scores.subscription_id}&user_id=${scores.user_id}`;
    const resp = await requestWithTokenRefresh(
      USERANSWER_ENDPOINT + `?${query}`,
      {},
      navigate
    );
    if (resp.status >= 200 && resp.status <= 300) {
      const data = await resp.json();
      setAnswers(data);
      setCategories([
        ...new Set(data.map((answer) => answer.quiz_category_name)),
      ]);
      setShowPersonAnswerModal(true);
    }
  }

  return (
    <div className="w-full overflow-auto">
      <PersonAnswerResultModal
        open={showPersonAnswerModal}
        setOpenModal={setShowPersonAnswerModal}
        userAnswers={answers}
        categories={categories}
      />
      <div className="flex place-content-center">
        <div className="relative w-full mx-3 md:w-4/5 mt-12 mb-6 sp:mt-10 sp:mb-24 flex flex-col items-center border-8 border-main">
          <div className="w-full text-white sp:h-[66px] flex flex-col justify-center items-center lg:gap-3 gap-2 sp:gap-1 font-CenturyGothic lg:pt-4 pt-3 sp:pt-2 lg:pb-7 pb-4 sp:pb-3 bg-main">
            <p className="lg:text-4xl text-3xl sp:text-lg font-bold font-CenturyGothic ">Result</p>
            <p className="lg:text-3xl text-2xl sp:text-base font-HiraginoKakuGothicProNW3">あなたのアセスメント結果</p>
          </div>
          <div className="m-8 flex justify-center items-center">
            <div className="text-sm lg:text-lg mr-6 sp:mr-3 font-bold font-HiraginoKakuGothicProNW6">●実施日を選択</div>
            <div className="lg:text-lg lg:w-56 sp:w-40">
              {selectedDate && (
                <Dropdown
                  options={dates}
                  selectedOption={selectedDate}
                  onChange={handleChange}
                  setSelectedOption={handleChange}
                />
              )}
            </div>
          </div>
          <div>
            <Toggle setShowThirdPerson={setShowThirdPersonAssessment} />
          </div>
          <div className="mx-10 w-2/3">
            <div className="xl:absolute top-90 left-5 m-auto mt-5 xl:mt-2 2xl:w-72 w-64">
              <div className="text-sm border border-black 2xl:p-5 pl-2 py-1">
                <div className="text-red-500 flex items-center xl:mb-3 mb-1">
                  <hr className="w-14 h-1 bg-[#FF0000] mr-2" />
                  <p className="text-[#FF0000] font-HiraginoKakuGothicProNW3">自己評価</p>
                </div>
                <div className="flex items-center">
                  <hr className="w-14 h-1 bg-[#0303FF] mr-2" />
                  <p className="text-[#0303FF] font-HiraginoKakuGothicProNW3">第三者からの評価（平均値）</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 w-full aspect-square">
              <RadarChart
                showThirdPerson={showThirdPersonAssessment}
                scores={scores}
              />
              <Button className="px-10 ml-auto" title="自分の回答結果を見る" onClick={handleGetAnswer}></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
