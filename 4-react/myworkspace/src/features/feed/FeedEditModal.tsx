
import { useRef, useState } from "react";
import { Prop } from "./type"
import style from "./Feed.module.scss";

interface ModalProp {
  item: Prop;
  onClose: ()=> void;
  onSave: (editItem: Prop)=> void
}

const FeedEditModal = ({item, onClose, onSave }: ModalProp) => {

  const inputRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [url, setUrl] = useState(item.dataUrl)

  const change = () => {
  if (inputRef.current?.files?.length) {
    const file = inputRef.current?.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const baseUrl = reader.result?.toString();
      setUrl(baseUrl);
    };
  };
};
  const save =(Url: string | undefined) =>{
    const feed: Prop ={
      id: item.id,
      content: textRef.current?.value, // 수정된 입력값
      image: item.image,
      username: item.username,
      dataUrl: Url,
      createTime: item.createTime,
    }
    onSave(feed)
  }
  return (
    <>
      <div className="modal d-block"
        style={{ backgroundColor: "rgb(0, 0, 0, 0.5)" }}
        onClick={() => {
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content" onClick={(e)=> e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title">EDIT FEED</h5>
              <button type="button" 
              className="btn-close" 
              data-bs-dismiss="modal" 
              aria-label="Close"
              onClick={()=>{
                onClose();
              }}
              ></button>
            </div>
            <div className="modal-body" key={item.id}>
            <div className="d-flex">
               <div className= {`card-header ${style.thumb} me-1 `}
               style={{ backgroundImage: `url(${item.image})` }}>
  </div>
  <span>{item.username}</span>
  </div>
            {item.fileType &&
              (item.fileType?.includes("image") ? (
                <img
                  src={url}
                  className="card-img-top"
                  alt={item.content}
                />
              ) : (
                <video className="card-img-top" controls>
                  <source src={url} type="video/mp4"></source>
                </video>
              ))}
            <textarea
          className="form-control mb-1"
          placeholder="Leave a post here"
          style={{ boxSizing: "border-box", height: "15vh" }}
          
          ref={textRef}
        />
              <input 
              type="file"
              className="form-control me-1"
              accept="image/png, image/jpeg, video/mp4"
              onChange = {(e) => {
                e.preventDefault();
                change();
              }}
              ref={inputRef}
              />
            </div>
            <div className="modal-footer">
              <button type="button" 
              className="btn btn-secondary" 
              data-bs-dismiss="modal" 
              onClick={()=>{
                onClose();
              }}
              >닫기</button>
              <button type="button" 
              className="btn btn-primary"
              onClick={()=>{
                save(url);
              }}
              >저장</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};




export default FeedEditModal;