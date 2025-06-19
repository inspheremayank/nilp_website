import express, { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, conf: { basePath: '/nilp' } });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  // Middleware to set the X-XSS-Protection header
  server.use((req, res, next) => {
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });
  server.disable('x-powered-by');

    //Middleware to set CORS headers for allowed methods
    server.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
      res.setHeader('Allow', 'GET, POST');
      next();
    });

    
  server.use(
    '/external-api',
    (req, res, next) => {
      const forbiddenMethods = ['OPTIONS', 'TRACE', 'TRACK','DELETE'];
      if (forbiddenMethods.includes(req.method)) {
        console.log(`Blocked ${req.method} request to ${req.url}`);
        res.status(405).send('Method Not Allowed');
      } else {
        next();
      }
    },
    createProxyMiddleware({
      target: 'https://ullas.education.gov.in',
      changeOrigin: true,
      pathRewrite: {
        '^/external-api': '',
      },
      secure: false,
    })
  );

  server.all('/nilp/*', (req: Request, res: Response) => {
    req.url = req.url.replace('/testing', '');
    return handle(req, res);
  });

  server.all('*', (req: Request, res: Response) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (err?: any) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}/nilp`);
  });
});
