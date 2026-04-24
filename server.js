const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.ico':  'image/x-icon',
};

http.createServer((req, res) => {
  // Route: / or /admin -> Sistema, /publico -> Publica
  let file;
  const url = req.url.split('?')[0];
  if (url === '/' || url === '/admin') {
    file = 'LeagueFFF_Sistema.html';
  } else if (url === '/publico' || url === '/public') {
    file = 'LeagueFFF_Publica.html';
  } else {
    file = url.slice(1); // serve other static files if any
  }

  const filePath = path.join(__dirname, file);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }
    const ext  = path.extname(filePath);
    const mime = MIME[ext] || 'text/plain';
    res.writeHead(200, {
      'Content-Type': mime,
      'Cache-Control': 'no-cache',
    });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`League FFF server running on port ${PORT}`);
});
