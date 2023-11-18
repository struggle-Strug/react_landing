/* eslint-disable react/prop-types */
import { useState } from "react";
import { formAtom, subscriptionAtom, subscriptionModalAtom } from "../../utils/atom";
import { useAtom } from "jotai";
import PopupMessageModal from "../modal/popupMessageModal";
import Button from "../button";

export default function MemberTable({
  members,
  team,
  setShowModal,
  setShowResetEvaluation,
  setShowEditEvaluation,
  setMemberToEdit,
}) {
  const [, setFormData] = useAtom(formAtom);
  const [subscriptionGlobal, setSubscriptionGlobal] = useAtom(subscriptionAtom);
  const [, setSubscriptionModalGlobal] = useAtom(subscriptionModalAtom);
  const [showPopupMessage, setShowPopupMessage] = useState(false);

  const companyId = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token")).company_relation
    : undefined;


  function handleCreateButtonClick() {
    if (!subscriptionGlobal) {
      setMemberToEdit();
      setFormData();
      setShowModal(true);
    } else setShowPopupMessage(true);
  }

  function handleEditButtonClick(person) {
    if (!subscriptionGlobal) {
      setMemberToEdit(person);
      setShowModal(true);
    } else setShowPopupMessage(true);
  }

  function generateGivenEvaluation(person) {
    let givenEvaluation = "";
    let givenEvaluations = person.given_evaluations.name;
    givenEvaluations.map((name, index) => {
      givenEvaluation += `${name}, `;
    });
    givenEvaluation = givenEvaluation.slice(0, -2);
    return givenEvaluation;
  }

  function handleEditEvaluation(person) {
    if (!subscriptionGlobal) {
      let givenEvaluations = person.given_evaluations.name;
      setMemberToEdit(person);
      if (givenEvaluations.length > 0) {
        setShowResetEvaluation(true);
      } else {
        setShowEditEvaluation(true);
      }
    }
    else setShowPopupMessage(true);
  }

  return (
    <div>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 border-b-4 border-black py-5">
        <div className="sm:flex sm:items-center justify-around">
          <div className="flex items-center gap-5">
            <span className="text-xs border border-black px-2 py-0.5">チーム名</span>
            <h1 className="text-2xl font-semibold leading-6 text-gray-900">
              {team.label}{" "}
            </h1>
          </div>
          <Button
            disabled={subscriptionGlobal}
            type='button'
            className={
              subscriptionGlobal === undefined
                ? 'hidden'
                : 'p-2 rounded disabled:bg-slate-300'
            }
            onClick={() => { setSubscriptionModalGlobal(true) }}
            title="この内容でアセスメントを開始する"
          />
          {/* <div className="mt-4 sm:ml-16 sm:mt-0 flex-col sm:flex sm:flex-row">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-slate-300"
              onClick={handleCreateButtonClick}
            >
              新規登録
            </button>
            {showPopupMessage && (
              <PopupMessageModal
                open={showPopupMessage}
                msg={"アセスメント開始後は各種作成及び編集は不可となります。"}
                status={"failed"}
                setShowPopupMessage={setShowPopupMessage}
              />
            )}
          </div> */}
        </div>
      </div>
      <div className="mt-2 flow-root relative h-[400px] overflow-y-auto overflow-x-auto">
        <div className="mx-auto">
          <table className="w-full text-center whitespace-nowrap">
            <thead className="sticky top-0 shadow z-10 bg-main">
              <tr>
                <th
                  scope="col"
                  className="p-3 min-w-1/6 text-sm lg:text-base font-semibold text-white table-cell justify-center items-center gap-4 border-r-[1px] border-grays"
                >
                  <div className="flex justify-center gap-3">
                    <div className="bg-white w-[25px] h-[25px] rounded-full flex justify-center items-center">
                      <span className="w-[20px] bg-main block border-2 border-main absolute"></span>
                      <span className="w-[20px] bg-main block border-2 border-main rotate-90 absolute"></span>
                    </div>
                    <p>名前(ふりがな)</p>
                  </div>
                </th>
                <th
                  scope="col"
                  className="hidden p-3 text-sm lg:text-base min-w-1/12 font-semibold text-white sm:table-cell border-r-[1px] border-grays"
                >
                  権限
                </th>
                <th
                  scope="col"
                  className="hidden p-3 min-w-1/12 text-sm lg:text-base font-semibold text-white md:table-cell border-r-[1px] border-grays"
                >
                  所属部署
                </th>
                <th
                  scope="col"
                  className="hidden p-3 min-w-1/6 text-sm lg:text-base font-semibold text-white lg:table-cell border-r-[1px] border-grays"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="p-3 min-w-1/12 text-sm lg:text-base font-semibold text-white border-r-[1px] border-grays"
                >
                  ステータス
                </th>
                <th
                  scope="col"
                  className="p-3 min-w-1/6 text-sm lg:text-base font-semibold text-white border-r-[1px] border-grays"
                >
                  {"この人のアセスメントをする"}
                  <br />
                  {"（第三者評価 対象者）"}
                </th>
                <th scope="col" className="relative p-3 min-w-1/12 text-white border-r-[1px] border-grays">
                  <span className="">{"自己アセスメント"}</span>
                </th>
                <th scope="col" className="relative p-3 min-w-1/12 text-white border-r-[1px] border-grays">
                  <span className="">{"第三者アセスメント残"}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {members !== undefined &&
                members.map((person, index) => (
                  <tr key={index} className={`text-center text-xs ${index % 2 == 0 ? 'bg-table' : 'bg-white'}`}>
                    <td className="py-4 lg:text-base text-gray-800 border-r-[1px] border-grays px-2">
                      <div className="flex gap-3 justify-between">
                        <p>{person.name}</p>
                        <p>{person.name_hiragana}</p>
                      </div>
                      <div className="flex gap-3 justify-between">
                        <p>
                          <button
                            className="text-indigo-600 hover:text-indigo-900 flex"
                            onClick={() => handleEditButtonClick(person)}
                          >
                            <svg className="h-6 w-6 text-indigo-600" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>
                            編集
                          </button>
                        </p>
                        <p>
                          <span>生産性スコア</span>
                          <span className="px-2">{person.productivity_member}</span>
                        </p>
                      </div>
                    </td>
                    <td className="hidden py-4 lg:text-sm sm:table-cell border-r-[1px] border-grays">
                      {person.member_category}
                    </td>
                    <td className="hidden py-4 lg:text-sm md:table-cell border-r-[1px] border-grays">
                      {person.team_relation.map((team, idx) => (
                        <span key={idx}>
                          {team.team_name}
                          {idx < person.team_relation.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </td>
                    <td className="hidden py-4 whitespace-nowrap lg:text-sm lg:table-cell border-r-[1px] border-grays">
                      {person.email}
                    </td>
                    <td className="py-4 border-r-[1px] border-grays">
                      {person.is_active ? (
                        <span className="inline-flex items-center bg-main px-4 py-0.5 text-xs text-white">
                          有効
                        </span>
                      ) : (
                        <span className="inline-flex items-center bg-gray px-4 py-0.5 text-xs text-white">
                          無効
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-2 lg:text-sm border-r-[1px] border-grays table-cell">
                      <div className="flex items-start">
                        <p className="w-[260px] whitespace-break-spaces text-left">
                          {generateGivenEvaluation(person)}
                        </p>
                        <button
                          className="flex justify-center items-center py-0.5 px-1 bg-btn text-white rounded-lg disabled:bg-slate-300 hover:bg-primary-1 transition-colors border-4 border-white shadow-lg"
                          onClick={() => handleEditEvaluation(person)}
                        >
                          追加
                        </button>
                      </div>
                    </td>
                    <td className="relative p-3 min-w-1/12 border-r-[1px] border-grays">
                      {person.assessment_1st_exclude && '完了'}
                    </td>
                    <td className="hidden py-4 whitespace-nowrap lg:text-sm lg:table-cell border-r-[1px] border-gray">
                      残 {person.given_evaluations.name.length}名
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
