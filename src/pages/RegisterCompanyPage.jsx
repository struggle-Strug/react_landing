import { useState, useEffect, useCallback } from 'react'
import RegisterCompanyTemplate from '../components/templates/RegisterCompanyTemplate'
import { COMPANY_ENDPOINT } from '../utils/constants'
import { requestWithTokenRefresh } from '../utils/AuthService'
import { useNavigate } from 'react-router'

const ResigterCompany = () => {
  const [companies, setCompanies] = useState()
  const navigate = useNavigate()

  const fetchCompanies = useCallback(async () => {
    const resp = await requestWithTokenRefresh(COMPANY_ENDPOINT, {}, navigate)
      const data = await resp.json()
      setCompanies(data.data)
  },[navigate])

  useEffect(() => {
    fetchCompanies()
  }, [fetchCompanies])

  return (
    <div className='relative top-16 flex justify-center h-[calc(100vh-4rem)]'>
      {companies && (
        <RegisterCompanyTemplate
          companies={companies}
          refreshData={fetchCompanies}
        />
      )}
    </div>)
}

export default ResigterCompany