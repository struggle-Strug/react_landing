import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/button";
import { useLogin } from "../utils/AuthService";
import Logo from "../../public/logo.png";
import CompanyLogo from "../../public/company-logo.png";

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
        const subdomain = token.subdomain;
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
    <div className="flex">
      <div className="w-1/2  bg-main">
        <div className="w-full h-[90%] flex flex-col">
          <div className="grow-[2]"></div>
          <div className="flex justify-center items-center flex-col">
            <div className="px-5 mb-32">
              <img className="" src={Logo} alt="Logo" />
            </div>
            <p className="text-white font-bold text-4xl font-CenturyGothic">Heart Beat FINDER</p>
            <p className="text-white text-3xl font-NotoSansCJKjp-Regular">Assessment Tool</p>
          </div>
          <div className="grow-[1]"></div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className=" my-3">
            <img src={CompanyLogo} alt="Company-logo" />
          </div>
          <p className="text-xs text-white font-NotoSansCJKjp-Regular">
            © 2023 CUOREMO inc. all lights reserved.
          </p>
        </div>
      </div>
      <div className="w-1/2 flex flex-col items-center justify-center min-h-screen ">
        <form
          className="max-w-[600px] w-full p-5 flex flex-col justify-center items-center"
          onSubmit={(e) => submitHandler(e)}
        >
          <p
            className={`text-red-600 text-sm text-center ${
              errorMessage ? "opacity-100" : "opacity-0"
            }`}
          >
            emailかパスワードが間違っています
          </p>
          <p className="text-5xl text-center font-light	mb-3 font-CenturyGothic">Mail Address</p>
          <p className="mb-3 text-center text-xs font-HiraginoKakuGothicProNW3">メールアドレス</p>
          <input
            className="lg:w-full md:w-80 w-64 border-[#00008C] border-2 rounded-full focus:border-0 "
            label="メールアドレス"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-5xl text-center font-light	mb-2 mt-10 font-CenturyGothic">Password</p>
          <p className="mb-3 text-center text-xs font-HiraginoKakuGothicProNW3">パスワード</p>
          <input
            className="lg:w-full mb-8 md:w-80 w-64 border-main border-2 rounded-full focus:border-0 "
            label="パスワード"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            title="Login"
            className="lg:w-72 h-16 text-4xl md:w-80 w-64 rounded-full disabled:bg-slate-300 hover:bg-primary-1 transition-colors font-CenturyGothic"
            disabled={!buttonEnabled}
          />
        </form>
        <NavLink
          to="/forgot"
          className="-mt-1 text-sm hover:opacity-60 transition-opacity text-[#4215FF] font-NotoSansCJKjp-Regular"
        >
          パスワードを忘れた場合
        </NavLink>
      </div>
    </div>
  );
}

export default LoginPage;
