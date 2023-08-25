/* eslint-disable react/prop-types */
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'

// eslint-disable-next-line react/prop-types
export default function AssessorsModal({ open, title, msg, status, setShowNumOfAssessors}) {
  function clickHandler() {
    setShowNumOfAssessors(false)
  }
  const Icon = () => {
    if (status === "success") {
      return (
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
        </div>
      )
    } else if (status === "failed") {
      return (
        <div className="mx-auto flex h-12 w-12 items-center justify-center">
          <ExclamationCircleIcon className="h-10 w-10 text-red-600" aria-hidden="true" />
        </div>
      )
    }
  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {setShowNumOfAssessors(false)}}>
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
                  <Icon />
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      {title}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {msg}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 items-center px-24">
                  <button
                    type="button"
                    className="flex justify-center px-6 py-3 bg-btn text-white rounded-full hover:bg-primary-1 transition-colors m-auto"
                    onClick={clickHandler}
                  >
                    閉じる
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
