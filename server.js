const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  // Normalize URL to prevent directory traversal
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/') {
    reqPath = '/index.html';
  }

  const filePath = path.normalize(path.join(__dirname, reqPath));

  // Security check: ensure path is within current directory
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // 404 Fallback
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head><title>404 Not Found</title><style>body{background:#0a0c10;color:#fff;font-family:sans-serif;text-align:center;padding:50px;}</style></head>
        <body>
          <h1>404 - Resource Not Found</h1>
          <p><a href="/" style="color:#00f0ff;">Return to Portfolio Home</a></p>
        </body>
        </html>
      `);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is in use. Try specifying another port: PORT=3001 node server.js`);
  } else {
    console.error('Server error:', e.message);
  }
});

server.listen(PORT, () => {
  console.log('\n============================================================');
  console.log(`  ✦ 3D CREATIVE PORTFOLIO SERVER READY`);
  console.log(`  ✦ Local URL: http://localhost:${PORT}`);
  console.log(`  ✦ Press Ctrl+C to terminate`);
  console.log('============================================================\n');
});
