import { Router } from "express";
import { auth } from "../../Middleware/auth.js";
import {
  replaceNote,
  createNote,
  updateAllTitles,
  getPaginatedNotes,
  getNoteByContent,
  getNotesWithUser,
  aggregateNotes,
  deleteAllNotes,
  updateNote,
  deleteNoteById,
  getNoteById,
} from "./note.service.js";
import { successResponse } from "../../Utils/response.helper.js";

const router = Router();

router.post("/", auth, async (req, res, next) => {
  try {
    const result = await createNote(req.user.userId, req.body);
    successResponse(res, 201, "created successfully", result);
  } catch (e) {
    next(e);
  }
});

router.put("/replace/:noteId", auth, async (req, res, next) => {
  try {
    const result = await replaceNote(
      req.user.userId,
      req.params.noteId,
      req.body,
    );
    successResponse(res, 200, "replaced successfully", result);
  } catch (e) {
    next(e);
  }
});

router.patch("/all", auth, async (req, res, next) => {
  try {
    const result = await updateAllTitles(req.user.userId, req.body.title);
    successResponse(res, 200, "updated titles successfully", result);
  } catch (e) {
    next(e);
  }
});

router.get("/paginate-sort", auth, async (req, res, next) => {
  try {
    const page = parseInt(req.query.page ?? "1");
    const limit = parseInt(req.query.limit ?? "10");
    const result = await getPaginatedNotes(req.user.userId, page, limit);
    successResponse(res, 200, "", result);
  } catch (e) {
    next(e);
  }
});

router.get("/note-by-content", auth, async (req, res, next) => {
  try {
    const result = await getNoteByContent(req.user.userId, req.query.content);
    successResponse(res, 200, "note content", result);
  } catch (e) {
    next(e);
  }
});

router.get("/note-with-user", auth, async (req, res, next) => {
  try {
    const result = await getNotesWithUser(req.user.userId);
    successResponse(res, 200, "note with user", result);
  } catch (e) {
    next(e);
  }
});

router.get("/aggregate", async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    const result = await aggregateNotes(userId, req.query.title);
    successResponse(res, 200, "", result);
  } catch (e) {
    next(e);
  }
});

router.delete("/", auth, async (req, res, next) => {
  try {
    const result = await deleteAllNotes(req.user.userId);
    successResponse(res, 200, "deleted all notes successfully", result);
  } catch (e) {
    next(e);
  }
});

router.patch("/:noteId", auth, async (req, res, next) => {
  try {
    const result = await updateNote(
      req.user.userId,
      req.params.noteId,
      req.body,
    );
    successResponse(res, 200, "note updated successfully", result);
  } catch (e) {
    next(e);
  }
});

router.delete("/:noteId", auth, async (req, res, next) => {
  try {
    const result = await deleteNoteById(req.user.userId, req.params.noteId);
    successResponse(res, 200, "deleted note successfully", result);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", auth, async (req, res, next) => {
  try {
    const result = await getNoteById(req.user.userId, req.params.id);
    successResponse(res, 200, "note retrieved successfully", result);
  } catch (e) {
    next(e);
  }
});

export default router;
