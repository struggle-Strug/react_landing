import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { NavLink } from 'react-router-dom'

import Button from '../button'


export default function StartEvaluationModal({ open, setOpenModal, id }) {
    return (
        <>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setOpenModal(false)}>
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
                                <Dialog.Panel className="relative transform overflow-hidden bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:py-12 sm:px-6 border-main border-4 rounded-3xl">
                                    <div>
                                        <div className="text-center text-main font-bold">
                                            <p>精度の高いフィードバックにするためにも、率直に正直にお答えください。</p>
                                            <p className='mt-5'>あなたの回答結果は匿名化されて対象者や管理者に開示されます。</p>
                                            <p>他者にあなたの名前が開示されることは一切ありません。</p>
                                        </div>
                                    </div>
                                    <div className="mt-8 flex justify-center items-center">
                                        <NavLink to={`/${id}/assessment`} >
                                            <Button
                                                title="アセスメントを開始する"
                                                className="px-28"
                                                onClick={() => setOpenModal(false)}
                                            />
                                        </NavLink>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}