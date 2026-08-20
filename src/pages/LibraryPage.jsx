import { useEffect, useState } from "react";
import { getBooks, getAuthors, getCategories } from "../services/api";
import FilterBar from "../components/ui/FilterBar";
import BookGrid from "../components/books/BookGrid";
import SearchBar from "../components/ui/SearchBar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function LibraryPage() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const [booksRes, authorsRes, categoriesRes] = await Promise.all([
          getBooks(),
          getAuthors(),
          getCategories(),
        ])
        setBooks(booksRes.data);
        setAuthors(authorsRes.data);
        setCategories(categoriesRes.data);
        setIsLoading(false);
      } catch {
        setError("Failed to load library");
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      !selectedCategory || book.category_ids?.includes(selectedCategory);
    const matchesAuthor = !selectedAuthor || book.author_id === selectedAuthor;
    const matchesSearch =
      !searchQuery ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author_name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesAuthor && matchesSearch;
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-4 rounded-full border-slate-900 border-t-transparent animate-spin"></div>
          <p className="text-gray-500">Loading library...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="px-6 py-8 bg-white border-t-4 border-slate-900">
        <h1 className="text-3xl font-bold text-gray-900">Reformed Library</h1>
        <p className="mt-1 text-slate-400">
          Browse {books.length} books from the Reformed Tradition
        </p>
        <div className="flex flex-col gap-3 mt-4 md:flex-row">
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
      </div>
      <BookGrid books={filteredBooks} authors={authors} />
      <Footer />
    </div>
  );
}
