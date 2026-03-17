import React from "react";


export function Table({ children }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full">{children}</table>
    </div>
  );
}

export function TableHeader({ children }) {
  return <thead className="bg-muted text-muted-foreground">{children}</thead>;
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children }) {
return <tr className="even:bg-muted/50 border-b border-border">{children}</tr>;

}


export function TableHead({ children }) {
  return (
    <th className="px-4 py-2 text-left font-medium text-foreground">
      <div className="flex justify-center">{children}</div>
    </th>
  );
}

export function TableCell({ children }) {
  return <td className="px-4 py-2 border-r last:border-r-0">{children}</td>;

}