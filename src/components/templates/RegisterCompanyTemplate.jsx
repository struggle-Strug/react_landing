import { useState } from 'react'
import CompanyTable from '../table/companyTable'
import CompanyModal from '../modal/companyModal'
import ConfirmationModal from '../modal'
import { formAtom } from '../../utils/atom'
import { useAtom } from 'jotai'
import { COMPANY_ENDPOINT } from '../../utils/constants'
import { requestWithTokenRefresh } from '../../utils/AuthService'

// eslint-disable-next-line react/prop-types
export default function RegisterCompanyTemplate({ companies, refreshData }) {
  const [formData,] = useAtom(formAtom)
  const [company, setCompany] = useState()
  const [status, setStatus] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showComfirmation, setShowComfirmation] = useState(false)

  async function handleSubmit() {
    setIsLoading(true)
    const url = company ? COMPANY_ENDPOINT + company.id : COMPANY_ENDPOINT
    const method = company ? 'PATCH' : 'POST'
    const resp = await requestWithTokenRefresh(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    if (resp.status === 200 || resp.status === 201) {
      setStatus("success")
    } else {
      setStatus("failed")
    }
    setShowModal(false)
    setIsLoading(false)
    setShowComfirmation(true)
  }

  function handleConfirm(){
    refreshData()
    setShowComfirmation(false)
  }

  return (
    <div className='w-full bg-slate-100 overflow-auto px-6'>
      <div className="bg-white px-2 pt-6 mt-6 rounded-lg border z-10">
        <CompanyTable
          companies={companies}
          setShowModal={setShowModal}
          setCompanyToEdit={setCompany}
        />
      </div>
      {showModal && (
        <CompanyModal
          open={showModal}
          onClose={setShowModal}
          title="会社登録・編集フォーム"
          msg="必要事項を入力して、送信ボタンを押してください。"
          company={company}
          loading={isLoading}
          submitForm={handleSubmit}
        />
      )}
      {showComfirmation && (
        <ConfirmationModal
        open={showComfirmation}
        title="データ登録・更新完了"
        msg="会社情報の登録・更新が正常に終了しました。"
        status={status}
        onConfirm={handleConfirm}
        />
      )}
    </div>

  )
}
