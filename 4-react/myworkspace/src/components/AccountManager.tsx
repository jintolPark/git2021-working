// 계좌관리

import { useState } from "react";

// 버튼:입금버튼, 출금버튼
// 버튼클릭시에 입금금액 또는 출금금액을 입력받을수 있음.
// 목록: 입금, 출금액 목록을 ul > li 로 표시한다
// 입금 금액은 -> 입금:  금액 (녹색) 으로 표시
// 출금 금액은 -> 출금:  금액(빨간색)으로 표시

// 총액: 잔액을 입금, 출금 버튼 우측에 표시한다
const ListItem = ({ key, num }: { key: number, num: number }) => {
  const color = num < 0 ? "red" : "green";
  return <li key={key} style={{ color: color }}>{num}</li>
}
const AccountManager = () => {

  const [result, setResult] = useState<number[]>([]);
  const pluse = () => {
    const a = prompt("입금 금액을 입력하세요.")
  }
  const minuse = () => {
    const b = prompt("입금 금액을 입력하세요.")

  }
  // const num = 
  //   setResult([num, ...result])




  return (<div>
    <h2>Account Manager</h2>
    <button onClick={() => { }} >입금</button>
    <button onClick={() => { }}>출금</button>
    <a>총액:</a>
    <ul>
      <li></li>
    </ul>
  </div >

  )
};

export default AccountManager;