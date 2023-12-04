/* eslint-disable react/prop-types */
import { Radar, RadarChart as RadarChartBase, PolarGrid, PolarRadiusAxis, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import EvaluationModal from '../modal/evaluationModal';


export const subjects = ["心理的安全性", "個人ビジョン明確度", "会社ビジョン共感度", "会社と個人の統合度", "意欲性", "影響力"]
// const subjects = ["A", "B", "C", "D", "E", "F"]



function SimpleRadarChart({ isFirst, scores }) {
  const [showTeamModal, setShowTeamModal] = useState(false)
  const handleClickLabel = () => {
    setShowTeamModal(true)
  }
  const CustomTickBM = ({ payload, x, y, textAnchor }) => (
    <g transform={`translate(${x},${y})`}>
      <text fontSize={12} fontWeight={600} y={-10} dy={16} fill="#000" onClick={handleClickLabel} textAnchor={textAnchor} style={{ position: 'relative' }}>
        {payload.value}
      </text>
      <foreignObject x={payload.value.length * (textAnchor === 'end' ? 0 : textAnchor == 'middle' ? '6' : '12')} y={-5} width={15} height={15}>
        <p className='font-bold border border-black rounded-full w-3 h-3 text-[10px] flex items-center justify-center cursor-pointer' onClick={handleClickLabel}>?</p>
      </foreignObject>
    </g>
  );
  let data = subjects.map((subject) => ({
    subject: subject,
    A: 0.0,
    fullMark: 4.00
  }))
  if (scores.length > 0) {
    data = scores.map((score, i) => ({
      subject: subjects[i],
      A: score,
      fullMark: 4.00
    }))
  }

  return (
    <>
      <EvaluationModal
        open={showTeamModal}
        category={data.length}
        setOpenAgreeModal={setShowTeamModal}
      />
      <ResponsiveContainer width="100%" height="100%">
        <RadarChartBase cx="50%" cy="50%" outerRadius="80%" data={data} fill="#f3f6f4">
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" tick={<CustomTickBM />} radius="40%" />
          <PolarRadiusAxis axisLine={false} angle={30} domain={[0, 4]} />
          {isFirst
            ? <Radar name="1st" dataKey="A" stroke="#FF0000" fillOpacity={0} strokeWidth={4} />
            : <Radar name="1st" dataKey="A" stroke="#0000FF" fillOpacity={0} strokeWidth={4} />
          }
        </RadarChartBase>
      </ResponsiveContainer>
    </>
  );
}
export default SimpleRadarChart
