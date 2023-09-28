/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import Button from '../button';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { UseUserDetails } from '../../context/UserContext';
import { useAtom } from 'jotai';
import { assessmentAtom } from '../../utils/atom';

export default function HomeTestTemplate({ assessments }) {
  const user = UseUserDetails()[0]
  const { id } = useParams()
  const [selfAssessment, setSelfAssessment] = useState()
  const [otherAssessments, setOtherAssessments] = useState()
  const [, setAssessment] = useAtom(assessmentAtom)

  useEffect(() => {
    if (!assessments) { return }
    if (!Array.isArray(assessments)) { return }
    const myAssessment = assessments.filter(a => a.received_evaluations === user.id)
    setSelfAssessment(myAssessment[0])
    const otherAssessments = assessments.filter(a => (a.received_evaluations !== user.id && a.type === "3rd"))
    setOtherAssessments(otherAssessments)
  }, [assessments, user])

  return (
    (user.id && (
      <>
        <div className='w-full flex-col justify-center bg-slate-100 overflow-auto'>
          <div className='flex place-content-center'>
            <div className='w-full mx-3 md:w-5/6 my-10 bg-white'>
              <div className='mx-10'>
                <div className='mt-3 flex items-center'>
                  <ExclamationCircleIcon className='ml-3 h-5 w-5 text-slate-400' />
                  <p className='ml-2'>自分自身のアセスメント</p>
                </div>
                <div className='mt-2 border-[0.5px] border-gray-400'></div>
              </div>
              <div className='flex justify-center items-center my-10'>
                {selfAssessment && (
                  selfAssessment.complete
                    ? (
                      <Button
                        title="アセスメントは完了しています"
                        className="md:w-96"
                        disabled
                      />
                    )
                    : (
                      <NavLink to={`/${id}/assessment`}>
                        <Button
                          title="アセスメントを実施する"
                          className="md:w-96"
                          onClick={() => setAssessment(selfAssessment)}
                        />
                      </NavLink>
                    )
                )}
              </div>
            </div>
          </div>
          <div className='flex place-content-center'>
            <div className='w-full mx-3 md:w-5/6 my-10 bg-white'>
              <div className='mx-10'>
                <div className='mt-3 flex items-center'>
                  <ExclamationCircleIcon className='ml-3 h-5 w-5 text-slate-400' />
                  <p className='ml-1'>第3者のアセスメント</p>
                </div>
                <div className='mt-2 border-[0.5px] border-gray-400'></div>
              </div>
              <div className='my-10 flex flex-col justify-center items-center gap-y-10'>
                <NavLink to={`/${id}/assessmentTest`}>
                  <Button
                    title="第三者アセスメントを実施する"
                    className="md:w-96 rounded-none"
                    disabled={otherAssessments && otherAssessments.filter((a) => (a.complete === false)).length === 0}
                  />
                </NavLink>
                {otherAssessments && otherAssessments.map((assessment, index) => (
                  assessment.complete
                    ? (
                      <p key={index} className='font-bold text-gray-400'>{assessment.received_evaluations_name}</p>
                    )
                    : (
                      <p key={index} className='font-bold'>{assessment.received_evaluations_name}</p>
                    )
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    ))

  )
}