import React from "react";
import Pagination from "../TableComponents/Pagination";

interface Columns<T> {
  headers: string;
  id?: string;
  accessor: keyof T; //The key from the row data that this column displays
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  style?: string;
}
interface TableProps<T> {
  columns: Columns<T>[];
  data: T[];

  topSection?: React.ReactNode;
}

const Table = <T,>({ columns, data, topSection }: TableProps<T>) => {
  return (
    <div className="w-full overflow-x-auto scrollbar-thin p-3 rounded-2xl flex flex-col gap-2">
      {topSection && (
        <div className="flex justify-between items-center mb-4">
          {topSection}
        </div>
      )}
      <table className="w-full p-3">
        <thead className="">
          <tr className="">
            {columns.map((col, index) => (
              <th
                key={col.id ?? String(col.accessor)}
                className={`${col.style ?? "text-start"} py-3 px-3 border-b border-border-b whitespace-nowrap`}
              >
                {col.headers}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b border-border-b ">
              {columns.map((col) => {
                const value = row[col.accessor];
                return (
                  <td
                    key={col.id ?? String(col.accessor)}
                    className={`${col.style ?? "text-start "} px-3 py-3 whitespace-nowrap`}
                  >
                    {col.render ? col.render(value, row) : String(value ?? "-")}
                    {}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="w-full flex justify-end">
      {/* <Pagination page={1} totalPage={1} onPageChange={() => {}}/>
      </div> */}
    </div>
  );
};

export default Table;
