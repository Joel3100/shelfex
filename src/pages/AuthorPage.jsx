import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthor } from "../services/api";
import BookGrid from "../components/books/BookGrid";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function AuthorPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [author, setAuthor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadAuthor() {
      try {
        setIsLoading(true);
        const response = await getAuthor(id);
        setAuthor(response.data);
        setIsLoading(false);
      } catch {
        setError("Failed to load author details.");
        setIsLoading(false);
      }
    }
    loadAuthor();
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

  if (!author) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl p-8 mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 px-3 py-2 mb-6 text-sm text-gray-500 border border-gray-300 rounded-lg hover:text-gray-900"
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
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Books by {author.name}
        </h2>
        <BookGrid
          books={author.books}
          authors={[author]}
          className="grid grid-cols-2 gap-6 p-6 md:grid-cols-3"
        />
      </div>
      <Footer />
    </div>
  );
}
