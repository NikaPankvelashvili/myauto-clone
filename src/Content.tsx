import { useState, useEffect, useContext } from "react";
import ProductCard from "./ProductCard";
import DropDownFilter from "./DropDownFilter";
import { SearchFiltersContext } from "./MainPage";

type TimePeriodIndex =
  | "ბოლო 24 საათი"
  | "ბოლო 12 საათი"
  | "ბოლო 6 საათი"
  | "ბოლო 3 საათი"
  | "ბოლო 1 საათი";
type ArrangeFilter =
  | "თარიღი კლებადი"
  | "თარიღი ზრდადი"
  | "ფასი კლებადი"
  | "ფასი ზრდადი"
  | "გარბენი კლებადი"
  | "გარბენი ზრდადი";

export type ProductInfo = {
  man_id: number;
  model_id: number;
  prod_year: number;
  engine_volume: number;
  car_run_km: number;
  for_rent: boolean;
  right_wheel: boolean;
  views: number;
  order_date: string;
  photo: string;
  car_id: number;
  photo_ver: number;
  price_usd: number;
  category_id: number;
};

export default function Content() {
  const [fetchedData, setFetchedData] = useState<ProductInfo[]>([]);
  const [filteredData, setFilteredData] = useState<ProductInfo[]>([]);
  const [timePeriodIndex, setTimePeriodIndex] =
    useState<TimePeriodIndex>("ბოლო 24 საათი");
  const [arrangeFilterIndex, setArrangeFilterIndex] =
    useState<ArrangeFilter>("თარიღი კლებადი");

  const {
    searchDealType,
    searchSelectedManIDs,
    searchSelectedModelIDs,
    searchSelectedCategoryIDs,
    searchMinPrice,
    searchMaxPrice,
    searchCurrency,
  } = useContext(SearchFiltersContext);

  useEffect(() => {
    setFilteredData(
      fetchedData.filter((item) => {
        const dealTypeMatch =
          searchDealType === -1
            ? true
            : searchDealType === 0
            ? item.for_rent === false
            : item.for_rent === true;
        const selectedManIDsMatch =
          searchSelectedManIDs.length === 0
            ? true
            : searchSelectedManIDs.includes(`${item.man_id}`);
        const selectedModelIDsMatch =
          searchSelectedModelIDs.length === 0
            ? true
            : searchSelectedModelIDs.includes(item.model_id);
        const selectedCategoryIDsMatch =
          searchSelectedCategoryIDs.length === 0
            ? true
            : searchSelectedCategoryIDs.includes(item.category_id);
        const minPriceMatch =
          searchMinPrice === -1
            ? true
            : searchCurrency === 0
            ? item.price_usd >= searchMinPrice
            : item.price_usd * 2.65 >= searchMinPrice;
        const maxPriceMatch =
          searchMaxPrice === -1
            ? true
            : searchCurrency === 0
            ? item.price_usd <= searchMaxPrice
            : item.price_usd * 2.65 <= searchMaxPrice;
        // TIME FILTER

        return (
          dealTypeMatch &&
          selectedManIDsMatch &&
          selectedModelIDsMatch &&
          selectedCategoryIDsMatch &&
          minPriceMatch &&
          maxPriceMatch
        );
      })
    );
  }, [
    searchDealType,
    searchSelectedManIDs,
    searchSelectedModelIDs,
    searchSelectedCategoryIDs,
    searchMinPrice,
    searchMaxPrice,
    searchCurrency,
    timePeriodIndex,
  ]);

  useEffect(() => {
    fetch("https://api2.myauto.ge/ka/products/")
      .then((res) => res.json())
      .then((res) => {
        setFetchedData(res.data.items);
        setFilteredData(res.data.items);
      });
  }, []);

  return (
    <div>
      <div className="w-[750px] flex items-center justify-between mb-4">
        <p>{`${filteredData.length} განცხადება`}</p>
        <div>
          <DropDownFilter
            optionsList={[
              "ბოლო 24 საათი",
              "ბოლო 12 საათი",
              "ბოლო 6 საათი",
              "ბოლო 3 საათი",
              "ბოლო 1 საათი",
            ]}
            indexSetterFunction={setTimePeriodIndex}
          />
          <DropDownFilter
            optionsList={[
              "თარიღი კლებადი",
              "თარიღი ზრდადი",
              "ფასი კლებადი",
              "ფასი ზრდადი",
              "გარბენი კლებადი",
              "გარბენი ზრდადი",
            ]}
            indexSetterFunction={setArrangeFilterIndex}
          />
        </div>
      </div>
      {filteredData.map((car) => {
        return (
          <ProductCard
            key={car.car_id}
            man_id={car.man_id}
            model_id={car.model_id}
            prod_year={car.prod_year}
            engine_volume={car.engine_volume}
            car_run_km={car.car_run_km}
            for_rent={car.for_rent}
            right_wheel={car.right_wheel}
            views={car.views}
            order_date={car.order_date}
            photo={car.photo}
            car_id={car.car_id}
            photo_ver={car.photo_ver}
            price_usd={car.price_usd}
            category_id={car.category_id}
          />
        );
      })}
    </div>
  );
}
