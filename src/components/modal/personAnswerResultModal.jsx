/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

// eslint-disable-next-line react/prop-types
export default function EvaluationModal({ open, setOpenAgreeModal }) {
  
  const clickHandler = () => {
    setOpenAgreeModal(false);
  };

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#EBFBFF] px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-6xl sm:p-6 border-4 border-main">
                <div className='h-[40px] mt-2 mr-auto flex justify-end cursor-pointer' onClick={clickHandler}>
                  <div>
                    <span className='w-[40px] h-[1px] block bg-black rotate-45'></span>
                    <span className='w-[40px] h-[1px] block bg-black -rotate-45'></span>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div className="max-w-3xl w-full bg-main py-3 flex justify-center items-center text-white text-3xl">山田太郎さんの自己アセスメント 回答結果</div>
                  <div>
                    
                  </div>
                </div>
                
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
