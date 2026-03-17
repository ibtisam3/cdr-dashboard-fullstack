import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

function CallDurationChart({ data }) {

  if (data.length === 0) return null;

  const durations = data.map(call => call.callDuration);
  const longest = Math.max(...durations);
  const shortest = Math.min(...durations);
  const average = durations.reduce((sum, d) => sum + d, 0) / durations.length;

  const chartData = [
    { name: "Shortest", duration: shortest },
    { name: "Average", duration: Math.round(average) },
    { name: "Longest", duration: longest }
  ];

  return (
    <div style={{ width: "100%", height: 300, marginBottom: "30px" }}>
      <h2>Call Duration Analytics</h2>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="duration" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CallDurationChart;

