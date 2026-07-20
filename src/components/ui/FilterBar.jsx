export default function FilterBar({
  categories,
  authors,
  selectedCategory,
  selectedAuthor,
  onCategoryChange,
  onAuthorChange,
}) {
  return (
    <div className="flex flex-col gap-3 px-4 pb-4 md:gap-4 md:px-6">
      {/* Category Dropdown */}
      <select
        value={selectedCategory || ""}
        onChange={(e) => onCategoryChange(e.target.value || null)}
        className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg md:w-auto"
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
        className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg md:w-auto"
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
