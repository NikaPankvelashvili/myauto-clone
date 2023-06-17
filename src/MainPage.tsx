import { createContext, useState } from "react";
import SearchBar, { Currency } from "./SearchBar";
import Content from "./Content";

export type SearchFilters = {
  searchDealType: number;
  setSearchDealType: Function;
  searchSelectedManIDs: string[];
  setSearchSelectedManIDs: Function;
  searchSelectedModelIDs: number[];
  setSearchSelectedModelIDs: Function;
  searchSelectedCategoryIDs: number[];
  setSearchSelectedCategoryIDs: Function;
  searchMinPrice: number;
  setSearchMinPrice: Function;
  searchMaxPrice: number;
  setSearchMaxPrice: Function;
  searchCurrency: Currency;
  setSearchCurrency: Function;
  toggleSearch: boolean;
  setToggleSearch: Function;
};

export const SearchFiltersContext = createContext<SearchFilters>({
  searchDealType: -1,
  setSearchDealType: () => {},
  searchSelectedManIDs: [],
  setSearchSelectedManIDs: () => {},
  searchSelectedModelIDs: [],
  setSearchSelectedModelIDs: () => {},
  searchSelectedCategoryIDs: [],
  setSearchSelectedCategoryIDs: () => {},
  searchMinPrice: -1,
  setSearchMinPrice: () => {},
  searchMaxPrice: -1,
  setSearchMaxPrice: () => {},
  searchCurrency: 0,
  setSearchCurrency: () => {},
  toggleSearch: false,
  setToggleSearch: () => {},
});

export default function MainPage() {
  const [searchDealType, setSearchDealType] = useState<number>(-1);
  const [searchSelectedManIDs, setSearchSelectedManIDs] = useState<string[]>(
    []
  );
  const [searchSelectedModelIDs, setSearchSelectedModelIDs] = useState<
    number[]
  >([]);
  const [searchSelectedCategoryIDs, setSearchSelectedCategoryIDs] = useState<
    number[]
  >([]);
  const [searchMinPrice, setSearchMinPrice] = useState<number>(-1);
  const [searchMaxPrice, setSearchMaxPrice] = useState<number>(-1);
  const [searchCurrency, setSearchCurrency] = useState<Currency>(0);
  const [toggleSearch, setToggleSearch] = useState<boolean>(false);

  // console.log(
  //   `
  //   searchDealType:${searchDealType}
  //   serachSelectedManIDs:${searchSelectedManIDs}
  //   searchSelectedModelIDs:${searchSelectedModelIDs}
  //   searchSelectedCategoryIDs:${searchSelectedCategoryIDs}
  //   minprice:${searchMinPrice} maxprice:${searchMaxPrice} currency:${searchCurrency}`
  // );

  return (
    <SearchFiltersContext.Provider
      value={{
        searchDealType,
        setSearchDealType,
        searchSelectedManIDs,
        setSearchSelectedManIDs,
        searchSelectedModelIDs,
        setSearchSelectedModelIDs,
        searchSelectedCategoryIDs,
        setSearchSelectedCategoryIDs,
        searchMinPrice,
        setSearchMinPrice,
        searchMaxPrice,
        setSearchMaxPrice,
        searchCurrency,
        setSearchCurrency,
        toggleSearch,
        setToggleSearch,
      }}
    >
      <div className="bg-bgColor min-h-[calc(100%-80px)] flex justify-center pt-16">
        <SearchBar />
        <Content />
      </div>
    </SearchFiltersContext.Provider>
  );
}
