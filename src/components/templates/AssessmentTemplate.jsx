/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { MarkedSlider } from "../slider";
import Button from "../button";

export default function AssessmentTemplate({
  answers,
  assessment,
  updateAnswer,
  submitAnswers,
}) {
  const sortedAnswer = (answers) => {
    const sorted = answers.sort((a, b) =>
      a.quiz_relation.quiz_number.localeCompare(b.quiz_relation.quiz_number)
    );
    return sorted;
  };

  const [userAnswers, setUserAnswers] = useState(
    answers ? sortedAnswer(answers) : null
  );

  function updateAnswerArray(data) {
    if (data) {
      if (userAnswers) {
        const hasObject = userAnswers.some((obj) => obj.id === data.id);
        if (hasObject) {
          const newAnswers = userAnswers.map((obj) => (obj.id !== data.id ? obj : data));
          setUserAnswers(newAnswers);
        } else {
          setUserAnswers(userAnswers);
        }
      }
      updateAnswer(data);
    }
  }

  return (
    <>
      <div className="max-w-[1144px] sm:w-full xl:w-3/4">
        <div className="font-bold">
          <div className="mt-6 mb-10">
            <div className="hidden sp:block text-center mt-10 mb-8 sp:text-xs font-HiraginoKakuGothicProNW6 font-bold text-main">{"自分自身のアセスメントを実施する"}</div>
            <div className="text-center text-lg	sm:text-2xl mb-[70px] mx-3 sp:mx-0 sp:px-5 sp:mb-0">
              {/* {assessment.received_evaluations_name} さんのアセスメント */}
              <p className="lg:text-4xl md:text-3xl sp:text-xl sp:mb-3.5 mb-6 text-[#707070] font-bold font-CenturyGothic">
                {"Question"}
              </p>
              <p className="2xl:text-[54px] xl:text-5xl lg:text-4xl md:text-3xl mb-8 font-HiraginoKakuGothicProNW6 font-bold text-main sp:text-2xl sp:mb-6">
                {"以下の質問にお答えください。"}
              </p>
              <p className="text-sm font-HiraginoKakuGothicProNW6 font-bold text-main sp:text-[13px] sp:max-w-[270px] sp:mx-auto">
                {
                  "精度の高いフィードバックにするためにも、率直に正直にお答えください。"
                }
              </p>
              <p className="text-sm font-HiraginoKakuGothicProNW6 font-bold text-main sp:text-[13px] sp:max-w-[355px] sp:mx-auto">
                {
                  "（もし対象者について回答する場合も、対象者に回答が開示されることはありませんのでご安心ください。）"
                }
              </p>
            </div>
            <div className="border-2 border-main sp:border-0 mx-5 sp:mx-0 lg:mb-32 md:mb-16">
              <ul className="m-auto xl:px-20 md:px-8 sp:px-3 py-14 sp:py-0 sp:pt-8 sp:pb-14 sp:text-[15px]">
                {userAnswers &&
                  userAnswers.map((answer) => (
                    <li key={answer.id} className="p-6 pl-12 sp:pr-0 sp:pl-8 xl:text-xl text-base">
                      {answer.quiz_relation.quiz && (
                        <p className="py-2">
                          {answer.quiz_relation.quiz.replace(
                            "対象者",
                            answer.evaluation_relation.received_evaluations_name
                          )}
                        </p>
                      )}
                      <MarkedSlider
                        answer={answer}
                        setAnswer={updateAnswerArray}
                      />
                    </li>
                  ))}
              </ul>
              <div className="text-main mt-9 2xl:text-2xl xl:text-xl lg:text-lg md:text-base sp:text-[15px] sp:max-w-[290px] mx-auto sp:px-0 px-7">
                <p className="text-center font-HiraginoKakuGothicProNW6 font-bold">
                  {"ご回答ありがとうございました！"}
                </p>
                <p className="text-center font-HiraginoKakuGothicProNW6 font-bold">
                  {"下の「回答を提出する」ボタンを押して、終了してください。"}
                </p>
              </div>
              <div className="w-full flex justify-center pt-16 lg:pb-32 md:pb-10 sp:pb-32">
                <Button
                  title="回答を提出する"
                  className="2xl:w-[620px] xl:w-[550px] lg:450px: md:w-96 sp:w-72 py-3 sp:py-2 font-HiraginoKakuGothicProNW3 bg-main sp:text-[17px] 2xl:text-2xl"
                  onClick={submitAnswers}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
