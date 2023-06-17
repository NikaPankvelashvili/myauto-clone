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

  const calcualteDaysOld = (): string => {
    const difference = Math.abs(
      new Date().getTime() - new Date(carInfo.order_date).getTime()
    );
    if (difference / (1000 * 60) < 60)
      return `${Math.ceil(difference / (1000 * 60))} წუთის წინ`;
    if (difference / (1000 * 60 * 60) < 24)
      return `${Math.ceil(difference / (1000 * 60 * 60))} საათის წინ`;
    return `${Math.ceil(difference / (1000 * 60 * 60 * 24))} დღის წინ`;
  };

  useEffect(() => {
    fetch("https://static.my.ge/myauto/js/mans.json")
      .then((res) => res.json())
      .then((res) => setFetchedManufacturer(res));

    fetch(`https://api2.myauto.ge/ka/getManModels?man_id=${carInfo.man_id}`)
      .then((res) => res.json())
      .then((res) => setFetchedModel(res.data));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="bg-white w-[750px] h-[175px] mb-3 rounded-[14px]  flex items-center">
        <div className="pt-1 pl-4">
          <img
            className="w-[182px] h-36 rounded-lg "
            src={`https://static.my.ge/myauto/photos/${carInfo.photo}/thumbs/${carInfo.car_id}_1.jpg?v=${carInfo.photo_ver}`}
            alt="photo1"
          />
        </div>
        <div className="ml-4 ">
          <div className="mb-[26px]">
            <p className="flex  ">
              <p className="mr-2 text-[#272A37] font-bold">
                {fetchedManufacturer &&
                  fetchedManufacturer.filter(
                    (car) => parseInt(car.man_id) === carInfo.man_id
                  )[0]?.man_name}
              </p>
              <p className="mr-2 text-[#272A37] font-bold">
                {fetchedModel &&
                  fetchedModel.filter(
                    (car) => car.model_id === carInfo.model_id
                  )[0]?.model_name}
              </p>
              <span className="text-[#8C929B] font-medium">{`${carInfo.prod_year} წ`}</span>
            </p>
          </div>
          <div className="mt-2 flex justify-center items-center mb-3">
            <div className="mr-12">
              <div className=" flex items-center mb-4">
                <TbEngine color="#9CA2AA" size="18px" />
                <p className="ml-2 w-[155px] text-[#1B1D25] font-medium text-xs">{`${
                  carInfo.engine_volume / 1000.0
                } დატ.ჰიბრიდი`}</p>
              </div>
              <div className="flex items-center">
                <GiGearStick color="#9CA2AA" size="18px" />
                <p className="ml-2 w-[155px] text-[#1B1D25] font-medium text-xs">
                  ავტომატიკა
                </p>
              </div>
            </div>
            <div className="">
              <div className="flex items-center mb-4">
                <BsSpeedometer color="#9CA2AA" size="18px" />
                <p className="ml-2 w-[155px] text-[#1B1D25] font-medium text-xs">{`${carInfo.car_run_km}კმ`}</p>
              </div>
              <div className="flex items-center">
                <GiSteeringWheel color="#9CA2AA" size="18px" />
                <p className="ml-2 w-[155px] text-[#1B1D25] font-medium text-xs">
                  {carInfo.right_wheel ? "მარჯვენა" : "მარცხენა"}
                </p>
              </div>
            </div>
            <div className=" flex items-center ">
              <p className="font-medium text-xl">
                {searchCurrency === 0
                  ? Math.round(carInfo.price_usd)
                  : Math.round(carInfo.price_usd * 2.65)}
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
          <div className="">
            <span className="text-[12px] text-[#6F7383]  text-view">
              {`${carInfo.views} ნახვა • ${calcualteDaysOld()}`}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
