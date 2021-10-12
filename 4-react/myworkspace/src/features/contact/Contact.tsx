
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { requestFetchContact, requestFetchContactNext } from "./contactSaga";

const getTimeString = (unixtime: number) => {

  const day = 24 * 60 * 60 * 1000;

  const dateTime = new Date(unixtime);

  return unixtime - new Date().getTime() >= day
    ? dateTime.toLocaleDateString()
    : dateTime.toLocaleTimeString();
};

const Contact = () => {
  const contact = useSelector((state: RootState) => state.contact)
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!contact.isFetched) {
      dispatch(requestFetchContactNext({
        page: 0,
        size: contact.pageSize,
      }));
    }
  }, [dispatch, contact.isFetched, contact.pageSize]);


  return (
    <div style={{ width: "50vw" }} className="mx-auto">
      <h2 className="text-center my-5">연락처</h2>
      <div className="d-flex justify-content-end mb-2">
        <button
          className="btn btn-secondary me-2"
          onClick={() => {
            dispatch(requestFetchContact());
          }}
        >
          <i className="bi bi-arrow-clockwise">새로고침</i>
        </button>
        <button
          className="btn btn-primary text-nowrap"
          onClick={() => {
            history.push("/contacts/create");
          }}
        >
          <i className="bi bi-plus" />
          추가
        </button>
      </div>
      <form >
        <table className="table table-striped mt3 w-100">
          <thead className="justify-content-between">
            <tr>
              <th scope="col">#</th>
              <th scope="col">이름</th>
              <th scope="col">전화번호</th>
              <th scope="col">이메일</th>
              <th scope="col">작성시간</th>
            </tr>
          </thead>
          <tbody className="w-100" >
            {contact.data.map((item) =>
              <tr key={item.id}>
                <th
                  scope="row"
                >{item.id}</th>
                <th
                  scope="row"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    history.push(`/contacts/detail/${item.id}`);
                  }}
                >{item.name}</th>
                <th
                  scope="row"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    history.push(`/contacts/detail/${item.id}`);
                  }}
                >{item.phoneNum}</th>
                <th
                  scope="row"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    history.push(`/contacts/detail/${item.id}`);
                  }}
                >{item.email}</th>
                <th scope="row" className="text-secondary">{getTimeString(
                  item.modifyTime ? item.modifyTime : item.createdTime
                )}</th>
              </tr>
            )}
          </tbody>
        </table>
      </form>
{!contact.isLast && (
      <div className="d-flex justify-content-center mt-4">
<a 
href="#!"
onClick={(e)=>{
  e.preventDefault();
  dispatch(
    requestFetchContactNext({
      page: contact.page + 1,
      size: contact.pageSize,
    })
  )
}}
className="link-secondary fs-6 text-nowrap"
>더보기
</a>
      </div>
)}

    </div>

  )

};

export default Contact;