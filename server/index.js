const app = require('./app')

const HOST = process.env.HOST;
// Set the port that will be used locally as a fallback. Otherwise, used
// the port set by the host.
const PORT = process.env.PORT || 5000;

const runServer = new Promise((resolve, reject) => {
  app.listen(PORT, HOST, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  });
});

runServer.then(() => {
  console.log(`App listening on ${HOST || 'localhost'}:${PORT}!`);
}).catch(err => console.error(err));
