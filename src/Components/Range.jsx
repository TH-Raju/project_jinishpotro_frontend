import { useState } from "react";

const Range = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      Count
      <div className="w-[20%] bg-gray-400 px-4 rounded-full py-3">
        <input
          type="range"
          min={0}
          max="100"
          value={count}
          className="range range-success"
          onChange={(e) => setCount(Number(e.target.value))}
        />
      </div>
      <p>{count}</p>
    </div>
  );
};

export default Range;
