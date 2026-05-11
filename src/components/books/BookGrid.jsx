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
        className || "grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-5"
      }
    >
      {books.map((book) => (
        <BookCard key={book.id} book={book} authors={authors} />
      ))}
    </div>
  );
}
