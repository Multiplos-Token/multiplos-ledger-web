const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

const app = next({ dev: false });
const handle = app.getRequestHandler();

// Load your self-signed certificates
const httpsOptions = {
  key: fs.readFileSync(process.env.SSL_PRIVATE_KEY),
  cert: fs.readFileSync(process.env.SSL_CERTIFICATE),
};

app.prepare().then(() => {
  createServer(httpsOptions, async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(parseInt(process.env.SRVPORT), (err) => {
    if (err) throw err;
    console.log('> Production HTTPS server ready on https://localhost:3000');
  });
});
