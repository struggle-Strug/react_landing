import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLogin } from "../utils/AuthService";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const { login } = useLogin();

  useEffect(() => {
    if (email && password) {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  }, [email, password, buttonEnabled]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      const tokenFromStorage = localStorage.getItem("token");
      const token = tokenFromStorage ? JSON.parse(tokenFromStorage) : null;
      const userFromStorage = localStorage.getItem("user");
      const user = userFromStorage ? JSON.parse(userFromStorage) : null;
      if (token?.company_active && user?.is_active) {
        const subdomain = token?.subdomain || "";
        if (token.is_superuser) {
          navigate(`/${subdomain}/team`);
          window.location.reload(false);
        } else {
          navigate(`/${subdomain}`);
          window.location.reload(false);
        }
      } else {
        setErrorMessage("アカウントが無効になりました。");
      }
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <div className="w-screen h-screen bg-[url('/login_bg.png')] flex justify-center items-center px-12">
      <div className=" bg-white shadow-xl rounded-lg max-w-[620px] max-h-[840px] px-[42.0px] py-7 sm:px-[90px] sm:py-9 sp:w-full flex flex-col items-center justify-center sp:min-h-fit	 sp:justify-start">
        <h1 className=" font-black text-3xl text-[#3E3E3E] sm:text-5xl md:text-7xl">Heart Beat
          FINDER</h1>
        <label htmlFor="" className="w-full block text-[#3E3E3E] text-lg sm:text-[40px] font-bold my-4 sm:my-7 font-sans">
          ログイン
        </label>
        <form
          className="w-full"
          onSubmit={(e) => submitHandler(e)}>
          <div className="sm:mb-7 mb-4">
            <label className="block text-[#3E3E3E] text-sm sm:text-xl font-medium sm:font-bold mb-3" htmlFor="email">
              メールアドレス
            </label>
            <input
              className="appearance-none border-none hover:border-gray-300 rounded w-full h-10 text-lg px-3 text-[#3E3E3E] leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={email}
              placeholder="aaaa@dummy.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="sm:mb-3">
            <label className="block text-gray-700 text-sm sm:text-xl font-medium sm:font-bold mb-3" htmlFor="password">
              パスワード
            </label>
            <input
              className="appearance-none border-none hover:border-gray-300 rounded w-full h-10 text-lg px-3 text-[#3E3E3E] mb-1 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p
            className={`text-red-600 font-sans font-normal text-sm sm:text-lg mb-3 text-center ${errorMessage ? "opacity-100" : "opacity-0"
              }`}
          >
            emailかパスワードが間違っています
          </p>
          <button
            className="bg-[#3E3E3E] hover:bg-[#3e3e3eb0] text-white text-xl sm:text-[32px] font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline w-full sm:h-[64px] h-11 flex justify-center items-center"
            type="submit"
            disabled={!buttonEnabled}
          >
            Login
          </button>
          <div className=" flex justify-center items-center pt-4">
            <NavLink
              to="/forgot"
              className="text-center sm:mt-4 mt-1 text-[#3E3E3E] text-[12px] sm:text-base m-auto font-sans">
              パスワードを忘れた場合はこちら
            </NavLink>
          </div>
        </form>
        <div className="text-center sm:mt-10 mt-4">
          <img src="/logo1.png" alt="Cuoremo Logo" className="mx-auto sm:h-[51px] h-[35px] w-auto"/>
          <p className="text-xs text-gray-400 mt-2">© 2023 CUOREMO inc. all rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
