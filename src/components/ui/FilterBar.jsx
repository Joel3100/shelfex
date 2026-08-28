export default function FilterBar({
  categories,
  authors,
  selectedCategory,
  selectedAuthor,
  onCategoryChange,
  onAuthorChange,
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {/* Category Dropdown */}
      <select
        value={selectedCategory || ""}
        onChange={(e) => onCategoryChange(e.target.value || null)}
        className="h-11 min-w-0 flex-1 px-3 text-sm bg-white border border-gray-200 rounded-lg md:w-44 md:flex-none"
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
        className="h-11 min-w-0 flex-1 px-3 text-sm bg-white border border-gray-200 rounded-lg md:w-52 md:flex-none"
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
