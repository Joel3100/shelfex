import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReadingStatusProvider } from "./context/ReadingStatusContext";
import LibraryPage from "./pages/LibraryPage";
import BookDetailPage from "./pages/BookDetailPage";
import Navbar from "./components/layout/Navbar";
import AuthorPage from "./pages/AuthorPage";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <ReadingStatusProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/book/:id" element={<BookDetailPage />} />
          <Route path="/author/:id" element={<AuthorPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </ReadingStatusProvider>
  );
}

export default App;
