import { ClickAwayListener } from "@mui/base";
import { useEffect, useState } from "react";
import DropDownElement from "./DropDownElement";
import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import { CategoryType } from "./SearchBar";

export type ManObject = {
  man_id: string;
  man_name: string;
  is_car: string;
  is_spec: string;
  is_moto: string;
};

type Props = {
  selectedManIDs: string[];
  setSelectedManIDs: Function;
  current_category_type: CategoryType;
};

export default function Manufacturer({
  selectedManIDs,
  setSelectedManIDs,
  current_category_type,
}: Props) {
  const [showDropDown, setShowDropDown] = useState<Boolean>(false);
  const [fetchedManData, setFetchedManData] = useState<ManObject[]>();
  const [manSearchTerm, setManSearchTerm] = useState<string>("");

  useEffect(() => {
    fetch("https://static.my.ge/myauto/js/mans.json")
      .then((resp) => resp.json())
      .then((resp) => {
        setFetchedManData(resp);
      });
  }, []);

  const toggleSelectedMan = (manID: string): void => {
    if (selectedManIDs.includes(manID)) {
      setSelectedManIDs((prev: string[]) =>
        prev?.filter((item: string) => item !== manID)
      );
    } else {
      setSelectedManIDs((prev: string[]) => [...prev, manID]);
    }
  };

  return (
    <div className="mt-4">
      <label
        htmlFor="manInput"
        className="text-xs font-medium text-default mb-2"
      >
        მწარმოებელი
      </label>
      <ClickAwayListener onClickAway={() => setShowDropDown((prev) => false)}>
        <div className="p-3 border-[1px] relative rounded-lg mt-2 flex content-between w-full text-xs">
          <div
            className="w-full flex cursor-pointer"
            onClick={() => setShowDropDown((prev) => !prev)}
          >
            <span className="w-full select-none overflow-hidden whitespace-nowrap text-ellipsis">
              {selectedManIDs.length === 0 ? (
                <input
                  id="manInput"
                  type="text"
                  className="focus:outline-none"
                  placeholder="ყველა მწარმოებელი"
                  value={manSearchTerm}
                  onChange={(e) => setManSearchTerm(e.target.value)}
                />
              ) : (
                <span>
                  {selectedManIDs.map((manID, index) => (
                    <span key={index}>{`${
                      fetchedManData![parseInt(manID) - 1].man_name
                    },`}</span>
                  ))}
                </span>
              )}
            </span>
            {selectedManIDs.length === 0 ? (
              showDropDown ? (
                <BsArrowUpShort size={"1.1rem"} />
              ) : (
                <BsArrowDownShort size={"1.1rem"} />
              )
            ) : (
              <div onClick={() => setSelectedManIDs([])}>
                <IoIosClose size={"1.1rem"} />
              </div>
            )}
          </div>
          <div
            className={` bg-white mt-10 w-full border rounded-[12px] max-h-56 overflow-y-scroll p-3 absolute ml-[-12px] 
            ${showDropDown ? "" : "hidden"} z-10`}
          >
            {fetchedManData &&
              fetchedManData
                .filter((manufacturer: ManObject) => {
                  return current_category_type === 0
                    ? manufacturer.is_car === "1"
                    : current_category_type === 1
                    ? manufacturer.is_spec === "1"
                    : manufacturer.is_moto === "1";
                })
                .filter((manufacturer) =>
                  manufacturer.man_name
                    .toLowerCase()
                    .startsWith(manSearchTerm.toLocaleLowerCase())
                )
                .map((item, index) => {
                  return (
                    <div
                      className="select-none cursor-pointer"
                      key={index}
                      onClick={() => toggleSelectedMan(item.man_id)}
                    >
                      <DropDownElement
                        name={item.man_name}
                        manID={item.man_id}
                        selectedIDs={selectedManIDs}
                      />
                    </div>
                  );
                })}
          </div>
        </div>
      </ClickAwayListener>
    </div>
  );
}
