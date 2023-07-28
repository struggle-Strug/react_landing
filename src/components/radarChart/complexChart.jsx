/* eslint-disable react/prop-types */
import { Radar, RadarChart as RadarChartBase, PolarGrid, PolarRadiusAxis, PolarAngleAxis, ResponsiveContainer } from 'recharts';

const subjects = ["a", "b", "c","d", "e", "f"]

function ComplexChart({ showThirdPerson, scores }) {
  let data = subjects.map((subject, i) => ({
    subject: subject,
    A: 0.0,
    B: 0.0,
    fullMark: 4.00
  }))
  if(!scores["1st"] === false && !scores['3rd_average'] === true){
    data =scores["1st"].map((score, i) => ({
      subject: subjects[i],
      A: score,
      B: 0.0,
      fullMark: 4.00
    }))
  }
  else if(!scores["1st"] === true && !scores["3rd_average"] === false){
    data =scores["3rd_average"].map((score, i) => ({
      subject: subjects[i],
      A: 0.0,
      B: score,
      fullMark: 4.00
    }))
  }
  else{
    data =scores["3rd_average"].map((score, i) => ({
        subject: subjects[i],
        A: scores['1st'][i],
        B: score,
        fullMark: 4.00
    }))
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChartBase cx="50%" cy="40%" outerRadius="80%" data={data} fill="#f3f6f4">
        <PolarGrid />
        {/* <PolarAngleAxis dataKey="subject" tick={{ fontSize: '12px' }} radius="40%" /> */}
        <PolarRadiusAxis axisLine={false} angle={30} domain={[0, 4]} />

        <Radar name="1st" dataKey="A" stroke="#FF0000" fillOpacity={0} strokeWidth={5} max={4} />
        {showThirdPerson && (
          <Radar name="3rd_average" dataKey="B" stroke="#0000FF" fill="#8884d8" fillOpacity={0} strokeWidth={5} max={4}/>
        )}
      </RadarChartBase>
    </ResponsiveContainer>
  );
}
export default ComplexChart
