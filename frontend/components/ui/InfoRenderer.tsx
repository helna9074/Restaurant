import { getValue } from "@/helper/date";
import Detail from "./Detail";

type Field = {
  key: string;
  text: string;
};

type Section = {
  title: string;
  fields: Field[];
};

interface Props {
  data: Record<string, any>;
  sections: Section[];
  imageKey?: string; // optional (for logo/profile pic)
}

const InfoRenderer = ({ data, sections, imageKey }: Props) => {
  return (
    <div className="space-y-6 flex lg:flex-row flex-col gap-2">
      
      {imageKey && data[imageKey] && (
        <div className="w-40">
          <img
            src={data[imageKey]}
            className="w-full h-40 object-cover rounded-full"
          />
        </div>
      )}

      <div className="flex flex-col">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="font-bold my-5 text-2xl">{section.title}</h2>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {section.fields.map((field) => (
                <Detail
                  key={field.key}
                  text={field.text}
                  value={getValue(data,field.key)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoRenderer;