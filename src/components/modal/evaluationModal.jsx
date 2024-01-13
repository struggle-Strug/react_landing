/* eslint-disable react/prop-types */
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

// eslint-disable-next-line react/prop-types
export default function EvaluationModal({ open, category, setOpenAgreeModal, labels }) {
  function clickHandler() {
    setOpenAgreeModal(false)
  }

  const categories = [
    { name: '心理的安全度', label: ' : 本音で会話ができている。 チャレンジができる' },
    { name: '個人ビジョン明確度', label: ' : 個人レベルでのキャリア設計がある' },
    { name: '会社ビジョン明確度', label: ' : 会社のミッションやビジョンを理解できている' },
    { name: '会社と個人の統合度', label: ' : 個人ビジョンと会社ビジョンが擦り合っている' },
    { name: '意欲性', label: ' : 意欲的に働けているかどうか' },
    { name: '影響力', label: ' : 存在が周りに良い影響を与えているか' },
  ]
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={clickHandler}>
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

        <div className="fixed inset-0 z-30 overflow-y-auto">
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6 border-4 border-main">
                <div className='h-[40px] mt-2 mr-auto flex justify-end cursor-pointer' onClick={clickHandler}>
                  <div>
                    <span className='w-[40px] h-[1px] block bg-black rotate-45'></span>
                    <span className='w-[40px] h-[1px] block bg-black -rotate-45'></span>
                  </div>
                </div>
                <div>
                  <table className='m-auto w-fit'>
                    {labels.map((c, i) => (i < category && <tr key={`evaluation-${i}`}>
                      <td className='font-bold'>{c}</td>
                      <td>{categories[i].label}</td>
                    </tr>))}
                  </table>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
