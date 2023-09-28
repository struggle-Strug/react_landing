/* eslint-disable react/prop-types */
import { useMemo } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './slider.css'

import { requestWithTokenRefresh } from '../../utils/AuthService';
import { USERANSWER_UPDATE_ENDPOINT } from '../../utils/constants';

export const MarkedSlider = ({ answer, setAnswer }) => {
  const marks = {
    1: '全く思わない',
    2: '思わない',
    3: '思う',
    4: '強く思う',
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
            max={4}
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
    1: '全く思わない',
    2: '思わない',
    3: '思う',
    4: '強く思う',
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

export const ChangeValueSlider = ({ answer, question, setAnswer }) => {

  const handleChange = async (e, id) => {
    const res = await requestWithTokenRefresh(`${USERANSWER_UPDATE_ENDPOINT}${id}/`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "PATCH",
      body: JSON.stringify({
        "answer": e.target.value
      })
    })
    if (res.ok) {
      setAnswer();
    }
  }
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
          <div className='relative flex p-0 w-11/12' key={index}>
            <input type="range" min={1} max={4} className="answer-slider hover:cursor-pointer" onChange={(e) => handleChange(e, a.answer.id)} defaultValue={a.answer.answer} />
            <div className={`absolute top-0 flex justify-center items-center bg-sky-300 text-center w-[30%] leading-none px-2 h-5 -translate-x-1/2 break-keep cursor-pointer border border-white`} style={{ left: `${(a.answer.answer - 1) * 33}%` }}>{a.received_evaluations_name}</div>
          </div>

        ))
      }
    </>
  )
}