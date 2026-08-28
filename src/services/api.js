const BASE_URL = import.meta.env.VITE_API_URL

// Helper function for all requests
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token')

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong')
  }

  return data
}

// Books
export const getBooks = () => request('/api/books')
export const getBook = (id) => request(`/api/books/${id}`)

// Authors
export const getAuthors = () => request('/api/authors')
export const getAuthor = (id) => request(`/api/authors/${id}`)

// Categories
export const getCategories = () => request('/api/categories')

// Auth
export const signup = (data) => request('/api/auth/signup', {
  method: 'POST',
  body: JSON.stringify(data)
})

export const login = (data) => request('/api/auth/login', {
  method: 'POST',
  body: JSON.stringify(data)
})

export const getMe = () => request('/api/auth/me')

// Reading Status
export const getStatuses = () => request('/api/status')

export const setStatus = (book_id, status) => request('/api/status', {
  method: 'POST',
  body: JSON.stringify({ book_id, status })
})

export const deleteStatus = (bookId) => request(`/api/status/${bookId}`, {
  method: 'DELETE'
})
