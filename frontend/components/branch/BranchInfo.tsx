import { Branch } from "@/types/branch";
import React from "react";
import { sections } from "./branchViewConfig";
import Detail from "../ui/Detail";
const BranchInfo = ({ data }: { data: Branch }) => {
  return (
    <div className="space-y-6  flex gap-2">
      {data.logo&&(
        <div className="w-40 h-full ">
        <img src={data.logo} alt="" className="w-full h-40 object-cover rounded-full" />
      </div>
      )}
      <div className="flex flex-col">
      {sections.map((section) => (
        <div key={section.title} className="flex flex-col">
          <h2 className="font-bold my-5 text-2xl">{section.title}</h2>

          <div className="grid grid-cols-3 gap-3">
            {section.fields.map((field) => (
              <Detail
                key={field.key}
                text={field.text}
                value={data[field.key as keyof Branch]}
              />
            ))}
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default BranchInfo;
