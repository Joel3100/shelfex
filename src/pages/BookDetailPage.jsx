import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getBook } from "../services/api";
import ReadingStatusSelector from "../components/books/ReadingStatusSelector";
import Badge from "../components/ui/Badge";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function BookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadBook() {
      try {
        setIsLoading(true);
        const response = await getBook(id);
        setBook(response.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load book details.");
        setIsLoading(false);
      }
    }
    loadBook();
  }, [id]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-12 h-12 border-4 rounded-full border-slate-900 border-t-transparent animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500">{error}</p>
      </div>
    );
    
  if (!book) return null;

  const authorName = book.author_name || "Unknown Author";
  const bookCategories = book.categories || [];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl px-4 py-8 mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 px-4 py-2 mb-6 text-sm text-gray-500 border border-gray-300 rounded-lg hover:text-gray-900"
        >
          ← Back
        </button>

        {/* Main Card */}
        <div className="p-6 bg-white shadow-md rounded-2xl md:p-10">
          {/* Mobile: column, Desktop: row */}
          <div className="flex flex-col gap-8 md:flex-row">
            {/* Left Column - Cover */}
            <div className="w-full md:w-64 md:flex-shrink-0">
              <div className="w-48 mx-auto overflow-hidden bg-gray-200 shadow-md rounded-xl md:w-64 md:mx-0">
                <img
                  src={
                    book.isbn
                      ? `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`
                      : `https://covers.openlibrary.org/b/title/${encodeURIComponent(book.title)}-L.jpg`
                  }
                  alt={book.title}
                  className="object-cover w-full h-64 md:h-80"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            </div>

            {/* Right Column - Info */}
            <div className="flex-1">
              <h1 className="mb-1 text-2xl font-bold text-gray-900 md:text-3xl">
                {book.title}
              </h1>
              <p className="mb-4 text-sm text-gray-500 md:text-base">
                <Link
                  to={`/author/${book.author_id}`}
                  className="text-sm text-gray-500 hover:text-gray-600 hover:underline"
                >
                  {authorName}
                </Link>
              </p>
              <p className="mb-6 text-sm leading-relaxed text-gray-700 md:text-base">
                {book.description}
              </p>

              {/* Details Row */}
              <div className="flex flex-wrap gap-8 p-4 mb-6 text-xs text-gray-500 md:text-sm bg-gray-50 rounded-xl">
                <span>📅 {book.published_year} A.D</span>
                <span>📄 {book.page_count} Pages</span>
                <span>🌐 {book.language}</span>
                <span>⭐ {book.rating}</span>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 mt-6">
                {bookCategories.map((category) => (
                  <Badge
                    key={category.id}
                    label={category.name}
                    variant="blue"
                  />
                ))}
              </div>

              {/* Reading Status */}
              <ReadingStatusSelector bookId={book.id} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
