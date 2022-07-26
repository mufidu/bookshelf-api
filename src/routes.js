import * as handlers from './handlers.js'

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: handlers.saveBook,
    options: {
      description: 'Menambahkan buku baru'
    }
  },
  {
    method: 'GET',
    path: '/books',
    handler: handlers.getBooks,
    options: {
      description: 'Mengambil semua buku'
    }
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: handlers.getBookById,
    options: {
      description: 'Mengambil buku berdasarkan ID'
    }
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: handlers.editBookById,
    options: {
      description: 'Mengubah buku berdasarkan ID'
    }
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: handlers.deleteBookById,
    options: {
      description: 'Menghapus buku berdasarkan ID'
    }
  }
]

export default routes
