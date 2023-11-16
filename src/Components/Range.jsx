/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { ContextData } from "../Context";

const Range = () => {
  const { count, setCount, maxCount, minCount } = useContext(ContextData);

  return (
    <div>
      <h1 className="font-bold ml-2 my-2">Price Range</h1>
      <div className="rounded-full py-3 border px-3">
        <input
          type="range"
          min={minCount}
          max={maxCount}
          value={count}
          className="range range-success"
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <h1>Price Range: {count}</h1>
      </div>
    </div>
  );
};

export default Range;
