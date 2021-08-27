import { useRef, useState } from "react";

const Hello = () => {

  const [userName, setUserName] = useState<string | undefined>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const hello = () => {
    // console.log(inputRef.current);
    // console.log(inputRef.current?.value);

    setUserName(inputRef.current?.value);
    inputRef.current && (inputRef.current.value = "");

  }

  return (
    <div>
      <h2>Hello</h2>
      <input type="text" ref={inputRef} />
      <button onClick={() => {
        hello();
      }}>인사</button>
      <div>
        안녕하세요, {userName}님!
      </div>
    </div>
  )
}

export default Hello;