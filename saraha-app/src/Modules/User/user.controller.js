import {Router} from 'express'
import { authentication } from '../../middleware/authentication.middleware.js';
import { successResponse } from '../../common/utils/index.js';
import { profile, rotateToken } from './user.service.js';
import { tokenTypeEnum } from '../../common/Enums/security.enum.js';

const router = Router();

router.get("/", authentication(), async (req, res, next) => {
  console.log(req.headers);
  const account = await profile(req.user);
  return successResponse({ res, data: { account } });
});

router.get("/rotate", authentication(tokenTypeEnum.refresh), async (req, res, next) => {
  const account = await rotateToken(req.user, `${req.protocol}://${req.host}`);
  return successResponse({ res, data: { account } });
});

export default router