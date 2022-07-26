import { nanoid } from 'nanoid'
import books from './books.js'

const saveBook = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
  const id = nanoid(16)
  const finished = pageCount === readPage
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt

  const book = { id, name, year, author, summary, publisher, pageCount, readPage, reading, finished, insertedAt, updatedAt }
  books.push(book)
  console.log(books)

  const isSuccess = books.filter(book => book.id === id).length > 0
  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    }).code(400)
  } else if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    }).code(400)
  } else if (!isSuccess) {
    return h.response({
      status: 'error',
      message: 'Buku gagal ditambahkan'
    }).code(500)
  } else {
    return h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        book
      }
    }).code(201)
  }
}

const getBooks = (request, h) => {
  const { name, reading, finished } = request.query

  // Filter by name
  if (name) {
    const book = books.filter(book => book.name.toLowerCase().includes(name.toLowerCase()))
    if (book.length === 0) {
      return h.response({
        status: 'error',
        message: 'Buku tidak ditemukan'
      }).code(404)
    } else {
      return h.response({
        status: 'success',
        message: 'Buku berhasil ditemukan',
        data: {
          books
        }
      }).code(200)
    }

    // Filter by reading
  } else if (reading) {
    const book = books.filter(book => book.reading === reading)
    if (book.length === 0) {
      return h.response({
        status: 'error',
        message: 'Buku tidak ditemukan'
      }).code(404)
    }
    return h.response({
      status: 'success',
      message: 'Buku berhasil ditemukan',
      data: {
        books
      }
    }).code(200)

    // Filter by finished
  } else if (finished) {
    const book = books.filter(book => book.finished === finished)
    if (book.length === 0) {
      return h.response({
        status: 'error',
        message: 'Buku tidak ditemukan'
      }).code(404)
    }
    return h.response({
      status: 'success',
      message: 'Buku berhasil ditemukan',
      data: {
        books
      }
    }).code(200)

    // Get all books
  } else if (books.length === 0) {
    return h.response({
      status: 'success',
      data: {
        books: []
      }
    }).code(200)
  } else {
    return h.response({
      status: 'success',
      data: {
        books
      }
    }).code(200)
  }
}

const getBookById = (request, h) => {
  const { id } = request.params
  const book = books.filter(book => book.id === id)
  if (book.length === 0) {
    return h.response({
      status: 'error',
      message: 'Buku tidak ditemukan'
    }).code(404)
  } else {
    return h.response({
      status: 'success',
      data: {
        book: book[0]
      }
    }).code(200)
  }
}

const editBookById = (request, h) => {
  const { id } = request.params
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
  const updatedAt = new Date().toISOString()
  const book = books.filter(book => book.id === id)

  if (name === undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    }).code(400)
  } else if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    }).code(400)
  } else if (book.length === 0) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan'
    }).code(404)
  } else {
    const bookIndex = books.findIndex(book => book.id === id)
    books[bookIndex].name = name
    books[bookIndex].year = year
    books[bookIndex].author = author
    books[bookIndex].summary = summary
    books[bookIndex].publisher = publisher
    books[bookIndex].pageCount = pageCount
    books[bookIndex].readPage = readPage
    books[bookIndex].reading = reading
    books[bookIndex].updatedAt = updatedAt
    books[bookIndex].finished = pageCount === readPage
    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    }).code(200)
  }
}

const deleteBookById = (request, h) => {
  const { id } = request.params
  const book = books.filter(book => book.id === id)
  if (book.length === 0) {
    return h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan'
    }).code(404)
  } else {
    const bookIndex = books.findIndex(book => book.id === id)
    books.splice(bookIndex, 1)
    return h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    }).code(200)
  }
}

export { saveBook, getBooks, getBookById, editBookById, deleteBookById }
