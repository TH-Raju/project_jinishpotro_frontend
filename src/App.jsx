import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./Routes";
import { useContext } from "react";
import { ContextData } from "./Context";
import { Toaster } from "react-hot-toast";
import "react-photo-view/dist/react-photo-view.css";

function App() {
  const { theme } = useContext(ContextData);
  return (
    <div
      className={` min-h-screen  pb-28 lg:pb-0  ${
        theme ? "text-black " : "text-white bg-gray-900"
      }`}
    >
      <Toaster />
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
