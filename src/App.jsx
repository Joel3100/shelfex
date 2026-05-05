import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReadingStatusProvider } from "./context/ReadingStatusContext";
import LibraryPage from "./pages/LibraryPage";
import BookDetailPage from "./pages/BookDetailPage";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AuthorPage from "./pages/AuthorPage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <ReadingStatusProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/book/:id" element={<BookDetailPage />} />
          <Route path="/author/:id" element={<AuthorPage />} />
        </Routes>
      </BrowserRouter>
    </ReadingStatusProvider>
  );
}

export default App;
