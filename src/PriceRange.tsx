type Props = {
  currency: number;
  setCurrency: Function;
  minPrice: number;
  maxPrice: number;
  setMinPrice: Function;
  setMaxPrice: Function;
};

export default function PriceRange({
  currency,
  setCurrency,
  minPrice,
  maxPrice,
  setMaxPrice,
  setMinPrice,
}: Props) {
  return (
    <div className=" px-6 pt-4 pb-11 border-b">
      <div className="flex justify-between text-xs font-medium text-default mb-2">
        <span>ფასი</span>
        <div className="flex items-center justify-between w-10 mb-2">
          <div
            onClick={() => setCurrency(0)}
            className={`cursor-pointer w-5 h-5 flex items-center justify-center transition-all duration-75 ease-in ${
              currency === 0
                ? " rounded-full bg-[#272A37] text-white"
                : "text-[#8C929B]"
            }`}
          >
            $
          </div>
          <div
            onClick={() => setCurrency(1)}
            className={`cursor-pointer w-5 h-5 flex items-center justify-center transition-all duration-75 ease-in ${
              currency === 1
                ? " rounded-full bg-[#272A37] text-white"
                : "text-[#8C929B]"
            }`}
          >
            ₾
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full items-center">
        <div className="p-3 border-[1px]  relative rounded-lg flex content-between text-xs max-lg:w-1/2">
          <input
            type="number"
            className="focus:outline-none w-full"
            placeholder="დან"
            min={0}
            value={minPrice > -1 ? minPrice : undefined}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>
        <span className="mx-3 text-[#8C929B]">{"-"}</span>
        <div className="p-3 border-[1px] relative rounded-lg flex content-between text-xs max-lg:w-1/2">
          <input
            type="number"
            className="focus:outline-none w-full"
            placeholder="მდე"
            min={minPrice}
            value={maxPrice > -1 ? maxPrice : undefined}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
