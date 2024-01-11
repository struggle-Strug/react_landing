import { LineChart as LineChartBase, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export const LineChart = ({ data }) => {
  return (
    <div className='py-5'>
      <ResponsiveContainer width="100%" height={300}>
        <LineChartBase width={600} height={300} data={data} margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 40
        }} >
          <Line type="monotone" dataKey="value" strokeWidth={3} stroke="red" dot={{ fill: 'red', r: 0, stroke: 1 }} yAxisId="left" />
          <Line type="monotone" dataKey="engagement" strokeWidth={3} stroke="blue" dot={{ fill: '#00008C', r: 0, stroke: 1 }} yAxisId="right" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" width={5} />
          <YAxis domain={[0, 100]} yAxisId={"left"} />
          <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
        </LineChartBase>
      </ResponsiveContainer>
    </div>

  )
}