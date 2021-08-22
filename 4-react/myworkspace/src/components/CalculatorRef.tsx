// Calculator 컴포넌트

import { useRef, useState } from "react";


const Calculator = () => {
  const [result, setResult] = useState(0);
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const inputRef3 = useRef<HTMLInputElement>(null);
  const calculate = () => {
    const a = inputRef1.current?.value
    const b = inputRef2.current?.value
    const op = inputRef3.current?.value

    setResult(eval(`${a}${op}${b}`))
  }
  return (
    <div>
      <h2 >Claculator</h2>
      <input type="text" ref={inputRef1} placeholder="첫번째 숫자" />
      <input type="text" ref={inputRef2} placeholder="두번째 숫자" />
      <input type="text" ref={inputRef3} placeholder="(+, -, *, /)" />
      <button onClick={() => { calculate(); }} >Start</button>
      <div>{result}</div>
    </div >
  )
};


export default Calculator;