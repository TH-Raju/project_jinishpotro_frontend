/* eslint-disable react/prop-types */
const Modal1 = ({ setShow }) => {
  // const{setShow}=props;
  return (
    <div className="w-[80%] h-[80vh] left-[50%] z-[999] -translate-x-[50%] bg-gray-400 fixed">
      <div className="text-right p-3">
        <button className="btn" onClick={() => setShow(false)}>
          X
        </button>
      </div>
      <div className="text-center">modal</div>
    </div>
  );
};

export default Modal1;
