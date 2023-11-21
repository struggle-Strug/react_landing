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
        <div className="w-full flex-col justify-center bg-white overflow-auto font-bold sp:mt-28">
          <div className="hidden sp:block text-2xl font-HiraginoKakuGothicProNW3 text-center">
            アセスメントを実施する
          </div>
          <div className="flex place-content-center">
            <div className="flex sp:flex-col items-center w-11/12 sp:mt-7 sp:mb-0 rounded-l-[37px] sp:rounded-t-lg sp:rounded-bl-none bg-[#DFFAFD]">
              <div className="md:w-2/5 lg:w-2/6 sp:w-full flex justify-center items-center rounded-[37px] sp:rounded-lg h-full bg-main sp:py-4">
                <div className="w-full flex justify-center items-center">
                  <p className="text-white md:text-sm xl:text-lg text-base sp:text-sm font-HiraginoKakuGothicProNW3">
                    {"自分自身のアセスメント"}
                  </p>
                </div>
              </div>
              <div className="md:w-3/5 lg:w-4/6 sp:w-11/12 flex flex-col m-auto justify-center items-center my-14 sp:my-7">
                <p className="text-main 2xl:text-2xl md:text-sm lg:text-lg mb-5 sp:mb-3 font-semibold font-HiraginoKakuGothicProNW6">
                  {"自分自身のアセスメントを実施する"}
                </p>
                <div className="md:w-full lg:w-3/4 sp:w-full px-4 sp:px-0">
                  {selfAssessment &&
                    (selfAssessment.complete ? (
                      <Button
                        title="START"
                        className="max-w-3xl w-full text-4xl sp:text-xl font-bold m-auto font-CenturyGothic lg:py-[14px] sp:py-0"
                        disabled
                      />
                    ) : (
                      <NavLink to={`/${id}/assessmentOwn`}>
                        <Button
                          title="START"
                          className="max-w-3xl w-full text-4xl sp:text-xl font-bold m-auto font-CenturyGothic lg:py-[14px]"
                          onClick={() => setAssessment(selfAssessment)}
                        />
                      </NavLink>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex place-content-center">
            <div className="flex sp:flex-col items-center w-11/12 mt-16 sp:mt-14 sp:mb-0 rounded-l-[37px] sp:rounded-t-lg sp:rounded-bl-none bg-[#DFFAFD]">
              <div className="flex sp:w-full justify-center items-center rounded-[37px] sp:rounded-lg md:w-2/5 lg:w-2/6 h-full bg-main sp:py-4">
                <p className="text-white md:text-sm xl:text-lg sp:text-sm font-HiraginoKakuGothicProNW3">
                  {"第三者のアセスメント"}
                </p>
              </div>
              <div className="m-auto py-14 sp:pt-6 sp:py-11 md:w-3/5 lg:w-4/6 sp:w-11/12">
                <p className="text-main 2xl:text-2xl md:text-sm lg:text-lg text-center mb-5 sp:mb-3 font-semibold font-HiraginoKakuGothicProNW6">
                  {"第三者のアセスメントを実施する"}
                </p>
                <div className="flex flex-col justify-center items-center gap-y-10 sp:gap-y-8 w-full">
                <div className="md:w-full lg:w-3/4 sp:w-full px-4 sp:px-0">
                  <NavLink to={`/${id}/assessment`} className={"w-full"}>
                    <Button
                      title="START"
                      className="max-w-3xl w-full text-4xl sp:text-xl font-bold m-auto font-CenturyGothic lg:py-[14px] sp:py-0"
                      disabled={
                        otherAssessments &&
                        otherAssessments.filter((a) => a.complete === false)
                          .length === 0
                      }
                    />
                  </NavLink>
                  </div>
                  <div className="px-4 w-5/6 sp:px-0 sp:w-full">
                    <div className="w-full mb-9 sp:mb-6 border-[0.5px] border-main"></div>
                    <div className="w-full text-base sp:text-xs text-center py-2 sp:py-1 text-main border border-main font-HiraginoKakuGothicProNW3 font-bold">
                      {"アセスメントの対象者"}
                    </div>
                    <div className="flex flex-wrap sp:gap-y-4 sp:mt-5 gap-y-6 w-full px-4 mt-6 md:text-sm lg:text-lg sp:text-xs">
                      {otherAssessments &&
                        otherAssessments.map((assessment, index) =>
                          assessment.complete ? (
                            <p
                              key={index}
                              className="font-bold text-gray-400 sp:w-1/3 sm:w-full lg:w-1/2 xl:w-1/3 2xl:w-1/4 break-keep font-HiraginoKakuGothicProNW6"
                            >
                              {assessment.received_evaluations_name}
                            </p>
                          ) : (
                            <p
                              key={index}
                              className="font-bold break-keep sp:w-1/3 sm:w-full lg:w-1/2 xl:w-1/3 2xl:w-1/4 font-HiraginoKakuGothicProNW6"
                            >
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
        </div>
      </>
    )
  );
}
