import { Router } from 'express';
import * as controller from './collection.controller.js';

const router = Router();

router.post('/books', controller.createBooksCollection);
router.post('/authors', controller.createAuthorsCollection);
router.post('/logs/capped', controller.createLogsCapped);
router.post('/books/index', controller.createBooksIndex);

export default router;
