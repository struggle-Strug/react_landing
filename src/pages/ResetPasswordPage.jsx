import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from '../components/loader';
import Modal from '../components/modal';
import Button from '../components/button';
import { RESET_ENDPOINT } from '../utils/constants';

function ResetPasswordPage() {
  const { resetkey } = useParams()
  const navigate = useNavigate()
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [buttonEnabled, setButtonEnabled] = useState();
  const [isWaiting, setIsWaiting] = useState(false)
  const [responseStatus, setResponseStatus] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [modalTitle, setModalTitle] = useState("")
  const [modalMsg, setModalMsg] = useState("")
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (password === confirmation && password.length > 7) {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  }, [password, confirmation]);

  const sendResetPasswordRequest = async () => {
    setIsWaiting(true)
    try {
      const res = await fetch(RESET_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({reset_secret:resetkey, password: password}),
      })
      if (res.status === 200) {
        setResponseStatus("success")
        setModalTitle("パスワード再設定が完了しました")
        setModalMsg("ログインページよりログインを行ってください")
        setIsWaiting(false)
        setShowModal(true)
      }
      else{
        const data = await res.json()
        let message = ''
        data.password.map((error) => {
          message += error
        })
        setMessage(message)
        setIsWaiting(false)
      }
    } catch (error) {
      setResponseStatus("failed")
      setModalTitle("予期せぬエラーが起きました")
      setModalMsg("管理者にお問合せください")
      setIsWaiting(false)
      setShowModal(true)
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    sendResetPasswordRequest();
  }

  function onConfirm() {
    setShowModal(false)
    navigate("/login");
    window.location.reload(false);
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen ">
      <form
        className="p-10 bg-white w-96 "
        onSubmit={submitHandler}
      >
        <div className="py-10" />
        <p className="text-3xl lg:w-96 md:w-80 w-56 text-center font-bold">パスワード再設定</p>
        <div className="py-10" />
        <p className='ml-3 mb-1'>新しいパスワード</p>
        <input
          type="password"
          className="lg:w-96 md:w-80 w-56 pl-5 rounded-full focus:border-0 "
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="py-3" />
        <p className='ml-3 mb-1'>新しいパスワード（確認用）</p>
        <input
          type="password"
          className="lg:w-96 md:w-80 w-56 pl-5 rounded-full focus:border-0 "
          value={confirmation}
          placeholder="Password"
          onChange={(e) => setConfirmation(e.target.value)}
        />
        <div className='text-red-500'>
          {message}
        </div>
        <Button
          title="変更"
          className="mt-10 lg:w-96 md:w-80 w-56"
          disabled={!buttonEnabled}
        />
      </form>
      {isWaiting ? (
        <Loader />
      ) : null
      }
      {showModal ? (
        <Modal
          open={showModal}
          title={modalTitle}
          msg={modalMsg}
          status={responseStatus}
          onConfirm={onConfirm}
        />
      ) : null}
    </div>

  )
}
export default ResetPasswordPage;
