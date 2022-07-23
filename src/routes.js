import * as handlers from './handlers.js';

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: handlers.saveBook,
    options: {
      auth: false,
      description: 'Menambahkan buku baru',
    }
  },
  {
    method: 'GET',
    path: '/books',
    handler: handlers.getBooks,
    options: {
      auth: false,
      description: 'Mengambil semua buku',
    }
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: handlers.getBookById,
    options: {
      auth: false,
      description: 'Mengambil buku berdasarkan ID',
    }
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: handlers.editBookById,
    options: {
      auth: false,
      description: 'Mengubah buku berdasarkan ID',
    }
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: handlers.deleteBookById,
    options: {
      auth: false,
      description: 'Menghapus buku berdasarkan ID',
    }
  }
];


export default routes
