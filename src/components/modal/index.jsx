/* eslint-disable react/prop-types */
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'

// eslint-disable-next-line react/prop-types
export default function ConfirmationModal({ open, title, msg, status, onConfirm, errorMessage }) {
  function clickHandler() {
    onConfirm()
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
      <Dialog as="div" className="relative z-50" onClose={clickHandler}>
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
                    {errorMessage &&
                      errorMessage.map((msg, idx) => {
                        const key = Object.keys(msg).filter(k => k !== '場所')[0];
                        return (
                        <div key={idx} className="flex text-left">
                          <div className="w-1/6">
                            {msg["場所"]}
                          </div>
                          <div className="text-left">
                            {msg[key]}
                          </div>
                        </div>
                      )})
                    }
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
