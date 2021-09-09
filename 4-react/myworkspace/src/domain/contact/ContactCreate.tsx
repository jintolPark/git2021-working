import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { AppDispatch, RootState } from "../../store";
import { addContact, ContactItem } from "./ContactSlice";


const ContactCreate = () => {
  const nameInput = useRef<HTMLInputElement>(null)
  const phoneNumInput = useRef<HTMLInputElement>(null)
  const emailInput = useRef<HTMLInputElement>(null)
  const descText = useRef<HTMLTextAreaElement>(null)

  const ContactData = useSelector((state: RootState) => state.contact.data);
  // const profile = useSelector((state: RootState) => state.profile);

  const dispatch = useDispatch<AppDispatch>();

  const history = useHistory();

  const handleAddClick = () => {
    console.log(nameInput.current?.value);
    console.log(phoneNumInput.current?.value);
    console.log(emailInput.current?.value);
    console.log(descText.current?.value);
    const item: ContactItem = {
      id: ContactData.length ? ContactData[0].id + 1 : 1,
      contact1: nameInput.current ? nameInput.current.value : "",
      contact2: phoneNumInput.current ? phoneNumInput.current.value : "",
      contact3: emailInput.current ? emailInput.current.value : "",
      description: descText.current ? descText.current.value : "",
      createdTime: new Date().getTime(),
    };
    console.log(item)

    dispatch(addContact(item));

    history.push("/contact");
  }
  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center">ContactCreate</h2>
      <form>
        <table className="table text-nowrap">
          <tbody>
            <tr>
              <th>입력</th>
              <td>
                <input className="form-control" type="text" ref={nameInput} placeholder="이름" />
              </td>
              <td>
                <input className="form-control" type="text" ref={phoneNumInput} placeholder="전화번호" />
              </td>
              <td>
                <input className="form-control" type="text" ref={emailInput} placeholder="이메일" />
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <textarea className="form-control mt-2 mb-3"
            style={{ height: "40vh" }}
            ref={descText}
            placeholder="메모"
          />
        </div>
      </form>
      <div>
        <button
          className="btn btn-secondary float-start"
          onClick={() => {
            history.push("/contact");
          }}
        >
          <i className="bi bi-grid-3x3-gap me-1"></i>
          목록
        </button>
        <button
          className="btn btn-primary float-end"
          onClick={() => {
            handleAddClick();
          }}
        >
          <i className="bi bi-check" />
          저장
        </button>
      </div>
    </div>

  )
}

export default ContactCreate;