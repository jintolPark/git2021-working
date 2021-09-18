import { useRef, useState } from "react";
// import { bori } from "../../common/data";
import { useDispatch, useSelector } from "react-redux"; // redux state 를 조회할수 있는 함수
import { AppDispatch, RootState } from "../../store";


import style from "./Profile.module.scss";
import { saveProfile } from "./profileSlice";
// import profileSlice from "./profileSlice";


const Profile = () => {
  
  const profile = useSelector((state: RootState) => state.profile);

  
  const dispatch = useDispatch<AppDispatch>();

  const [isShow, setIsShow] = useState(false); 
  const [isEdit, setIsEdit] = useState(false); 
  const [url, setUrl] = useState<string | undefined>(profile.image); // 이미지 url

  const inputRef = useRef<HTMLInputElement>(null);

  const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setUrl(reader.result?.toString());
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const action = saveProfile({
      image: url,
      username: inputRef.current?.value,
    });
    dispatch(action)

    setIsEdit(false);
  };

  return (
    <>
 
      <div className="dropdown me-5">
    
        <div
          style={{ cursor: "pointer" }}
          className="d-flex"
          onClick={() => {
            setIsShow(!isShow);
          }}
        >
      
          <div
            className={`${style.thumb} me-1`}
            style={{ backgroundImage: `url(${profile.image})` }}
          ></div>
          <span className={`${style.username} text-light`}>
            {profile.username}
          </span>
        </div>

        {isShow && (
          <div
            className="dropdown-menu d-flex flex-column align-items-center"
            style={{ right: "-30px" }}
          >
        
            {!isEdit && (
              <>
                <div
                  className={`${style["thumb-large"]}`}
                  style={{ backgroundImage: `url(${profile.image})` }}
                ></div>
                <p>{profile.username}</p>
              </>
            )}
            {isEdit && (
              <>
                <div
                  className={`${style["thumb-large"]}`}
                  style={{ backgroundImage: `url(${url})` }}
                ></div>
                <input
                  type="file"
                  className="form-control form-control-sm me-1"
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    changeImage(e);
                  }}
                />
                <input
                  type="text"
                  defaultValue={profile.username}
                  ref={inputRef}
                />
              </>
            )}

            <div className="d-flex">
              {!isEdit && (
                <>
                  <a
                    href="#!"
                    className="link-secondary fs-6 text-nowrap me-2"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsEdit(true);
                    }}
                  >
                    edit
                  </a>
                  <a
                    href="#!"
                    className="link-secondary fs-6 text-nowrap"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsShow(!isShow);
                    }}
                  >
                    close
                  </a>
                </>
              )}
              {isEdit && (
                <>
                  <a
                    href="#!"
                    className="link-secondary fs-6 text-nowrap me-2"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSave();
                    }}
                  >
                    save
                  </a>
                  <a
                    href="#!"
                    className="link-secondary fs-6 text-nowrap"
                    onClick={(e) => {
                      e.preventDefault();
                      setUrl(profile.image);
                      setIsEdit(false);
                    }}
                  >
                    cancel
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;