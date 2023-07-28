/* eslint-disable react/prop-types */
// import { CompanyListResponse } from '../../utils/type'
import { formatDate } from '../../utils/formatter'
import { useAtom } from 'jotai'
import { formAtom } from '../../utils/atom'
// eslint-disable-next-line react/prop-types
export default function CompanyTable({ companies, setShowModal, setCompanyToEdit }) {
  const [, setFormData ] = useAtom(formAtom)
  function handleCreateButtonClick() {
    setCompanyToEdit()
    setFormData()
    setShowModal(true)
  }

  function handleEditButtonClick(company) {
    setCompanyToEdit(company)
    setShowModal(true)
  }
  const datePlaceholder =  <span className="text-transparent">xxxx-xx-xx</span>

  return (
    <div>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold leading-6 text-gray-900">会社登録・編集</h1>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleCreateButtonClick}
            >
              新規登録
            </button>
          </div>
        </div>
      </div>
      <div className="mt-2 flow-root overflow-hidden">
        <div className="mx-auto">
          <table className="w-full text-center">
            <thead className="sticky top-0 bg-white shadow z-10">
              <tr className="">
                <th scope="col" className="py-3.5 w-1/12 text-sm lg:text-base font-semibold text-gray-900">
                  ID
                  <div className="absolute inset-y-0 right-full z-0 w-screen border-b border-b-gray-200" />
                  <div className="absolute inset-y-0 left-0 z-0 w-screen border-b border-b-gray-200" />
                </th>
                <th
                  scope="col"
                  className="hidden py-3.5 w-1/6 text-sm lg:text-base  font-semibold text-gray-900 sm:table-cell"
                >
                  会社名
                </th>
                <th
                  scope="col"
                  className="hidden py-3.5 text-sm lg:text-base font-semibold text-gray-900 md:table-cell"
                >
                  作成日
                </th>
                <th scope="col" className="hidden py-3.5 text-sm lg:text-base font-semibold text-gray-900 lg:table-cell">
                  開始日
                </th>
                <th scope="col" className="py-3.5 text-sm lg:text-base font-semibold text-gray-900">
                  終了日
                </th>
                <th scope="col" className="py-3.5 text-sm lg:text-base font-semibold text-gray-900">
                  更新日
                </th>
                <th scope="col" className="py-3.5 w-1/6 text-sm lg:text-base font-semibold text-gray-900">
                  サブドメイン名
                </th>
                <th scope="col" className="relative py-3.5 w-1/12">
                  <span className=""></span>
                </th>
              </tr>
            </thead>
          </table>
          <div className="h-[400px] overflow-y-auto overflow-x-hidden">
            <table className="w-full text-center">
              <tbody >
                {companies.map((company, index) => (
                  <tr key={index} >
                    <td className="relative py-4 w-1/12 text-sm lg:text-base font-medium text-gray-900">
                      {company.id}
                      <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                      <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                    </td>
                    <td className="hidden py-4 w-1/6 text-sm lg:text-base text-gray-500 sm:table-cell">{company.company_name}</td>
                    <td className="hidden py-4 text-sm lg:text-base text-gray-500 lg:table-cell">{formatDate(company.company_creation_date)}</td>
                    <td className="hidden py-4 text-sm lg:text-base text-gray-500 lg:table-cell">{company.subscription_activation_date ? formatDate(company.subscription_activation_date) : datePlaceholder}</td>
                    <td className="hidden py-4 text-sm lg:text-base text-gray-500 lg:table-cell">{company.subscription_inactive_date ? formatDate(company.subscription_inactive_date) : datePlaceholder}</td>
                    <td className="hidden py-4 text-sm lg:text-base text-gray-500 lg:table-cell">{company.subscription_update_date ? formatDate(company.subscription_update_date) : datePlaceholder}</td>
                    <td className="hidden py-4 w-1/6 text-sm lg:text-base text-gray-500 lg:table-cell">{company.subdomain}</td>
                    <td className="relative py-4 w-1/12 text-left text-sm lg:text-base font-medium">
                      <button
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={() => handleEditButtonClick(company)}
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
      </div>
    </div >
  )
}
