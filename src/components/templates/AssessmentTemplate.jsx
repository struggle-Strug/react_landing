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
          const newAnswers = userAnswers.filter((obj) => obj.id !== data.id);
          setUserAnswers(sortedAnswer([...newAnswers, data]));
        } else {
          setUserAnswers(sortedAnswer([...userAnswers, data]));
        }
      }
      updateAnswer(data);
    }
  }

  return (
    <>
      <div>
        <div className="w-full">
          <div className="mt-6 mb-10">
          <div className="hidden sp:block text-center mb-8">{"自分自身のアセスメントを実施する"}</div>
            <div className="text-center text-lg	sm:text-2xl mb-16 mx-3 sp:mb-0">
              {/* {assessment.received_evaluations_name} さんのアセスメント */}
              <p className="text-3xl sp:text-xl mb-2 text-[#707070] font-bold font-CenturyGothic">
                {"Question"}
              </p>
              <p className="text-4xl sp:text-[28px] mb-5 font-HiraginoKakuGothicProNW3 text-main">
                {"以下の質問にお答えください。"}
              </p>
              <p className="text-xs font-HiraginoKakuGothicProNW3 text-main sp:text-sm">
                {
                  "精度の高いフィードバックにするためにも、率直に正直にお答えください。"
                }
              </p>
              <p className="text-xs font-HiraginoKakuGothicProNW3 text-main sp:text-sm">
                {
                  "（もし対象者について回答する場合も、対象者に回答が開示されることはありませんのでご安心ください。）"
                }
              </p>
            </div>
            <div className="border-2 border-main sp:border-0 mx-5 lg:mb-32 md:mb-16">
              <ul className="max-w-fit m-auto lg:px-20 md:px-8 sp:px-0 py-14">
                {userAnswers &&
                  userAnswers.map((answer) => (
                    <li key={answer.id} className="p-6 pl-12 ">
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
              <div className="text-main">
                <p className="text-center font-HiraginoKakuGothicProNW3">
                  {"ご回答ありがとうございました！"}
                </p>
                <p className="text-center font-HiraginoKakuGothicProNW3">
                  {"下の「回答を提出する」ボタンを押して、終了してください。"}
                </p>
              </div>
              <div className="flex justify-center pt-6 lg:pb-20 md:pb-10 sp:pb-10">
                <Button
                  title="回答を提出する"
                  className="w-96 py-3 font-HiraginoKakuGothicProNW3 bg-main"
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
