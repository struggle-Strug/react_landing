/* eslint-disable react/prop-types */
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './slider.css'

export const MarkedSlider = ({ answer, setAnswer }) => {
  const marks = {
    1: '全く思わない',
    2: '思わない',
    3: '思う',
    4: '強く思う',
  };
  function handleOnChange(value) {
    if (answer) {
      setAnswer({...answer, answer:value})
    }
  }
  return (
    <>
      {answer && (
        <div>
          <Slider
            min={1}
            max={4}
            marks={marks}
            dots
            step={null}
            value={answer.answer}
            onChange={handleOnChange}
          />
        </div>
      )}
    </>
  )
}