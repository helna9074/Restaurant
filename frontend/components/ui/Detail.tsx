import React from "react";
interface Props {
  text: string;
  value: React.ReactNode;
}
const Detail = ({ text, value }: Props) => {
  return (
    <div className="bg-button-primary border-border rounded-full px-3 py-2 flex justify-center">
      <p>
        {text}: {value ?? " "}
      </p>
    </div>
  );
};

export default Detail;
