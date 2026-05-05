export function getAuthor(book, authors) {
  return authors.find(a => a.id === book.authorId)
}

export function getCategories(book, categories) {
  return categories.filter(c => book.categoryIds.includes(c.id))
}

export function getBooksByAuthor(authorId, books) {
  return books.filter(book => book.authorId === authorId)
}
