//  Counter컴포넌트

import { useState } from "react";

// state(상태)
const Counter = () => {


  const [count, setCount] = useState(0);

  const increase = () => {
    // state변경함수(변경한값)
    setCount(count + 1);
  };

  return (
    <div>
      <h2>Counter</h2>
      <div>
        {/* button에 addEventListner("clck", ()=>{}) 같음 */}
        <button onClick={() => {
          increase();
        }}
        >
          COUNT</button>
        <span>{count}</span>
      </div>
    </div>
  );
};

export default Counter;