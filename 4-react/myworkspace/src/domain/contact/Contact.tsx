
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../../store";

const Contact = () => {
  const contact = useSelector((state: RootState) => state.contact)
  const history = useHistory();


  return (
    <div style={{ width: "50vw" }} className="mx-auto">
      <h2 className="text-center my-5">연락처</h2>
      <div className="d-flex justify-content-end mb-2">
        <button
          className="btn btn-primary text-nowrap"
          onClick={() => {
            history.push("/contact/create");
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
                <th scope="row">{item.id}</th>
                <th scope="row">{item.contact1}</th>
                <th scope="row">{item.contact2}</th>
                <th scope="row">{item.contact3}</th>
                <th scope="row">{item.createdTime}</th>
              </tr>
            )}
          </tbody>
        </table>
      </form>

      <div>

      </div>
    </div>

  )

};

export default Contact;