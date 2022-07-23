import Hapi from 'hapi'
import routes from './routes.js'

const init = async () => {
  const server = new Hapi.Server({
    port: 5000,
    host: 'localhost',
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
