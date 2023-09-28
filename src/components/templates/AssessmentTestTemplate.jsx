/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { MarkedTestSlider, ChangeValueSlider } from '../slider'
import Button from '../button'

export default function AssessmentTestTemplate({ questionAnswerData, updateQuestion, submitAnswers }) {

  const [questions, setQuestions] = useState()
  const [answers, setAnswers] = useState()
  const sortedQuestion = (questions) => {
    const sorted = questions.sort((a, b) => a.quiz_number.localeCompare(b.quiz_number))
    return sorted
  }

  const [userQuestions, setUserQuestions] = useState()

  useEffect(() => {
    if (!questionAnswerData) {
      return
    }
    setQuestions(questionAnswerData.quiz_list)
    setAnswers(questionAnswerData.user_answer_list)
  }, [questionAnswerData])

  useEffect(() => {
    setUserQuestions(questions ? sortedQuestion(questions) : null)
  }, [questions])

  return (
    <>
      <div>
        <div className='w-full'>
          <div className='mt-6'>
            <div className='text-center text-lg	sm:text-2xl mb-2 mx-3' >
              {/* {assessment.received_evaluations_name} さんのアセスメント */}
              {"精度の高いフィードバックにするためにも、率直に正直にお答えください。"}<br />
              {"（もし対象者について回答する場合も、対象者に回答が開示されることはありませんのでご安心ください。）"}
            </div>
            <ul className='max-w-fit m-auto'>
              {userQuestions && userQuestions.map(
                question => (
                  <li
                    key={question.id + question.quiz_number}
                    className='px-6 pl-12 '
                  >
                    {question.quiz && <p className='py-2'>{question.quiz}</p>}
                    <MarkedTestSlider question={question} answer={answers} />
                    <div className='pt-6 pb-3'>
                      <ChangeValueSlider answer={answers} question={question} setAnswer={updateQuestion}/>
                    </div>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
        <div className='flex justify-center py-6'>
          <Button
            title="提出する"
            className='w-80 bg-cyan-500'
            onClick={submitAnswers}
          />
        </div>
      </div>
    </>
  )
}