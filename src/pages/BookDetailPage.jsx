import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuthor, getCategories } from "../utils/bookHelpers";
import books from "../data/books.json";
import authors from "../data/authors.json";
import categories from "../data/categories.json";
import ReadingStatusSelector from "../components/books/ReadingStatusSelector";
import Badge from "../components/ui/Badge";
import { Link } from "react-router-dom";

export default function BookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const book = books.find((b) => b.id === id);
  const author = getAuthor(book, authors);
  const bookCategories = getCategories(book, categories);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl p-8 mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 px-3 py-2 mb-6 text-sm text-gray-500 border border-gray-500 rounded-lg hover:text-gray-900"
        >
          ← Back
        </button>

        {/* Two Column Layout */}
        <div className="flex gap-10 p-10 bg-white shadow-md rounded-2xl">
          {/* Left Column - Cover */}
          <div className="flex-shrink-0 w-64 overflow-hidden bg-gray-200 shadow-md rounded-xl h-80">
            <img
              src={`https://covers.openlibrary.org/b/title/${encodeURIComponent(book.title)}-L.jpg`}
              alt={book.title}
              className="object-cover w-full h-full"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>

          {/* Right Column - Info */}
          <div>
            <h1 className="mb-1 text-3xl font-bold text-gray-900">
              {book.title}
            </h1>
            <p className="mb-4 text-gray-500 text-md">
              <Link
                to={`/author/${author.id}`}
                className="text-sm text-gray-500 hover:text-gray-600 hover:underline"
              >
                {author.name}
              </Link>
            </p>
            <p className="mb-6 leading-relaxed text-gray-700">
              {book.description}
            </p>

            {/* Details Row */}
            <div className="flex gap-6 mb-6 text-sm text-gray-500">
              <span>{book.publishedYear} A.D</span>
              <span>{book.pageCount} Pages</span>
              <span>{book.language}</span>
              <span>⭐ {book.rating}</span>
            </div>

            {/* Categories */}
            <div className="flex gap-2 mt-6">
              {bookCategories.map((category) => (
                <Badge key={category.id} label={category.name} variant="blue" />
              ))}
            </div>

            {/* Reading Status */}
            <ReadingStatusSelector bookId={book.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
