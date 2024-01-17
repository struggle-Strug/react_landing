/* eslint-disable react/prop-types */
import { Radar, RadarChart as RadarChartBase, PolarGrid, PolarRadiusAxis, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import EvaluationModal from '../modal/evaluationModal';


function SimpleRadarChart({ isFirst, scores, isThird, labels, thirdScores }) {
  const [showTeamModal, setShowTeamModal] = useState(false);
  const handleClickLabel = () => {
    setShowTeamModal(true)
  }
  const CustomTickBM = ({ payload, x, y, textAnchor }) => (
    <g transform={`translate(${x},${y})`}>
      {payload.value === '会社ビジョン共感度' ? (
        <>
          <text fontSize={10} fontWeight={600} y={-15} dy={16} fill="#000" onClick={handleClickLabel} textAnchor={textAnchor} style={{ position: 'relative' }}>
            {'会社ビジョン'}
          </text>
          <text fontSize={10} fontWeight={600} y={-4} dy={16} fill="#000" onClick={handleClickLabel} textAnchor={textAnchor} style={{ position: 'relative' }}>
            {'共感度'}
          </text>
        </>
      ) : payload.value === '個人ビジョン明確度' ? (
        <>
          <text fontSize={10} fontWeight={600} y={-15} dy={16} fill="#000" onClick={handleClickLabel} textAnchor={textAnchor} style={{ position: 'relative' }}>
            {'個人ビジョン'}
          </text>
          <text fontSize={10} fontWeight={600} y={-4} dy={16} fill="#000" onClick={handleClickLabel} textAnchor={textAnchor} style={{ position: 'relative' }}>
            {'明確度'}
          </text>
        </>
      ) : payload.value === '会社と個人の統合度' ? (
        <>
          <text fontSize={10} fontWeight={600} y={-15} dy={16} fill="#000" onClick={handleClickLabel} textAnchor={textAnchor} style={{ position: 'relative' }}>
            {'会社と個人の'}
          </text>
          <text fontSize={10} fontWeight={600} y={-4} dy={16} fill="#000" onClick={handleClickLabel} textAnchor={textAnchor} style={{ position: 'relative' }}>
            {'統合度'}
          </text>
        </>
      ) : (
        <>
          <text fontSize={10} fontWeight={600} y={-15} dy={16} fill="#000" onClick={handleClickLabel} textAnchor={textAnchor} style={{ position: 'relative' }}>
            {payload.value.substring(0, payload.value.split("の")[0].length + 1)}
          </text>
          <text fontSize={10} fontWeight={600} y={-4} dy={16} fill="#000" onClick={handleClickLabel} textAnchor={textAnchor} style={{ position: 'relative' }}>
            {payload.value.substring(payload.value.split("の")[0].length + 1, payload.value.length)}
          </text>
        </>
      )}
      <foreignObject x={(payload.value.length > 6 ? 6 : payload.value.length) * (textAnchor === 'end' ? 0 : textAnchor == 'middle' ? '5' : '10')} y={-5} width={15} height={15}>
        <p className='font-bold border border-black rounded-full w-3 h-3 text-[10px] flex items-center justify-center cursor-pointer' onClick={handleClickLabel}>?</p>
      </foreignObject>
    </g>
  );
  let data = labels.map((subject) => ({
    subject: subject,
    A: 0.0,
    fullMark: 4.00
  }))
  if (thirdScores && thirdScores.length > 0) {
    data = scores.map((score, i) => ({
      subject: labels[i],
      A: score,
      B: thirdScores[i],
      fullMark: 4.00
    }))
  }
  else if (scores.length > 0) {
    data = scores.map((score, i) => ({
      subject: labels[i],
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
        labels={labels}
      />
      <ResponsiveContainer width="100%" height="100%">
        <RadarChartBase cx="50%" cy="50%" outerRadius="60%" data={data} fill="#f3f6f4">
          <PolarGrid />
          <PolarRadiusAxis domain={[0, 4]} tick={false} axisLine={false} />
          {!isThird && (
            <PolarAngleAxis dataKey="subject" tick={<CustomTickBM />} radius="40%" />
          )}
          {isFirst
            ? <Radar name="1st" dataKey="A" stroke="#FF0000" fillOpacity={0} strokeWidth={4} />
            : <Radar name="1st" dataKey="A" stroke="#0000FF" fillOpacity={0} strokeWidth={4} />
          }
          {thirdScores && thirdScores.length > 0 && <Radar name="1st" dataKey="B" stroke="#0000FF" fillOpacity={0} strokeWidth={4} />}
        </RadarChartBase>
      </ResponsiveContainer>
    </>
  );
}
export default SimpleRadarChart
