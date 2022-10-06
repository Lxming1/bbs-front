import { ToastContainer, Zoom } from 'react-toastify'
export const ToastEl = () => {
  return (
    <ToastContainer
      limit={3}
      position="top-center"
      autoClose={1000}
      hideProgressBar
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      transition={Zoom}
    />
  )
}
