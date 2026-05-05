import BookCard from "./BookCard";

export default function BookGrid({ books, authors, className }) {
  if (books.length === 0) {
    return (
      <div className="mt-20 text-center text-gray-400">
        <p className="text-xl">No books found!</p>
      </div>
    );
  }

  return (
    <div
      className={
        className || "grid grid-cols-3 gap-6 p-6 md:grid-cols-4 lg:grid-cols-6"
      }
    >
      {books.map((book) => (
        <BookCard key={book.id} book={book} authors={authors} />
      ))}
    </div>
  );
}
