import { ClickAwayListener } from "@mui/base";
import { useContext, useEffect, useState } from "react";
import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import CategoryDropDownElement from "./CategoryDropDownElement";
import { SearchFiltersContext } from "./MainPage";

type CategoryType = {
  category_id: number;
  category_type: number;
  title: string;
};

type Props = {
  current_category_type: number;
};

export default function Category({ current_category_type }: Props) {
  const [showDropDown, setShowDropDown] = useState<Boolean>(false);
  const [fetchedCategoryData, setFetchedCategoryData] = useState<
    CategoryType[]
  >([]);
  const [selectedCategoryIDs, setSelectedCategoryIDs] = useState<number[]>([]);

  const { setSearchSelectedCategoryIDs } = useContext(SearchFiltersContext);

  useEffect(() => {
    fetch("https://api2.myauto.ge/ka/cats/get")
      .then((res) => res.json())
      .then((res) => setFetchedCategoryData(res.data));
  }, []);

  useEffect(() => {
    setSelectedCategoryIDs((prev) => []);
  }, [current_category_type]);

  useEffect(() => {
    setSearchSelectedCategoryIDs(selectedCategoryIDs);
  }, [selectedCategoryIDs, setSearchSelectedCategoryIDs]);

  const toggleSelectedCat = (categoryID: number): void => {
    if (selectedCategoryIDs.includes(categoryID)) {
      setSelectedCategoryIDs((prev) =>
        prev?.filter((item) => item !== categoryID)
      );
    } else {
      setSelectedCategoryIDs((prev) => [...prev, categoryID]);
    }
  };

  return (
    <div className="mt-4">
      <label
        htmlFor="manInput"
        className="text-xs font-medium text-default mb-2"
      >
        კატეგორია
      </label>
      <ClickAwayListener onClickAway={() => setShowDropDown((prev) => false)}>
        <div className="p-3 border-[1px] relative rounded-lg mt-2 flex content-between w-full text-xs">
          <div
            className="w-full flex cursor-pointer"
            onClick={() => setShowDropDown((prev) => !prev)}
          >
            <span className="w-full select-none overflow-hidden whitespace-nowrap text-ellipsis">
              {selectedCategoryIDs.length === 0 ? (
                <span>კატეგორია</span>
              ) : (
                <span>
                  {selectedCategoryIDs.map((catID, index) => (
                    <span key={index}>{`${
                      fetchedCategoryData.find(
                        (category: CategoryType) =>
                          category.category_id === catID
                      )?.title
                    },`}</span>
                  ))}
                </span>
              )}
            </span>
            {selectedCategoryIDs.length === 0 ? (
              showDropDown ? (
                <BsArrowUpShort size={"1.1rem"} />
              ) : (
                <BsArrowDownShort size={"1.1rem"} />
              )
            ) : (
              <div onClick={() => setSelectedCategoryIDs([])}>
                <IoIosClose size={"1.1rem"} />
              </div>
            )}
          </div>
          <div
            className={` bg-white mt-10 w-full border rounded-[12px] max-h-56 overflow-y-scroll p-3 absolute ml-[-12px] ${
              showDropDown ? "" : "hidden"
            } z-10`}
          >
            {fetchedCategoryData &&
              fetchedCategoryData
                .filter(
                  (category: CategoryType) =>
                    category.category_type === current_category_type
                )
                .map((category: CategoryType) => {
                  return (
                    <div
                      className="select-none cursor-pointer"
                      key={category.category_id}
                      onClick={() => toggleSelectedCat(category.category_id)}
                    >
                      <CategoryDropDownElement
                        name={category.title}
                        categoryID={category.category_id}
                        selectedIDs={selectedCategoryIDs}
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
