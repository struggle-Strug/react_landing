import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/button";
import { useLogin } from "../utils/AuthService";
import Logo from '../../public/logo.png';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const { login } = useLogin()

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
      const tokenFromStorage = localStorage.getItem("token")
      const token = tokenFromStorage ? JSON.parse(tokenFromStorage) : null
      const userFromStorage = localStorage.getItem("user")
      const user = userFromStorage ? JSON.parse(userFromStorage) : null
      if(token?.company_active && user?.is_active){
        const subdomain = token.subdomain
        if(token.is_superuser) {
          navigate(`/${subdomain}/team`);
          window.location.reload(false);
        } else {
          navigate(`/${subdomain}`);
          window.location.reload(false);
        }
      }
      else{
        setErrorMessage('アカウントが無効になりました。');
      }
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen ">
      <form
        className="p-5"
        onSubmit={(e) => submitHandler(e)}
      >
        <span className='block relative bg-main lg:w-44 lg:h-44 md:w-40 md:h-40 w-36 h-36 rounded-full mt-32 mx-auto'>
          <img className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-40 md:w-36 w-32' src={Logo} alt='Logo' />
        </span>
        <p
          className={`text-red-600 text-sm text-center ${errorMessage ? "opacity-100" : "opacity-0"
            }`}
        >
          emailかパスワードが間違っています
        </p>
        <p className='ml-3 mb-1'>メールアドレス</p>
        <input
          className="lg:w-96 md:w-80 w-64 rounded-full focus:border-0 "
          label="メールアドレス"
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className='ml-3 mb-1 mt-4'>パスワード</p>
        <input
          className="lg:w-96 md:w-80 w-64 rounded-full focus:border-0 "
          label="パスワード"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          title="Login"
          className="mt-8 lg:w-96 md:w-80 w-64"
          disabled={!buttonEnabled}
        />
      </form>
      <NavLink
        to="/forgot"
        className="-mt-1 underline text-sm hover:opacity-60 transition-opacity"
      >
        パスワードを忘れた場合
      </NavLink>
    </div>
  );
}

export default LoginPage;
