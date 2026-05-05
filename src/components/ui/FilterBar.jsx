export default function FilterBar({
  categories,
  authors,
  selectedCategory,
  selectedAuthor,
  onCategoryChange,
  onAuthorChange,
}) {
  return (
    <div>
      {/* Category Dropdown */}
      <select
        value={selectedCategory || ""}
        onChange={(e) => onCategoryChange(e.target.value || null)}
        className="px-4 py-2 text-sm border border-gray-200 rounded-lg"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      {/* Authors Dropdown */}
      <select
        value={selectedAuthor || ""}
        onChange={(e) => onAuthorChange(e.target.value || null)}
        className="px-4 py-2 text-sm border border-gray-200 rounded-lg"
      >
        <option value="">All Authors</option>
        {authors.map((author) => (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        ))}
      </select>
    </div>
  );
}
