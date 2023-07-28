/* eslint-disable react/prop-types */


export default function CSVMemberTable({ data, type, submitData }) {
  const allKeys = Object.keys(data[0])
  const teamNames = allKeys.slice(6)
  function handleSubmitButtonClick() {
    submitData()
  }

  return (
    <div>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold leading-6 text-gray-900">メンバー{type.label}</h1>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSubmitButtonClick}
            >
              データ送信
            </button>
          </div>
        </div>
      </div>
      <div className="mt-2 flow-root">
        <div className="mx-auto overflow-x-auto">
          <table className="text-left w-auto whitespace-nowrap">
            <thead className="sticky top-0 bg-white border-b z-10">
              <tr className="px-3 text-center">
                <th className="w-16">ID</th>
                <th className="w-64">Email</th>
                <th className="w-32">名前</th>
                <th className="w-32">ふりがな</th>
                <th className="w-32">権限</th>
                <th className="w-32">ステータス</th>
                {
                  teamNames.map(key => (
                    <th key={key} className="w-32">
                      {key}
                    </th>
                  ))
                }
              </tr>
            </thead>
            {data !== undefined && (
              <tbody className="h-[250px] overflow-y-scroll">
                {
                  data.map((d, i) => (
                    <tr key={i} className="p-3 text-center">
                      <td className="w-16">{d["id"]}</td>
                      <td className="w-64">{d["email"]}</td>
                      <td className="w-32">{d["name"]}</td>
                      <td className="w-32">{d["name_hiragana"]}</td>
                      <td className="w-32">{d["member_category"]}</td>
                      <td className="w-32">{d["is_active"]}</td>
                      {
                        teamNames.map(t => (
                          <td key={t} className="min-w-32">{d[t]}</td>
                        ))
                      }
                    </tr>
                  ))
                }
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div >
  )
}
