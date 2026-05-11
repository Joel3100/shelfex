import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAuthor, getCategories } from "../utils/bookHelpers";
import books from "../data/books.json";
import authors from "../data/authors.json";
import categories from "../data/categories.json";
import ReadingStatusSelector from "../components/books/ReadingStatusSelector";
import Badge from "../components/ui/Badge";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Navbar";

export default function BookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const book = books.find((b) => b.id === id);
  const author = getAuthor(book, authors);
  const bookCategories = getCategories(book, categories);

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
                  src={`https://covers.openlibrary.org/b/title/${encodeURIComponent(book.title)}-L.jpg`}
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
                  to={`/author/${author.id}`}
                  className="text-sm text-gray-500 hover:text-gray-600 hover:underline"
                >
                  {author.name}
                </Link>
              </p>
              <p className="mb-6 text-sm leading-relaxed text-gray-700 md:text-base">
                {book.description}
              </p>

              {/* Details Row */}
              <div className="flex flex-wrap gap-8 p-4 mb-6 text-xs text-gray-500 md:text-sm bg-gray-50 rounded-xl">
                <span>📅 {book.publishedYear} A.D</span>
                <span>📄 {book.pageCount} Pages</span>
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
