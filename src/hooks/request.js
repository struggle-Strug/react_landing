import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { refreshToken } from '../utils/AuthService';

export const useRequestWithTokenRefresh = (url, options = {}) => {
  const navigate = useNavigate()

  const fetchRequest = useCallback(async () => {
    const tokenFromStorage = localStorage.getItem("token")
    const token = tokenFromStorage ? JSON.parse(tokenFromStorage) : null
    let response;
    if (token) {
      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': 'JWT ' + token.access,
        }
      });
    } else {
      navigate("/login");
    }
    if (response?.status === 401) {
      const newToken = await refreshToken(token);
      if (newToken) {
        response = await fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            'Authorization': 'JWT ' + newToken,
          }
        });
      }
    }
    return response;
  }, [url, options, navigate]);
  return fetchRequest;
}
