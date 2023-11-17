/* eslint-disable react/prop-types */
import { Radar, RadarChart as RadarChartBase, PolarAngleAxis, PolarGrid, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const subjects = ["A", "B", "C", "D", "E", "F"]

function ComplexChart({ showThirdPerson, scores }) {
  let data = subjects.map((subject) => ({
    subject: subject,
    A: 0.0,
    B: 0.0,
    C: 0.0,
    D: 0.0,
    fullMark: 4.00
  }))
  if (!scores["1st"] === false && !scores['3rd_average'] === true) {
    data = scores["1st"].map((score, i) => ({
      subject: subjects[i],
      A: score,
      B: 0.0,
      C: 0.0,
      D: 0.0,
      fullMark: 4.00
    }))
  }
  else if (!scores["1st"] === true && !scores["3rd_average"] === false) {
    data = scores["3rd_average"].map((score, i) => ({
      subject: subjects[i],
      A: 0.0,
      B: score,
      C: 0.0,
      D: 0.0,
      fullMark: 4.00
    }))
  }
  else {
    data = scores["3rd_average"].map((score, i) => ({
      subject: subjects[i],
      A: scores['1st'][i],
      B: score,
      C: scores['industry'][i],
      D: scores['finder'][i],
      fullMark: 4.00
    }))
  }
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChartBase cx="50%" cy="50%" outerRadius="80%" data={data} fill="#f3f6f4">
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: '12px' }} radius="40%" />
        <PolarRadiusAxis axisLine={false} angle={30} domain={[0, 4]} />

        <Radar name="1st" dataKey="A" stroke="#FF0000" fillOpacity={0} strokeWidth={5} max={4} />
        {showThirdPerson && (
          <>
            <Radar name="3rd_average" dataKey="B" stroke="#0000FF" fill="#8884d8" fillOpacity={0} strokeWidth={5} max={4} />
          </>
        )}
        <Radar name="industry" dataKey="C" stroke="#12E600" fill="#12E600" fillOpacity={0} strokeWidth={5} max={4} />
        <Radar name="finder" dataKey="D" stroke="#ECFF03" fill="#ECFF03" fillOpacity={0} strokeWidth={5} max={4} />
      </RadarChartBase>
    </ResponsiveContainer>
  );
}
export default ComplexChart
