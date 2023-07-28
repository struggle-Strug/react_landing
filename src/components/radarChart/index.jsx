/* eslint-disable react/prop-types */
import { Radar, RadarChart as RadarChartBase, PolarGrid, PolarRadiusAxis, PolarAngleAxis, ResponsiveContainer } from 'recharts';


function RadarChart({ showThirdPerson, scores }) {

  const labels = scores ? scores['1st']['labels'] : null
  const data = scores
    ? labels.map((l, i) => ({
      subject: labels[i],
      A: scores['1st']['scores'][i],
      B: scores['3rd']['scores'][i],
      fullMark: 4
    }))
    : []

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChartBase cx="45%" cy="50%" outerRadius="70%" data={data} fill="#f3f6f4">
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: '12px' }} radius="40%"/>
        <PolarRadiusAxis axisLine={false} angle={30} domain={[0, 4]}/>

        <Radar name="1st" dataKey="A" stroke="#FF0000" fillOpacity={0} strokeWidth={5} max={4} />
        {showThirdPerson && (
          <Radar name="3rd" dataKey="B" stroke="#0000FF" fill="#8884d8" fillOpacity={0} strokeWidth={5} max={4}/>
        )}
      </RadarChartBase>
    </ResponsiveContainer>
  );
}
export default RadarChart
