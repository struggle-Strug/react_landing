import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { requestWithTokenRefresh } from '../utils/AuthService'
import ResultTemplate from '../components/templates/ResultTemplate'
import { SCORE_ENDPOINT } from '../utils/constants'



const Result = () => {
  const navigate = useNavigate()
  const [results, setResults] = useState()
  const fetchResults = useCallback(async () => {
    const resp = await requestWithTokenRefresh(SCORE_ENDPOINT + "new_list/", {}, navigate)
    const data = await resp.json()
    setResults(data)
  }, [navigate])

  useEffect(() => {
    fetchResults()
  }, [fetchResults])

  return (
    <div className='relative sp:top-16 flex justify-center font-bold min-h-screen '>
      {results && (
        <ResultTemplate results={results} />
      )}
    </div>
  )
}

export default Result