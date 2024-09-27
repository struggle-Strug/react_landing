/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router'
import AssessmentTemplate from '../components/templates/AssessmentTemplate'
import Loader from '../components/loader'
import ConfirmationModal from '../components/modal'
import { requestWithTokenRefresh } from '../utils/AuthService'
import { ANSWER_ENDPOINT, EVALUATION_ENDPOINT } from '../utils/constants'
import { useAtom } from 'jotai'
import { assessmentAtom } from '../utils/atom'


const AssessmentTestOwn = () => {
  const [assessment,] = useAtom(assessmentAtom)
  const navigate = useNavigate()
  const [answers, setAnswers] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [status, setStatus] = useState()

  const fetchAnswers = useCallback(async () => {
    const resp = await requestWithTokenRefresh(ANSWER_ENDPOINT + `list/?evaluation_id=${assessment.id}`, {}, navigate)
    const data = await resp.json()
    setAnswers(data)
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate])

  useEffect(() => {
    if (!assessment) { return }
    fetchAnswers()
  }, [assessment, fetchAnswers])

  const updateAnswer = useCallback(async (data) => {
    await requestWithTokenRefresh(ANSWER_ENDPOINT + `update/${data.id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }, navigate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate])

  async function submitAnswers() {
    setIsLoading(true)
    const resp = await requestWithTokenRefresh(EVALUATION_ENDPOINT + `complete/?evaluation_id=${assessment.id}`, {
      method: 'PATCH'
    }, navigate)
    if (resp.ok) {
      setStatus("success")
    } else {
      setStatus("failed")
    }
    setIsLoading(false);
    setShowModal(true)
  }
  function handleConfirm() {
    const tokenFromStorage = localStorage.getItem("token")
    const token = JSON.parse(tokenFromStorage)
    const subdomain = token?.subdomain || "";
    setShowModal(false)
    navigate(`/${subdomain}`)
  }

  return (
    <div>
      <div className='relative top-16 flex justify-center'>
        {isLoading
          ? <div className="flex justify-center items-center content-center"><Loader /></div>
          : (
            answers && (
              <AssessmentTemplate
              className="w-full"
                answers={answers}
                assessment={assessment}
                updateAnswer={updateAnswer}
                submitAnswers={submitAnswers}
              />
            )

          )}

      </div>
      {showModal && (
        <ConfirmationModal
          open={showModal}
          title={status === "success"
            ? "送信完了"
            : "送信失敗"
          }
          msg={status === "success"
            ? "アセスメントの実施が正常に完了しました。"
            : "アセスメント結果の送信に失敗しました。"
          }
          status={status}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  )
}

export default AssessmentTestOwn