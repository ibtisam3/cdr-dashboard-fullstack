import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaCheck, FaPhoneAlt, FaRegClock, FaTimes, FaPoundSign } from "react-icons/fa";

function KpiCards({ data }) {
  const totalCalls = data.length;
  const totalCost = data.reduce((sum, call) => sum + parseFloat(call.callCost), 0);
  const avgDuration =
    data.reduce((sum, call) => sum + call.callDuration, 0) / data.length;
  const successfulCalls = data.filter(call => call.callStatus === true).length;
  const failedCalls = data.filter(call => call.callStatus === false).length;

  const formatGBP = (amount) =>
    new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(amount);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      
      {/* Total Calls */}
      <Card className="bg-[#39FF14] text-black transform transition duration-300 hover:scale-105 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="rounded-full bg-white/20 p-2 flex items-center justify-center">
              <FaPhoneAlt />
            </div>
            Total Calls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{totalCalls}</p>
        </CardContent>
      </Card>

      {/* Total Cost */}
      <Card className="bg-[#FF6EC7] text-white transform transition duration-300 hover:scale-105 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="rounded-full bg-white/20 p-2 flex items-center justify-center">
              <FaPoundSign />
            </div>
            Total Cost
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{formatGBP(totalCost)}</p>
        </CardContent>
      </Card>

      {/* Average Duration */}
      <Card className="bg-[#1E90FF] text-white transform transition duration-300 hover:scale-105 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="rounded-full bg-white/20 p-2 flex items-center justify-center">
              <FaRegClock />
            </div>
            Average Duration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{avgDuration.toFixed(0)} sec</p>
        </CardContent>
      </Card>

      {/* Successful Calls */}
      <Card className="bg-[#FFD700] text-black transform transition duration-300 hover:scale-105 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="rounded-full bg-white/20 p-2 flex items-center justify-center">
              <FaCheck />
            </div>
            Successful Calls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{successfulCalls}</p>
        </CardContent>
      </Card>

      {/* Failed Calls */}
      <Card className="bg-[#FF4500] text-white transform transition duration-300 hover:scale-105 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="rounded-full bg-white/20 p-2 flex items-center justify-center">
              <FaTimes />
            </div>
            Failed Calls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{failedCalls}</p>
        </CardContent>
      </Card>

    </div>
  );
}

export default KpiCards;