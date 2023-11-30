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
          <Line type="monotone" dataKey="value" strokeWidth={3} stroke="red" dot={{ fill: '#00008C', r: 4, stroke: 0 }} />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" width={5} />
          <YAxis domain={[0, 10]} ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
        </LineChartBase>
      </ResponsiveContainer>
    </div>

  )
}