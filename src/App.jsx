import { useEffect, useState } from "react";
import { fetchCallData } from "./services/api";
import KpiCards from "./components/KpiCards";
import CallDurationChart from "./components/CallDurationChart";
import CallCostChart from "./components/CallCostChart";
import TimelineChart from "./components/TimelineChart";
import CityPieChart from "./components/CityPieChart";
import CallLogsTable from "./components/CallLogsTable";

function App() {
  const [cdrData, setCdrData] = useState([]);
  const [cityFilter, setCityFilter] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");

  useEffect(() => {
    fetchCallData().then((data) => setCdrData(data));
  }, []);

  const cities = ["All Cities", ...Array.from(new Set(cdrData.map((c) => c.city)))];

  const filteredData = cdrData.filter((call) => {
    if (selectedCity !== "All Cities") return call.city === selectedCity;
    return call.city.toLowerCase().includes(cityFilter.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[your-original-background] md:flex">
      {/* Sidebar with neon accents */}
      <aside className="hidden md:flex flex-col w-56 bg-gray-900 p-6">
        {/* Sidebar title with neon divider */}
        <div className="text-xl font-bold mb-2 border-b border-[#39FF14] pb-2 text-white">
          Dashboard
        </div>

        {/* Sidebar buttons with emojis */}
        <nav className="flex flex-col gap-3 mt-4">
          <button className="flex items-center gap-2 text-left hover:bg-[#FF6EC7] px-2 py-1 rounded text-white">
            📊 Overview
          </button>
          <button className="flex items-center gap-2 text-left hover:bg-[#FF6EC7] px-2 py-1 rounded text-white">
            📈 Reports
          </button>
          <button className="flex items-center gap-2 text-left hover:bg-[#FF6EC7] px-2 py-1 rounded text-white">
            ⚙️ Settings
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="w-full bg-gray-800 shadow-sm px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-white">Call Data Records</div>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white text-lg font-semibold">
              👤
            </div>
          </div>
        </nav>

        {/* Enter City*/}
        <div className="w-full px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <input
            type="text"
            placeholder="Enter city..."
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white w-full sm:w-auto"
          />

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white w-full sm:w-auto"
          >
            {cities.map((city, idx) => (
              <option key={idx} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Dashboard content */}
        <div className="w-full px-6 md:px-12 lg:px-16">
          {/* KPI Cards */}
          <KpiCards data={filteredData} />

          {/* Top row charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <CallDurationChart data={filteredData} />
            <CallCostChart data={filteredData} />
          </div>

          {/* Middle row charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <TimelineChart data={filteredData} />
            <CityPieChart data={filteredData} />
          </div>

          {/* Full width table */}
          <CallLogsTable data={filteredData} />
        </div>
      </div>
    </div>
  );
}

export default App;