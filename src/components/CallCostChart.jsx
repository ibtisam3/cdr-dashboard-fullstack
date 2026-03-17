import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

function CallCostChart({ data }) {
  if (data.length === 0) return null;

  // Group costs by city
  const cityCosts = {};
  data.forEach(call => {
    if (!cityCosts[call.city]) cityCosts[call.city] = 0;
    cityCosts[call.city] += parseFloat(call.callCost);
  });

  const chartData = Object.keys(cityCosts).map(city => ({
    city,
    totalCost: cityCosts[city].toFixed(2)
  }));

  return (
    <div className="w-full h-[300px] mb-8">
      <h2 className="text-xl font-semibold mb-4">Call Cost Analytics</h2>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="city" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalCost" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CallCostChart;