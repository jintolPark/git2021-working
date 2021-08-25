

import { useRef, useState } from "react";
import Alert from "./base/Alert";
import produce from "immer";


const keyword = () => {
  const [keywords, setkeywords] = useState<String[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
    </>
  );
};
export default keyword;