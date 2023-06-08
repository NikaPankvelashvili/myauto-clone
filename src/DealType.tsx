import { useContext, useEffect } from "react";
import { ClickAwayListener } from "@mui/base";
import { useState } from "react";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import { SearchFiltersContext } from "./MainPage";

export default function DealType() {
  const [dealType, setDealType] = useState<number>(-1);
  const [dealTypeShown, setDealTypeShown] = useState<boolean>(false);

  const { setSearchDealType } = useContext(SearchFiltersContext);

  useEffect(() => {
    setSearchDealType(dealType);
  }, [dealType]);

  const translateDealType = (): string => {
    switch (dealType) {
      case 0:
        return "იყიდება";
      case 1:
        return "ქირავდება";
      default:
        return "გარიგების ტიპი";
    }
  };

  return (
    <>
      <label htmlFor="deal_type" className="text-xs font-medium text-default">
        გარიგების ტიპი
      </label>
      <ClickAwayListener onClickAway={() => setDealTypeShown((prev) => false)}>
        <div
          id="deal_type"
          className="p-3 border-[1px] relative rounded-lg mt-2 flex content-between w-full text-xs"
        >
          <div
            className="w-full flex cursor-pointer"
            onClick={() => setDealTypeShown((prev) => !prev)}
          >
            <span className="w-full select-none">{translateDealType()}</span>
            {dealType === -1 ? (
              dealTypeShown ? (
                <BsArrowUpShort size={"1.1rem"} />
              ) : (
                <BsArrowDownShort size={"1.1rem"} />
              )
            ) : (
              <div onClick={() => setDealType(-1)}>
                <IoIosClose size={"1.1rem"} />
              </div>
            )}
          </div>
          <div
            className={` bg-white mt-10 w-full border rounded-[12px] p-3 absolute ml-[-12px] ${
              dealTypeShown ? "" : "hidden"
            } z-10`}
          >
            <div
              className="flex items-center"
              onClick={() => {
                if (dealType === 0) setDealType(-1);
                else setDealType(0);
              }}
            >
              <input
                type="checkbox"
                checked={dealType === 0}
                className="mr-3"
                readOnly
              />
              <span>იყიდება</span>
            </div>
            <div
              className="flex items-center mt-2"
              onClick={() => {
                if (dealType === 1) setDealType(-1);
                else setDealType(1);
              }}
            >
              <input
                type="checkbox"
                checked={dealType === 1}
                className="mr-3"
                readOnly
              />
              <span>ქირავდება</span>
            </div>
          </div>
        </div>
      </ClickAwayListener>
    </>
  );
}
