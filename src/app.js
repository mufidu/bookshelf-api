import Hapi from 'hapi'
import routes from './routes.js'

const init = async () => {
  const server = new Hapi.Server({
    port: 5000,
    host: process.env.NODE_ENV === 'production' ? 'https://dicoding-bookshelf-api.herokuapp.com' : 'localhost',
    routes: {
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with', 'Access-Control-Allow-Private-Network']
      }
    }
  })

  server.route(routes)

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

init()
