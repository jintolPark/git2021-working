import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { modifyContact } from "./contactSlice"

const ContactEdit = () => {
  const { id } = useParams<{ id: string }>();

  const contactItem = useSelector((state: RootState) =>
    state.contact.data.find((item) => item.id === +id)
  )

  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const nameInput = useRef<HTMLInputElement>(null)
  const phoneNumInput = useRef<HTMLInputElement>(null)
  const emailInput = useRef<HTMLInputElement>(null)
  const descText = useRef<HTMLTextAreaElement>(null)

  const handleSaveClick = () => {
    if (contactItem) {
      const item = { ...contactItem };
      item.name = nameInput.current ? nameInput.current.value : "";
      item.phoneNum = phoneNumInput.current ? phoneNumInput.current.value : "";
      item.email = emailInput.current ? emailInput.current.value : "";
      item.description = descText.current ? descText.current.value : "";

      dispatch(modifyContact(item));
      history.push("/contacts")
    };
  }


  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center">ContactEdit</h2>
      <form>
        <table className="table text-nowrap">
          <tbody>
            <tr>
              <th>입력</th>
              <td>
                <input
                  className="form-control"
                  type="text"
                  ref={nameInput}
                  defaultValue={contactItem?.name} />
              </td>
              <td>
                <input
                  className="form-control"
                  type="text"
                  ref={phoneNumInput}
                  defaultValue={contactItem?.phoneNum} />
              </td>
              <td>
                <input
                  className="form-control"
                  type="text"
                  ref={emailInput}
                  defaultValue={contactItem?.email} />
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <textarea className="form-control mt-2 mb-3"
            style={{ height: "40vh" }}
            ref={descText}
            defaultValue={contactItem?.description}
          />
        </div>
      </form>
      <div>
        <button
          className="btn btn-secondary float-start"
          onClick={() => {
            history.push("/contacts");
          }}
        >
          <i className="bi bi-grid-3x3-gap me-1"></i>
          목록
        </button>
        <button
          className="btn btn-primary float-end"
          onClick={() => {
            handleSaveClick();
          }}
        >
          <i className="bi bi-check" />
          저장
        </button>
      </div>
    </div>
  )
}

export default ContactEdit;