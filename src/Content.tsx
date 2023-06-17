import { useState, useEffect, useContext } from "react";
import ProductCard from "./ProductCard";
import DropDownFilter from "./DropDownFilter";
import { SearchFiltersContext } from "./MainPage";
import ReactPaginate from "react-paginate";

export type TimePeriodIndex =
  | "ბოლო 24 საათი"
  | "ბოლო 12 საათი"
  | "ბოლო 6 საათი"
  | "ბოლო 3 საათი"
  | "ბოლო 1 საათი";
export type ArrangeFilter =
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

  const [pageNumber, setPageNumber] = useState<number>(0);
  const carsPerPage = 5;
  const carsVisited = pageNumber * carsPerPage;

  const pageCount = Math.ceil(filteredData.length / carsPerPage);

  const displayCarsSliced = filteredData
    .slice(carsVisited, carsVisited + carsPerPage)
    .map((car) => {
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
    });

  useEffect(() => {
    setPageNumber(0);
  }, [filteredData, timePeriodIndex, arrangeFilterIndex]);

  const {
    searchDealType,
    searchSelectedManIDs,
    searchSelectedModelIDs,
    searchSelectedCategoryIDs,
    searchMinPrice,
    searchMaxPrice,
    searchCurrency,
    toggleSearch,
  } = useContext(SearchFiltersContext);

  const compareFunctionGenerator = (
    currentArrangeFilter: ArrangeFilter
  ): ((a: ProductInfo, b: ProductInfo) => 0 | -1 | 1) => {
    switch (currentArrangeFilter) {
      case "ფასი კლებადი":
        return (car1: ProductInfo, car2: ProductInfo) => {
          if (car1.price_usd < car2.price_usd) return 1;
          if (car1.price_usd === car2.price_usd) return 0;
          return -1;
        };

      case "ფასი ზრდადი":
        return (car1: ProductInfo, car2: ProductInfo) => {
          if (car1.price_usd > car2.price_usd) return 1;
          if (car1.price_usd === car2.price_usd) return 0;
          return -1;
        };
      case "გარბენი ზრდადი": {
        return (car1: ProductInfo, car2: ProductInfo) => {
          if (car1.car_run_km > car2.car_run_km) return 1;
          if (car1.car_run_km === car2.car_run_km) return 0;
          return -1;
        };
      }
      case "გარბენი კლებადი": {
        return (car1: ProductInfo, car2: ProductInfo) => {
          if (car1.car_run_km < car2.car_run_km) return 1;
          if (car1.car_run_km === car2.car_run_km) return 0;
          return -1;
        };
      }
      case "თარიღი კლებადი": {
        return (car1: ProductInfo, car2: ProductInfo) => {
          const car1Time = new Date(car1.order_date);
          const car2Time = new Date(car2.order_date);
          if (car1Time.getTime() < car2Time.getTime()) return 1;
          if (car1Time.getTime() > car2Time.getTime()) return -1;
          return 0;
        };
      }
      case "თარიღი ზრდადი": {
        return (car1: ProductInfo, car2: ProductInfo) => {
          const car1Time = new Date(car1.order_date);
          const car2Time = new Date(car2.order_date);
          if (car1Time.getTime() > car2Time.getTime()) return 1;
          if (car1Time.getTime() < car2Time.getTime()) return -1;
          return 0;
        };
      }
    }
  };

  useEffect(() => {
    setFilteredData(
      fetchedData
        .filter((item) => {
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

          const differenceFromNowInHours =
            Math.abs(
              new Date().getTime() - new Date(item.order_date).getTime()
            ) /
            (1000 * 60 * 60);

          let timeFilterMatch: boolean = true;

          switch (timePeriodIndex) {
            case "ბოლო 1 საათი": {
              timeFilterMatch = differenceFromNowInHours < 1;
              break;
            }
            case "ბოლო 3 საათი": {
              timeFilterMatch = differenceFromNowInHours < 3;
              break;
            }
            case "ბოლო 6 საათი": {
              timeFilterMatch = differenceFromNowInHours < 6;
              break;
            }
            case "ბოლო 12 საათი": {
              timeFilterMatch = differenceFromNowInHours < 12;
              break;
            }
            case "ბოლო 24 საათი": {
              timeFilterMatch = differenceFromNowInHours < 24;
              break;
            }
          }

          return (
            dealTypeMatch &&
            selectedManIDsMatch &&
            selectedModelIDsMatch &&
            selectedCategoryIDsMatch &&
            minPriceMatch &&
            maxPriceMatch &&
            timeFilterMatch
          );
        })
        .sort(compareFunctionGenerator(arrangeFilterIndex))
    );
    // eslint-disable-next-line
  }, [fetchedData, timePeriodIndex, toggleSearch, arrangeFilterIndex]);

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
      <div className="w-[750px] flex items-center justify-between mb-4 max-lg:w-full ">
        <p className="max-lg:hidden">{`${filteredData.length} განცხადება`}</p>
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
      {displayCarsSliced}
      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        pageCount={pageCount}
        onPageChange={({ selected }) => setPageNumber(selected)}
        containerClassName="flex w-full justify-center mb-10"
        previousClassName="mr-2 text-[#FD4100] font-bold select-none text-xl"
        nextClassName="ml-2 text-[#FD4100] font-bold select-none text-xl"
        pageClassName="mx-1 select-none text-xl"
        activeClassName="text-[#FD4100] select-none"
        disabledClassName="text-gray-500"
        breakLabel="..."
      />
    </div>
  );
}
