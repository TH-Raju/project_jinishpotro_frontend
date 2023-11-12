import { useState } from "react";
import Modal1 from "../Modal1";
const CallModal = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(!show)} className="btn btn-primary btn-sm">
        Edit
      </button>
      {show && <Modal1 setShow={setShow} show={show} />}
    </div>
  );
};

export default CallModal;
