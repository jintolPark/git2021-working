
import { useRef, useState } from "react";
import produce from "immer";

interface FeedState {
  id: number;
  memo: string | undefined;
  dataUrl: string | undefined;
  createTime: number;
}
const getTimeString = (unixtime: number) => {
  const dateTime = new Date(unixtime);
  return `${dateTime.toLocaleDateString()}${dateTime.toLocaleTimeString()}`
}
const Feed = () => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [feedList, setFeedList] = useState<FeedState[]>([
    {
      id: 1,
      memo: "React",
      dataUrl: "image",
      createTime: new Date().getTime(),
    }]);


  const reader = new FileReader();
  const add = () => {
    const memo = textRef.current?.value;
    let file: File
    if (inputRef.current?.files?.length) {
      file = inputRef.current.files[0]
      reader.readAsDataURL(file);
    }

    reader.onload = () => {
      const dataUrl = reader.result?.toString();
      const feed: FeedState = {
        id: feedList.length > 0 ? feedList[0].id + 1 : 1,
        memo: memo,
        dataUrl: dataUrl,
        createTime: new Date().getTime(),
      };

      setFeedList(
        produce((state) => {
          state.unshift(feed);
        })
      );
    }
    formRef.current?.reset();
  }
  const del = (id: number, index: number) => {
    console.log(id);
    setFeedList(
      produce((state) => {
        state.splice(index, 1);
      })
    )
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
          style={{ boxSizing: "border-box", height: "15vh" }}
          ref={textRef}
        ></textarea>
        <div className="d-flex">
          <input
            type="file"
            className="form-control me-1"
            accept="image/png, image/jpeg, video/mp4"
            ref={inputRef}
          />
          <button className="btn btn-primary text-nowrap" type="button"
            onClick={() => {
              add()
            }}>
            입력
          </button>
        </div>
      </form>

      <div className="card" >
        {feedList.map((item, index) => (
          <div key={item.id} className="card-body">
            <img src={item.dataUrl} className="card-img-top" alt="..." />
            <h5 className="card-title">Card title</h5>
            <p className="card-text">{item.memo}</p>
            <span style={{ fontSize: "0.75rem" }}>
              - {getTimeString(item.createTime)}
            </span>
            <a href="#!" className="link-secondary d-flex justify-content-end" onClick={() => {
              del(item.id, index);
            }}
            >삭제</a>

          </div>
        ))}
      </div>
    </>
  );
};

export default Feed;