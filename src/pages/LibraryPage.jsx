import { useEffect, useState } from "react";
import booksData from "../data/books.json";
import authors from "../data/authors.json";
import categories from "../data/categories.json";
import FilterBar from "../components/ui/FilterBar";
import BookGrid from "../components/books/BookGrid";
import SearchBar from "../components/ui/SearchBar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function LibraryPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /*
  useEffect(() => {
    fetch("https://openlibrary.org/search.json?q=reformed+theology&limit=15")
      .then((response) => response.json)
      .then((data) => {
        setBooks(data.docs);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Failed to load books.");
        setIsLoading(false);
      });
  }, []);
  */

  useEffect(() => {
    async function loadBooks() {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        setBooks(booksData);
        setIsLoading(false);
      } catch (err) {
        setError("Faild to load books.");
        setIsLoading(false);
      }
    }
    loadBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      !selectedCategory || book.categoryIds.includes(selectedCategory);
    const matchesAuthor = !selectedAuthor || book.authorId === selectedAuthor;
    const matchesSearch =
      !searchQuery ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      authors
        .find((author) => author.id === book.authorId)
        ?.name.toLowerCase()
        .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesAuthor && matchesSearch;
  });

  // Spinner JSX
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-4 rounded-full border-t-transparent animate-spin border-slate-900"></div>
          <p className="text-gray-500 ">Loading library ...</p>
        </div>
      </div>
    );

  // error JSX
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500">{error}</p>
      </div>
    );

  // Normal Page JSX
  return (
    <>
      <Navbar />
      <div className="px-6 py-8 bg-white border-slate-900 border-t-4- gray-200 border-">
        <h1 className="text-3xl font-bold text-gray-900">Reformed Library</h1>
        <p className="mt-1 text-slate-400">
          Browse {books.length} books from the Reformed Tradition and Theology.
        </p>
        <div className="flex flex-col gap-3 mt-4 md:flex-row md:items-center">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterBar
            categories={categories}
            authors={authors}
            selectedCategory={selectedCategory}
            selectedAuthor={selectedAuthor}
            onCategoryChange={setSelectedCategory}
            onAuthorChange={setSelectedAuthor}
          />
        </div>

        <BookGrid books={filteredBooks} authors={authors} />
      </div>
      <Footer />
    </>
  );
}
