import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FORGOT_ENDPOINT } from '../utils/constants';

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [formEmail, setFormEmail] = useState('');
  const [buttonEnabled, setButtonEnabled] = useState();
  const [errorMessage, setErrorMessage] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false)
  const [responseStatus, setResponseStatus] = useState("")
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    if (formEmail) {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  }, [formEmail]);

  const sendEmail = async () => {
    setIsWaiting(true)
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formEmail })
      };
      const res = await fetch(FORGOT_ENDPOINT, requestOptions);
      if (res.status === 200) {
        setResponseStatus("success")
        setIsWaiting(false)
        setShowModal(true)
      }
    } catch (error) {
      setResponseStatus("failed")
      setErrorMessage("メールアドレスをご確認いただくか、管理者にお問合せください")
      setIsWaiting(false)
      setShowModal(true)
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    sendEmail();
  }

  return (
    <div className="w-screen h-screen bg-[url('/login_bg.png')] flex justify-center items-center px-12">
      <div className=" bg-white custom-box-shadow_forgot rounded-2xl w-full max-w-[620px] max-h-[840px] px-[42.0px] py-7 sm:px-[90px] sm:py-9 sp:w-full flex flex-col items-center justify-center sp:min-h-fit	 sp:justify-start">
        <label htmlFor="" className="w-full block text-[#333333] text-2xl sm:text-[40px] font-bold my-4 sm:my-7 font-sans">
          パスワード再設定
        </label>
        <p className="w-full font-semibold text-sm sm:text-[20px] font-sans mb-9 mt-[5px] text-[#333333]">
          ご入力いただいたメールアドレスに<br className=" hidden sm:inline-block"></br>
          パスワード再設定用のリンクを送ります。
        </p>
        <form
          className="w-full"
          onSubmit={submitHandler}>
          <div className="sm:mb-7 mb-4">
            <label className="block text-[#3E3E3E] text-base sm:text-xl font-medium sm:font-bold mb-3 font-sans" htmlFor="email">
              メールアドレス
            </label>
            <input
              className="appearance-none border-2 border-[#909090] hover:border-[#747474] rounded-lg w-full h-10 min-h-[30px] sm:min-h-[60px] text-lg px-3 text-[#3E3E3E] leading-tight focus:outline-none focus:ring-0 focus:border-[#909090]"
              id="email"
              type="email"
              value={formEmail}
              placeholder="aaaa@dummy.com"
              onChange={(e) => setFormEmail(e.target.value)}
            />
          </div>
          <p
            className={`text-red-600 font-sans font-normal text-sm sm:text-lg mb-3 text-center ${errorMessage ? "opacity-100" : "opacity-0"
              }`}
          >
            送信が失敗しました
          </p>
          <button
            className="bg-[#3E3E3E] hover:bg-[#3e3e3eb0] text-white text-xl sm:text-[30px] font-semibold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline w-full sm:h-[64px] h-11 flex justify-center items-center"
            type="submit"
            disabled={!buttonEnabled}
          >
            送信
          </button>
        </form>
        <div className="text-center sm:mt-10 mt-4">
          <img src="/logo1.png" alt="Cuoremo Logo" className="mx-auto sm:h-[51px] h-[35px] w-auto" />
          <p className="text-xs text-gray-400 mt-2">© 2023 CUOREMO inc. all rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
