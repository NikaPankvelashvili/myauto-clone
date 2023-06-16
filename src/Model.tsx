import { useState, useEffect, useContext } from "react";
import { ClickAwayListener } from "@mui/base";
import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import CategoryDropDownElement from "./CategoryDropDownElement";
import { SearchFiltersContext } from "./MainPage";

type Props = {
  selectedManIDs: string[];
};

export type ModelType = {
  model_id: number;
  man_id: number;
  model_name: string;
};

export default function Model({ selectedManIDs }: Props) {
  const [showDropDown, setShowDropDown] = useState<Boolean>(false);
  const [selectedModelIDs, setSelectedModelIDs] = useState<number[]>([]);
  const [modelSearchTerm, setModelSearchTerm] = useState<string>("");
  const [fetchedModelData, setFetchedModelData] = useState<ModelType[]>([]);

  const { setSearchSelectedModelIDs } = useContext(SearchFiltersContext);

  useEffect(() => {
    const fetchManufacturerModels = (): void => {
      selectedManIDs.forEach((manID: string) => {
        fetch(`https://api2.myauto.ge/ka/getManModels?man_id=${manID}`)
          .then((res) => res.json())
          .then((res) => setFetchedModelData((prev) => [...prev, ...res.data]));
      });
    };

    setFetchedModelData([]);
    fetchManufacturerModels();
  }, [selectedManIDs]);

  useEffect(() => {
    setSearchSelectedModelIDs(selectedModelIDs);
  }, [selectedModelIDs, setSearchSelectedModelIDs]);

  const toggleSelectedModel = (model_id: number): void => {
    if (selectedModelIDs.includes(model_id)) {
      setSelectedModelIDs((prev) => prev?.filter((item) => item !== model_id));
    } else {
      setSelectedModelIDs((prev) => [...prev, model_id]);
    }
  };

  return (
    <div className="mt-4">
      <label
        htmlFor="manInput"
        className="text-xs font-medium text-default mb-2"
      >
        მოდელი
      </label>
      <ClickAwayListener onClickAway={() => setShowDropDown((prev) => false)}>
        <div className="p-3 border-[1px] relative rounded-lg mt-2 flex content-between w-full text-xs">
          <div
            className="w-full flex cursor-pointer"
            onClick={() => {
              if (selectedManIDs.length > 0) setShowDropDown((prev) => !prev);
            }}
          >
            <span className="w-full select-none overflow-hidden whitespace-nowrap text-ellipsis">
              {selectedModelIDs.length === 0 ? (
                <input
                  id="modelInput"
                  type="text"
                  className="focus:outline-none"
                  placeholder="მოდელი"
                  value={modelSearchTerm}
                  onChange={(e) => setModelSearchTerm(e.target.value)}
                />
              ) : (
                <span>
                  {selectedModelIDs.map((modelID, index) => (
                    <span key={index}>{`${
                      fetchedModelData.find(
                        (model: ModelType) => model.model_id === modelID
                      )?.model_name
                    },`}</span>
                  ))}
                </span>
              )}
            </span>
            {selectedModelIDs.length === 0 ? (
              showDropDown ? (
                <BsArrowUpShort size={"1.1rem"} />
              ) : (
                <BsArrowDownShort size={"1.1rem"} />
              )
            ) : (
              <div onClick={() => setSelectedModelIDs([])}>
                <IoIosClose size={"1.1rem"} />
              </div>
            )}
          </div>
          <div
            className={` bg-white mt-10 w-full border rounded-[12px] max-h-56 overflow-y-scroll p-3 absolute ml-[-12px] 
            ${showDropDown ? "" : "hidden"} z-10`}
          >
            {fetchedModelData &&
              fetchedModelData
                .filter((model: ModelType) =>
                  model.model_name
                    .toLowerCase()
                    .startsWith(modelSearchTerm.toLocaleLowerCase())
                )
                .map((model, index) => {
                  return (
                    <div
                      className="select-none cursor-pointer"
                      key={index}
                      onClick={() => toggleSelectedModel(model.model_id)}
                    >
                      <CategoryDropDownElement
                        name={model.model_name}
                        categoryID={model.model_id}
                        selectedIDs={selectedModelIDs}
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
