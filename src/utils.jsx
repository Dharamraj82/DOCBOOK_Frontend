import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName={(msg) =>
          msg?.type === "success"
            ? "glass-toast bg-green-500/20 text-green-300 border border-green-300"
            : msg?.type === "error"
            ? "glass-toast bg-red-500/20 text-red-300 border border-red-400"
            : "glass-toast bg-white/10 text-white border border-white/20"
        }
        bodyClassName="text-sm font-medium"
      />
    </>
  );
}
