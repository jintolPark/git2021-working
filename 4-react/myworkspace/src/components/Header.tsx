// 컴포넌트 정의
// 리액트 컴포넌트 = JSX를 반환하는 함수
// <></>: fragment(조각)
// 어떤 태그형식으로 변환하지 않음, 빈 태그

// 컴포넌트 속성으로 color, title을 받을 것임
// 컴포넌트의 속성 (prop): 함수의 매개변수처럼 외부에서 넘겨받는 변수
interface HeaderProp {
  // color: string
  // union type: 값의 집합
  color: "green" | "red" | "blue";
  title: string;
};

// const 함수명 : React.FC<속성타입>= ({속성1, 속성2}) => {
// ...
// }
const Header: React.FC<HeaderProp> = ({ color, title }) => {
  return <h1 style={{ color: color }}>{title}</h1>;
  // return <><><div></div>  // 여러개의 부모 엘리먼트를 반환하지 못함
};

export default Header;