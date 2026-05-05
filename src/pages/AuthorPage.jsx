import { useNavigate, useParams } from "react-router-dom";
import books from "./../data/books.json";
import authorsData from "./../data/authors.json";
import { getBooksByAuthor } from "../utils/bookHelpers";
import BookGrid from "../components/books/BookGrid";

export default function AuthorPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const author = authorsData.find((a) => a.id === id);
  const authorBooks = getBooksByAuthor(id, books);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl p-8 mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 px-3 py-2 mb-6 text-sm text-gray-500 border border-gray-500 rounded-lg hover:text-gray-900"
        >
          ← Back
        </button>

        {/* Author Info */}
        <div className="p-8 mb-8 bg-white shadow-md rounded-2xl">
          <h1 className="text-3xl font-bold text-gray-900">{author.name}</h1>
          <p className="mb-4 text-sm text-gray-400">{author.nationality}</p>
          <p className="leading-relaxed text-gray-700">{author.bio}</p>
        </div>

        {/* Author's Books */}
        <h1 className="mb-4 text-xl font-bold text-gray-900">
          Books by {author.name}
        </h1>
        <BookGrid
          books={authorBooks}
          authors={authorsData}
          className="grid grid-cols-2 gap-6 p-6 md:grid-cols-3"
        />
      </div>
    </div>
  );
}
