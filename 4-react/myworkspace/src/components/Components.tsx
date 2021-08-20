import Button from "../components/Button";
import Header from "../components/Header";


const Components = () => {
  return (
    <div>    {/* 속성값을 변경하여 재사용하는 컴포넌트 */}
      {/* Component의 속성(prop)을 넘김 */}
      {/* 속성명={속성값} */}
      <Header color={"red"} title={"React"} />
      <Header color={"green"} title={"Typescript"} />
      <Header color={"blue"} title={"Function Component"} />

      <Button variant={"primary"} text={"Add"} />
      <Button variant={"secondary"} text={"Delete"} />
      <Button variant={"warning"} text={"Done"} />
      {/* <Button color={"white"} backgroundColor={"blue"} text={"Delete"} />
      <Button color={"white"} backgroundColor={"green"} text={"Function"} /> */}
    </div>
  )


}

export default Components;