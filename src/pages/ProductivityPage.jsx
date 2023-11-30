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
    const data = await resp.json();
    const sortedData = {};

    Object.keys(data).forEach(company => {
      const sortedCompanyData = data[company].sort((a, b) => {
        return new Date(a.subscription_activation_date) - new Date(b.subscription_activation_date);
      });
      sortedData[company] = sortedCompanyData;
    });

    setProductivities(sortedData)
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