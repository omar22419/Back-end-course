import { Router } from 'express';
import * as controller from './books.controller.js';

const router = Router();

router.post('/', controller.insertOne);
router.post('/batch', controller.insertMany);
router.patch('/:title', controller.updateFuture);

router.get('/title', controller.findByTitle);
router.get('/year', controller.findByYear);
router.get('/genre', controller.findByGenre);
router.get('/skip-limit', controller.skipLimit);

router.get('/year-integer', controller.yearInteger);
router.get('/exclude-genres', controller.excludeGenres);

router.delete('/before-year', controller.deleteBeforeYear);

router.get('/aggregate1', controller.aggregate1);
router.get('/aggregate2', controller.aggregate2);
router.get('/aggregate3', controller.aggregate3);
router.get('/aggregate4', controller.aggregate4);

export default router;
