import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Sucessnotify = (data) => {
  toast.success(`${data}`, {
    autoClose: 3000,
    position: toast.POSITION.TOP_CENTER,
  });
};

export const Failednotify = (data) => {
  toast.error(`${data}`, {
    autoClose: 3000,
    position: toast.POSITION.TOP_CENTER,
  });
};


