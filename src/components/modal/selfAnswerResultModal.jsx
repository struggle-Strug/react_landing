/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

// eslint-disable-next-line react/prop-types
export default function SelfAnswerResultModal({
    open,
    setOpenModal,
    userAnswers,
    categories,
    otherAnswers,
}) {
    const clickHandler = () => {
        setOpenModal(false);
    };

    console.log(userAnswers, otherAnswers)
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
                            <Dialog.Panel className="relative transform overflow-hidden bg-[#EBFBFF] px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-6xl sm:p-6">
                                <div className="font-HiraginoKakuGothicProNW3">
                                    {userAnswers !== undefined && (
                                        <div className="flow-root overflow-y-auto bg-[#EBFBFF] py-10 px-5">
                                            <div
                                                className="h-[40px] mt-2 mr-auto flex justify-end cursor-pointer"
                                                onClick={clickHandler}
                                            >
                                                <div>
                                                    <span className="w-[40px] h-[1px] block bg-black rotate-45"></span>
                                                    <span className="w-[40px] h-[1px] block bg-black -rotate-45"></span>
                                                </div>
                                            </div>
                                            <div className="text-center text-2xl lg:text-3xl bg-main w-5/6 mx-auto text-white py-4 mb-10">
                                                あなたのアセスメント結果を見る
                                            </div>
                                            <div className=" overflow-x-auto">
                                                <table className="w-full">
                                                    <thead className="bg-white py-2 font-bold font-HiraginoKakuGothicProNW6">
                                                        <tr className="text-center">
                                                            <th className="w-[5%]"></th>
                                                            <th className="text-xl w-[40%] min-w-[200px]">設問</th>
                                                            <th className="break-keep">回答</th>
                                                            <th className="break-keep">会社平均</th>
                                                            <th className="break-keep">第三者評価平均</th>
                                                            <th className="break-keep">同業者平均</th>
                                                            <th className="break-keep">全企業平均</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {categories &&
                                                            categories.map((category, idx) => {
                                                                const categoryAnswers = userAnswers.filter(
                                                                    (answers) =>
                                                                        answers.quiz_category_name === category
                                                                );
                                                                return (
                                                                    <>
                                                                        <tr
                                                                            className=" p-1 mt-5 text-xl text-main border-b-[0.5px] border-black"
                                                                            key={`category-${idx}`}
                                                                        >
                                                                            <td
                                                                                colSpan={4}
                                                                                className="pt-12"
                                                                            >{`●${category}`}</td>
                                                                        </tr>
                                                                        {categoryAnswers.map((answer, idx) => (
                                                                            <tr key={`answer-${idx}`}>
                                                                                <td className="py-3">{idx + 1}</td>
                                                                                <td>{answer.quiz}</td>
                                                                                <td className="text-center">
                                                                                    {answer.answer}
                                                                                </td>
                                                                                <td className="text-center">
                                                                                    {otherAnswers['company_answer_avg'][answer.quiz_number][0] && otherAnswers['company_answer_avg'][answer.quiz_number][0]}
                                                                                </td>
                                                                                <td className="text-center">
                                                                                    {otherAnswers['finder_answer_avg'][answer.quiz_number][0] && otherAnswers['finder_answer_avg'][answer.quiz_number][0]}
                                                                                </td>
                                                                                <td className="text-center">
                                                                                    {otherAnswers['industry_answer_avg'][answer.quiz_number][0] && otherAnswers['industry_answer_avg'][answer.quiz_number][0]}
                                                                                </td>
                                                                                <td className="text-center">
                                                                                    {otherAnswers['third_answer_avg'][answer.quiz_number][0] && otherAnswers['third_answer_avg'][answer.quiz_number][0]}
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </>
                                                                );
                                                            })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
