import express from 'express';
import { authenticateDB } from './DB/conncetion.db.js';
import booksModule from './modules/books/index.js';
// import logsModule from './modules/logs/index.js';
// import collectionModule from './modules/collection/index.js';


export default async function bootstrap() {
  const app = express();
  app.use(express.json());

  await authenticateDB();

  app.use('/books', booksModule);
//   app.use('/logs', logsModule);
//   app.use('/collection', collectionModule);

  app.listen(3000, () =>
    console.log('Server running on port 3000')
  );
}
