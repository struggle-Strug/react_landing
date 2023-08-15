/* eslint-disable react/prop-types */
import { formAtom } from '../../utils/atom'
import { useAtom } from 'jotai'

export default function MemberTable({ members, team, setShowModal, setShowResetEvaluation, setShowEditEvaluation, setMemberToEdit }) {
  const [, setFormData] = useAtom(formAtom)
  function handleCreateButtonClick() {
    setMemberToEdit()
    setFormData()
    setShowModal(true)
  }

  function handleEditButtonClick(person) {
    setMemberToEdit(person)
    setShowModal(true)
  }

  function generateGivenEvaluation(person){
    let givenEvaluation = ''
    let givenEvaluations = person.given_evaluations.name
    givenEvaluations.map((name, index) => {
      givenEvaluation += `${name}, `
    })
    givenEvaluation = givenEvaluation.slice(0, -2)
    return givenEvaluation
  }

  function handleEditEvaluation(person){
    let givenEvaluations = person.given_evaluations.name
    setMemberToEdit(person)
    if(givenEvaluations.length > 0){
      setShowResetEvaluation(true)
    }
    else{
      setShowEditEvaluation(true)
    }
  }

  return (
    <div>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold leading-6 text-gray-900">{team.label} </h1>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-slate-300"
              onClick={handleCreateButtonClick}
              disabled={team.value===0}
            >
              新規登録
            </button>
          </div>
        </div>
      </div>
      <div className="mt-2 flow-root relative h-[400px] overflow-y-auto overflow-x-auto">
        <div className="mx-auto">
          <table className="w-full text-center">
            <thead className="sticky top-0 bg-white shadow z-10">
              <tr>
                <th scope="col" className="py-3.5 min-w-1/6 text-sm lg:text-base font-semibold text-gray-900">
                  名前
                  <div className="absolute inset-y-0 right-full z-0 w-screen border-b border-b-gray-200" />
                  <div className="absolute inset-y-0 left-0 z-0 w-screen border-b border-b-gray-200" />
                </th>
                <th
                  scope="col"
                  className="hidden py-3.5 text-sm lg:text-base min-w-1/6 font-semibold text-gray-900 sm:table-cell"
                >
                  名前ひらがな
                </th>
                <th
                  scope="col"
                  className="hidden py-3.5 text-sm lg:text-base min-w-1/12 font-semibold text-gray-900 sm:table-cell"
                >
                  権限
                </th>
                <th
                  scope="col"
                  className="hidden py-3.5 min-w-1/12 text-sm lg:text-base font-semibold text-gray-900 md:table-cell"
                >
                  所属部署
                </th>
                <th scope="col" className="hidden py-3.5 min-w-1/6 text-sm lg:text-base font-semibold text-gray-900 lg:table-cell">
                  Email
                </th>
                <th scope="col" className="py-3.5 min-w-1/12 text-sm lg:text-base font-semibold text-gray-900">
                  ステータス
                </th>
                <th scope="col" className="relative py-3.5 min-w-1/12">
                  <span className=""></span>
                </th>
                <th scope='col' className='py-3.5 min-w-1/6 text-sm lg:text-base font-semibold text-gray-900'>
                  第三者評価
                </th>
                <th scope="col" className="relative py-3.5 min-w-1/12">
                  <span className=""></span>
                </th>
              </tr>
            </thead>
            <tbody>
              {members !== undefined && members.map((person, index) => (
                <tr key={index} className="text-center text-xs">
                  <td className="relative py-4 lg:text-base text-gray-800">
                    {person.name}
                    <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                    <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                  </td>
                  <td className="hidden py-4 lg:text-sm text-gray-500 sm:table-cell">
                    {person.name_hiragana}
                  </td>
                  <td className="hidden py-4 lg:text-sm text-gray-500 sm:table-cell">
                    {person.member_category}
                  </td>
                  <td className="hidden py-4 lg:text-sm text-gray-500 md:table-cell">
                    {person.team_relation.map((team, idx) => (
                      <span key={idx}>{team.team_name}{idx < person.team_relation.length - 1 ? ', ' : ''}</span>
                    ))}
                  </td>
                  <td className="hidden py-4 whitespace-nowrap lg:text-sm text-gray-500 lg:table-cell">
                    {person.email}
                  </td>
                  <td className="py-4 lg:text-sm text-gray-500">
                    {person.is_active
                      ? <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        有効
                      </span>
                      : <span className="inline-flex items-center rounded-md bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700 ring-1 ring-inset ring-rose-600/20">
                        停止中
                      </span>
                    }
                  </td>
                  <td className="relative py-4 lg:text-sm font-medium">
                    <button
                      className="text-indigo-600 hover:text-indigo-900"
                      onClick={() => handleEditButtonClick(person)}
                    >
                      編集
                    </button>
                  </td>
                  <td className='py-4 whitespace-nowrap lg:text-sm text-gray-500'>
                    {generateGivenEvaluation(person)}
                  </td>
                  <td className="relative py-3.5 min-w-1/12">
                      <button
                        className='text-indigo-600 hover:text-indigo-900'
                        onClick={() => handleEditEvaluation(person)}
                      >
                        編集
                      </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div >
  )
}
