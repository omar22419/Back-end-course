import { db } from '../../DB/conncetion.db.js';

export const insertLog = async (data) =>
  db.collection('logs').insertOne({
    ...data,
    createdAt: new Date()
  });
