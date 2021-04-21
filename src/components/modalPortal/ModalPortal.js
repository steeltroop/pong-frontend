import { useEffect } from "react";
import ReactDOM from "react-dom";

const Modal = ({ children }) => {
  const modalRoot = document.getElementById("modal-root");
  const el = document.createElement("div");

  useEffect(() => {
    modalRoot.appendChild(el);

    return () => modalRoot.removeChild(el);
  }, []);

  return ReactDOM.createPortal(children, modalRoot)
};

export default Modal;
