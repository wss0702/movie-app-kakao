import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const useToast = () => {
  const defaultOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  }
  const showToast = {
    success: (message) => {
      toast.success(message, defaultOptions)
    },
    error: (message) => {
      toast.error(message, defaultOptions)
    },
    warning: (message) => {
      toast.warning(message, defaultOptions)
    },
    info: (message) => {
      toast.info(message, defaultOptions)
    }
  }

  return showToast
}