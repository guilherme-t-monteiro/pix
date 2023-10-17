import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import usersRoutes from './routes/users';
import pixRoutes from './routes/pix';

let server: Express = express();

server.use(cors());
server.use(express.json());

server.use((req: Request, res: Response, next: NextFunction) => {
  console.log('[' + (new Date()) + '] ' + req.method + ' ' + req.url);
  next();
});

server.use(usersRoutes);
server.use(pixRoutes);

export default {
  start () {
    server.listen(3000, () => {
      console.log('Server started on port 3000!');
    });
  }
};