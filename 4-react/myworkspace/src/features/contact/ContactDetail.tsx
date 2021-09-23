import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { removeContact } from "./contactSlice";


const ContactDetail = () => {

  const { id } = useParams<{ id: string }>();
  console.log(id);

  const contactItem = useSelector((state: RootState) =>
    state.contact.data.find((item) => item.id === +id)
  );
  console.log(contactItem);
  const isRemoveCompleted = useSelector((state: RootState) =>
    state.contact.isRemoveCompleted
  )

  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    isRemoveCompleted && history.push("/contacts");
  }, [isRemoveCompleted, history])

  const handDeleteClick = () => {
    dispatch(removeContact(+id));
    history.push("/contacts")
  }
  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center">ContactDetail</h2>
      <form>
        <table className="table text-nowrap">
          <tbody>
            <tr>
              <th>입력</th>
              <td>
                {contactItem?.name}
              </td>
              <td>
                {contactItem?.phoneNum}
              </td>
              <td>
                {contactItem?.email}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mb-5">
          {contactItem?.description}
        </div>
      </form>
      <div className="d-flex">
        <div style={{ width: "50%" }}>
          <button
            className="btn btn-secondary float-start"
            onClick={() => {
              history.push("/contacts");
            }}
          >
            <i className="bi bi-grid-3x3-gap me-1"></i>
            목록
          </button>
        </div>
        <div style={{ width: "100%" }}
          className="d-flex justify-content-end"
        >
          <button
            className="btn btn-primary me-1"
            onClick={() => {
              history.push(`/contacts/edit/${id}`)
            }}>
            <i className="bi bi-pencil me-1" />
            수정
          </button>
          <button
            className="btn btn-primary me-1"
            onClick={() => {
              handDeleteClick();
            }}
          >
            <i className="bi bi-trash me-1" />
            삭제
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContactDetail;