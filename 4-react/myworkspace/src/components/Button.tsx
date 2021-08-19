//  Button 컴포넌트 생성
// <button ... JSX엘리먼트 반환하는 컴포넌트
// 속성:
// color:글자색 ("white", "black")
// backgroundColor: 배경색 ("red", "green", "blue")
// text: 버튼의 텍스트(대문자로 표시)
import React from "react"

interface ButtonProp {
  // color: "white" | "black";
  // backgroundColor: "red" | "green" | "blue";
  variant: "primary" | "secondary" | "warning";
  text: string;
}


const Button: React.FC<ButtonProp> = ({ variant, text }) => {

  let bgColor
  let color
  switch (variant) {
    case "primary":
      bgColor = "blue";
      color = "white";
      break;
    case "secondary":
      bgColor = "red";
      color = "black";
      break;
    case "warning":
      bgColor = "green";
      color = "white";
      break;
  };

  return <button style={{ color: variant, backgroundColor: variant == "primary" ? "blue" : "gray" }} >
    {text.toUpperCase()}</button>
}





export default Button;