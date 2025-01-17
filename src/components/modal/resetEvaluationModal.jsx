import { useState, useEffect } from 'react'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import Loader from '../loader'
import Button from '../button'


export default function ResetEvaluationModal({open, onClose, title, member, loading, resetForm}){
    const [evaluations, setEvaluations] = useState([])
    
    useEffect(() => {
        if(!member){
            return
        }
        setEvaluations(member.given_evaluations.name)
    }, [member])
    
    function clickHandler() {
        onClose(false)
    }

    return (
        <>
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
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                            <div>
                                <div className="text-center sm:mt-5">
                                    <Dialog.Title as="h1" className="text-2xl font-bold leading-6 text-gray-900">
                                        {title}
                                    </Dialog.Title>
                                    <div className="mt-6">
                                    </div>
                                    {evaluations && evaluations.map((item, index) => (
                                        <div className='mt-6 px-16' key={index}>
                                            <div className='border-2 border-indigo-900 rounded'>
                                                {item}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-8 flex justify-center">
                                <Button
                                    title="リセット"
                                    className="bg-red-500 hover:bg-red-300 px-28"
                                    onClick={resetForm}
                                />
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