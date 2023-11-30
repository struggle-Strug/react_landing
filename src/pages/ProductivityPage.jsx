import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";

import ProductivityTemplate from "../components/templates/ProductivityTemplate";
import { requestWithTokenRefresh } from "../utils/AuthService";
import { PRODUCTIVITY_ENDPOINT } from "../utils/constants";


const Productivity = () => {
  const navigate = useNavigate();
  const [productivities, setProductivities] = useState([])
  const [defaultData, setDefaultData] = useState()
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [dateOptions, setDateOptions] = useState([])
  const fetchProductivity = useCallback(async () => {
    const resp = await requestWithTokenRefresh(
      PRODUCTIVITY_ENDPOINT, {}, navigate
    )
    if (!resp.ok) {
      return;
    }
    const data = await resp.json();
    const uniqueActivationDates = new Set();

    await Object.keys(data).forEach(company => {
      data[company].forEach(entry => {
        uniqueActivationDates.add({ label: entry.subscription_activation_date, value: entry.subscription_activation_date });
      });
    });

    setDateOptions(Array.from(uniqueActivationDates).slice().sort((a, b) => {
      return new Date(a.value) - new Date(b.value);
    }));

    setDefaultData(data)
  }, [navigate]);

  useEffect(() => {
    setProductivities(defaultData);
    setFromDate(dateOptions[0] ? dateOptions[0] : '')
    setToDate(dateOptions[0] ? dateOptions[dateOptions.length - 1] : '')
  }, [defaultData, dateOptions])

  useEffect(() => {
    fetchProductivity();
  }, [fetchProductivity]);

  useEffect(() => {
    const startDate = new Date(fromDate.value);
    const endDate = new Date(toDate.value);

    if (defaultData) {
      const result = {}
      Object.keys(defaultData).map(data => (
        defaultData[data].map((item) => {
          const activationDate = new Date(item.subscription_activation_date)
          if (activationDate >= startDate && activationDate <= endDate) {
            if (!(data in result)) {
              result[data] = []
            }
            result[data].push(item)
          }
        })
      ))
      setProductivities(result)
    }
  }, [fromDate, toDate, defaultData])


  return (
    <div className='relative sp:top-16 flex justify-center font-bold min-h-screen'>
      {productivities && (
        <ProductivityTemplate
          productivities={productivities}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          dateOptions={dateOptions}
        />
      )}
    </div>
  )
}

export default Productivity;