import { useContext, useState, useEffect } from "react";
import { TbEngine } from "react-icons/tb";
import { GiGearStick } from "react-icons/gi";
import { BsSpeedometer, BsCurrencyDollar } from "react-icons/bs";
import { GiSteeringWheel } from "react-icons/gi";
import { TbCurrencyLari } from "react-icons/tb";
import { ProductInfo } from "./Content";
import { SearchFiltersContext } from "./MainPage";
import { ManObject } from "./Manufacturer";
import { ModelType } from "./Model";

export default function ProductCard(carInfo: ProductInfo) {
  const { searchCurrency } = useContext(SearchFiltersContext);
  const [fetchedManufacturer, setFetchedManufacturer] = useState<ManObject[]>(
    []
  );
  const [fetchedModel, setFetchedModel] = useState<ModelType[]>([]);

  useEffect(() => {
    fetch("https://static.my.ge/myauto/js/mans.json")
      .then((res) => res.json())
      .then((res) => setFetchedManufacturer(res));

    fetch(`https://api2.myauto.ge/ka/getManModels?man_id=${carInfo.man_id}`)
      .then((res) => res.json())
      .then((res) => setFetchedModel(res.data));
  }, []);

  return (
    <>
      <div className="bg-white w-[750px] mb-3 rounded-[14px] h-[172px] flex">
        <div className="pt-1 pl-4">
          <img
            className="w-[182px] h-36 rounded-lg mt-[13px]"
            src={`https://static.my.ge/myauto/photos/${carInfo.photo}/thumbs/${carInfo.car_id}_1.jpg?v=${carInfo.photo_ver}`}
            alt="photo1"
          />
        </div>
        <div className="flex flex-col justify-center ml-4 pb-16 w-[400px]">
          <p className="mt-4 flex">
            <p className="mr-2">
              {fetchedManufacturer &&
                fetchedManufacturer.filter(
                  (car) => parseInt(car.man_id) == carInfo.man_id
                )[0]?.man_name}
            </p>
            <p className="mr-2">
              {fetchedModel &&
                fetchedModel.filter(
                  (car) => car.model_id === carInfo.model_id
                )[0]?.model_name}
            </p>
            <span className="text-[#8C929B]">{`${carInfo.prod_year} წ`}</span>
          </p>
          <div className="mt-2 w-[350px] h-[70px] relative">
            <div className="absolute top-0 left-0 flex items-center">
              <TbEngine color="#9CA2AA" size="1rem" />
              <p className="ml-2">{`${
                carInfo.engine_volume / 1000.0
              } დატ.ჰიბრიდი`}</p>
            </div>
            <div className="absolute bottom-0 left-0 flex items-center">
              <GiGearStick color="#9CA2AA" size="1rem" />
              <p className="ml-2">ავტომატიკა</p>
            </div>
            <div className="absolute top-0 right-0 flex items-center">
              <BsSpeedometer color="#9CA2AA" size="1rem" />
              <p className="ml-2">{`${carInfo.car_run_km}კმ`}</p>
            </div>
            <div className="absolute bottom-0 right-0 flex items-center">
              <GiSteeringWheel color="#9CA2AA" size="1rem" />
              <p className="ml-2">
                {carInfo.right_wheel ? "მარჯვენა" : "მარცხენა"}
              </p>
            </div>
            <div className="mt-24">
              <span className="text-[12px] text-view">
                {`${carInfo.views} ნახვა • 2 დღის წინ `}
              </span>
            </div>
          </div>
        </div>
        <div className="flex mt-10 items-start justify-end ml-8">
          <p className="font-medium text-xl">
            {searchCurrency === 0
              ? carInfo.price_usd
              : Math.floor(carInfo.price_usd * 2.65)}
          </p>
          <div className="ml-2 mt-1 bg-neutral-300 w-5 h-5 rounded-[12px] flex items-center justify-center">
            {searchCurrency === 0 ? (
              <BsCurrencyDollar size={"2rem"} />
            ) : (
              <TbCurrencyLari size={"2rem"} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
