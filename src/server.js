const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => { // preparing server
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  });
  await server.start();
  server.route(routes);
  console.log(`Server berjalan di ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
