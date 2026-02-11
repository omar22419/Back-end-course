import { Router } from "express";
import { login, signup } from "./auth.service.js";
import { NotFoundException } from "./../../common/utils/index.js";
import { successResponse } from "./../../common/utils/response/success.response.js";

const router = Router();
router.post("/signup", async (req, res, next) => {
  const result = await signup(req.body);
  return successResponse({
    res,
    status: 201,
    message: "User create successfully",
    data: result,
  });
});

router.post("/login", async (req, res, next) => {
    const result = await login(req.body);
    return successResponse({
      res,
      message: "User login successfully",
      data: result,
    });
});

export default router;
