/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import RadarChart from '../radarChart'
import Toggle from '../toggle'
import Dropdown from '../dropdown'

export default function ResultTemplate({ results }) {
  const [scores, setScores] = useState()
  const [dates, setDates] = useState()
  const [selectedDate, setSelectedDate] = useState()

  useEffect(() => {
    if (!results) { return }
    const keys = Object.keys(results)
    const dateOptions = keys.map(key => ({ value: key, label: key }))
    setDates(dateOptions)
    setSelectedDate(dateOptions[0])
  }, [results])

  useEffect(() => {
    if(!selectedDate) { return }
    const score = results[selectedDate.value]
    setScores(score)
  }, [results, selectedDate])

  const handleChange = (value) => {
    setSelectedDate(value);
  }
  const [showThirdPersonAssessment, setShowThirdPersonAssessment] = useState(true)
  return (
    <div className='w-full bg-slate-100 overflow-auto'>
      <div className='flex place-content-center'>
        <div className='w-full mx-3 md:w-11/12 my-6 bg-white'>
          <div className="m-4 w-2/5">
            {selectedDate && (
              <Dropdown
                options={dates}
                selectedOption={selectedDate}
                onChange={handleChange}
                setSelectedOption={handleChange}
              />
            )}

          </div>
          <div className='lg:grid lg:grid-cols-3 mx-10 '>
            <div className='lg:col-span-2 w-full aspect-square'>
              <RadarChart
                showThirdPerson={showThirdPersonAssessment}
                scores={scores}
              />
            </div>
            <div className='row-span-12 lg:col-span-1 lg:flex flex-col mt-20'>
              <Toggle setShowThirdPerson={setShowThirdPersonAssessment} />
              <div className=' mt-10 lg:mt-48  text-lg text-center'>
                <div className='text-red-500'>赤：自己評価</div>
                <div className='text-blue-600'>青：第三者からの評価（平均値）</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}