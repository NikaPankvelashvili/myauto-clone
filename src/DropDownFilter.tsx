import React from "react";

type Props = {
  optionsList: string[];
  indexSetterFunction: Function;
};

const DropDownFilter = ({ optionsList, indexSetterFunction }: Props) => {
  return (
    <select
      className=" w-44 px-3 py-[6px] rounded-lg ml-2 text-xs font-medium"
      onChange={(e) => indexSetterFunction(e.target.value)}
    >
      {optionsList.map((item, index) => {
        return (
          <option key={index} value={item}>
            {item}
          </option>
        );
      })}
    </select>
  );
};

export default DropDownFilter;
