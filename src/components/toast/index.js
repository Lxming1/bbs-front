import { ToastContainer, Zoom } from 'react-toastify'
export const ToastEl = () => {
  return (
    <ToastContainer
      limit={3}
      position="top-center"
      autoClose={500}
      hideProgressBar
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      closeButton={false}
      pauseOnHover={false}
      transition={Zoom}
    />
  )
}
