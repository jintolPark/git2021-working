import produce from "immer";
import React, { useRef, useState } from "react";
import Alert from "../../components/alert/Alert"

interface ContactState {
  id: number;
  name: string | undefined;
  phoneNum: string | undefined;
  email: string | undefined;
  isEdit?: boolean;
}

const Contact = () => {
  const [contactList, setContactList] = useState<ContactState[]>([])

  const [isError, setIsError] = useState(false);

  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const inputRef3 = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const tableRef1 = useRef<HTMLTableElement>(null);
  const tableRef2 = useRef<HTMLTableElement>(null);
  const tableRef3 = useRef<HTMLTableElement>(null);

  const add = (e: React.KeyboardEvent<HTMLInputElement> | null) => {
    if (e) {
      if (e.code !== "Enter") return;
    }
    if (!inputRef1.current?.value && !inputRef2.current?.value && !inputRef3.current?.value) {
      setIsError(true);
      return;
    }
    const contact: ContactState = {
      id: contactList.length > 0 ? contactList[0].id + 1 : 1,
      name: inputRef1.current?.value,
      phoneNum: inputRef2.current?.value,
      email: inputRef3.current?.value
    }

    setContactList(
      produce((state) => {
        state.unshift(contact)
      })
    )
    formRef.current?.reset();
    setIsError(false);
  };

  const del = (id: number, index: number) => {
    setContactList(
      produce((state) => {
        state.splice(index, 1);
      })
    );
  };

  const edit = (id: number, mod: boolean) => {
    setContactList(
      produce((state) => {
        const item = state.find((item) => item.id === id);
        if (item) {
          item.isEdit = mod;
        }
      })
    );
  };

  const save = (id: number, index: number) => {
    const input1 = tableRef1.current?.querySelectorAll("input")[index];
    const input2 = tableRef2.current?.querySelectorAll("input")[index];
    const input3 = tableRef3.current?.querySelectorAll("input")[index];

    setContactList(
      produce((state) => {
        const item = state.find((item) => item.id === id);
        if (item) {
          item.name = input1?.value;
          item.phoneNum = input2?.value;
          item.email = input3?.value;
          item.isEdit = false;
        }
      })
    );
  };
  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center my-5">?????????</h2>
      <form
        className="d-flex"
        ref={formRef}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          className="form-control me-2"
          placeholder="??????"
          ref={inputRef1}
          onKeyPress={(e) => {
            add(e);
          }}
        />
        <input
          type="text"
          className="form-control me-2"
          placeholder="????????????"
          ref={inputRef2}
          onKeyPress={(e) => {
            add(e);
          }}
        />
        <input
          type="text"
          className="form-control me-2"
          placeholder="?????????"
          ref={inputRef3}
          onKeyPress={(e) => {
            add(e);
          }}
        />
        <button
          type="button"
          className="btn btn-primary text-nowrap"
          onClick={() => {
            add(null);
          }}
        >
          ??????
        </button>
      </form>
      {isError && (
        <Alert
          message={"????????? ??????????????????."}
          variant={"danger"}
          // ?????? ????????? ????????? ??? ???????????? ????????? ??????
          onClose={() => {
            setIsError(false);
          }}
        />
      )}
      <form>
        <table className="table table-striped mt3 w-100">
          <thead className="justify-content-between">
            <tr>
              <th scope="col">#</th>
              <th scope="col">??????</th>
              <th scope="col">????????????</th>
              <th scope="col">?????????</th>
              <th scope="col">??????</th>
            </tr>
          </thead>
          <tbody className="w-100">
            {contactList.map((item, index) =>

              <tr key={item.id}>
                <td scope="row">{item.id}</td>
                <td>
                  {!item.isEdit && <td>{item.name}</td>}
                  {item.isEdit && (
                    <input type="text" className="w-100" defaultValue={item.name} />
                  )}</td>
                <td>
                  {!item.isEdit && <td>{item.phoneNum}</td>}
                  {item.isEdit && (
                    <input type="text" className="w-100" defaultValue={item.phoneNum} />
                  )} </td>
                <td>
                  {!item.isEdit && <td>{item.email}</td>}
                  {item.isEdit && (
                    <input type="text" className="w-100" defaultValue={item.email} />
                  )}</td>
                <td className="text-center">
                  {!item.isEdit && (
                    <button
                      className="btn btn-outline-secondary btn-sm text-nowrap"
                      onClick={() => {
                        edit(item.id, true);
                      }}
                    >
                      ??????
                    </button>
                  )}
                  {!item.isEdit && (
                    <button onClick={(e) => {
                      e.preventDefault();
                      del(item.id, index);
                    }}
                      className="btn btn-outline-secondary btn-sm text-nowrap"
                    >
                      ??????
                    </button>
                  )}
                </td>
                {item.isEdit && (
                  <button
                    className="btn btn-outline-secondary btn-sm text-nowrap"
                    onClick={() => {
                      save(item.id, index);
                    }}
                  >
                    ??????
                  </button>
                )}
                {item.isEdit && (
                  <button
                    className="btn btn-outline-secondary btn-sm text-nowrap"
                    onClick={() => {
                      edit(item.id, false);
                    }}
                  >
                    ??????
                  </button>
                )}

              </tr>
            )}
          </tbody>
        </table>
      </form>
    </div>
  )

}

export default Contact;