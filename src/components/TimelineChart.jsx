import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Label } from "recharts";

function TimelineChart({ data }) {
  if (data.length === 0) return null;

  // Group calls by hour
  const callsByHour = {};

  data.forEach(call => {
    const date = new Date(call.startTime);
    const hour = date.getHours();

    if (!callsByHour[hour]) {
      callsByHour[hour] = 0;
    }

    callsByHour[hour]++;
  });

  const chartData = Object.keys(callsByHour).map(hour => ({
    hour: `${hour}:00`,
    calls: callsByHour[hour]
  }));

  return (
    <div className="w-full h-[300px] mb-8">
      <h2 className="text-xl font-semibold mb-4">Call Activity Timeline</h2>

      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          
          <XAxis dataKey="hour">
            <Label value="Hour" offset={-5} position="insideBottom" />
          </XAxis>

          <YAxis>
            <Label value="Number of Calls" angle={-90} position="insideLeft" />
          </YAxis>

          <Tooltip />
          <Line type="monotone" dataKey="calls" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TimelineChart;





