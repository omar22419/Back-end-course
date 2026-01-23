import * as service from './logs.service.js';

export const insertLog = async (req, res) =>
  res.json(await service.insertLog(req.body));
