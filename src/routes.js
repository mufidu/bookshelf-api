import * as handlers from './handlers.js'

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: handlers.saveBook,
    options: {
      auth: false,
      description: 'Menambahkan buku baru'
    }
  },
  {
    method: 'GET',
    path: '/books',
    handler: handlers.getBooks,
    options: {
      auth: false,
      description: 'Mengambil semua buku'
    }
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: handlers.getBookById,
    options: {
      auth: false,
      description: 'Mengambil buku berdasarkan ID'
    }
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: handlers.editBookById,
    options: {
      auth: false,
      description: 'Mengubah buku berdasarkan ID'
    }
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: handlers.deleteBookById,
    options: {
      auth: false,
      description: 'Menghapus buku berdasarkan ID'
    }
  },
  {
    method: 'GET',
    path: '/books?name={name}',
    handler: handlers.getBooksByName,
    options: {
      auth: false,
      description: 'Mengambil buku berdasarkan nama'
    }
  },
  {
    method: 'GET',
    path: '/books?reading={reading}',
    handler: handlers.getBooksByReading,
    options: {
      auth: false,
      description: 'Mengambil buku berdasarkan status pembacaan'
    }
  },
  {
    method: 'GET',
    path: '/books?finished={finished}',
    handler: handlers.getBooksByFinished,
    options: {
      auth: false,
      description: 'Mengambil buku berdasarkan status selesai'
    }
  }
]

export default routes
