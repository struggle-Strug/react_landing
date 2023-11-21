/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { MarkedTestSlider, ChangeValueSlider } from "../slider";
import Button from "../button";

export default function AssessmentTestTemplate({
  questionAnswerData,
  updateQuestion,
  submitAnswers,
}) {
  const [questions, setQuestions] = useState();
  const [answers, setAnswers] = useState();
  const sortedQuestion = (questions) => {
    const sorted = questions.sort((a, b) =>
      a.quiz_number.localeCompare(b.quiz_number)
    );
    return sorted;
  };

  const [userQuestions, setUserQuestions] = useState();

  useEffect(() => {
    if (!questionAnswerData) {
      return;
    }
    setQuestions(questionAnswerData.quiz_list);
    setAnswers(questionAnswerData.user_answer_list);
  }, [questionAnswerData]);

  useEffect(() => {
    setUserQuestions(questions ? sortedQuestion(questions) : null);
  }, [questions]);

  return (
    <>
      <div className="max-w-[1144px] w-full">
        <div className="w-full font-bold">
          <div className="mt-6 mb-10 sp:w-[96%] sp:mx-auto sp:mt-6">
            <div className="hidden sp:block text-center mt-10 mb-8 sp:text-xs font-HiraginoKakuGothicProNW6 font-bold text-main">{"第三者のアセスメントを実施する"}</div>
            <div className="text-center text-lg	sm:text-2xl sp:mb-8 mb-16 mx-3">
              {/* {assessment.received_evaluations_name} さんのアセスメント */}
              <p className="lg:text-4xl md:text-3xl sp:text-xl sp:mb-3.5 mb-5 text-[#707070] font-bold font-CenturyGothic font-bold">
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
              <div className="text-sm text-center bg-main text-white py-2 font-HiraginoKakuGothicProNW6 font-bold sp:text-xs">
                {"各メンバーのアイコンを該当する評価にドラッグしてください"}
              </div>
              <ul className="max-w-fit m-auto lg:px-20 md:px-8 sp:px-0 sp:pt-8 py-14" >
                {userQuestions &&
                  userQuestions.map((question) => (
                    <li
                      key={question.id + question.quiz_number}
                      className="px-6 pl-12 xl:text-xl text-base sp:pl-11 sp:pr-4"
                    >
                      {question.quiz && <p className="py-2 sp:text-[15px]">{question.quiz}</p>}
                      <MarkedTestSlider question={question} answer={answers} />
                      <div className="pt-8 pb-12 text-sm sp:text-xs font-HiraginoKakuGothicProNW3">
                        <ChangeValueSlider
                          answer={answers}
                          question={question}
                          setAnswer={updateQuestion}
                        />
                      </div>
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
