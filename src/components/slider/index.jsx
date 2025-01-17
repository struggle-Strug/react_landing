/* eslint-disable react/prop-types */
import { useMemo, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './slider.css'

import { requestWithTokenRefresh } from '../../utils/AuthService';
import { USERANSWER_UPDATE_ENDPOINT } from '../../utils/constants';

export const MarkedSlider = ({ answer, setAnswer }) => {
  const marks = {
    1: 'まったくできない',
    2: 'ほとんどできない',
    3: 'どちらかといえばできない',
    4: 'どちらかといえばできる',
    5: 'よくできる',
    6: 'とてもよくできる',
  };
  function handleOnChange(value) {
    if (answer) {
      setAnswer({ ...answer, answer: value })
    }
  }
  return (
    <>
      {answer && (
        <div>
          <Slider
            min={1}
            max={6}
            marks={marks}
            dots
            step={null}
            value={answer.answer}
            onChange={handleOnChange}
          />
        </div>
      )}
    </>
  )
}
export const MarkedTestSlider = ({ answer, question }) => {
  const marks = {
    1: 'まったくできない',
    2: 'ほとんどできない',
    3: 'どちらかといえばできない',
    4: 'どちらかといえばできる',
    5: 'よくできる',
    6: 'とてもよくできる',
  };

  const sliderData = useMemo(() => {
    return (
      answer.map((a) => {
        const aData = a.answers.find((ad) => question.quiz_number === ad.quiz_number)
        return aData ? aData.answer : 1
      }))
  }, [question, answer])


  return (
    <>
      {sliderData && (
        <div>
          <Slider
            min={1}
            max={4}
            marks={marks}
            dots
            range
            value={sliderData}
            step={null}
            included={false}
          />
        </div>
      )}
    </>
  )
}

export const CustomSlider = ({ a }) => {
  const [answerValue, setAnswerValue] = useState(a.answer.answer)

  const handleChange = (e, id) => {
    setAnswerValue(e.target.value)
    const res = requestWithTokenRefresh(`${USERANSWER_UPDATE_ENDPOINT}${id}/`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "PATCH",
      body: JSON.stringify({
        "answer": e.target.value
      })
    })
    if (res.ok) {
    }
    // setAnswer();
  }
  return (
    <div className='relative flex p-1 w-11/12 bg-repeat-y py-2' style={{ backgroundImage: 'url(/background.png)', backgroundSize: "100%" }} >
      <input type="range" min={1} max={4} className="answer-slider hover:cursor-pointer bg-transparent relative" onChange={(e) => handleChange(e, a.answer.id)} value={answerValue} />
      <div className={`absolute inset-y-1/2 -translate-y-1/2 flex justify-center items-center bg-[#4E4C4C] text-white text-center w-28 leading-none px-2  sp:px-12 h-7 -translate-x-1/2 break-keep cursor-pointer border border-white rounded-full sp:w-20`} style={{ left: `${(answerValue - 1) * 33}%` }}>{a.received_evaluations_name}</div>
    </div>
  )
}

export const ChangeValueSlider = ({ answer, question, setAnswer }) => {
  const answers = useMemo(() => {
    return (
      answer.map((a) => {
        const aData = a.answers.find((ad) => question.quiz_number === ad.quiz_number)
        return {
          type: a.type,
          complete: a.complete,
          evaluation_id: a.evaluation_id,
          received_evaluations: a.received_evaluations,
          received_evaluations_name: a.received_evaluations_name,
          answer: aData ? aData : {}
        }
      }))
  }, [question, answer])

  return (
    <>
      {
        answers.map((a, index) => (
          <CustomSlider a={a} key={`answer-slider-${index}`} />
        ))
      }
    </>
  )
}