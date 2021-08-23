import { useRef, useState } from "react";
import Alert from "./base/Alert";

interface FeedState {
  id: number;
  memo: string | undefined;
  createTime: number;
  modifyTime?: number;
}
const getTimeString = (unixtime: number) => {
  const dateTime = new Date(unixtime);
  return `${dateTime.toLocaleDateString()}${dateTime.toLocaleTimeString()}`
}


const Feed = () => {
  const [feedList, setFeedList] = useState<FeedState[]>([
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

    const feed: FeedState = {
      id: feedList.length > 0 ? feedList[0].id + 1 : 1,
      memo: inputRef.current?.value,
      createTime: new Date().getTime(),
    };

    setFeedList([feed, ...feedList]);

    formRef.current?.reset();
    setIsError(false);
  };

  const del = (id: number) => {
    setFeedList(feedList.filter((item) => item.id !== id));
  };


  const save = (id: number, index: number) => {
    console.log(ulRef.current);

    const input = ulRef.current?.querySelectorAll("input")[index];
    setFeedList(
      feedList.map((item) => {
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
        className="mt-5"
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <textarea
          className="form-control mb-1 w-100"
          placeholder="Leave a post here"

        ></textarea>
        <div className="d-flex">
          <input
            type="file"
            className="form-control me-1"
            accept="image/png, image/jpeg, video/mp4"
            onKeyPress={(e) => {
              add(e);
            }}
          />
          <button className="btn btn-primary text-nowrap" type="button"
            onClick={() => {
              add(null)
            }}>
            입력
          </button>
        </div>
      </form>
    </>
  );
};

export default Feed;