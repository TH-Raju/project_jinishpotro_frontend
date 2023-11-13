import { useContext } from "react";
import { ContextData } from "../Context";

const Range = () => {
  const { count, setCount } = useContext(ContextData);

  return (
    <div>
      <h1 className="font-bold ml-2 my-2">Price Range</h1>
      <div className="rounded-full py-3 border px-3">
        <input
          type="range"
          min={0}
          max="100"
          value={count}
          className="range range-success"
          onChange={(e) => setCount(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default Range;
