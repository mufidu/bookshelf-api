import { nanoid } from 'nanoid'
import books from './books.js'

const saveBook = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
  const bookId = nanoid(16)
  const finished = pageCount === readPage
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt

  const book = { bookId, name, year, author, summary, publisher, pageCount, readPage, reading, finished, insertedAt, updatedAt }

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
  } else {
    books.push(book)
    const isSuccess = books.filter(book => book.bookId === bookId).length > 0

    if (isSuccess) {
      return h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          ...book
        }
      }).code(201)
    } else if (!isSuccess) {
      return h.response({
        status: 'error',
        message: 'Buku gagal ditambahkan'
      }).code(500)
    }
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
      const newBooks = []
      for (let i = 0; i < book.length; i++) {
        newBooks.push({
          id: book[i].bookId,
          name: book[i].name,
          publisher: book[i].publisher
        })
      }
      return h.response({
        status: 'success',
        message: 'Buku berhasil ditemukan',
        data: {
          books: newBooks
        }
      }).code(200)
    }

    // Filter by reading
  } else if (reading) {
    // If reading = 0, then filter by finished, else filter by reading
    if (reading === '0') {
      const book = books.filter(book => book.reading === false)
      if (book.length === 0) {
        return h.response({
          status: 'fail',
          message: 'Buku tidak ditemukan'
        }).code(404)
      } else {
        const newBooks = []
        for (let i = 0; i < book.length; i++) {
          newBooks.push({
            id: book[i].bookId,
            name: book[i].name,
            publisher: book[i].publisher
          })
        }
        return h.response({
          status: 'success',
          message: 'Buku berhasil ditemukan',
          data: {
            books: newBooks
          }
        }).code(200)
      }
    } else if (reading === '1') {
      const book = books.filter(book => book.reading === true)
      if (book.length === 0) {
        return h.response({
          status: 'fail',
          message: 'Buku tidak ditemukan'
        }).code(404)
      } else {
        const newBooks = []
        for (let i = 0; i < book.length; i++) {
          newBooks.push({
            id: book[i].bookId,
            name: book[i].name,
            publisher: book[i].publisher
          })
        }
        return h.response({
          status: 'success',
          message: 'Buku berhasil ditemukan',
          data: {
            books: newBooks
          }
        }).code(200)
      }
    }

    // Filter by finished
  } else if (finished) {
    if (finished === '0') {
      const book = books.filter(book => book.finished === false)
      if (book.length === 0) {
        return h.response({
          status: 'fail',
          message: 'Buku tidak ditemukan'
        }).code(404)
      } else {
        const newBooks = []
        for (let i = 0; i < book.length; i++) {
          newBooks.push({
            id: book[i].bookId,
            name: book[i].name,
            publisher: book[i].publisher
          })
        }
        return h.response({
          status: 'success',
          message: 'Buku berhasil ditemukan',
          data: {
            books: newBooks
          }
        }).code(200)
      }
    } else if (finished === '1') {
      const book = books.filter(book => book.finished === true)
      if (book.length === 0) {
        return h.response({
          status: 'fail',
          message: 'Buku tidak ditemukan'
        }).code(404)
      } else {
        const newBooks = []
        for (let i = 0; i < book.length; i++) {
          newBooks.push({
            id: book[i].bookId,
            name: book[i].name,
            publisher: book[i].publisher
          })
        }
        return h.response({
          status: 'success',
          message: 'Buku berhasil ditemukan',
          data: {
            books: newBooks
          }
        }).code(200)
      }
    }

    // Get all books
  } else if (books.length === 0) {
    return h.response({
      status: 'success',
      data: {
        books: []
      }
    }).code(200)
  } else {
    const newBooks = []
    for (let i = 0; i < books.length; i++) {
      newBooks.push({
        id: books[i].bookId,
        name: books[i].name,
        publisher: books[i].publisher
      })
    }
    return h.response({
      status: 'success',
      data: {
        books: newBooks
      }
    }).code(200)
  }
}

const getBookById = (request, h) => {
  const { bookId } = request.params
  const book = books.filter(book => book.bookId === bookId)
  if (book.length === 0) {
    return h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan'
    }).code(404)
  } else {
    const newBook = {
      id: book[0].bookId,
      name: book[0].name,
      year: book[0].year,
      author: book[0].author,
      summary: book[0].summary,
      publisher: book[0].publisher,
      pageCount: book[0].pageCount,
      readPage: book[0].readPage,
      reading: book[0].reading,
      finished: book[0].finished,
      insertedAt: book[0].insertedAt,
      updatedAt: book[0].updatedAt
    }
    return h.response({
      status: 'success',
      data: {
        book: newBook
      }
    }).code(200)
  }
}

const editBookById = (request, h) => {
  const { bookId } = request.params
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
  const updatedAt = new Date().toISOString()
  const book = books.filter(book => book.bookId === bookId)

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
    const bookIndex = books.findIndex(book => book.bookId === bookId)
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
  const { bookId } = request.params
  const book = books.filter(book => book.bookId === bookId)
  if (book.length === 0) {
    return h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan'
    }).code(404)
  } else {
    const bookIndex = books.findIndex(book => book.bookId === bookId)
    books.splice(bookIndex, 1)
    return h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    }).code(200)
  }
}

export { saveBook, getBooks, getBookById, editBookById, deleteBookById }
