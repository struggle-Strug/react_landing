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
    <div className="flex sp:flex-col sp:justify-between sp:h-screen">
      <div className="w-1/2 sp:w-full bg-main">
        <div className="w-full h-[90%] flex flex-col sp:pb-4">
          <div className="grow-[2]"></div>
          <div className="flex justify-center items-center flex-col">
            <div className="w-2/3 px-5 mb-32 sp:pt-20 sp:w-3/4 sp:mb-0">
              <img className="" src={Logo} alt="Logo" />
            </div>
            <p className="text-white font-bold font-CenturyGothic xl:text-[42px] lg:text-3xl md:text-2xl sp:mt-7 sp:text-2xl mb-4">
              Heart Beat FINDER
            </p>
            <p className="text-white font-NotoSansCJKjp-Regular xl:text-3xl lg:text-2xl md:text-xl sp:font-thin sp:text-xl">
              Assessment Tool
            </p>
          </div>
          <div className="grow-[1]"></div>
        </div>
        <div className="flex flex-col justify-center items-center sp:hidden">
          <div className=" my-3">
            <img src={CompanyLogo} width={131} alt="company-logo" />
          </div>
          <p className="text-[10px] text-white font-NotoSansCJKjp-Regular">
            © 2023 CUOREMO inc. all lights reserved.
          </p>
        </div>
      </div>
      <div className="w-1/2 sp:w-full flex flex-col items-center justify-center min-h-screen sp:min-h-fit	 sp:justify-start">
        <form
          className="max-w-[600px] w-full p-5 flex flex-col justify-center items-center sp:px-5 sp:pt-0"
          onSubmit={(e) => submitHandler(e)}
        >
          <p
            className={`text-red-600 text-sm text-center ${
              errorMessage ? "opacity-100" : "opacity-0"
            }`}
          >
            emailかパスワードが間違っています
          </p>
          <p className="text-5xl text-center mb-3 sp:mb-2 font-CenturyGothic sp:text-2xl">
            Mail Address
          </p>
          <p className="mb-3 sp:mb-2 text-center text-xs font-HiraginoKakuGothicProNW3 font-bold">
            メールアドレス
          </p>
          <input
            className="lg:w-full pl-12 flex items-center sp:pl-5 md:w-80 w-64 sp:h-10 sp:w-5/6 border-[#00008C] border-2 rounded-full focus:border-0 text-xl bg-[#F2FAFD]"
            label="メールアドレス"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-5xl text-center font-light	mb-2 mt-16 sp:mt-5 font-CenturyGothic sp:text-2xl">
            Password
          </p>
          <p className="mb-3 sp:mb-2 text-center text-xs font-HiraginoKakuGothicProNW3 font-bold">
            パスワード
          </p>
          <input
            className="lg:w-full pl-12 sp:pl-5 mb-20 sp:mb-5 md:w-80 w-64 sp:w-5/6 sp:h-9 border-main border-2 rounded-full focus:border-0 text-xl bg-[#F2FAFD]"
            label="パスワード"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            title="Login"
            className="lg:w-72 sp:w-44 h-16 sp:h-12 text-4xl sp:text-2xl md:w-80 w-64 font-bold rounded-full disabled:bg-slate-300 hover:bg-primary-1 transition-colors font-CenturyGothic"
            disabled={!buttonEnabled}
          />
        </form>
        <NavLink
          to="/forgot"
          className="-mt-1 text-sm hover:opacity-60 transition-opacity text-[#4215FF] font-NotoSansCJKjp-Regular sp:mb-6"
        >
          パスワードを忘れた場合はこちら
        </NavLink>
      </div>
      <div className="hidden flex-col justify-center items-center bg-main pt-10 pb-20 sp:flex">
        <div className="">
          <img src={CompanyLogo} width={131} alt="company-logo" />
        </div>
        <p className="text-xs mt-5 mb-2 text-white">
          <NavLink to={"/terms"} className={"mr-5"}>
            利用規約
          </NavLink>
          <NavLink to={"https://cuoremo.co.jp/privacy/"} target="__blank">
            プライバシーポリシー
          </NavLink>
        </p>
        <p className="text-xs text-white font-NotoSansCJKjp-Regular">
          © 2023 CUOREMO inc. all lights reserved.
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
