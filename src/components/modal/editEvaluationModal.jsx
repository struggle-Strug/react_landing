import { useState, useEffect } from 'react'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import Loader from '../loader'
import Button from '../button'


export default function EditEvaluationModal({open, onClose, title, members, loading, editForm, userArray, setUserArray}){
    const [isValidData, setIsValidData] = useState(false)

    useEffect(() => {
        if(userArray.length > 0){
            setIsValidData(true)
        }
    }, [userArray])
    
    function handleChange(e){
        let index = e.nativeEvent.target.selectedIndex;
        if(e.target.value){
            let user = {
                id: e.target.value,
                name: e.nativeEvent.target[index].text
            }
            setUserArray([...userArray, user])
        }
    }

    function removeUser(user){
        setUserArray((userArray) => userArray.filter((item) => item.id !== user.id))
    }

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
                                    {userArray && userArray.map((item, index) => (
                                        <div className='mt-2 px-16' key={index}>
                                            <div className='border-2 border-indigo-900 rounded py-2 relative text-red-500'>
                                                <span className='text-black'>{item.name}</span>
                                                <span
                                                    className='absolute right-2 shrink-0 cursor-pointer'
                                                    aria-hidden="true"
                                                    onClick={() => {removeUser(item)}}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                    <div className='mt-2 px-16'>
                                        <select className='border-1 border-indigo-500 w-full' onChange={handleChange}>
                                            <option value="">-</option>
                                            {members.map((member, index) => (
                                                <option key={index} value={member.id}>{member.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 flex justify-center">
                                <Button
                                    title="送信する"
                                    className="bg-green-500 hover:bg-green-300 px-28"
                                    disabled={!isValidData}
                                    onClick={editForm}
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