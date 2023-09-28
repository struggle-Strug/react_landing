/* eslint-disable react/prop-types */
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { requestWithTokenRefresh } from '../../utils/AuthService'
import { EVALUATION_ENDPOINT } from '../../utils/constants'

// eslint-disable-next-line react/prop-types
export default function ConfirmTestModal({ open, title, questionAnswerData, msg, onConfirm }) {
  const evaluationList = questionAnswerData.user_answer_list
  const [evaluationData, setEvaluationData] = useState(evaluationList.map((eva) => ({
    evaluation_id: eva.evaluation_id
  })))
  const clickHandler = async () => {
    await requestWithTokenRefresh(`${EVALUATION_ENDPOINT}complete/multiple-third/`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "PATCH",
      body: JSON.stringify(evaluationData)
    })
    onConfirm()
  }

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setEvaluationData(evaluationData.find(eva => eva.evaluation_id === parseInt(e.target.value)) ? evaluationData : [...evaluationData, { evaluation_id: parseInt(e.target.value) }])
    } else {
      setEvaluationData(evaluationData.filter((eva) => (eva.evaluation_id !== parseInt(e.target.value))))
    }
  }

  return (
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      {title}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 text-left">
                        {msg}
                      </p>
                    </div>
                    <div className="mt-2 text-left">
                      <p className="text-sm text-gray-500 text-left">
                        {evaluationList.map((eva, idx) => {
                          return (
                            <label key={idx} className='mr-5'>
                              <input type="checkbox"
                                className='mr-2'
                                defaultChecked
                                value={eva.evaluation_id}
                                onChange={handleCheckboxChange}
                              />
                              {eva.received_evaluations_name}
                            </label>
                          )
                        })}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 items-center px-24">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={clickHandler}
                  >
                    OK
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
