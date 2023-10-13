import { UseUserDetails} from '../../context/UserContext'
import { useState, useEffect, useCallback} from 'react'
import { useNavigate } from "react-router-dom";

import Logo from '../../../public/logo.png';
import { requestWithTokenRefresh } from '../../utils/AuthService'
import { SUBSCRIPTION, MEMBER_ENDPOINT } from '../../utils/constants';

import SidebarResponsive from './SidebarResponsive';
import Modal from '../modal';
import AgreeCheckModal from '../modal/agreeCheckModal';
import SubscriptionModal from '../modal/subscriptionModal';
import { useAtom } from 'jotai';
import { subscriptionAtom } from '../../utils/atom';
import Loader from '../loader';

export default function Header() {
  const user = UseUserDetails()[0]
  const navigate = useNavigate()
  const [subscription, setSubscription] = useState()
  const [jobTitle, setJobTitle] = useState("")
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [showsubscriptionModal, setShowSubScriptionModal] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)
  const [openAgreeModal, setOpenAgreeModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalStatus, setModalStatus] = useState('')
  const [, setSubscriptionGlobal] = useAtom(subscriptionAtom)
  const fetchSubscription = useCallback(async () => {
    if (!user) { return }
    if (user.is_superuser) {
      setJobTitle("Cuoremo管理者")
    } else if (user.member_category === 99){
      setJobTitle("管理者")
    } else if (user.member_category > 1) {
      setJobTitle("マネージャー")
    } else {
      setJobTitle("一般社員")
    }
    let url = SUBSCRIPTION + 'ready/'
    const resp = await requestWithTokenRefresh(url, {}, navigate)
    const data = await resp.json()
    setSubscription(data?.subscription_active)
    localStorage.setItem("subscription", data?.subscription_active)
    setSubscriptionGlobal(data?.subscription_active)
  }, [navigate])

  const fetchAgreeStatus = async() => {
    const url = `${MEMBER_ENDPOINT}${user.id}/terms_condition_flag/`
    const resp = await requestWithTokenRefresh(url, {
      method: "POST"
    }, navigate)
    const data = await resp.json()
    setOpenAgreeModal(!data.terms_condition_flag)
  }
  useEffect(() => {
    fetchAgreeStatus()
  }, [])

  useEffect(() => {
    fetchSubscription()
    
  }, [fetchSubscription])

  const confirmHandler = async () => {
    const url = `${MEMBER_ENDPOINT}${user.id}/terms_condition_flag/`
    const resp = await requestWithTokenRefresh(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"terms_condition_flag":true}),}, navigate)
    const data = await resp.json()
    setOpenAgreeModal(!data.terms_condition_flag)
    const tokenFromStorage = localStorage.getItem("token")
    const token = tokenFromStorage ? JSON.parse(tokenFromStorage) : null
    const subdomain = token.subdomain
    navigate(`/${subdomain}`)
  }

  function handleSubmit(){
    let url = SUBSCRIPTION + 'update/'
    const updateSubscription = async() => {
      setShowSubScriptionModal(false)
      setIsWaiting(true)
      const resp = await requestWithTokenRefresh(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: ''
      })
      if(resp.status === 200){
        setSubscription(true)
        setSubscriptionGlobal(true)
        setModalStatus('success')
        setModalTitle('メンバー全員がアセスメント実施可能な状態になりました。')
      }
      else{
        setModalStatus('failed')
        setModalTitle('操作が失敗しました。')
      }
      setIsWaiting(false)
      setShowModal(true)
    }
    updateSubscription()
  }

  return (
    <div className='text-white fixed top-0 z-30 w-full flex h-16 bg-main justify-between items-center'>
      <div className='flex ml-5 items-center'>
        <p className='text-3xl hidden sm:block'>Heart Beat</p>
        <img className='w-24 ml-2' src={Logo} alt='Logo' />
      </div>
      <div className='flex items-center mr-10 justify-center'>

        <button
          disabled={subscription}
          type='button'
          className={
            subscription === undefined
            ? 'hidden'
            : 'text-main bg-white p-2 rounded disabled:bg-slate-300'
          }
          onClick={() => {setShowSubScriptionModal(true)}}
        >
          開始する
        </button>
        <div className='ml-4'>
          <section className="flex sm:hidden">
            <div
              className="space-y-2"
              onClick={() => setIsNavOpen((prev) => !prev)}
            >
              {!isNavOpen?(
                <>
                  <span className="block h-0.5 w-8 bg-white"></span>
                  <span className="block h-0.5 w-8 bg-white"></span>
                  <span className="block h-0.5 w-8 bg-white"></span>
                </>
              ):(
                <svg
                className="h-8 w-8 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              )}
            </div>
            <SidebarResponsive setIsNavOpen={setIsNavOpen} shownStatus={isNavOpen}/>
          </section>
          <section className='hidden sm:block'>
            <p className='text-[14px]'>{jobTitle}</p>
            <p className='-mt-1 text-lg font-semibold'>{user.name}</p>
          </section>
        </div>
      </div>
      <SubscriptionModal 
        open={showsubscriptionModal}
        msg='下記ボタンをクリックすることによりアセスメントが開始されます。本当に進めて大丈夫でしょうか？'
        onClose={setShowSubScriptionModal}
        onConfirm={handleSubmit}
      />
      <Modal 
        open={showModal}
        status={modalStatus}
        title={modalTitle}
        onConfirm={() => {setShowModal(false)}}
      />
      <AgreeCheckModal
        open={openAgreeModal}
        setOpenAgreeModal={setOpenAgreeModal}
        confirmHandler={confirmHandler}
      />
      {isWaiting &&
        <Loader />
      }
    </div>
  )
}