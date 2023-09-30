import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const handleClickMinus = () => {
    setCount((curCount) => curCount - 1);
  };

  const handleClickPlus = () => {
    setCount((curCount) => curCount + 1);
  };
  const date = new Date();
  date.setDate(date.getDate() + count);

  return (
    <>
      <button onClick={handleClickMinus}>-</button>
      <span>Count: {count}</span>
      <button onClick={handleClickPlus}>+</button>

      {count < 0 && (
        <p>{`${count * -1} days ago was ${date.toDateString()}`}</p>
      )}
      {count > 0 && (
        <p>{`In ${count} days it will be ${date.toDateString()}`}</p>
      )}
      {count === 0 && <p>{`Today is ${date.toDateString()}`}</p>}
    </>
  );
};

export default Counter;
