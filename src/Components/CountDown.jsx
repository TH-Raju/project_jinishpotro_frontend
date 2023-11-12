import { useEffect, useState } from "react";

const CountDown = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let val = 0;
    const interval = setInterval(() => {
      if (val <= 100) {
        setValue(val);
        val += 10;
      } else if (val == 100) {
        val === 0;
      } else {
        clearInterval(interval);
      }
    }, 1000);

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []);
  return <div>{value}</div>;
};

export default CountDown;
