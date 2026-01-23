import * as service from './books.service.js';

export const insertOne = async (req, res) =>
  res.json(await service.insertOne(req.body));

export const insertMany = async (req, res) =>
  res.json(await service.insertMany(req.body));

export const updateFuture = async (req, res) => {
  await service.updateFuture(req.params.title);
  res.send('Updated');
};

export const findByTitle = async (req, res) =>
  res.json(await service.findByTitle(req.query.title));

export const findByYear = async (req, res) =>
  res.json(await service.findByYear(+req.query.from, +req.query.to));

export const findByGenre = async (req, res) =>
  res.json(await service.findByGenre(req.query.genre));

export const skipLimit = async (req, res) =>
  res.json(await service.skipLimit());

export const yearInteger = async (req, res) =>
  res.json(await service.yearInteger());

export const excludeGenres = async (req, res) =>
  res.json(await service.excludeGenres());

export const deleteBeforeYear = async (req, res) => {
  await service.deleteBeforeYear(+req.query.year);
  res.send('Deleted');
};

export const aggregate1 = async (req, res) =>
  res.json(await service.aggregate1());

export const aggregate2 = async (req, res) =>
  res.json(await service.aggregate2());

export const aggregate3 = async (req, res) =>
  res.json(await service.aggregate3());

export const aggregate4 = async (req, res) =>
  res.json(await service.aggregate4());
