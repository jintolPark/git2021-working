import { useRef, useState } from "react";
import Alert from "./base/Alert";

interface TodoState {
  id: number;
  memo: string | undefined;
  createTime: number;
  modifyTime?: number;
}

const getTimeString = (unixtime: number) => {
  const dateTime = new Date(unixtime);
  return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
};

const Todo = () => {

  const [todoList, setTodoList] = useState<TodoState[]>([
    { id: 2, memo: "Typescript", createTime: new Date().getTime() },
    { id: 1, memo: "React State 연습", createTime: new Date().getTime() },
  ]);

  const [isError, setIsError] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  const add = (e: React.KeyboardEvent<HTMLInputElement> | null) => {
    if (e) {
      if (e.code !== "Enter") return;
    }

    if (!inputRef.current?.value) {
      setIsError(true);
      return;
    }

    const todo: TodoState = {
      id: todoList.length > 0 ? todoList[0].id + 1 : 1,
      // optional chaning
      memo: inputRef.current?.value,
      createTime: new Date().getTime(),
    };

    setTodoList([todo, ...todoList]);

    formRef.current?.reset();
    setIsError(false);
  };

  const del = (id: number) => {
    setTodoList(todoList.filter((item) => item.id !== id));
  };


  const save = (id: number, index: number) => {
    console.log(ulRef.current);
    const input = ulRef.current?.querySelectorAll("input")[index];
    setTodoList(
      todoList.map((item) => {
        // 해당 id의 item의 값을 변경
        if (item.id === id) {
          item.memo = input?.value;
          item.modifyTime = new Date().getTime();
        }
        return item;
      })
    );
  };

  return (
    <>
      <form
        className="d-flex"
        ref={formRef}
        onSubmit={(e) => e.preventDefault()}
      >
        <textarea
          className="form-control mb-1 w-100"
          placeholder="Leave a post here"

        ></textarea>
        <input
          type="file"
          className="form-control me-1"
          accept="image/png, image/jpeg, video/mp4"
          onKeyPress={(e) => {
            add(e);
          }}
        />
        <button
          type="button"
          className="btn btn-primary text-nowrap"
          onClick={() => {
            add(null);
          }}
        >
          추가
        </button>
      </form>
      {isError && (
        <Alert
          message={"내용을 입력해주세요."}
          variant={"danger"}
          // 닫기 버튼을 클릭할 때 처리하는 함수를 넘김
          onClose={() => {
            setIsError(false);
          }}
        />
      )}
      <ul id="ul-list" className="list-group list-group-flush mt-3" ref={ulRef}>
        {todoList.length === 0 && (
          <li className="list-group-item">데이터가 없습니다.</li>
        )}
        {todoList.map((item, index) => (
          <li className="list-group-item d-flex" key={item.id}>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todo;
