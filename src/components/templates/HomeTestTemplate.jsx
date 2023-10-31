/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import Button from "../button";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { UseUserDetails } from "../../context/UserContext";
import { useAtom } from "jotai";
import { assessmentAtom } from "../../utils/atom";

export default function HomeTestTemplate({ assessments }) {
  const user = UseUserDetails()[0];
  const { id } = useParams();
  const [selfAssessment, setSelfAssessment] = useState();
  const [otherAssessments, setOtherAssessments] = useState();
  const [, setAssessment] = useAtom(assessmentAtom);

  useEffect(() => {
    if (!assessments) {
      return;
    }
    if (!Array.isArray(assessments)) {
      return;
    }
    const myAssessment = assessments.filter(
      (a) => a.received_evaluations === user.id
    );
    setSelfAssessment(myAssessment[0]);
    const otherAssessments = assessments.filter(
      (a) => a.received_evaluations !== user.id && a.type === "3rd"
    );  
    setOtherAssessments(otherAssessments);
  }, [assessments, user]);

  return (
    user.id && (
      <>
        <div className="w-full flex-col justify-center bg-white overflow-auto">
          <div className="flex place-content-center mt-[120px] mb-[]">
            <div className="flex items-center w-full mx-3 md:w-5/6 my-10 rounded-l-[37px] bg-[#DFFAFD]">
              <div className="w-1/4 flex justify-center items-center rounded-[37px] h-full bg-main">
                <div className="w-full flex justify-center items-center px-4">
                  <p className="text-white font-HiraginoKakuGothicProNW3">自分自身のアセスメント</p>
                </div>
              </div>
              <div className="w-3/4 flex flex-col m-auto justify-center items-center my-10">
                <p className="text-main mb-3 font-semibold font-HiraginoKakuGothicProNW3">
                  自分自身のアセスメントを実施する
                </p>
                <div className="w-full px-8">
                  {selfAssessment &&
                    (selfAssessment.complete ? (
                      <Button
                        title="START"
                        className="max-w-3xl w-full text-3xl font-bold m-auto font-CenturyGothic"
                        disabled
                      />
                    ) : (
                      <NavLink to={`/${id}/assessmentOwn`}>
                        <Button
                          title="START"
                          className="max-w-3xl w-full text-3xl font-bold m-auto font-CenturyGothic"
                          onClick={() => setAssessment(selfAssessment)}
                        />
                      </NavLink>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex place-content-center">
            <div className="flex w-full mx-3 md:w-5/6 my-10 rounded-l-[37px] bg-[#DFFAFD]">
              <div className="flex justify-center items-center rounded-[37px] w-1/4 h-full bg-main">
                <p className="text-white mb-3 px-4 font-HiraginoKakuGothicProNW3">第三者のアセスメント</p>
              </div>
              <div className="m-auto my-10 w-3/4">
                <p className="text-main text-center mb-2 font-semibold font-HiraginoKakuGothicProNW3">第三者のアセスメントを実施する</p>
                <div className="flex flex-col justify-center items-center gap-y-10 px-8 w-full">
                  <NavLink to={`/${id}/assessment`} className={"w-full"}>
                    <Button
                      title="START"
                      className="text-3xl font-bold max-w-3xl w-full m-auto font-CenturyGothic"
                      disabled={
                        otherAssessments &&
                        otherAssessments.filter((a) => a.complete === false)
                          .length === 0
                      }
                    />
                  </NavLink>
                  <div className="w-full mt-2 border-[0.5px] border-main"></div>
                  <div className="w-full text-center text-main border border-main font-HiraginoKakuGothicProNW3 font-bold">アセスメントの対象者</div>
                  <div className="flex flex-wrap justify-between w-full mx-5">
                    {otherAssessments &&
                      otherAssessments.map((assessment, index) =>
                        assessment.complete ? (
                          <p key={index} className="font-bold text-gray-400 w-28 break-keep font-HiraginoKakuGothicProNW3">
                            {assessment.received_evaluations_name}
                          </p>
                        ) : (
                          <p key={index} className="font-bold w-28 break-keep font-HiraginoKakuGothicProNW3">
                            {assessment.received_evaluations_name}
                          </p>
                        )
                      )}
                      
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}
