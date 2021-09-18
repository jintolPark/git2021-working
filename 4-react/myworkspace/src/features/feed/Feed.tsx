
import produce from "immer";
import { useRef, useState } from "react";

import FeedEditModal from "./FeedEditModal";
import { Prop } from "./type"
import { useSelector } from "react-redux";
import { RootState } from "../../store";
// import { bori } from "../../common/data/index"

import style from "./Feed.module.scss";
// import { bori } from "../../common/data";

// import { lorem, penguin, robot } from "../common/data";
// import { getTimeString } from "../common/lib/string";



const getTimeString = (unixtime: number) => {

  const day = 24 * 60 * 60 * 1000;

  const dateTime = new Date(unixtime);

  return unixtime - new Date().getTime() >= day
    ? dateTime.toLocaleDateString()
    : dateTime.toLocaleTimeString();
};

const Feed = () => {

  const profile = useSelector((state: RootState) => state.profile);
  const [feedList, setFeedList] = useState<Prop[]>([]);

  const [isEdit, setIsEdit] = useState(false)

  const textRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const add = (e: React.KeyboardEvent<HTMLInputElement> | null) => {
    if (e) {
      if (e.code !== "Enter") return;
    }

    if (fileRef.current?.files?.length) {
      const file = fileRef.current?.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        post(reader.result?.toString(), file.type);
      };
    } else {
      post(undefined, undefined);
    }
  };

  const post = (dataUrl: string | undefined, fileType: string | undefined) => {
    const feed: Prop = {
      id: feedList.length > 0 ? feedList[0].id + 1 : 1,
      // optional chaning
      image: profile.image,
      content: textRef.current?.value,
      dataUrl: dataUrl,
      username: profile.username,
      fileType: fileType,
      createTime: new Date().getTime(),
    };

    setFeedList([feed, ...feedList]);

    // 입력값 초기화
    formRef.current?.reset();
  };

  const del = (id: number, index: number) => {
    setFeedList(produce((state)=> {
      state.splice(index, 1);
    }));
  };

  const editItem = useRef<Prop>({id:0, content: "", image: profile.image ,username: profile.username ,createTime:0, dataUrl: "" });
const edit = (item: Prop)=> {
  editItem.current = item;
  setIsEdit(true)
};

const save = (editItem: Prop) => {
  console.log(editItem);
  setFeedList(
    produce((state) => {
      const item = state.find((item)=> item.id === editItem.id);
      if(item) {
        item.content = editItem.content;
        item.dataUrl = editItem.dataUrl;
        item.image = editItem.image;
        item.username = editItem.username;
      }
    })
  )
  setIsEdit(false)
};
  return (
    <div style={{width: "40vw"}} className="mx-auto">
      <h2 className="text-center my-5">FEED</h2>
      {isEdit && (
        <FeedEditModal 
        item={editItem.current}
        onClose={()=>{
          setIsEdit(false);
        }}
        onSave={(editItem) => {
          save(editItem);
        }}
        />
      )}
      <form
        className="mt-5"
        onSubmit={(e) => {
          e.preventDefault();
        }}
        ref={formRef}
      >
        <textarea
          className="form-control mb-1"
          placeholder="Leave a post here"
          ref={textRef}
          style={{ boxSizing: "border-box", height: "15vh" }}
        ></textarea>
        <div className="d-flex">
          <input
            type="file"
            className="form-control me-1"
            accept="image/png, image/jpeg, video/mp4"
            ref={fileRef}
          />
          <button
            className="btn btn-primary text-nowrap"
            type="button"
            onClick={() => {
              add(null);
            }}
          >
            입력
          </button>
        </div>
      </form>
      <div className="mt-3">
        {feedList.map((item, index) => (
          <div className="card mt-1" key={item.id}>
            <div className="d-flex card-header">
               <div className= {`${style.thumb} me-1 `}
               style={{ backgroundImage: `url(${item.image})` }}
               >
  </div>
  <span className={`${style.username}`}>{item.username}</span>
  </div>
            {item.fileType &&
              (item.fileType?.includes("image") ? (
                <img
                  src={item.dataUrl}
                  className="card-img-top"
                  alt={item.content}
                />
              ) : (
                <video className="card-img-top" controls>
                  <source src={item.dataUrl} type="video/mp4"></source>
                </video>
              ))}
            <div className="card-body">
              <p className="card-text">{item.content}</p>
              <div className="d-flex">
                <div className="w-100">
                  <span className="text-secondary">
                    {getTimeString(
                      item.modifyTime ? item.modifyTime : item.createTime
                    )}
                  </span>
                </div>
                <a
                  href="#!"
                  onClick={() => {
                    edit(item);
                  }}
                  className="link-secondary fs-6 text-nowrap"
                >
                 수정
                </a>
                <a
                  href="#!"
                  onClick={(e) => {
                    e.preventDefault();
                    del(item.id, index);
                  }}
                  className="link-secondary fs-6 text-nowrap ms-2"
                >
                  삭제
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;