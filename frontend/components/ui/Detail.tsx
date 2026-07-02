import React from "react";
interface Props {
  text: string;
  value: any;
  type?: "text" | "date" | "array" | "boolean" | undefined; // optional, default is text
}
const Detail = ({ text, value, type }: Props) => {
  let display;
  switch (type) {
    case "date":
      display = value ? new Date(value).toLocaleDateString() : "-";
      break;
    case "boolean":
      display = value ? "Yes" : "No";
      break;
    case "array":
      display = (
        <div className="flex gap-2 flex-wrap">
          {value?.map((item: any) => (
            <p>
              {item.portion} - ₹{item.price}
            </p>
          ))}
        </div>
      );

      break;
    default:
      display = value ?? "-";
  }
  return (
    <div className="bg-button-primary border-border rounded-full px-3 py-2 flex justify-center">
      <p>
        {text ? text + ":" : ""} {display}
      </p>
    </div>
  );
};

export default Detail;
