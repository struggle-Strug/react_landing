/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import Button from "../button";
// import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
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
        <div className="w-full flex-col justify-center bg-white overflow-auto  mt-[120px]">
          <div className="hidden sp:block text-3xl font-HiraginoKakuGothicProNW3 text-center">アセスメントを実施する</div>
          <div className="flex place-content-center mb-[]">
            <div className="flex sp:flex-col items-center w-full mx-3 md:w-5/6 my-10 rounded-l-[37px] sp:rounded-t-lg sp:rounded-bl-none bg-[#DFFAFD]">
              <div className="w-1/4 sp:w-full flex justify-center items-center rounded-[37px] sp:rounded-lg h-full bg-main sp:py-4">
                <div className="w-full flex justify-center items-center px-4">
                  <p className="text-white font-HiraginoKakuGothicProNW3">{"自分自身のアセスメント"}</p>
                </div>
              </div>
              <div className="w-3/4 sp:w-11/12 flex flex-col m-auto justify-center items-center my-10">
                <p className="text-main text-xl mb-3 font-semibold font-HiraginoKakuGothicProNW3">
                  {"自分自身のアセスメントを実施する"}
                </p>
                <div className="w-full px-8">
                  {selfAssessment &&
                    (selfAssessment.complete ? (
                      <Button
                        title="START"
                        className="max-w-3xl w-full text-3xl sp:text-xl font-bold m-auto font-CenturyGothic"
                        disabled
                      />
                    ) : (
                      <NavLink to={`/${id}/assessmentOwn`}>
                        <Button
                          title="START"
                          className="max-w-3xl w-full text-3xl sp:text-xl font-bold m-auto font-CenturyGothic"
                          onClick={() => setAssessment(selfAssessment)}
                        />
                      </NavLink>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex place-content-center">
            <div className="flex sp:flex-col w-full mx-3 md:w-5/6 my-10 rounded-l-[37px] sp:rounded-t-lg sp:rounded-bl-none bg-[#DFFAFD]">
              <div className="flex sp:w-full justify-center items-center rounded-[37px] sp:rounded-lg w-1/4 h-full bg-main sp:py-4">
                <p className="text-white px-4 font-HiraginoKakuGothicProNW3">{"第三者のアセスメント"}</p>
              </div>
              <div className="m-auto my-10 w-3/4 sp:w-11/12">
                <p className="text-main text-xl text-center mb-2 font-semibold font-HiraginoKakuGothicProNW3">{"第三者のアセスメントを実施する"}</p>
                <div className="flex flex-col justify-center items-center gap-y-10 sp:gap-y-8 px-8 w-full">
                  <NavLink to={`/${id}/assessment`} className={"w-full"}>
                    <Button
                      title="START"
                      className="text-3xl sp:text-xl font-bold max-w-3xl w-full m-auto font-CenturyGothic"
                      disabled={
                        otherAssessments &&
                        otherAssessments.filter((a) => a.complete === false)
                          .length === 0
                      }
                    />
                  </NavLink>
                  <div className="w-full mt-2 border-[0.5px] border-main"></div>
                  <div className="w-full text-center text-main border border-main font-HiraginoKakuGothicProNW3 font-bold">{"アセスメントの対象者"}</div>
                  <div className="flex flex-wrap justify-between w-full mx-5 sp:text-sm">
                    {otherAssessments &&
                      otherAssessments.map((assessment, index) =>
                        assessment.complete ? (
                          <p key={index} className="font-bold text-gray-400 w-28 sp:w-24 break-keep font-HiraginoKakuGothicProNW3">
                            {assessment.received_evaluations_name}
                          </p>
                        ) : (
                          <p key={index} className="font-bold w-28 sp:w-24 break-keep font-HiraginoKakuGothicProNW3">
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
