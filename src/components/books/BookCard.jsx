import { Link } from "react-router-dom";
import { useReadingStatus } from "../../context/ReadingStatusContext";
import { useEffect, useState } from "react";

const STATUS_STYLES = {
  reading: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  planned: "bg-yellow-100 text-yellow-800",
};

const STATUS_LABELS = {
  reading: "📖 Reading",
  completed: "✔️ Completed",
  planned: "🕐 Planned",
};

export default function BookCard({ book, authors }) {
  const authorName =
    book.author_name ||
    authors?.find((a) => a.id === book.author_id)?.name ||
    "Unknown Author";
  const { statuses } = useReadingStatus();
  const currentStatus = statuses[book.id];
  const [coverUrl, setCoverUrl] = useState(null);

  useEffect(() => {
  if (book.cover_file) {
    setCoverUrl(`http://localhost:5000/api/books/${book.id}/cover`)
  } else if (book.isbn) {
    setCoverUrl(`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`)
  } else {
    setCoverUrl(`https://covers.openlibrary.org/b/title/${encodeURIComponent(book.title)}-M.jpg`)
  }
}, [book.id])

  return (
    <Link to={`/book/${book.id}`}>
      <div className="overflow-hidden transition-all duration-200 bg-white shadow-md cursor-pointer rounded-xl hover:shadow-xl hover:scale-105">
        {/* Cover Image */}
        <div className="relative w-full bg-gray-200 h-72">
          {coverUrl && (
            <img
              src={coverUrl}
              alt={book.title}
              className="object-cover w-full h-full"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          )}

          <div>
            {currentStatus && (
              <span
                className={`absolute bottom-2 right-2 text-xs px-2 py-1 rounded-full font-medium ${STATUS_STYLES[currentStatus]}`}
              >
                {STATUS_LABELS[currentStatus]}
              </span>
            )}
          </div>
        </div>

        {/* Book Info */}
        <div className="p-3">
          <h3 className="mb-1 text-sm font-bold leading-tight text-gray-900 line-clamp-2">
            {book.title}
          </h3>
          <p className="text-sm text-gray-500 truncate">{authorName}</p>
          <p>⭐ {book.rating}</p>
        </div>
      </div>
    </Link>
  );
}
