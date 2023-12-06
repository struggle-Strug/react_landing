/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Radar, RadarChart as RadarChartBase, PolarGrid, PolarRadiusAxis, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import EvaluationModal from '../modal/evaluationModal';

function RadarChart({ showThirdPerson, scores }) {

  const [openModal, setOpenModal] = useState(false)

  const handleClickLabel = () => {
    setOpenModal(true)
  }

  const CustomTick = ({ payload, x, y, textAnchor }) => (
    <g transform={`translate(${x},${y})`}>
      <text fontSize={12} fontWeight={600} y={-10} dy={16} fill="#000" onClick={handleClickLabel} textAnchor={textAnchor} style={{ position: 'relative' }}>
        {payload.value}
      </text>
      <foreignObject x={payload.value.length * (textAnchor === 'end' ? 0 : textAnchor == 'middle' ? '5' : '10')} y={-5} width={15} height={15}>
        <p className='font-bold border border-black rounded-full w-3 h-3 text-[10px] flex items-center justify-center cursor-pointer' onClick={handleClickLabel}>?</p>
      </foreignObject>
    </g>
  );

  const labels = scores ? scores['1st']['labels'] : null
  const data = scores
    ? labels.map((l, i) => ({
      subject: labels[i],
      A: scores["1st"]["scores"][i],
      B: scores["3rd"]["scores"][i],
      fullMark: 4,
    }))
    : [];

  return (
    <>
      <EvaluationModal
        open={openModal}
        category={data.length}
        setOpenAgreeModal={setOpenModal}
      />
      <ResponsiveContainer width="100%" height="100%" className={"font-HiraginoKakuGothicProNW3"}>
        <RadarChartBase cx="45%" cy="50%" outerRadius="60%" data={data} fill="#f3f6f4">
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" tick={<CustomTick />} radius="40%" />

          <Radar name="1st" dataKey="A" stroke="#FF0000" fillOpacity={0} strokeWidth={5} max={4} />
          {showThirdPerson && (
            <Radar name="3rd" dataKey="B" stroke="#0000FF" fill="#8884d8" fillOpacity={0} strokeWidth={5} max={4} />
          )}
        </RadarChartBase>
      </ResponsiveContainer>
    </>
  );
}
export default RadarChart;
