/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import InputField from '../inputfield'
import Button from '../button'
import { useAtom } from 'jotai'
import { formAtom } from '../../utils/atom'
import Loader from '../loader'

// eslint-disable-next-line react/prop-types
export default function TeamModal({ open, title, onClose, team, submitForm, loading }) {
  const [, setFormData] = useAtom(formAtom)
  const [teamName, setTeamName] = useState("")
  const [productivity, setProductivity] = useState("")
  const [isValidData, setIsValidData] = useState(false)

  function clickHandler() {
    onClose(false)
  }

  useEffect(() => {
    const formData = {
      team_name: teamName,
      productivity_team: productivity
    }
    setFormData(formData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamName, productivity])

  useEffect(() => {
    if (!team) { return }
    setTeamName(team.team_name)
    setProductivity(team.productivity_team)
  }, [team])

  useEffect(() => {
    if (teamName) {
      setIsValidData(true)
    } else {
      setIsValidData(false)
    }
  }, [teamName])

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={clickHandler}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0 ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="text-center sm:mt-5">
                      <Dialog.Title as="h1" className="text-2xl font-bold leading-6 text-gray-900">
                        {title}
                      </Dialog.Title>
                      <div className="mt-10">
                      </div>
                      <div className='mt-4'>
                        <div className='text-left font-semibold'>チーム名</div>
                        <InputField
                          type="text"
                          value={teamName}
                          onChange={(e) => setTeamName(e.target.value)}
                        />
                      </div>
                      {!team && (
                        <div className='mt-4'>
                          <div className='text-left font-semibold'>生産性</div>
                          <InputField
                            type="number"
                            value={productivity}
                            min={1}
                            max={10}
                            onChange={(e) => setProductivity(e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                    <div className="mt-8 flex justify-center">
                      <Button
                        title="送信する"
                        className="bg-primary-2 hover:bg-primary-2 px-20"
                        disabled={!isValidData}
                        onClick={submitForm}
                      />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              {loading && <Loader />}
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>

  )
}
