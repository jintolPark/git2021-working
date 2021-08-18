// generic: 제너릭, 제네릭, 쥐네릭
// 타입 매개변수
// 다양한 타입에 따라서 실행 처리를 다르게하기 위함

function identity<Type>(arg: Type): Type {
  // 타입에 따라서 내부 코드를 분기함
  // ex) number면 숫자를 덧셈함
  // ex) string이면 문자열을 덧셈함
  return arg;
}

let output1 = identity<string>("Typesctipt");
let output2 = identity<number>(1);
