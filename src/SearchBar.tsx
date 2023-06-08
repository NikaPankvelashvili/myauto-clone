import { useState } from "react";
import SearchBarCategory from "./SearchBarCategory";
import { FaCarSide, FaMotorcycle } from "react-icons/fa";
import { TbTractor } from "react-icons/tb";
import DealType from "./DealType";
import Manufacturer from "./Manufacturer";
import Category from "./Category";
import PriceRange from "./PriceRange";
import Model from "./Model";

export type Currency = 0 | 1; // 0 - USD 1 - GEL
export type CategoryType = 0 | 1 | 2; //0 - car, 1 - spec, 2 - moto

export default function SearchBar() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(0);
  const [currency, setCurrency] = useState<Currency>(0);
  const [minPrice, setMinPrice] = useState<number>(-1);
  const [maxPrice, setMaxPrice] = useState<number>(-1);
  const [selectedManIDs, setSelectedManIDs] = useState<string[]>([]);

  return (
    <div className="w-250px mr-5 bg-white h-fit rounded-t-[12px] overflow-hidden mb-6">
      <div className="flex justify-around w-full ">
        <div
          className="w-full rounded-tl-[12px]"
          onClick={() => setSelectedCategory(0)}
        >
          <SearchBarCategory
            Foto={FaCarSide}
            selected={selectedCategory === 0}
          />
        </div>
        <div
          className=" border-x-[1px] w-full"
          onClick={() => setSelectedCategory(1)}
        >
          <SearchBarCategory
            Foto={TbTractor}
            selected={selectedCategory === 1}
          />
        </div>
        <div className="w-full" onClick={() => setSelectedCategory(2)}>
          <SearchBarCategory
            Foto={FaMotorcycle}
            selected={selectedCategory === 2}
          />
        </div>
      </div>
      <div className="p-6 border-b">
        <DealType />
        <Manufacturer
          selectedManIDs={selectedManIDs}
          setSelectedManIDs={setSelectedManIDs}
          current_category_type={selectedCategory}
        />
        <Model selectedManIDs={selectedManIDs} />
        <Category current_category_type={selectedCategory} />
      </div>
      <PriceRange
        currency={currency}
        setCurrency={setCurrency}
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
      />
      <div className="px-6 py-4 w-full">
        <button className="w-full h-8 rounded-md text-base text-white bg-[#FD4100] font-bold">
          ძიება
        </button>
      </div>
    </div>
  );
}
