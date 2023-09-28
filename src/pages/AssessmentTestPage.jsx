/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router'
import AssessmentTestTemplate from '../components/templates/AssessmentTestTemplate'
import Loader from '../components/loader'
import ConfirmTestModal from '../components/modal/confirmTestModal'
import { requestWithTokenRefresh } from '../utils/AuthService'
import { ANSWER_ENDPOINT } from '../utils/constants'


const AssessmentTest = () => {
  const navigate = useNavigate()
  const [questionAnswerData, setQuestionAnswerData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const fetchAnswers = useCallback(async () => {
    const resp = await requestWithTokenRefresh(ANSWER_ENDPOINT + `quiz_and_answers/`, {}, navigate)
    const data = await resp.json()
    setQuestionAnswerData(data)
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate])

  useEffect(() => {
    fetchAnswers()
  }, [fetchAnswers])

  const updateQuestion = async () => {
    const resp = await requestWithTokenRefresh(ANSWER_ENDPOINT + `quiz_and_answers/`, {}, navigate)
    const data = await resp.json()
    setQuestionAnswerData(data)
  }

  async function submitAnswers() {
    setShowModal(true)
  }
  function handleConfirm() {
    const tokenFromStorage = localStorage.getItem("token")
    const token = JSON.parse(tokenFromStorage)
    const subdomain = token.subdomain
    setShowModal(false)
    navigate(`/${subdomain}/test`)
  }

  return (
    <div>
      <div className='relative top-16 flex justify-center'>
        {isLoading
          ? <div className="flex justify-center items-center content-center"><Loader /></div>
          : (
            questionAnswerData && (
              <AssessmentTestTemplate
                className="w-full"
                questionAnswerData={questionAnswerData}
                updateQuestion={updateQuestion}
                submitAnswers={submitAnswers}
              />
            )

          )}

      </div>
      {showModal && (
        <ConfirmTestModal
          open={showModal}
          title={"送信完了"}
          questionAnswerData={questionAnswerData}
          msg={"こちらのメンバーの第三者アセスメントを完了しますがよろしいでしょうか？　完了しない場合、チェックボックスからチェックを外してください。"}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  )
}

export default AssessmentTest