// import { tokenAtom, userAtom } from './atom';
import { getCookie } from "./cookies";
import jwt_decode from 'jwt-decode';
import { LOGIN_ENDPOINT, REFRESH_ENDPOINT, BACKEND_URL } from "./constants";
import { Decoded, User } from './type'
import { NavigateFunction } from 'react-router';

export const useLogin = () => {
  const csrftoken = getCookie("csrftoken");
  const login = async (email: any, password: any) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "X-CSRFToken": csrftoken!,
      },
      body: JSON.stringify({ email, password })
    };
    const resp = await fetch(LOGIN_ENDPOINT, requestOptions);
    const token = await resp.json()

    if (token) {
      localStorage.setItem("token", JSON.stringify(token))
      const decoded: Decoded = jwt_decode(token.access);
      const userId = decoded.user_id
      const resp = await fetch(`${BACKEND_URL}api/user/view/${userId}`, {
        headers: {
          'Authorization': `JWT ${token.access}`,
        }
      })
      const user: User = await resp.json()
      localStorage.setItem("user", JSON.stringify(user))
    }
  };
  return { login }
}


export async function refreshToken(token: { refresh: any; }, navigate: (arg0: string) => void) {
  // const navigate = useNavigate()
  const response = await fetch(REFRESH_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({"refresh": token.refresh}),
  });
  if (response.ok) {
    const refreshedToken = await response.json();
    const newToken = {access: refreshedToken.access, refresh: token.refresh}
    localStorage.setItem("token", JSON.stringify(newToken))
    return refreshedToken.access
  } else if (response.status === 401) {
    navigate('/login')
    return null
  }
}

export const requestWithTokenRefresh = async (url: RequestInfo | URL, options = {}, navigate: NavigateFunction | undefined) => {
  const csrftoken = getCookie("csrftoken");
  const tokenFromStorage = localStorage.getItem("token")
  const token = tokenFromStorage ? JSON.parse(tokenFromStorage) : null
  let response: Response;
  if (token) {
    response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': 'JWT ' + token.access,
        "X-CSRFToken": csrftoken!,
      }
    });
  } else {
    navigate("/login");
    return null;
  }
  if (response.status === 401) {
    const newToken = await refreshToken(token, navigate);
    if (newToken) {
      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': 'JWT ' + newToken,
          "X-CSRFToken": csrftoken!,
        }
      });
    } else {
      navigate("/login");
      return null;
    }
  }
  return response;
}