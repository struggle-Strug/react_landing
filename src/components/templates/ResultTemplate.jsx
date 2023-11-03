/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import RadarChart from "../radarChart";
import Toggle from "../toggle";
import Dropdown from "../dropdown";

export default function ResultTemplate({ results }) {
  const [scores, setScores] = useState();
  const [dates, setDates] = useState();
  const [selectedDate, setSelectedDate] = useState();

  useEffect(() => {
    if (!results) {
      return;
    }
    const keys = Object.keys(results);
    const dateOptions = keys.map((key) => ({ value: key, label: key }));
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
  const [showThirdPersonAssessment, setShowThirdPersonAssessment] =
    useState(true);
  return (
    <div className="w-full overflow-auto">
      <div className="flex place-content-center">
        <div className="relative w-full mx-3 md:w-4/5 my-6 flex flex-col items-center border-2 border-main">
          <div className="w-full text-white text-center font-CenturyGothic py-3 bg-main">
            <p className="text-3xl font-bold font-CenturyGothic ">Result</p>
            <p className="text-2xl font-HiraginoKakuGothicProNW3">あなたのアセスメント結果</p>
          </div>
          <div className="m-8 flex justify-center items-center">
            <div className="mr-6 font-HiraginoKakuGothicProNW3">●実施日を選択</div>
            <div className="lg:w-56 sp:w-40">
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
            <div className="xl:absolute top-60 left-5 m-auto mt-10 xl:mt-0 xl:w-72 w-64">
              <div className="text-sm border border-black xl:p-5 pl-2 py-1">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
