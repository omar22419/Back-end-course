import { Router } from "express";
import { createOrUpdateUser, findUserByEmail, getUserByIdExcludeRole } from "./user.service.js";

const router = Router();

router.put("/:id", async (req, res, next) => {
  try {
    await createOrUpdateUser(req.params.id, req.body);
    return res.status(200).json({ message: "User created or updated successfully" });
  } catch (error) {
    return next(error);
  }
});

router.get("/by-email", async (req, res, next) => {
  try {
    const email = req.query.email;
    const result = await findUserByEmail(email);
    if (!result) {
      return res.status(404).json({ message: "no user found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const result = await getUserByIdExcludeRole(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "no user found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
});

export default router