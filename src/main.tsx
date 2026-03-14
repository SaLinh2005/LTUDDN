import { createRoot } from "react-dom/client"; // 👈 Sửa thành react-dom/client
import App from "./app/App.tsx";
import "./styles/index.css";
// 👈 Đã xóa dòng import BrowserRouter đi cho khỏi lỗi

createRoot(document.getElementById("root")!).render(
  <App /> // 👈 Trả lại thẻ App trần trụi, vì App.tsx đã có RouterProvider lo rồi
);