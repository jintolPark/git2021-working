// any타입
// 웬만하면 권장하지않음
// 동적타입이 필요할때만 사용

// 객체
const obj: any = {};
obj.name = "hong";
obj["phone"] = "01012345678"
delete obj.name;
console.log(obj);

// 배열
const arr: any[] = [];
arr.push({ name: "hong", phone: "01012345678" });
arr[0];
console.log(arr);

let var1: any;
var1 = "Hong"
var1 = 123;
console.log(var1)