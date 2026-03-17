import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function CallLogsTable({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Recent Call Logs</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Caller</TableHead>
            <TableHead>Receiver</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Duration (sec)</TableHead>
            <TableHead>Cost (£)</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.slice(0, 10).map((call, index) => (
            <TableRow key={index}>
              <TableCell>{call.callerName}</TableCell>
              <TableCell>{call.receiverNumber}</TableCell>
              <TableCell>{call.city}</TableCell>
              <TableCell>{call.callDuration}</TableCell>
              <TableCell>£{parseFloat(call.callCost).toFixed(2)}</TableCell>
              <TableCell>
                {call.callStatus ? "✅ Successful" : "❌ Failed"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CallLogsTable;




