import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/Auth";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddBooks from "./pages/AddBooks";
import BookDetailPage from "./pages/BookDetail";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Draft from "./pages/Draft";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {" "}
        {/* Wrap the routes with AuthProvider */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="addbook" element={<AddBooks />} />
          <Route path="draft" element={<Draft />} />
          <Route path="book/:id" element={<BookDetailPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
