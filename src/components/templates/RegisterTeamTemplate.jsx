import { useState } from 'react'
import { useNavigate } from 'react-router'
import TeamTable from '../table/teamTable'
import TeamModal from '../modal/teamModal'
import ConfirmationModal from '../modal'
import { formAtom } from '../../utils/atom'
import { useAtom } from 'jotai'
import { BACKEND_URL } from '../../utils/constants'
import { requestWithTokenRefresh } from '../../utils/AuthService'

// eslint-disable-next-line react/prop-types
export default function RegisterTeamTemplate({ teams, refreshData }) {
  const navigate = useNavigate()
  const [formData,] = useAtom(formAtom)
  const [team, setTeam] = useState()
  const [status, setStatus] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showComfirmation, setShowComfirmation] = useState(false)

  async function handleSubmit() {
    setIsLoading(true)
    const url = team ? BACKEND_URL + 'api/team/update/' + team.id : BACKEND_URL + 'api/team/create/'
    const method = team ? 'PATCH' : 'POST'
    const body = team ? formData : [formData]
    const resp = await requestWithTokenRefresh(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }, navigate)
    if (resp.status === 200 || resp.status === 201) {
      setStatus("success")
    } else {
      setStatus("failed")
    }
    setShowModal(false)
    setIsLoading(false)
    setShowComfirmation(true)
  }

  function handleConfirm() {
    refreshData()
    setShowComfirmation(false)
  }

  return (
    <div className='w-full bg-slate-100 overflow-auto px-6'>
      <div className="bg-white px-2 pt-6 mt-6 rounded-lg border z-10">
        <TeamTable
          teams={teams}
          setShowModal={setShowModal}
          setTeamToEdit={setTeam}
        />
      </div>
      {showModal && (
        <TeamModal
          open={showModal}
          onClose={setShowModal}
          title="チーム登録・編集フォーム"
          msg="必要事項を入力して、送信ボタンを押してください。"
          team={team}
          loading={isLoading}
          submitForm={handleSubmit}
        />
      )}
      {showComfirmation && (
        <ConfirmationModal
          open={showComfirmation}
          title="データ登録・更新完了"
          msg="チーム情報の登録・更新が正常に終了しました。"
          status={status}
          onConfirm={handleConfirm}
        />
      )}
    </div>

  )
}
