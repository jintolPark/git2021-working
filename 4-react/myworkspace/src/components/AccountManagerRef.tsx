// 계좌관리

import { useRef, useState } from "react";

// 버튼:입금버튼, 출금버튼
// 버튼클릭시에 입금금액 또는 출금금액을 입력받을수 있음.
// 목록: 입금, 출금액 목록을 ul > li 로 표시한다
// 입금 금액은 -> 입금:  금액 (녹색) 으로 표시
// 출금 금액은 -> 출금:  금액(빨간색)으로 표시

// 총액: 잔액을 입금, 출금 버튼 우측에 표시한다
const ListItem = ({ money }: { money: number }) => {
  const color = money < 0 ? "red" : "green";
  return <li style={{ color: color }}>{money}</li>
}
const AccountManager = () => {

  const [result, setResult] = useState<number[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const trnsact = (mod: "deposit" | "withdraw") => {
    const msg = mod === "deposit" ? "입금 금액" : "출금 금액";
    const input = inputRef.current?.value

    let money = 0;
    if (input) {
      money = mod === "deposit" ? +input : -input;
    }

    if (mod === "deposit") {
      setResult([money, ...result]);
    } else {
      if (check(result, money)) {
        setResult([money, ...result]);
      } else {
        alert("잔액이 부족합니다.")
      }
    }
  };

  const check = (result: number[], money: number) => {
    let sum = 0;
    if (result.length > 0) {
      sum = result.reduce((acc, log) => acc + log);
    }

    // 잔액 + (-출금액) >= 0 : true
    // 잔액 + (-출금액) < 0 : false
    return sum + money >= 0;
  };




  return (<div>
    <h2>Account Manager</h2>
    <input type="text" ref={inputRef} />
    <button onClick={() => { trnsact("deposit"); }} >입금</button>
    <button onClick={() => { trnsact("withdraw"); }}>출금</button>
    {result.length > 0 &&
      <span>잔액:{result.reduce((acc, log) => acc + log)}</span>}

    <ul>{result.map((money, index) => (
      <ListItem key={index} money={money} />
    ))}
    </ul>
  </div >

  )
};

export default AccountManager;