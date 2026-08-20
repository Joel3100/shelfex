import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { getAuthors, getBooks, getCategories } from "../services/api";

export default function AboutPage() {
  const [stats, setStats] = useState({
    books: 0,
    authors: 0,
    categories: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const [booksRes, authorsRes, categoriesRes] = await Promise.all([
          getBooks(),
          getAuthors(),
          getCategories(),
        ]);
        setStats({
          books: booksRes.data.length,
          authors: authorsRes.data.length,
          categories: categoriesRes.data.length,
        });
      } catch {
        // Keep default 0 values if API fails
      }
    }

    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl px-6 py-16 mx-auto">
        {/* Hero */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            About Shelfex
          </h1>
          <p className="text-xl text-gray-500">
            ሸልፈኛው — Good Christian Books Shelf
          </p>
        </div>

        {/* Mission */}
        <div className="p-10 mb-8 bg-white shadow-md rounded-2xl">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Our Mission</h2>
          <p className="text-lg leading-relaxed text-gray-600">
            Shelfex is a digital library dedicated to making Reformed theology
            accessible to every believer. We curate books from the greatest
            theologians of the Reformed tradition — from the Reformation era to
            the modern age.
          </p>
        </div>

        {/* What We Offer */}
        <div className="p-10 mb-8 bg-white shadow-md rounded-2xl">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="p-4 text-center">
              <p className="mb-3 text-4xl">📚</p>
              <h3 className="mb-2 font-bold text-gray-900">Curated Books</h3>
              <p className="text-sm text-gray-500">
                {stats.books} carefully selected books from Reformed tradition
              </p>
            </div>
            <div className="p-4 text-center">
              <p className="mb-3 text-4xl">✍️</p>
              <h3 className="mb-2 font-bold text-gray-900">Author Profiles</h3>
              <p className="text-sm text-gray-500">
                Learn about {stats.authors} influential Reformed theologians
              </p>
            </div>
            <div className="p-4 text-center">
              <p className="mb-3 text-4xl">📖</p>
              <h3 className="mb-2 font-bold text-gray-900">Reading Tracker</h3>
              <p className="text-sm text-gray-500">
                Track your reading progress across all books
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="p-10 text-center bg-slate-900 rounded-2xl">
          <div className="flex justify-center gap-16">
            <div>
              <p className="text-4xl font-bold text-white">{stats.books}</p>
              <p className="mt-1 text-slate-400">Books</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white">{stats.authors}</p>
              <p className="mt-1 text-slate-400">Authors</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white">
                {stats.categories}
              </p>
              <p className="mt-1 text-slate-400">Categories</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
