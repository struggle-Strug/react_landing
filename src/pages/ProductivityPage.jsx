import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";

import ProductivityTemplate from "../components/templates/ProductivityTemplate";
import { requestWithTokenRefresh } from "../utils/AuthService";
import { PRODUCTIVITY_ENDPOINT } from "../utils/constants";


const Productivity = () => {
  const navigate = useNavigate();
  const [productivities, setProductivities] = useState([])
  const fetchProductivity = useCallback(async () => {
    const resp = await requestWithTokenRefresh(
      PRODUCTIVITY_ENDPOINT, {}, navigate
    )
    if (!resp.ok) {
      return;
    }
    const data = await resp.json()
    setProductivities(data)
  }, [navigate]);

  useEffect(() => {
    fetchProductivity();
  }, [fetchProductivity]);

  return (
    <div className='relative top-20 flex justify-center min-h-screen'>
      <ProductivityTemplate productivities={productivities} />
    </div>
  )
}

export default Productivity;