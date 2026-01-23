import * as service from './collection.service.js';

export const createBooksCollection = async (req, res) => {
  await service.createBooksCollection();
  res.send('Books collection created');
};

export const createAuthorsCollection = async (req, res) => {
  await service.createAuthorsCollection();
  res.send('Authors collection created');
};

export const createLogsCapped = async (req, res) => {
  await service.createLogsCapped();
  res.send('Logs capped collection created');
};

export const createBooksIndex = async (req, res) => {
  await service.createBooksIndex();
  res.send('Index created');
};
